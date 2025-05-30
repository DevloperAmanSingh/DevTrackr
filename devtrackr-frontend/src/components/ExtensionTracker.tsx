
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const extensions = [
  { name: 'Prettier', enabled: true, timeSpent: '12h', category: 'Formatter' },
  { name: 'ESLint', enabled: true, timeSpent: '8h', category: 'Linter' },
  { name: 'GitLens', enabled: true, timeSpent: '15h', category: 'Git' },
  { name: 'Auto Rename Tag', enabled: false, timeSpent: '2h', category: 'HTML' },
  { name: 'Bracket Pair Colorizer', enabled: true, timeSpent: '6h', category: 'Visual' },
  { name: 'Live Server', enabled: false, timeSpent: '4h', category: 'Server' },
  { name: 'Thunder Client', enabled: true, timeSpent: '9h', category: 'API' },
  { name: 'Markdown Preview', enabled: true, timeSpent: '3h', category: 'Markdown' }
];

export const ExtensionTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredExtensions = extensions.filter(ext => {
    const matchesSearch = ext.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'enabled' && ext.enabled) || 
                         (filter === 'disabled' && !ext.enabled);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Extension Tracker
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Monitor your VS Code extensions
        </p>
      </div>

      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20">
        {/* Search and Filter */}
        <div className="space-y-3 mb-6">
          <Input
            placeholder="Search extensions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600"
          />
          
          <div className="flex space-x-2">
            {['all', 'enabled', 'disabled'].map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterType)}
                className="capitalize text-xs"
              >
                {filterType}
              </Button>
            ))}
          </div>
        </div>

        {/* Extensions List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredExtensions.map((ext, index) => (
            <div
              key={ext.name}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-700/30 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors duration-200 border border-slate-200/50 dark:border-slate-600/50"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${ext.enabled ? 'bg-green-500' : 'bg-slate-400'}`} />
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                    {ext.name}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {ext.category}
                    </Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {ext.timeSpent}
                    </span>
                  </div>
                </div>
              </div>
              
              <Badge 
                variant={ext.enabled ? "default" : "secondary"}
                className="text-xs"
              >
                {ext.enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          ))}
        </div>

        {filteredExtensions.length === 0 && (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            No extensions found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};
