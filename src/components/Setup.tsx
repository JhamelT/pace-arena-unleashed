
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, User, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClubCreationForm from './setup/ClubCreationForm';
import UserAccountForm from './setup/UserAccountForm';

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

  const handleClubCreationSuccess = () => {
    setShowSuccess(true);
    
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
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Get Started</h2>
        <p className="text-slate-600">Build your club profile or join as an individual to start competing.</p>
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
          <ClubCreationForm
            clubName={clubName}
            setClubName={setClubName}
            location={location}
            setLocation={setLocation}
            email={email}
            setEmail={setEmail}
            description={description}
            setDescription={setDescription}
            paceGroups={paceGroups}
            setPaceGroups={setPaceGroups}
            onSuccess={handleClubCreationSuccess}
          />
        </TabsContent>

        <TabsContent value="user" className="space-y-6 mt-6">
          <UserAccountForm
            userName={userName}
            setUserName={setUserName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userPassword={userPassword}
            setUserPassword={setUserPassword}
            selectedClub={selectedClub}
            setSelectedClub={setSelectedClub}
            userPaceGroup={userPaceGroup}
            setUserPaceGroup={setUserPaceGroup}
            availableClubs={availableClubs}
            availablePaceGroups={availablePaceGroups}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Setup;
