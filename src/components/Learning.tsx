import React from 'react';
import { CheckCircle2, Sparkles, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SectionHeading } from './common/SectionHeading';
import { DynamicIcon } from './common/DynamicIcon';

export const Learning: React.FC = () => {
  const { learning, sectionSettings } = useData();

  if (!sectionSettings.learning) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return {
          color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40',
          icon: CheckCircle2
        };
      case 'Practicing':
        return {
          color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800/40',
          icon: Sparkles
        };
      default:
        return {
          color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/40',
          icon: Clock
        };
    }
  };

  return (
    <section id="learning" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Continuous Growth"
          title="Learning Journey"
          subtitle="Technologies and modern frameworks I am actively learning, exploring, and building with"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {learning.map(topic => {
            const badge = getStatusBadge(topic.status);
            const StatusIcon = badge.icon;

            return (
              <div
                key={topic.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg hover:border-primary-400 dark:hover:border-primary-600 transition group flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 group-hover:scale-105 transition-transform">
                      <DynamicIcon name={topic.icon || 'BookOpen'} className="w-5 h-5" />
                    </div>
                    
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badge.color}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      <span>{topic.status}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {topic.topic}
                  </h3>

                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mt-0.5">
                    {topic.category}
                  </p>

                  {topic.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed font-normal">
                      {topic.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                    <span>Progress</span>
                    <span>{topic.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600 rounded-full transition-all duration-500"
                      style={{ width: topic.progress + '%' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};