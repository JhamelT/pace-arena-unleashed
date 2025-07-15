
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import RunVerificationCard from './RunVerificationCard';

interface Club {
  id: string;
  name: string;
  location: string;
}

interface UserAccountFormProps {
  userName: string;
  setUserName: (name: string) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  userPassword: string;
  setUserPassword: (password: string) => void;
  selectedClub: string;
  setSelectedClub: (club: string) => void;
  userPaceGroup: string;
  setUserPaceGroup: (pace: string) => void;
  availableClubs: Club[];
  availablePaceGroups: string[];
}

const UserAccountForm = ({
  userName,
  setUserName,
  userEmail,
  setUserEmail,
  userPassword,
  setUserPassword,
  selectedClub,
  setSelectedClub,
  userPaceGroup,
  setUserPaceGroup,
  availableClubs,
  availablePaceGroups
}: UserAccountFormProps) => {
  const { toast } = useToast();

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

  return (
    <div className="space-y-6">
      <RunVerificationCard />
      
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

      <Button
        onClick={handleCreateUser}
        className="w-full h-12 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white text-lg font-semibold shadow-lg"
      >
        Create Account
      </Button>
    </div>
  );
};

export default UserAccountForm;
