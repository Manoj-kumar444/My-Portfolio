import React from 'react';
import { User, GraduationCap, MapPin, Languages, BookOpen, Compass, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SectionHeading } from './common/SectionHeading';

export const About: React.FC = () => {
  const { profile, aboutContent, sectionSettings } = useData();

  if (!sectionSettings.about) return null;

  const infoItems = [
    { icon: User, label: 'Full Name', value: profile.full_name },
    { icon: GraduationCap, label: 'Degree', value: profile.degree },
    { icon: Sparkles, label: 'Specialization', value: profile.specialization },
    { icon: BookOpen, label: 'Current Level', value: profile.current_year },
    { icon: GraduationCap, label: 'University', value: profile.university },
    { icon: MapPin, label: 'Native Location', value: profile.native_location },
    { icon: MapPin, label: 'Study Location', value: profile.edu_location },
    { icon: Languages, label: 'Languages', value: 'English, Telugu, German (Basic)' },
  ];

  return (
    <section id="about" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get to know me"
          title={aboutContent.title || 'About Me'}
          subtitle="Background, academic focus, and passion for technology"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Bio Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-5">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
                  <Compass className="w-5 h-5" />
                </span>
                <span>My Journey & Focus</span>
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base font-normal">
                {aboutContent.description || profile.bio}
              </p>

              {aboutContent.career_goals && (
                <div className="p-4 rounded-xl bg-primary-50/60 dark:bg-primary-950/30 border border-primary-100 dark:border-primary-900/40">
                  <h4 className="text-xs font-bold text-primary-700 dark:text-primary-300 uppercase tracking-wider mb-1">
                    Aspiration & Vision
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {aboutContent.career_goals}
                  </p>
                </div>
              )}

              {/* Focus Areas */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Core Interests & Tech Exploration
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(aboutContent.interests || []).map((interest, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Facts & Information Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {infoItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-soft hover:border-primary-300 dark:hover:border-primary-700 transition group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-primary-600 dark:text-primary-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-950/50 transition">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate" title={item.value}>
                        {item.value || '—'}
                      </p>
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