
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Users, Target, Calendar, TrendingUp, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import Leaderboard from '@/components/Leaderboard';
import Clubs from '@/components/Clubs';
import Events from '@/components/Events';
import Setup from '@/components/Setup';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                PaceArena
              </h1>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Beta
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="dashboard" className="mt-0">
            <Dashboard />
          </TabsContent>
          <TabsContent value="leaderboard" className="mt-0">
            <Leaderboard />
          </TabsContent>
          <TabsContent value="clubs" className="mt-0">
            <Clubs />
          </TabsContent>
          <TabsContent value="events" className="mt-0">
            <Events />
          </TabsContent>
          <TabsContent value="setup" className="mt-0">
            <Setup />
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
