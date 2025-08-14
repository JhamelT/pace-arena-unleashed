
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Target, 
  Activity, 
  Calendar,
  MapPin,
  Timer,
  Zap,
  Award
} from 'lucide-react';

const ClubDashboard = () => {
  // In production, this would come from user's profile/selected club
  const [userClub] = useState({
    name: 'Central Park Pacers', // This would be fetched from user's profile
    location: 'Manhattan, NY',
    joinedDate: '2024-08-15'
  });
  
  const clubStats = {
    totalMembers: 89,
    activeThisWeek: 67,
    averagePace: '7:45',
    weeklyMiles: 2847, // Total miles completed this week
    improvement: '+12%'
  };

  const paceGroups = [
    { name: 'Elite (6:30-7:00)', members: 12, avgPace: '6:52', weeklyMiles: 287 },
    { name: 'Advanced (7:00-7:30)', members: 23, avgPace: '7:18', weeklyMiles: 445 },
    { name: 'Intermediate (7:30-8:00)', members: 31, avgPace: '7:51', weeklyMiles: 523 },
    { name: 'Recreational (8:00+)', members: 23, avgPace: '8:24', weeklyMiles: 312 }
  ];

  const topPerformers = [
    { name: 'Sarah Chen', avatar: '/placeholder.svg', miles: 47, pace: '6:45', streak: 12 },
    { name: 'Mike Rodriguez', avatar: '/placeholder.svg', miles: 43, pace: '7:02', streak: 8 },
    { name: 'Emily Johnson', avatar: '/placeholder.svg', miles: 41, pace: '7:15', streak: 15 },
    { name: 'David Kim', avatar: '/placeholder.svg', miles: 38, pace: '7:28', streak: 6 },
    { name: 'Lisa Park', avatar: '/placeholder.svg', miles: 36, pace: '7:33', streak: 9 }
  ];

  const weeklyProgress = [
    { day: 'Mon', completed: 85, target: 100 },
    { day: 'Tue', completed: 92, target: 100 },
    { day: 'Wed', completed: 78, target: 100 },
    { day: 'Thu', completed: 88, target: 100 },
    { day: 'Fri', completed: 94, target: 100 },
    { day: 'Sat', completed: 96, target: 100 },
    { day: 'Sun', completed: 89, target: 100 }
  ];

  return (
    <div className="space-y-4 pb-4">
      {/* Club Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Your Club's Command Center</h2>
        <p className="text-sm md:text-base text-slate-600 mb-3">Track members, miles, and performance growth.</p>
        <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
          <MapPin className="w-4 h-4" />
          <span>{userClub.name} • {userClub.location}</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">Member since {new Date(userClub.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      </div>

      {/* Key Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <div>
                <p className="text-xs opacity-90">Members</p>
                <p className="text-lg font-bold">{clubStats.totalMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <div>
                <p className="text-xs opacity-90">Active</p>
                <p className="text-lg font-bold">{clubStats.activeThisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4" />
              <div>
                <p className="text-xs opacity-90">Avg Pace</p>
                <p className="text-lg font-bold">{clubStats.averagePace}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <div>
                <p className="text-xs opacity-90">Growth</p>
                <p className="text-lg font-bold">{clubStats.improvement}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Miles Progress */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Weekly Miles Total</span>
            </span>
            <Badge variant="outline" className="text-xs">
              {clubStats.weeklyMiles} miles completed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{clubStats.weeklyMiles}</div>
            <div className="text-sm text-slate-600">Total miles this week</div>
          </div>
          <div className="flex justify-center">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {clubStats.improvement} from last week
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pace-groups" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="pace-groups" className="text-xs">Pace Groups</TabsTrigger>
          <TabsTrigger value="leaderboard" className="text-xs">Top Performers</TabsTrigger>
          <TabsTrigger value="progress" className="text-xs">Daily Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="pace-groups" className="space-y-3">
          {paceGroups.map((group, index) => (
            <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm text-slate-800">{group.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {group.members} members
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-600">Avg Pace</p>
                    <p className="font-bold text-purple-600">{group.avgPace}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Weekly Miles</p>
                    <p className="font-bold text-blue-600">{group.weeklyMiles}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-3">
          {topPerformers.map((performer, index) => (
            <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-6 h-6">
                    {index < 3 ? (
                      <Trophy className={`w-4 h-4 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-orange-500'}`} />
                    ) : (
                      <span className="text-sm font-bold text-slate-600">#{index + 1}</span>
                    )}
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={performer.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs">
                      {performer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-slate-800">{performer.name}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-600">
                      <span>{performer.miles} miles</span>
                      <span>{performer.pace} pace</span>
                      <span className="flex items-center space-x-1">
                        <Zap className="w-3 h-3 text-orange-500" />
                        <span>{performer.streak} day streak</span>
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="progress" className="space-y-3">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-base">Daily Activity Completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{day.day}</span>
                    <span className="text-slate-600">{day.completed}%</span>
                  </div>
                  <Progress value={day.completed} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClubDashboard;
