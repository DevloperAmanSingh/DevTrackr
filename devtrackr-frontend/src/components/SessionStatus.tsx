
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const SessionStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [sessionKey] = useState('SK-7F2A8B9C');

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Session Status
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {isConnected ? 'Connected' : 'Disconnected'} • Key: {sessionKey}
              </p>
            </div>
          </div>
          <Badge variant={isConnected ? "default" : "destructive"} className="px-3 py-1">
            {isConnected ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
          >
            Change Key
          </Button>
          <Button 
            size="sm"
            onClick={() => setIsConnected(!isConnected)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
      </div>
    </div>
  );
};
