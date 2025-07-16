import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share, Users, MapPin, Calendar, TrendingUp, Zap, Activity } from 'lucide-react';

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
      image: '/lovable-uploads/f66ef395-5ec8-4009-985d-eaef1eb23426.png',
      likes: 24,
      comments: 8,
      hashtags: ['#BrooklyBridge', '#SunriseRun', '#PaceGroup'],
      intensity: 'High Intensity',
      trainingType: 'Speed work interval training',
      growthPercentage: '+15%',
      activityStats: {
        likes: 24,
        comments: 8,
        participants: 12
      }
    },
    {
      id: 2,
      clubName: 'Central Park Pacers',
      location: 'Manhattan, NY',
      members: 76,
      timeAgo: '4h ago',
      content: 'Weekly long run complete! 12 miles through Central Park with our endurance group. Weather was perfect and everyone hit their target paces. Great job team!',
      image: '/lovable-uploads/c88813eb-57ab-4227-8b76-024881a2b3d1.png',
      likes: 31,
      comments: 12,
      hashtags: ['#CentralPark', '#LongRun', '#Endurance'],
      intensity: 'Moderate',
      trainingType: 'Endurance base building',
      growthPercentage: '+8%',
      activityStats: {
        likes: 31,
        comments: 12,
        participants: 18
      }
    },
    {
      id: 3,
      clubName: 'Queens Distance Club',
      location: 'Queens, NY',
      members: 64,
      timeAgo: '6h ago',
      content: 'Speed work session at the track tonight! Interval training with our sub-8 pace group. Everyone pushed their limits and achieved new PRs. 💨⚡',
      image: '/lovable-uploads/4009dcaf-4724-462f-8088-cce04866ba77.png',
      likes: 18,
      comments: 5,
      hashtags: ['#SpeedWork', '#TrackTuesday', '#NewPR'],
      intensity: 'High Intensity',
      trainingType: 'Multiple PR breakthroughs',
      growthPercentage: '+12%',
      activityStats: {
        likes: 18,
        comments: 5,
        participants: 8
      }
    },
  ];

  const newClubs = [
    { name: 'Williamsburg Warriors', location: 'Brooklyn, NY', members: 12, founded: '1 week ago' },
    { name: 'LIC Morning Runners', location: 'Queens, NY', members: 8, founded: '3 days ago' },
    { name: 'Staten Island Striders', location: 'Staten Island, NY', members: 15, founded: '2 weeks ago' },
  ];

  const getIntensityColor = (intensity: string) => {
    switch (intensity.toLowerCase()) {
      case 'high intensity': return 'bg-red-100 text-red-700 border-red-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low intensity': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTrainingTypeIcon = (trainingType: string) => {
    if (trainingType.toLowerCase().includes('speed') || trainingType.toLowerCase().includes('interval')) {
      return <Zap className="w-3 h-3" />;
    } else if (trainingType.toLowerCase().includes('pr') || trainingType.toLowerCase().includes('breakthrough')) {
      return <TrendingUp className="w-3 h-3" />;
    } else {
      return <Activity className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Clubs</h2>
        <p className="text-sm md:text-base text-slate-600 mb-3">Connect with your running community</p>
        <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
          Analytics and insights for running communities. Track your progress, optimize performance, and scale club engagement.
        </p>
      </div>

      {/* New Clubs Spotlight */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2 text-lg md:text-xl">
            <Users className="w-4 h-4 md:w-5 md:h-5" />
            <span>New Clubs</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {newClubs.map((club, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <div>
                <p className="font-semibold text-sm md:text-base">{club.name}</p>
                <p className="text-xs md:text-sm opacity-80">{club.location} • {club.members} members</p>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
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
                  <Avatar className="w-8 h-8 md:w-10 md:h-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs">
                      {post.clubName.split(' ').map(word => word[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm md:text-base">{post.clubName}</p>
                    <div className="flex items-center text-xs md:text-sm text-slate-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{post.location} • {post.members} members • {post.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">{post.content}</p>
              
              {/* Post Image */}
              <div className="rounded-lg overflow-hidden bg-slate-100 h-48">
                <img 
                  src={post.image} 
                  alt={`${post.clubName} workout`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Activity Tracking Section */}
              <div className="bg-slate-50 rounded-lg p-3 space-y-3">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    {getTrainingTypeIcon(post.trainingType)}
                    <span className="text-slate-700 font-medium">{post.trainingType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-semibold">{post.growthPercentage} this week</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge className={`text-xs border ${getIntensityColor(post.intensity)}`}>
                    <Activity className="w-3 h-3 mr-1" />
                    {post.intensity}
                  </Badge>
                  <div className="flex items-center space-x-4 text-xs text-slate-600">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3 text-red-500" />
                      <span>{post.activityStats.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3 text-blue-500" />
                      <span>{post.activityStats.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 text-purple-500" />
                      <span>{post.activityStats.participants}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-2">
                {post.hashtags.map((hashtag, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                    {hashtag}
                  </Badge>
                ))}
              </div>

              {/* Engagement */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-slate-600 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs md:text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-slate-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs md:text-sm">{post.comments}</span>
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
