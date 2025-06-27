
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

interface PaceGroup {
  name: string;
  pace: string;
}

interface PaceGroupManagerProps {
  paceGroups: PaceGroup[];
  setPaceGroups: (groups: PaceGroup[]) => void;
}

const PaceGroupManager = ({ paceGroups, setPaceGroups }: PaceGroupManagerProps) => {
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

  return (
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
  );
};

export default PaceGroupManager;
