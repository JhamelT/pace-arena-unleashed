
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Clock, Cloud, Sun, CloudRain } from 'lucide-react';

const Events = () => {
  const [selectedClub, setSelectedClub] = useState('');

  const publicEvents = [
    {
      name: 'NYC Marathon',
      date: 'Nov 5, 2024',
      time: '8:00 AM',
      location: 'Central Park, Manhattan',
      distance: '26.2 miles',
      participants: 2400,
      weather: 'sunny',
      category: 'Marathon'
    },
    {
      name: 'Brooklyn Half Marathon',
      date: 'Oct 28, 2024',
      time: '7:30 AM',
      location: 'Prospect Park, Brooklyn',
      distance: '13.1 miles',
      participants: 1200,
      weather: 'overcast',
      category: 'Half Marathon'
    },
    {
      name: 'Queens 10K Run',
      date: 'Oct 15, 2024',
      time: '9:00 AM',
      location: 'Flushing Meadows Park',
      distance: '6.2 miles',
      participants: 800,
      weather: 'rainy',
      category: '10K'
    },
  ];

  const clubEvents = [
    {
      club: 'Brooklyn Bridge Runners',
      name: 'Weekly Long Run',
      date: 'Every Sunday',
      time: '7:00 AM',
      location: 'Brooklyn Bridge Park',
      distance: '8-12 miles',
      paceGroups: ['7:30', '8:00', '8:30'],
      weather: 'sunny'
    },
    {
      club: 'Central Park Pacers',
      name: 'Speed Work Wednesday',
      date: 'Every Wednesday',
      time: '6:30 PM',
      location: 'Central Park Reservoir',
      distance: '5K intervals',
      paceGroups: ['7:00', '7:30', '8:00'],
      weather: 'overcast'
    },
    {
      club: 'Queens Distance Club',
      name: 'Marathon Training',
      date: 'Saturdays',
      time: '6:00 AM',
      location: 'Astoria Park',
      distance: '15-20 miles',
      paceGroups: ['8:00', '8:30', '9:00'],
      weather: 'sunny'
    },
  ];

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'sunny': return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'overcast': return <Cloud className="w-4 h-4 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-4 h-4 text-blue-500" />;
      default: return <Sun className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Events</h2>
        <p className="text-slate-600">Discover and join running events</p>
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
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Within 25 miles of your location</span>
              </div>
              <p className="text-xs opacity-80">Enable location services to see nearby events</p>
            </CardContent>
          </Card>

          {publicEvents.map((event, index) => (
            <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-800">{event.name}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      {getWeatherIcon(event.weather)}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-purple-600 border-purple-600">
                    {event.category}
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
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600">{event.participants} registered</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Register for Event
                </Button>
              </CardContent>
            </Card>
          ))}
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

          {clubEvents.map((event, index) => (
            <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-800">{event.name}</CardTitle>
                    <p className="text-sm text-purple-600 font-medium">{event.club}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      {getWeatherIcon(event.weather)}
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
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-slate-600">Pace Groups:</span>
                    {event.paceGroups.map((pace, paceIndex) => (
                      <Badge key={paceIndex} variant="secondary" className="bg-blue-100 text-blue-700">
                        {pace}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Join Event
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;
