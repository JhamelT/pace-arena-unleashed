
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RunVerificationCard = () => {
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Image uploaded",
        description: "Run verification image uploaded successfully",
      });
    }
  };

  return (
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
  );
};

export default RunVerificationCard;
