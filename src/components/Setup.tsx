import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Upload, CheckCircle, User, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Setup = () => {
  const [clubName, setClubName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [paceGroups, setPaceGroups] = useState([{ name: '', pace: '' }]);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // User account creation states
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [userPaceGroup, setUserPaceGroup] = useState('');
  
  const { toast } = useToast();

  // Available clubs for joining
  const availableClubs = [
    { id: '1', name: 'Brooklyn Bridge Runners', location: 'Brooklyn, NY' },
    { id: '2', name: 'Central Park Pacers', location: 'Manhattan, NY' },
    { id: '3', name: 'Queens Distance Club', location: 'Queens, NY' },
    { id: '4', name: 'Williamsburg Warriors', location: 'Brooklyn, NY' },
    { id: '5', name: 'LIC Morning Runners', location: 'Queens, NY' },
  ];

  const availablePaceGroups = [
    '6:00-6:30 min/mile',
    '6:30-7:00 min/mile', 
    '7:00-7:30 min/mile',
    '7:30-8:00 min/mile',
    '8:00-8:30 min/mile',
    '8:30-9:00 min/mile',
    '9:00+ min/mile'
  ];

  const addPaceGroup = () => {
    setPaceGroups([...paceGroups, { name: '', pace: '' }]);
  };

  const removePaceGroup = (index: number) => {
    if (paceGroups.length > 1) {
      setPaceGroups(paceGroups.filter((_, i) => i !== index));
    }
  };

  const updatePaceGroup = (index: number, field: 'name' | 'pace', value: string) => {
    const updated = paceGroups.map((group, i) => 
      i === index ? { ...group, [field]: value } : group
    );
    setPaceGroups(updated);
  };

  const handleCreateClub = () => {
    if (!clubName || !location || !email) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setShowSuccess(true);
    toast({
      title: "Club created successfully!",
      description: `${clubName} has been created and is ready for members.`,
    });

    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false);
      setClubName('');
      setLocation('');
      setEmail('');
      setDescription('');
      setPaceGroups([{ name: '', pace: '' }]);
    }, 3000);
  };

  const handleCreateUser = () => {
    if (!userName || !userEmail || !userPassword) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields for user account",
        variant: "destructive",
      });
      return;
    }

    const clubName = selectedClub ? availableClubs.find(club => club.id === selectedClub)?.name : 'No club selected';
    
    toast({
      title: "User account created successfully!",
      description: `Account for ${userName} has been created${selectedClub ? ` and joined ${clubName}` : ''}.`,
    });

    // Reset user form
    setUserName('');
    setUserEmail('');
    setUserPassword('');
    setSelectedClub('');
    setUserPaceGroup('');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Image uploaded",
        description: "Run verification image uploaded successfully",
      });
    }
  };

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg max-w-md w-full">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Club Created!</h3>
            <p className="opacity-90">Your running club has been successfully created and is ready for members to join.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Setup</h2>
        <p className="text-slate-600">Create your running club or join as an individual member</p>
      </div>

      <Tabs defaultValue="club" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/60 backdrop-blur-sm">
          <TabsTrigger value="club" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Create Club</span>
          </TabsTrigger>
          <TabsTrigger value="user" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Join as Individual</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="club" className="space-y-6 mt-6">
          {/* User Verification Section */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Run Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm opacity-90">
                Upload a screenshot of your run (distance, pace, time) for verification
              </p>
              <div className="flex items-center space-x-4">
                <label htmlFor="run-upload" className="cursor-pointer">
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload Run Screenshot</span>
                  </div>
                  <input
                    id="run-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs opacity-75">
                AI will automatically verify your pace and distance from the uploaded image
              </p>
            </CardContent>
          </Card>

          {/* Club Information */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800">Club Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="club-name">Club Name *</Label>
                <Input
                  id="club-name"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  placeholder="e.g., Brooklyn Bridge Runners"
                  className="bg-white/80"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Brooklyn, NY"
                  className="bg-white/80"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Club Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., contact@brooklynbridgerunners.com"
                  className="bg-white/80"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Club Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell members about your running club..."
                  className="bg-white/80 resize-none"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pace Groups */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-800">Pace Groups</CardTitle>
                <Button
                  onClick={addPaceGroup}
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Group
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {paceGroups.map((group, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1 space-y-2">
                    <Input
                      value={group.name}
                      onChange={(e) => updatePaceGroup(index, 'name', e.target.value)}
                      placeholder={`Pace Group ${index + 1}`}
                      className="bg-white"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input
                      value={group.pace}
                      onChange={(e) => updatePaceGroup(index, 'pace', e.target.value)}
                      placeholder="7:30 min/mile"
                      className="bg-white"
                    />
                  </div>
                  {paceGroups.length > 1 && (
                    <Button
                      onClick={() => removePaceGroup(index)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Create Club Button */}
          <Button
            onClick={handleCreateClub}
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg font-semibold shadow-lg"
          >
            Create Club
          </Button>
        </TabsContent>

        <TabsContent value="user" className="space-y-6 mt-6">
          {/* User Account Creation */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800">Create Individual Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-name">Full Name *</Label>
                <Input
                  id="user-name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g., John Doe"
                  className="bg-white/80"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-email">Email *</Label>
                <Input
                  id="user-email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="e.g., john@example.com"
                  className="bg-white/80"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-password">Password *</Label>
                <Input
                  id="user-password"
                  type="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="Enter a secure password"
                  className="bg-white/80"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="club-select">Join a Club (Optional)</Label>
                <Select value={selectedClub} onValueChange={setSelectedClub}>
                  <SelectTrigger className="bg-white/80">
                    <SelectValue placeholder="Select a club to join" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableClubs.map((club) => (
                      <SelectItem key={club.id} value={club.id}>
                        {club.name} - {club.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedClub && (
                <div className="space-y-2">
                  <Label htmlFor="pace-group-select">Preferred Pace Group (Optional)</Label>
                  <Select value={userPaceGroup} onValueChange={setUserPaceGroup}>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue placeholder="Select your preferred pace" />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePaceGroups.map((pace, index) => (
                        <SelectItem key={index} value={pace}>
                          {pace}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Create User Button */}
          <Button
            onClick={handleCreateUser}
            className="w-full h-12 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white text-lg font-semibold shadow-lg"
          >
            Create Account
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Setup;
