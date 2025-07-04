
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface EventRegistrationDialogProps {
  eventName: string;
  eventType: 'public' | 'club';
  children: React.ReactNode;
}

const EventRegistrationDialog = ({ eventName, eventType, children }: EventRegistrationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phoneNumber.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate registration process
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Registration Successful!",
        description: `You've been registered for ${eventName}. We'll send SMS updates to ${phoneNumber}.`,
      });
      
      // Reset form and close dialog
      setName('');
      setPhoneNumber('');
      setOpen(false);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            {eventType === 'public' ? 'Register for Event' : 'Join Event'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="eventName" className="text-sm font-medium text-slate-700">
              Event
            </Label>
            <Input
              id="eventName"
              value={eventName}
              disabled
              className="bg-slate-50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              📱 You'll receive SMS updates before the event starts, including any last-minute changes or important information.
            </p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : (eventType === 'public' ? 'Register' : 'Join Event')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationDialog;
