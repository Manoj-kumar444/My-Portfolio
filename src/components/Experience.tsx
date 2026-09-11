import React from 'react';
import { Briefcase, Calendar, MapPin, PlusCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SectionHeading } from './common/SectionHeading';
import { Link } from 'react-router-dom';

export const Experience: React.FC = () => {
  const { publishedExperience, sectionSettings } = useData();

  if (!sectionSettings.experience) return null;

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Work & Roles"
          title="Experience & Internships"
          subtitle="Practical work experience, internships, and technical roles"
        />

        {publishedExperience.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center p-10 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl shadow-soft space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto shadow-sm">
              <Briefcase className="w-7 h-7" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Experience in Progress
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Currently building practical experience through academic projects, learning, and technology development.
              </p>
            </div>

            <div className="pt-1">
              <Link
                to="/admin/experience"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 hover:bg-primary-100 transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Experience in Admin</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {publishedExperience.map(exp => (
              <div
                key={exp.id}
                className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg transition space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                      {exp.company} • {exp.employment_type}
                    </p>
                    {exp.location && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}
                    </span>
                  </span>
                </div>

                {exp.description && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};