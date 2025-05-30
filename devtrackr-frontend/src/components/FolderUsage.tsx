
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, FolderOpen } from 'lucide-react';

type TimeRange = 'daily' | 'weekly' | 'monthly' | 'all-time';

interface FolderUsageProps {
  timeRange: TimeRange;
}

const folderData = {
  daily: [
    { name: 'src/components', hours: 3.2, isExpanded: false, files: ['Button.tsx', 'Input.tsx', 'Modal.tsx'] },
    { name: 'src/pages', hours: 2.8, isExpanded: false, files: ['Home.tsx', 'Dashboard.tsx'] },
    { name: 'src/utils', hours: 1.5, isExpanded: false, files: ['helpers.ts', 'api.ts'] },
  ],
  weekly: [
    { name: 'src/components', hours: 18.5, isExpanded: false, files: ['Button.tsx', 'Input.tsx', 'Modal.tsx', 'Chart.tsx'] },
    { name: 'src/pages', hours: 15.2, isExpanded: false, files: ['Home.tsx', 'Dashboard.tsx', 'Settings.tsx'] },
    { name: 'src/utils', hours: 8.7, isExpanded: false, files: ['helpers.ts', 'api.ts', 'validation.ts'] },
  ],
  monthly: [
    { name: 'src/components', hours: 78.5, isExpanded: false, files: ['Button.tsx', 'Input.tsx', 'Modal.tsx', 'Chart.tsx', 'Table.tsx'] },
    { name: 'src/pages', hours: 65.2, isExpanded: false, files: ['Home.tsx', 'Dashboard.tsx', 'Settings.tsx', 'Profile.tsx'] },
    { name: 'src/utils', hours: 42.7, isExpanded: false, files: ['helpers.ts', 'api.ts', 'validation.ts', 'constants.ts'] },
    { name: 'src/hooks', hours: 28.3, isExpanded: false, files: ['useAuth.ts', 'useData.ts'] },
  ],
  'all-time': [
    { name: 'src/components', hours: 324.5, isExpanded: false, files: ['Button.tsx', 'Input.tsx', 'Modal.tsx', 'Chart.tsx', 'Table.tsx'] },
    { name: 'src/pages', hours: 198.2, isExpanded: false, files: ['Home.tsx', 'Dashboard.tsx', 'Settings.tsx', 'Profile.tsx'] },
    { name: 'src/utils', hours: 167.3, isExpanded: false, files: ['helpers.ts', 'api.ts', 'validation.ts', 'constants.ts'] },
    { name: 'src/hooks', hours: 89.7, isExpanded: false, files: ['useAuth.ts', 'useData.ts', 'useLocalStorage.ts'] },
  ],
};

export const FolderUsage = ({ timeRange }: FolderUsageProps) => {
  const [folders, setFolders] = useState(folderData[timeRange]);

  const toggleFolder = (index: number) => {
    setFolders(prev => prev.map((folder, i) => 
      i === index ? { ...folder, isExpanded: !folder.isExpanded } : folder
    ));
  };

  return (
    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/30 dark:border-slate-700/30">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Folder Activity
        </h2>
        <p className="text-slate-600 dark:text-slate-400 capitalize">
          {timeRange.replace('-', ' ')} folder usage
        </p>
      </div>

      <div className="space-y-3">
        {folders.map((folder, index) => (
          <div key={folder.name} className="overflow-hidden">
            <div 
              onClick={() => toggleFolder(index)}
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                {folder.isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-500 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-500 transition-transform duration-200" />
                )}
                {folder.isExpanded ? (
                  <FolderOpen className="w-5 h-5 text-blue-500" />
                ) : (
                  <Folder className="w-5 h-5 text-slate-500" />
                )}
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {folder.name}
                </span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {Math.round(folder.hours * 10) / 10}h
                </span>
              </div>
            </div>
            
            {folder.isExpanded && (
              <div className="mt-2 ml-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
                {folder.files.map((file) => (
                  <div 
                    key={file}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-700/50"
                  >
                    <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{file}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
