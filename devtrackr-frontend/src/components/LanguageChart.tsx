
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { language: 'TypeScript', hours: 45, color: '#3178c6' },
  { language: 'JavaScript', hours: 32, color: '#f7df1e' },
  { language: 'Python', hours: 28, color: '#3776ab' },
  { language: 'React', hours: 25, color: '#61dafb' },
  { language: 'CSS', hours: 18, color: '#1572b6' },
  { language: 'HTML', hours: 12, color: '#e34f26' }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="font-semibold text-slate-900 dark:text-slate-100">{label}</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {payload[0].value} hours this week
        </p>
      </div>
    );
  }
  return null;
};

export const LanguageChart = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Language Usage
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            This week's coding breakdown
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">160h</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Total time</p>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="language" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-slate-600 dark:text-slate-400"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-slate-600 dark:text-slate-400"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="hours" 
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
                className="hover:opacity-80 transition-opacity duration-200"
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
