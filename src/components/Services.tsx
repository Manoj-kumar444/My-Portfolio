import React from 'react';
import { Check } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SectionHeading } from './common/SectionHeading';
import { DynamicIcon } from './common/DynamicIcon';

export const Services: React.FC = () => {
  const { enabledServices, sectionSettings } = useData();

  if (!sectionSettings.services || enabledServices.length === 0) return null;

  return (
    <section id="services" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="What I Offer"
          title="Technical Services"
          subtitle="Areas where I can assist with frontend, database, and rapid web prototyping"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {enabledServices.map(srv => (
            <div
              key={srv.id}
              className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg hover:border-primary-400 dark:hover:border-primary-600 transition flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center shadow-sm">
                  <DynamicIcon name={srv.icon || 'Layout'} className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {srv.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {srv.description}
                </p>

                {srv.features && srv.features.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {srv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-primary-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="#contact"
                className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-primary-700 dark:text-primary-300 bg-primary-50 hover:bg-primary-100 dark:bg-primary-950/60 transition"
              >
                Inquire About Service
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};