
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share, Users, MapPin, Calendar } from 'lucide-react';

const Clubs = () => {
  const [selectedClub, setSelectedClub] = useState('all');

  const clubPosts = [
    {
      id: 1,
      clubName: 'Brooklyn Bridge Runners',
      location: 'Brooklyn, NY',
      members: 89,
      timeAgo: '2h ago',
      content: 'Amazing sunrise run across the Brooklyn Bridge this morning! Perfect weather and great pace group energy. Our 7:45 group crushed their 5K goal today. 🌅🏃‍♂️',
      image: '/placeholder.svg',
      likes: 24,
      comments: 8,
      hashtags: ['#BrooklyBridge', '#SunriseRun', '#PaceGroup']
    },
    {
      id: 2,
      clubName: 'Central Park Pacers',
      location: 'Manhattan, NY',
      members: 76,
      timeAgo: '4h ago',
      content: 'Weekly long run complete! 12 miles through Central Park with our endurance group. Weather was perfect and everyone hit their target paces. Great job team!',
      image: '/placeholder.svg',
      likes: 31,
      comments: 12,
      hashtags: ['#CentralPark', '#LongRun', '#Endurance']
    },
    {
      id: 3,
      clubName: 'Queens Distance Club',
      location: 'Queens, NY',
      members: 64,
      timeAgo: '6h ago',
      content: 'Speed work session at the track tonight! Interval training with our sub-8 pace group. Everyone pushed their limits and achieved new PRs. 💨⚡',
      image: '/placeholder.svg',
      likes: 18,
      comments: 5,
      hashtags: ['#SpeedWork', '#TrackTuesday', '#NewPR']
    },
  ];

  const newClubs = [
    { name: 'Williamsburg Warriors', location: 'Brooklyn, NY', members: 12, founded: '1 week ago' },
    { name: 'LIC Morning Runners', location: 'Queens, NY', members: 8, founded: '3 days ago' },
    { name: 'Staten Island Striders', location: 'Staten Island, NY', members: 15, founded: '2 weeks ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Clubs</h2>
        <p className="text-slate-600">Connect with your running community</p>
      </div>

      {/* New Clubs Spotlight */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>New Clubs</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {newClubs.map((club, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <div>
                <p className="font-semibold">{club.name}</p>
                <p className="text-sm opacity-80">{club.location} • {club.members} members</p>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {club.founded}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Club Posts Feed */}
      <div className="space-y-4">
        {clubPosts.map((post) => (
          <Card key={post.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      {post.clubName.split(' ').map(word => word[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-800">{post.clubName}</p>
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{post.location} • {post.members} members • {post.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700 leading-relaxed">{post.content}</p>
              
              {/* Post Image */}
              <div className="rounded-lg overflow-hidden bg-slate-100 h-48 flex items-center justify-center">
                <span className="text-slate-500">📷 Club Photo</span>
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-2">
                {post.hashtags.map((hashtag, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                    {hashtag}
                  </Badge>
                ))}
              </div>

              {/* Engagement */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-slate-600 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-slate-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                </div>
                <button className="text-slate-600 hover:text-purple-600 transition-colors">
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
