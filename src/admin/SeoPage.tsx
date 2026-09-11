import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { dataService } from '../lib/dataService';

export const SeoPage: React.FC = () => {
  const { seoSettings, updateSeoSettings } = useData();
  const [formData, setFormData] = useState({ ...seoSettings });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (seoSettings) {
      setFormData({ ...seoSettings });
    }
  }, [seoSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    dataService.updateSeoSettings(formData);
    updateSeoSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            SEO & Social Metadata
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Optimize search engine rankings, OpenGraph cards, and page previews.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold border border-emerald-200 shadow-sm animate-pulse">
            <CheckCircle2 className="w-4 h-4" />
            <span>SEO settings saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
            Meta Title *
          </label>
          <input
            type="text"
            required
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
            Meta Description *
          </label>
          <textarea
            rows={3}
            required
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
            Meta Keywords (Comma-separated)
          </label>
          <input
            type="text"
            name="keywords"
            value={formData.keywords || ''}
            onChange={handleChange}
            placeholder="Sahukari Manoj Kumar, BTech CSE, AI, Portfolio"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Canonical URL
            </label>
            <input
              type="text"
              name="canonical_url"
              value={formData.canonical_url || ''}
              onChange={handleChange}
              placeholder="https://manojkumar.dev"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="submit"
            onClick={() => handleSave()}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{saved ? 'Saved!' : 'Save SEO Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
