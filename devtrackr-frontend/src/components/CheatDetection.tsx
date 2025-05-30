
import React from 'react';
import { Badge } from '@/components/ui/badge';

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Rapid Code Changes',
    description: 'Unusually fast typing detected in main.ts',
    timestamp: '2 min ago',
    severity: 'medium'
  },
  {
    id: 2,
    type: 'error',
    title: 'Copy-Paste Pattern',
    description: 'Large code blocks pasted without modification',
    timestamp: '15 min ago',
    severity: 'high'
  },
  {
    id: 3,
    type: 'info',
    title: 'AI Assistance Used',
    description: 'GitHub Copilot suggestions accepted frequently',
    timestamp: '1 hour ago',
    severity: 'low'
  },
  {
    id: 4,
    type: 'warning',
    title: 'Idle Time Anomaly',
    description: 'Long idle period followed by burst activity',
    timestamp: '2 hours ago',
    severity: 'medium'
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
    case 'medium':
      return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800';
    case 'low':
      return 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
    default:
      return 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
  }
};

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'high':
      return <Badge variant="destructive" className="text-xs">Critical</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs">Warning</Badge>;
    case 'low':
      return <Badge variant="secondary" className="text-xs">Info</Badge>;
    default:
      return <Badge variant="outline" className="text-xs">Unknown</Badge>;
  }
};

export const CheatDetection = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Activity Monitor
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Anomaly detection and alerts
        </p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start justify-between space-x-3">
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                    {alert.title}
                  </h4>
                  {getSeverityBadge(alert.severity)}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {alert.description}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {alert.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-sm">
          Detection Summary
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-lg font-bold text-red-600 dark:text-red-400">1</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Critical</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">2</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Warnings</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">1</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Info</p>
          </div>
        </div>
      </div>
    </div>
  );
};
