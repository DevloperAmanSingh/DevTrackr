
import React from 'react';

const timelineData = [
  { day: 'Mon', hours: 8.5, intensity: 85 },
  { day: 'Tue', hours: 6.2, intensity: 62 },
  { day: 'Wed', hours: 9.1, intensity: 91 },
  { day: 'Thu', hours: 7.8, intensity: 78 },
  { day: 'Fri', hours: 5.4, intensity: 54 },
  { day: 'Sat', hours: 3.2, intensity: 32 },
  { day: 'Sun', hours: 1.8, intensity: 18 }
];

const hourlyData = [
  { hour: '9 AM', activity: 45 },
  { hour: '10 AM', activity: 78 },
  { hour: '11 AM', activity: 92 },
  { hour: '12 PM', activity: 34 },
  { hour: '1 PM', activity: 23 },
  { hour: '2 PM', activity: 87 },
  { hour: '3 PM', activity: 95 },
  { hour: '4 PM', activity: 76 },
  { hour: '5 PM', activity: 54 },
  { hour: '6 PM', activity: 32 }
];

export const DailyTimeline = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Daily Timeline
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Your coding patterns throughout the week
        </p>
      </div>

      {/* Weekly Overview */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Weekly Activity
        </h3>
        <div className="flex items-end justify-between space-x-3 h-32">
          {timelineData.map((day, index) => (
            <div key={day.day} className="flex flex-col items-center space-y-2 flex-1">
              <div className="w-full flex flex-col items-center">
                <div 
                  className="w-8 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  style={{ height: `${day.intensity}%` }}
                  title={`${day.hours} hours`}
                />
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {day.day}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-500">
                {day.hours}h
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Heatmap */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Today's Activity Heatmap
        </h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {hourlyData.map((hour, index) => (
            <div
              key={hour.hour}
              className="group relative"
            >
              <div
                className={`w-full h-8 rounded-lg transition-all duration-200 cursor-pointer hover:scale-110 ${
                  hour.activity > 80
                    ? 'bg-green-500'
                    : hour.activity > 60
                    ? 'bg-yellow-500'
                    : hour.activity > 40
                    ? 'bg-orange-500'
                    : hour.activity > 20
                    ? 'bg-red-400'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {hour.hour}: {hour.activity}% active
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-slate-500 dark:text-slate-400">
          <span>Less active</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="w-3 h-3 bg-red-400 rounded"></div>
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <div className="w-3 h-3 bg-green-500 rounded"></div>
          </div>
          <span>More active</span>
        </div>
      </div>
    </div>
  );
};
