
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

const Leaderboard = () => {
  const paceGroups = [
    { pace: '7:30', clubs: [
      { name: 'Brooklyn Bridge Runners', avgTime: '7:28', members: 12 },
      { name: 'Manhattan Speedsters', avgTime: '7:31', members: 8 },
      { name: 'Queens Elite', avgTime: '7:33', members: 15 },
    ]},
    { pace: '8:00', clubs: [
      { name: 'Central Park Pacers', avgTime: '7:58', members: 23 },
      { name: 'Brooklyn Heights RC', avgTime: '8:02', members: 18 },
    ]},
    { pace: '8:30', clubs: [
      { name: 'Williamsburg Runners', avgTime: '8:27', members: 31 },
      { name: 'LIC Distance Club', avgTime: '8:32', members: 19 },
    ]},
    { pace: '9:00+', clubs: [
      { name: 'Prospect Park Club', avgTime: '8:58', members: 45 },
      { name: 'Staten Island Runners', avgTime: '9:15', members: 28 },
    ]},
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Leaderboard</h2>
        <p className="text-slate-600">Top performing clubs by pace groups</p>
      </div>

      <Tabs defaultValue="short" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="short" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Short Distance (&lt; 5 miles)
          </TabsTrigger>
          <TabsTrigger value="long" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Long Distance (10+ miles)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="short" className="space-y-4">
          {paceGroups.map((group, groupIndex) => (
            <Card key={groupIndex} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-800">{group.pace} min/mile</span>
                  <Badge variant="outline" className="text-purple-600 border-purple-600">
                    {group.clubs.length} clubs
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {group.clubs.map((club, clubIndex) => (
                  <div key={clubIndex} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8">
                      {clubIndex === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                      {clubIndex === 1 && <Medal className="w-5 h-5 text-gray-400" />}
                      {clubIndex === 2 && <Award className="w-5 h-5 text-orange-500" />}
                      {clubIndex > 2 && <span className="text-sm font-bold text-slate-600">#{clubIndex + 1}</span>}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">{club.name}</p>
                      <p className="text-sm text-slate-600">{club.members} members</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">{club.avgTime}</p>
                      <p className="text-xs text-slate-500">avg pace</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="long" className="space-y-4">
          {paceGroups.map((group, groupIndex) => (
            <Card key={groupIndex} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-800">{group.pace} min/mile</span>
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    {group.clubs.length} clubs
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {group.clubs.map((club, clubIndex) => (
                  <div key={clubIndex} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8">
                      {clubIndex === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                      {clubIndex === 1 && <Medal className="w-5 h-5 text-gray-400" />}
                      {clubIndex === 2 && <Award className="w-5 h-5 text-orange-500" />}
                      {clubIndex > 2 && <span className="text-sm font-bold text-slate-600">#{clubIndex + 1}</span>}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">{club.name}</p>
                      <p className="text-sm text-slate-600">{club.members} members</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">{club.avgTime}</p>
                      <p className="text-xs text-slate-500">avg pace</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;
