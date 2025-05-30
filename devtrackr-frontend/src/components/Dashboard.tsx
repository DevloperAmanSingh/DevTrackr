
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { SessionManager } from './SessionManager';
import { DashboardTabs } from './DashboardTabs';
import { LanguageStats } from './LanguageStats';
import { FolderUsage } from './FolderUsage';
import { ShareableCard } from './ShareableCard';
import { GitHubContributions } from './GitHubContributions';
import { Activity } from 'lucide-react';

interface DashboardProps {
  user: { name?: string; email: string; githubUsername?: string };
  onLogout: () => void;
}

export const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const userData = {
    name: user.name,
    totalHours: 145,
    topLanguage: 'TypeScript',
    projectsCount: 12,
  };

  // Extract GitHub username from user data or default to 'DeveloperAmanSingh'
  const githubUsername = user.githubUsername || 'DeveloperAmanSingh';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 transition-all duration-700">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-100 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-100 dark:bg-purple-900/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                DevTrackr
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Welcome back, {user.name || user.email.split('@')[0]}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Session Management */}
        <div className="mb-8">
          <SessionManager />
        </div>

        {/* GitHub Contributions */}
        <div className="mb-8">
          <GitHubContributions username={githubUsername} />
        </div>

        {/* Dashboard Tabs */}
        <DashboardTabs>
          {(timeRange) => (
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Language Stats - Takes 3 columns */}
              <div className="xl:col-span-3">
                <LanguageStats timeRange={timeRange} />
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <FolderUsage timeRange={timeRange} />
                <ShareableCard userData={userData} />
              </div>
            </div>
          )}
        </DashboardTabs>
      </div>
    </div>
  );
};
