
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const SessionManager = () => {
  const [sessionKey, setSessionKey] = useState('SK-7F2A8B9C');
  const [isConnected, setIsConnected] = useState(true);
  const { toast } = useToast();

  const generateSessionKey = () => {
    const newKey = `SK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    setSessionKey(newKey);
    toast({
      title: "Session Key Generated",
      description: `New session key: ${newKey}`,
    });
  };

  const toggleConnection = () => {
    setIsConnected(!isConnected);
    toast({
      title: isConnected ? "Disconnected" : "Connected",
      description: isConnected ? "Session disconnected" : "Session connected successfully",
    });
  };

  return (
    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/30 dark:border-slate-700/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse shadow-lg`} />
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Session Status
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
                {sessionKey}
              </p>
            </div>
          </div>
          <Badge 
            variant={isConnected ? "default" : "destructive"} 
            className="px-3 py-1 rounded-full"
          >
            {isConnected ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={generateSessionKey}
            className="rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          >
            Generate Key
          </Button>
          <Button 
            size="sm"
            onClick={toggleConnection}
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
      </div>
    </div>
  );
};
