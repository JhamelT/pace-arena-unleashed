import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Clock, Cloud, Sun, CloudRain, Navigation, Heart, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import EventRegistrationDialog from '@/components/EventRegistrationDialog';

interface Event {
  id: string;
  name: string;
  description: string;
  event_type: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  city?: string;
  state?: string;
  is_club_event: boolean;
  max_participants?: number;
  registration_deadline?: string;
  created_at: string;
  likes?: { count: number; user_has_liked: boolean };
  comments?: { count: number };
}

const Events = () => {
  const [selectedClub, setSelectedClub] = useState('');
  const [locationPermission, setLocationPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [publicEvents, setPublicEvents] = useState<Event[]>([]);
  const [clubEvents, setClubEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // Cache for 5 minutes
        });
      });

      const newLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      setUserLocation(newLocation);
      setLocationPermission('granted');
      
      // Fetch nearby events when location is enabled
      await fetchNearbyEvents(newLocation.lat, newLocation.lng);
      
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationPermission('denied');
    }
  };

  const fetchNearbyEvents = async (lat: number, lng: number) => {
    try {
      const { data, error } = await supabase.rpc('get_nearby_events', {
        user_lat: lat,
        user_lng: lng,
        radius_miles: 25
      });

      if (error) {
        console.error('Error fetching nearby events:', error);
        return;
      }

      // Filter and categorize events
      const nearbyPublicEvents = data ? data.filter((event: Event) => !event.is_club_event) : [];
      const nearbyClubEvents = data ? data.filter((event: Event) => event.is_club_event) : [];
      
      setPublicEvents(nearbyPublicEvents);
      setClubEvents(nearbyClubEvents);
      
      toast({
        title: "Location Updated",
        description: `Found ${nearbyPublicEvents.length} public events and ${nearbyClubEvents.length} club events within 25 miles.`,
      });
    } catch (error) {
      console.error('Error fetching nearby events:', error);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          likes:likes(count),
          comments:comments(count)
        `)
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        return;
      }

      // Separate public and club events
      const allPublicEvents = data?.filter(event => !event.is_club_event) || [];
      const allClubEvents = data?.filter(event => event.is_club_event) || [];
      
      setPublicEvents(allPublicEvents);
      setClubEvents(allClubEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleLike = async (eventId: string, currentlyLiked: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to like events.",
          variant: "destructive",
        });
        return;
      }

      if (currentlyLiked) {
        // Remove like
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('event_id', eventId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Add like
        const { error } = await supabase
          .from('likes')
          .insert([{ event_id: eventId, user_id: user.id }]);

        if (error) throw error;
      }

      // Refresh events to update like counts
      if (userLocation) {
        await fetchNearbyEvents(userLocation.lat, userLocation.lng);
      } else {
        await fetchAllEvents();
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleComment = async (eventId: string, commentText: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to comment on events.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('comments')
        .insert([{ 
          event_id: eventId, 
          user_id: user.id, 
          content: commentText 
        }]);

      if (error) throw error;

      // Refresh events to update comment counts
      if (userLocation) {
        await fetchNearbyEvents(userLocation.lat, userLocation.lng);
      } else {
        await fetchAllEvents();
      }

      toast({
        title: "Comment Added",
        description: "Your comment has been posted successfully.",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      if (userLocation) {
        await fetchNearbyEvents(userLocation.lat, userLocation.lng);
      } else {
        await fetchAllEvents();
      }
      setLoading(false);
    };

    loadEvents();
  }, [userLocation]);

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'sunny': return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'overcast': return <Cloud className="w-4 h-4 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-4 h-4 text-blue-500" />;
      default: return <Sun className="w-4 h-4 text-yellow-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Find Your Next Race</h2>
          <p className="text-slate-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Find Your Next Race</h2>
        <p className="text-slate-600">Browse marathons, halves, and local club runs.</p>
      </div>

      <Tabs defaultValue="public" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="public" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Public Events
          </TabsTrigger>
          <TabsTrigger value="club" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Club Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="public" className="space-y-4">
          {locationPermission === 'prompt' && (
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Navigation className="w-5 h-5" />
                    <div>
                      <p className="font-semibold">Enable Location Services</p>
                      <p className="text-sm opacity-90">Find running events within 25 miles of you</p>
                    </div>
                  </div>
                  <Button 
                    onClick={requestLocation}
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {locationPermission === 'granted' && (
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <div>
                    <p className="font-semibold text-sm">Location Enabled</p>
                    <p className="text-xs opacity-90">Showing events within 25 miles of your location</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {locationPermission === 'denied' && (
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4" />
                    <div>
                      <p className="font-semibold text-sm">Location Access Denied</p>
                      <p className="text-xs opacity-90">Enable location in browser settings to see nearby events</p>
                    </div>
                  </div>
                  <Button 
                    onClick={requestLocation}
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    Retry
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {publicEvents.length === 0 ? (
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <p className="text-slate-600">No public events found. Try enabling location services to see nearby events.</p>
              </CardContent>
            </Card>
          ) : (
            publicEvents.map((event) => (
              <Card key={event.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-800">{event.name}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        {getWeatherIcon('sunny')}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-purple-600 border-purple-600">
                      {event.event_type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-slate-600">Distance: {event.distance}</span>
                      {event.max_participants && (
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600">Max: {event.max_participants}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Social interactions */}
                  <div className="flex items-center space-x-4 pt-2 border-t border-slate-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(event.id, event.likes?.user_has_liked || false)}
                      className="flex items-center space-x-1 text-slate-600 hover:text-red-500"
                    >
                      <Heart className={`w-4 h-4 ${event.likes?.user_has_liked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>{event.likes?.count || 0}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1 text-slate-600 hover:text-blue-500"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{event.comments?.count || 0}</span>
                    </Button>
                  </div>
                  
                  <EventRegistrationDialog 
                    eventId={event.id}
                    eventName={event.name} 
                    eventType="public"
                  >
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                      Register for Event
                    </Button>
                  </EventRegistrationDialog>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="club" className="space-y-4">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <Select value={selectedClub} onValueChange={setSelectedClub}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your club" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brooklyn-bridge">Brooklyn Bridge Runners</SelectItem>
                  <SelectItem value="central-park">Central Park Pacers</SelectItem>
                  <SelectItem value="queens-distance">Queens Distance Club</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {clubEvents.length === 0 ? (
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <p className="text-slate-600">No club events found. Join a club to see club-specific events.</p>
              </CardContent>
            </Card>
          ) : (
            clubEvents.map((event) => (
              <Card key={event.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-800">{event.name}</CardTitle>
                      <p className="text-sm text-purple-600 font-medium">Club Event</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        {getWeatherIcon('sunny')}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>{event.location}</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Distance: {event.distance}</p>
                  </div>
                  
                  {/* Social interactions */}
                  <div className="flex items-center space-x-4 pt-2 border-t border-slate-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(event.id, event.likes?.user_has_liked || false)}
                      className="flex items-center space-x-1 text-slate-600 hover:text-red-500"
                    >
                      <Heart className={`w-4 h-4 ${event.likes?.user_has_liked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>{event.likes?.count || 0}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1 text-slate-600 hover:text-blue-500"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{event.comments?.count || 0}</span>
                    </Button>
                  </div>
                  
                  <EventRegistrationDialog 
                    eventId={event.id}
                    eventName={event.name} 
                    eventType="club"
                  >
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Join Event
                    </Button>
                  </EventRegistrationDialog>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;