
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Upload, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Setup = () => {
  const [clubName, setClubName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [paceGroups, setPaceGroups] = useState([{ name: '', pace: '' }]);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

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
        <p className="text-slate-600">Create your running club and configure pace groups</p>
      </div>

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
    </div>
  );
};

export default Setup;
