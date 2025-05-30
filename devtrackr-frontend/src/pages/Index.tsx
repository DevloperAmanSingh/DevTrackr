
import React, { useState } from 'react';
import { SessionStatus } from '@/components/SessionStatus';
import { LanguageChart } from '@/components/LanguageChart';
import { DailyTimeline } from '@/components/DailyTimeline';
import { ExtensionTracker } from '@/components/ExtensionTracker';
import { CheatDetection } from '@/components/CheatDetection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DevTrackr
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Your coding activity insights at a glance
          </p>
        </div>

        {/* Session Status */}
        <SessionStatus />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            <LanguageChart />
            <DailyTimeline />
          </div>

          {/* Right Column - Tracking & Alerts */}
          <div className="space-y-8">
            <ExtensionTracker />
            <CheatDetection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
