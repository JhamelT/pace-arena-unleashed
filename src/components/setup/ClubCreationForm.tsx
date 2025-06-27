
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import RunVerificationCard from './RunVerificationCard';
import PaceGroupManager from './PaceGroupManager';

interface PaceGroup {
  name: string;
  pace: string;
}

interface ClubCreationFormProps {
  clubName: string;
  setClubName: (name: string) => void;
  location: string;
  setLocation: (location: string) => void;
  email: string;
  setEmail: (email: string) => void;
  description: string;
  setDescription: (description: string) => void;
  paceGroups: PaceGroup[];
  setPaceGroups: (groups: PaceGroup[]) => void;
  onSuccess: () => void;
}

const ClubCreationForm = ({
  clubName,
  setClubName,
  location,
  setLocation,
  email,
  setEmail,
  description,
  setDescription,
  paceGroups,
  setPaceGroups,
  onSuccess
}: ClubCreationFormProps) => {
  const { toast } = useToast();

  const handleCreateClub = () => {
    if (!clubName || !location || !email) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onSuccess();
    toast({
      title: "Club created successfully!",
      description: `${clubName} has been created and is ready for members.`,
    });
  };

  return (
    <div className="space-y-6">
      <RunVerificationCard />

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

      <PaceGroupManager paceGroups={paceGroups} setPaceGroups={setPaceGroups} />

      <Button
        onClick={handleCreateClub}
        className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg font-semibold shadow-lg"
      >
        Create Club
      </Button>
    </div>
  );
};

export default ClubCreationForm;
