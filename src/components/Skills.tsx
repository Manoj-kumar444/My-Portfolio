import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { SectionHeading } from './common/SectionHeading';
import { DynamicIcon } from './common/DynamicIcon';
import { Info } from 'lucide-react';

export const Skills: React.FC = () => {
  const { skills, sectionSettings } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!sectionSettings.skills) return null;

  const enabledSkills = skills.filter(s => s.is_enabled);
  const categories = ['All', 'Frontend', 'Database', 'AI / Development Tools', 'Languages'];

  const filteredSkills = selectedCategory === 'All'
    ? enabledSkills
    : enabledSkills.filter(s => s.category === selectedCategory);

  const getLevelBadgeColor = (level: string) => {
    if (level.includes('Good') || level.includes('Proficient')) {
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40';
    }
    if (level.includes('Familiar')) {
      return 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800/40';
    }
    return 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/40';
  };

  return (
    <section id="skills" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Technical Competencies"
          title="Skills & Modern Tools"
          subtitle="Technologies, database tools, AI-assisted development, and languages"
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {(selectedCategory === 'All' || selectedCategory === 'AI / Development Tools') && (
          <div className="max-w-3xl mx-auto mb-8 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 flex items-start gap-3 text-xs sm:text-sm text-blue-900 dark:text-blue-200">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
            <span>
              <strong>AI-assisted Development:</strong> Modern coding tools and assistive AI workflows I use for learning, rapid prototyping, and building practical projects.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSkills.map(skill => (
            <div
              key={skill.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg hover:border-primary-400 dark:hover:border-primary-600 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 group-hover:scale-105 transition-transform">
                    <DynamicIcon name={skill.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {skill.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {skill.name}
                </h3>

                <div className="mt-2 mb-3">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold border ${getLevelBadgeColor(
                      skill.level
                    )}`}
                  >
                    {skill.level}
                  </span>
                </div>

                {skill.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {skill.description}
                  </p>
                )}
              </div>

              {skill.percentage !== undefined && skill.percentage > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    <span>Proficiency</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600 rounded-full transition-all duration-500"
                      style={{ width: skill.percentage + '%' }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};