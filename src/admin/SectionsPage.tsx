import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { dataService } from '../lib/dataService';
import { SectionSettings } from '../types';

export const SectionsPage: React.FC = () => {
  const { sectionSettings, updateSectionSettings } = useData();
  const [settings, setSettings] = useState<SectionSettings>({ ...sectionSettings });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (sectionSettings) {
      setSettings({ ...sectionSettings });
    }
  }, [sectionSettings]);

  const sectionsList: { key: keyof SectionSettings; label: string; desc: string }[] = [
    { key: 'home', label: 'Hero / Home Banner', desc: 'Main introductory banner with CTA and SM Kumar profile card' },
    { key: 'about', label: 'About Me Section', desc: 'Personal bio, university facts grid, and core interests' },
    { key: 'education', label: 'Education Timeline', desc: 'Degrees, intermediate marks, and school details' },
    { key: 'skills', label: 'Skills & Tech Stack', desc: 'Categorized technical toolset & proficiency meters' },
    { key: 'projects', label: 'Projects & Work', desc: 'Case studies, source code links, and demo previews' },
    { key: 'certifications', label: 'Certifications', desc: 'Credentials and verified certificates' },
    { key: 'experience', label: 'Experience & Roles', desc: 'Practical roles, internships, and work history' },
    { key: 'achievements', label: 'Achievements', desc: 'Awards, hackathons, and competitions' },
    { key: 'learning', label: 'Current Learning', desc: 'Ongoing topics and AI exploration tracker' },
    { key: 'services', label: 'Services (Optional)', desc: 'Web development and technical service offerings' },
    { key: 'contact', label: 'Contact Section & Form', desc: 'Direct email/phone details and interactive message form' }
  ];

  const handleToggle = (key: keyof SectionSettings) => {
    const updated = {
      ...settings,
      [key]: !settings[key]
    };
    setSettings(updated);
    dataService.updateSectionSettings(updated);
    updateSectionSettings(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSave = () => {
    dataService.updateSectionSettings(settings);
    updateSectionSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Section Visibility Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Toggle which sections appear on the public live portfolio website. Changes take effect immediately.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold border border-emerald-200 animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved!</span>
            </div>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
        {sectionsList.map(sec => (
          <div
            key={sec.key}
            className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition"
          >
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{sec.label}</h3>
              <p className="text-xs text-slate-500">{sec.desc}</p>
            </div>

            <button
              onClick={() => handleToggle(sec.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                settings[sec.key]
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {settings[sec.key] ? 'Visible' : 'Hidden'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
