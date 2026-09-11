import React, { useState } from 'react';
import { Palette, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

export const AppearancePage: React.FC = () => {
  const { theme, toggleTheme, primaryColor, setPrimaryColor } = useTheme();
  const { websiteSettings, updateWebsiteSettings } = useData();
  const [saved, setSaved] = useState(false);

  const colors = [
    { name: 'Indigo (Default)', value: '#4f46e5', bg: 'bg-indigo-600' },
    { name: 'Blue', value: '#2563eb', bg: 'bg-blue-600' },
    { name: 'Emerald', value: '#059669', bg: 'bg-emerald-600' },
    { name: 'Violet', value: '#7c3aed', bg: 'bg-violet-600' },
    { name: 'Rose', value: '#e11d48', bg: 'bg-rose-600' },
    { name: 'Cyan', value: '#0891b2', bg: 'bg-cyan-600' }
  ];

  const handleSelectColor = (hex: string) => {
    setPrimaryColor(hex);
    updateWebsiteSettings({ primary_color: hex });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Appearance & Branding Customizer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Customize primary accent color, dark/light theme, and UI ambiance.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Theme updated!</span>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Primary Accent Color
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {colors.map(col => (
              <button
                key={col.value}
                onClick={() => handleSelectColor(col.value)}
                className={`p-4 rounded-2xl border transition flex items-center gap-3 ${
                  primaryColor === col.value
                    ? 'border-primary-600 bg-primary-50/40 dark:bg-primary-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full ${col.bg} shadow-sm`} />
                <span className="text-xs font-bold text-slate-900 dark:text-white">{col.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
            Default Theme Mode
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => { if (theme === 'dark') toggleTheme(); }}
              className={`px-5 py-3 rounded-2xl border text-xs font-bold transition ${
                theme === 'light' ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-slate-200 text-slate-600'
              }`}
            >
              ☀️ Clean Light Mode (Default)
            </button>
            <button
              onClick={() => { if (theme === 'light') toggleTheme(); }}
              className={`px-5 py-3 rounded-2xl border text-xs font-bold transition ${
                theme === 'dark' ? 'border-primary-600 bg-primary-950/60 text-primary-300' : 'border-slate-200 text-slate-600'
              }`}
            >
              🌙 Modern Dark Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
