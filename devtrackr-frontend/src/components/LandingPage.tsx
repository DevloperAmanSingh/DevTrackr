
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { Github, BarChart, Share, Activity } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 transition-all duration-700">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">DevTrackr</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="rounded-2xl">
              <Github className="w-5 h-5" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-700 to-purple-700 dark:from-slate-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent leading-tight">
              Track. Analyze. Improve.
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 dark:text-slate-300">
              Your Developer Flow.
            </h2>
          </div>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
            DevTrackr helps you understand where your time goes – across languages, projects, and files.
            Get insights into your coding patterns and boost your productivity.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="group p-6 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
              <BarChart className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Live Coding Stats</h3>
              <p className="text-slate-600 dark:text-slate-400">Real-time tracking of your development activity across all your projects</p>
            </div>
            
            <div className="group p-6 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
              <Activity className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Language Usage Graphs</h3>
              <p className="text-slate-600 dark:text-slate-400">Beautiful visualizations of your programming language usage patterns</p>
            </div>
            
            <div className="group p-6 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105">
              <Share className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Shareable Cards</h3>
              <p className="text-slate-600 dark:text-slate-400">Generate beautiful stats cards to share your productivity achievements</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="h-14 px-8 text-lg rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Button>
          </div>

          {/* Terminal Effect */}
          <div className="mt-20 max-w-2xl mx-auto">
            <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-6 shadow-2xl border border-slate-700">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="font-mono text-sm text-green-400 space-y-2">
                <div className="animate-pulse">$ devtrackr --status</div>
                <div className="text-slate-400">Tracking: React, TypeScript, Python</div>
                <div className="text-slate-400">Session: 2h 34m active</div>
                <div className="text-blue-400">Top language: TypeScript (67%)</div>
                <div className="animate-pulse">█</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-slate-600 dark:text-slate-400">
        <p>&copy; 2024 DevTrackr. Built for developers, by developers.</p>
      </footer>
    </div>
  );
};
