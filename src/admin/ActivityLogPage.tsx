import React from 'react';
import { History, Clock, Trash2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export const ActivityLogPage: React.FC = () => {
  const { activityLogs, clearActivityLogs } = useData();

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            System Audit & Activity Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time audit trail of all actions performed in the admin dashboard.
          </p>
        </div>

        {activityLogs.length > 0 && (
          <button
            onClick={clearActivityLogs}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Logs</span>
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
        {activityLogs.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No activities recorded yet.
          </div>
        ) : (
          activityLogs.map(log => (
            <div key={log.id} className="p-4 sm:p-5 flex items-start gap-4">
              <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {log.action}
                  </h4>
                  <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{log.details}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
