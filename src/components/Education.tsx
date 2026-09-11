import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SectionHeading } from './common/SectionHeading';

export const Education: React.FC = () => {
  const { education, sectionSettings } = useData();

  if (!sectionSettings.education) return null;

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Academic Journey"
          title="Education Timeline"
          subtitle="My formal education and academic milestones"
        />

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden sm:block" />
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800 sm:hidden" />

          <div className="space-y-10 sm:space-y-12">
            {education.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  <div className="absolute left-6 sm:left-1/2 top-5 -translate-x-1/2 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-md shadow-primary-500/30 z-10 ring-4 ring-white dark:ring-slate-900">
                    <GraduationCap className="w-4 h-4" />
                  </div>

                  <div className="hidden sm:block sm:w-1/2" />

                  <div className={`w-full sm:w-1/2 pl-14 sm:pl-0 ${isEven ? 'sm:pr-10' : 'sm:pl-10'}`}>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg hover:border-primary-300 dark:hover:border-primary-700 transition group">
                      
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300 border border-primary-100 dark:border-primary-900/50">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {item.start_year && item.end_year
                              ? item.start_year + ' - ' + item.end_year
                              : item.current_status || 'Undergraduate'}
                          </span>
                        </span>

                        {item.current_status && (
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{item.current_status}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">
                        {item.degree}
                        {item.specialization && (' � ' + item.specialization)}
                      </h3>

                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                        {item.institution}
                        {item.campus && (' � ' + item.campus)}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.location}</span>
                      </div>

                      {(item.marks || item.percentage || item.cgpa) && (
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
                          {item.marks && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                              <Award className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                              <span>Marks: {item.marks}</span>
                            </span>
                          )}
                          {item.percentage && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                              <span>Percentage: {item.percentage}</span>
                            </span>
                          )}
                          {item.cgpa && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                              <span>CGPA: {item.cgpa}</span>
                            </span>
                          )}
                        </div>
                      )}

                      {item.description && (
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3 font-normal leading-relaxed">
                          {item.description}
                        </p>
                      )}

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};