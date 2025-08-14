import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Users, Target, Clock, Award, MapPin, Trophy } from 'lucide-react';

const Dashboard = () => {
  const shortDistanceStats = [
    { label: 'Active Clubs', value: '47', change: '+12%', icon: Users, gradient: 'from-purple-500 to-purple-600' },
    { label: 'Total Runners', value: '1,247', change: '+8%', icon: Target, gradient: 'from-blue-500 to-blue-600' },
    { label: 'Miles This Week', value: '3,892', change: '+15%', icon: TrendingUp, gradient: 'from-purple-600 to-blue-600' },
    { label: 'Avg Pace', value: '8:42', change: '-0:23', icon: Clock, gradient: 'from-blue-600 to-purple-600' },
  ];

  const longDistanceStats = [
    { label: 'Active Clubs', value: '31', change: '+8%', icon: Users, gradient: 'from-purple-500 to-purple-600' },
    { label: 'Total Runners', value: '892', change: '+12%', icon: Target, gradient: 'from-blue-500 to-blue-600' },
    { label: 'Miles This Week', value: '5,248', change: '+22%', icon: TrendingUp, gradient: 'from-purple-600 to-blue-600' },
    { label: 'Avg Pace', value: '7:18', change: '-0:35', icon: Clock, gradient: 'from-blue-600 to-purple-600' },
  ];

  const shortDistanceTopClubs = [
    { name: 'Brooklyn Bridge Runners', members: 89, avgPace: '7:45', badge: 'gold' },
    { name: 'Central Park Pacers', members: 76, avgPace: '8:12', badge: 'silver' },
    { name: 'Queens Distance Club', members: 64, avgPace: '8:28', badge: 'bronze' },
  ];

  const longDistanceTopClubs = [
    { name: 'Manhattan Marathon Club', members: 67, avgPace: '6:58', badge: 'gold' },
    { name: 'Elite Distance Runners', members: 52, avgPace: '7:12', badge: 'silver' },
    { name: 'Ultra Running Society', members: 41, avgPace: '7:25', badge: 'bronze' },
  ];

  const shortDistanceChallenges = [
    { title: '5K Speed Challenge', participants: 234, daysLeft: 5 },
    { title: 'Sprint Work Wednesday', participants: 156, daysLeft: 2 },
    { title: 'Sub-7 Mile Challenge', participants: 189, daysLeft: 8 },
  ];

  const longDistanceChallenges = [
    { title: 'Sub-3 Marathon Challenge', participants: 189, daysLeft: 5 },
    { title: '100 Mile Month', participants: 567, daysLeft: 12 },
    { title: 'Ultra Endurance Series', participants: 123, daysLeft: 15 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Your Running Hub</h2>
        <p className="text-sm md:text-base text-slate-600">See your stats, track progress, and jump into challenges this week.</p>
      </div>

      <Tabs defaultValue="short" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 h-auto p-1">
          <TabsTrigger 
            value="short" 
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm px-2 py-3 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Short Distance (&lt; 5 miles)</span>
            <span className="sm:hidden">Short (&lt; 5 mi)</span>
          </TabsTrigger>
          <TabsTrigger 
            value="long" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm px-2 py-3 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Long Distance (10+ miles)</span>
            <span className="sm:hidden">Long (10+ mi)</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="short" className="space-y-6">
          {/* Weekly Stats Grid - Short Distance */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {shortDistanceStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className={`bg-gradient-to-r ${stat.gradient} text-white border-0 shadow-lg`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs md:text-sm text-white/90">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Weekly Challenges - Short Distance */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                <span>Weekly Challenges</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {shortDistanceChallenges.map((challenge, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm md:text-base">{challenge.title}</p>
                    <p className="text-xs md:text-sm text-slate-600">{challenge.participants} participants</p>
                  </div>
                  <Badge variant="outline" className="text-purple-600 border-purple-600 text-xs">
                    {challenge.daysLeft}d left
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Performing Clubs - Short Distance */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                <Trophy className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                <span>Top Performing Clubs</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {shortDistanceTopClubs.map((club, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                  <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                    club.badge === 'gold' ? 'bg-yellow-100' :
                    club.badge === 'silver' ? 'bg-gray-100' : 'bg-orange-100'
                  }`}>
                    <span className="text-xs md:text-sm font-bold">
                      {club.badge === 'gold' ? '🥇' : club.badge === 'silver' ? '🥈' : '🥉'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm md:text-base">{club.name}</p>
                    <p className="text-xs md:text-sm text-slate-600">{club.members} members • {club.avgPace} avg pace</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="long" className="space-y-6">
          {/* Weekly Stats Grid - Long Distance */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {longDistanceStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className={`bg-gradient-to-r ${stat.gradient} text-white border-0 shadow-lg`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs md:text-sm text-white/90">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Weekly Challenges - Long Distance */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <span>Weekly Challenges</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {longDistanceChallenges.map((challenge, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm md:text-base">{challenge.title}</p>
                    <p className="text-xs md:text-sm text-slate-600">{challenge.participants} participants</p>
                  </div>
                  <Badge variant="outline" className="text-blue-600 border-blue-600 text-xs">
                    {challenge.daysLeft}d left
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Performing Clubs - Long Distance */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                <Trophy className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <span>Top Performing Clubs</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {longDistanceTopClubs.map((club, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                  <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                    club.badge === 'gold' ? 'bg-yellow-100' :
                    club.badge === 'silver' ? 'bg-gray-100' : 'bg-orange-100'
                  }`}>
                    <span className="text-xs md:text-sm font-bold">
                      {club.badge === 'gold' ? '🥇' : club.badge === 'silver' ? '🥈' : '🥉'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm md:text-base">{club.name}</p>
                    <p className="text-xs md:text-sm text-slate-600">{club.members} members • {club.avgPace} avg pace</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
