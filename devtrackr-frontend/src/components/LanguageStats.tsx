
import React from 'react';
import { Code, FileText, Database, Globe, Palette, Box, Clock, FolderOpen } from 'lucide-react';

type TimeRange = 'daily' | 'weekly' | 'monthly' | 'all-time';

interface LanguageStatsProps {
  timeRange: TimeRange;
}

const languageIcons: Record<string, React.ReactNode> = {
  'TypeScript': <Code className="w-5 h-5" style={{ color: '#3178c6' }} />,
  'JavaScript': <FileText className="w-5 h-5" style={{ color: '#f7df1e' }} />,
  'Python': <Database className="w-5 h-5" style={{ color: '#3776ab' }} />,
  'React': <Globe className="w-5 h-5" style={{ color: '#61dafb' }} />,
  'CSS': <Palette className="w-5 h-5" style={{ color: '#1572b6' }} />,
  'HTML': <Box className="w-5 h-5" style={{ color: '#e34f26' }} />,
};

const projectData = {
  daily: [
    { name: 'DevTrackr Dashboard', languages: ['TypeScript', 'React', 'CSS'], hours: 6.5 },
    { name: 'API Integration', languages: ['JavaScript', 'Python'], hours: 3.2 },
    { name: 'UI Components', languages: ['TypeScript', 'CSS'], hours: 2.8 },
  ],
  weekly: [
    { name: 'DevTrackr Dashboard', languages: ['TypeScript', 'React', 'CSS'], hours: 32.5 },
    { name: 'API Integration', languages: ['JavaScript', 'Python'], hours: 18.7 },
    { name: 'UI Components', languages: ['TypeScript', 'CSS'], hours: 15.2 },
    { name: 'Documentation', languages: ['HTML'], hours: 8.1 },
  ],
  monthly: [
    { name: 'DevTrackr Dashboard', languages: ['TypeScript', 'React', 'CSS'], hours: 125.5 },
    { name: 'API Integration', languages: ['JavaScript', 'Python'], hours: 78.3 },
    { name: 'UI Components', languages: ['TypeScript', 'CSS'], hours: 65.7 },
    { name: 'Documentation', languages: ['HTML'], hours: 32.2 },
    { name: 'Testing Suite', languages: ['JavaScript'], hours: 28.9 },
  ],
  'all-time': [
    { name: 'DevTrackr Dashboard', languages: ['TypeScript', 'React', 'CSS'], hours: 445.5 },
    { name: 'API Integration', languages: ['JavaScript', 'Python'], hours: 298.3 },
    { name: 'UI Components', languages: ['TypeScript', 'CSS'], hours: 245.7 },
    { name: 'Documentation', languages: ['HTML'], hours: 132.2 },
    { name: 'Testing Suite', languages: ['JavaScript'], hours: 128.9 },
    { name: 'Mobile App', languages: ['React', 'TypeScript'], hours: 89.4 },
  ],
};

const languageData = {
  daily: [
    { language: 'TypeScript', hours: 4.5, color: '#3178c6' },
    { language: 'JavaScript', hours: 3.2, color: '#f7df1e' },
    { language: 'Python', hours: 2.1, color: '#3776ab' },
    { language: 'React', hours: 3.8, color: '#61dafb' },
    { language: 'CSS', hours: 1.5, color: '#1572b6' },
    { language: 'HTML', hours: 0.8, color: '#e34f26' },
  ],
  weekly: [
    { language: 'TypeScript', hours: 25, color: '#3178c6' },
    { language: 'JavaScript', hours: 18, color: '#f7df1e' },
    { language: 'Python', hours: 12, color: '#3776ab' },
    { language: 'React', hours: 22, color: '#61dafb' },
    { language: 'CSS', hours: 8, color: '#1572b6' },
    { language: 'HTML', hours: 5, color: '#e34f26' },
  ],
  monthly: [
    { language: 'TypeScript', hours: 95, color: '#3178c6' },
    { language: 'JavaScript', hours: 68, color: '#f7df1e' },
    { language: 'Python', hours: 42, color: '#3776ab' },
    { language: 'React', hours: 78, color: '#61dafb' },
    { language: 'CSS', hours: 35, color: '#1572b6' },
    { language: 'HTML', hours: 23, color: '#e34f26' },
  ],
  'all-time': [
    { language: 'TypeScript', hours: 345, color: '#3178c6' },
    { language: 'JavaScript', hours: 298, color: '#f7df1e' },
    { language: 'Python', hours: 167, color: '#3776ab' },
    { language: 'React', hours: 312, color: '#61dafb' },
    { language: 'CSS', hours: 145, color: '#1572b6' },
    { language: 'HTML', hours: 89, color: '#e34f26' },
  ],
};

export const LanguageStats = ({ timeRange }: LanguageStatsProps) => {
  const projects = projectData[timeRange];
  const languages = languageData[timeRange];
  const totalHours = languages.reduce((sum, item) => sum + item.hours, 0);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/30 dark:border-slate-700/30">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{Math.round(totalHours)}h</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Time</p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/30 dark:border-slate-700/30">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{projects.length}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Active Projects</p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/30 dark:border-slate-700/30">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{languages.length}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Languages Used</p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/30 dark:border-slate-700/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Project Activity
        </h2>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={project.name} className="bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl p-5 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{project.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{Math.round(project.hours)}h</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Time spent</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {project.languages.map((lang) => (
                  <div key={lang} className="flex items-center space-x-1 bg-white/60 dark:bg-slate-700/60 px-3 py-1 rounded-full">
                    {languageIcons[lang] || <Code className="w-4 h-4" />}
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{lang}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Languages Section */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/30 dark:border-slate-700/30">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Language Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((lang) => {
            const percentage = ((lang.hours / totalHours) * 100);
            return (
              <div key={lang.language} className="bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl p-5 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-all duration-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${lang.color}20` }}>
                    {languageIcons[lang.language] || <Code className="w-5 h-5" style={{ color: lang.color }} />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">{lang.language}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{Math.round(percentage)}% of time</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{Math.round(lang.hours)}h</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: lang.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
