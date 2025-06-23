import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Target, Clock, Award, MapPin, Trophy } from 'lucide-react';

const Dashboard = () => {
  const weeklyStats = [
    { label: 'Active Clubs', value: '47', change: '+12%', icon: Users },
    { label: 'Total Runners', value: '1,247', change: '+8%', icon: Target },
    { label: 'Miles This Week', value: '3,892', change: '+15%', icon: TrendingUp },
    { label: 'Avg Pace', value: '8:42', change: '-0:23', icon: Clock },
  ];

  const topClubs = [
    { name: 'Brooklyn Bridge Runners', members: 89, avgPace: '7:45', badge: 'gold' },
    { name: 'Central Park Pacers', members: 76, avgPace: '8:12', badge: 'silver' },
    { name: 'Queens Distance Club', members: 64, avgPace: '8:28', badge: 'bronze' },
  ];

  const challenges = [
    { title: 'Sub-8 Marathon Challenge', participants: 234, daysLeft: 5 },
    { title: '100 Mile Month', participants: 567, daysLeft: 12 },
    { title: 'Speed Work Wednesday', participants: 123, daysLeft: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome to PaceArena</h2>
        <p className="text-slate-600">Track performance, compete with clubs, and achieve your running goals</p>
      </div>

      {/* Weekly Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {weeklyStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justifybetween mb-2">
                  <IconComponent className="w-5 h-5 text-purple-600" />
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Distance Group Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          className="h-16 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg"
        >
          <div className="text-center">
            <div className="font-semibold">Short Distance</div>
            <div className="text-sm opacity-90">&lt; 5 Miles</div>
          </div>
        </Button>
        <Button 
          className="h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
        >
          <div className="text-center">
            <div className="font-semibold">Long Distance</div>
            <div className="text-sm opacity-90">10+ Miles</div>
          </div>
        </Button>
      </div>

      {/* Weekly Challenges */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-purple-600" />
            <span>Weekly Challenges</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {challenges.map((challenge, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-semibold text-slate-800">{challenge.title}</p>
                <p className="text-sm text-slate-600">{challenge.participants} participants</p>
              </div>
              <Badge variant="outline" className="text-purple-600 border-purple-600">
                {challenge.daysLeft}d left
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Performing Clubs */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-purple-600" />
            <span>Top Performing Clubs</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topClubs.map((club, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                club.badge === 'gold' ? 'bg-yellow-100' :
                club.badge === 'silver' ? 'bg-gray-100' : 'bg-orange-100'
              }`}>
                <span className="text-sm font-bold">
                  {club.badge === 'gold' ? '🥇' : club.badge === 'silver' ? '🥈' : '🥉'}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{club.name}</p>
                <p className="text-sm text-slate-600">{club.members} members • {club.avgPace} avg pace</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
