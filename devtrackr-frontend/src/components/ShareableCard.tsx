
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Code, FileText, Database, Globe } from 'lucide-react';

interface ShareableCardProps {
  userData: {
    name?: string;
    totalHours: number;
    topLanguage: string;
    projectsCount: number;
  };
}

const languageIcons: Record<string, React.ReactNode> = {
  'TypeScript': <Code className="w-5 h-5" style={{ color: '#3178c6' }} />,
  'JavaScript': <FileText className="w-5 h-5" style={{ color: '#f7df1e' }} />,
  'Python': <Database className="w-5 h-5" style={{ color: '#3776ab' }} />,
  'React': <Globe className="w-5 h-5" style={{ color: '#61dafb' }} />,
};

export const ShareableCard = ({ userData }: ShareableCardProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateCard = async () => {
    setIsGenerating(true);
    
    // Simulate card generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const shareUrl = `https://devtrackr.app/stats/${userData.name?.toLowerCase().replace(' ', '-') || 'user'}`;
    
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Stats Card Generated!",
      description: "Shareable link copied to clipboard",
    });
    
    setIsGenerating(false);
  };

  const roundedHours = Math.round(userData.totalHours * 10) / 10;

  return (
    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/30 dark:border-slate-700/30">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Share Your Stats
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Generate a beautiful card of your coding achievements
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 mb-6 border border-blue-200/30 dark:border-slate-600/30">
        <div className="text-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {userData.name || 'Developer'}'s Stats
          </h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-2xl font-bold text-blue-600">{roundedHours}h</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Time</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-1">
                {languageIcons[userData.topLanguage] || <Code className="w-5 h-5 text-purple-600" />}
                <p className="text-lg font-bold text-purple-600">{userData.topLanguage}</p>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Top Language</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">{userData.projectsCount}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Projects</p>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={generateCard}
        disabled={isGenerating}
        className={`w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 ${
          isGenerating ? 'animate-pulse' : 'transform hover:scale-[1.02]'
        }`}
      >
        {isGenerating ? 'Generating...' : 'Generate Shareable Card'}
      </Button>
    </div>
  );
};
