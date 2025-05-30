
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type TimeRange = 'daily' | 'weekly' | 'monthly' | 'all-time';

interface DashboardTabsProps {
  children: (timeRange: TimeRange) => React.ReactNode;
}

export const DashboardTabs = ({ children }: DashboardTabsProps) => {
  const [activeTab, setActiveTab] = useState<TimeRange>('daily');

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TimeRange)}>
      <TabsList className="grid w-full max-w-lg grid-cols-4 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-1 border border-slate-200/50 dark:border-slate-700/50">
        <TabsTrigger 
          value="daily" 
          className="rounded-2xl transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium text-sm"
        >
          Daily
        </TabsTrigger>
        <TabsTrigger 
          value="weekly"
          className="rounded-2xl transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium text-sm"
        >
          Weekly
        </TabsTrigger>
        <TabsTrigger 
          value="monthly"
          className="rounded-2xl transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium text-sm"
        >
          Monthly
        </TabsTrigger>
        <TabsTrigger 
          value="all-time"
          className="rounded-2xl transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium text-sm"
        >
          All-Time
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value={activeTab} className="mt-8">
        {children(activeTab)}
      </TabsContent>
    </Tabs>
  );
};
