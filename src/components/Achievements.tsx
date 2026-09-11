import React from 'react';
import { Trophy, PlusCircle, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SectionHeading } from './common/SectionHeading';
import { Link } from 'react-router-dom';

export const Achievements: React.FC = () => {
  const { publishedAchievements, sectionSettings } = useData();

  if (!sectionSettings.achievements) return null;

  return (
    <section id="achievements" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Recognition & Honors"
          title="Achievements & Milestones"
          subtitle="Academic competitions, awards, and noteworthy accomplishments"
        />

        {publishedAchievements.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center p-10 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl shadow-soft space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto shadow-sm">
              <Trophy className="w-7 h-7" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Achievements will be added soon.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Upcoming hackathons, academic recognitions, and competitive milestones will appear here.
              </p>
            </div>

            <div className="pt-1">
              <Link
                to="/admin/achievements"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 hover:bg-primary-100 transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Achievement in Admin</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedAchievements.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg transition space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    {item.category}
                  </span>
                  {item.date && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">{item.date}</span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                {item.organization && (
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                    {item.organization}
                  </p>
                )}

                {item.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.credential_url && (
                  <a
                    href={item.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-700 pt-2"
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};