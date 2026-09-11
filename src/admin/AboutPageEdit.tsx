import React, { useState, useEffect } from 'react';
import { Save, Plus, X, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { dataService } from '../lib/dataService';

export const AboutPageEdit: React.FC = () => {
  const { aboutContent, updateAboutContent } = useData();
  const [formData, setFormData] = useState({ ...aboutContent });
  const [newInterest, setNewInterest] = useState('');
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (aboutContent) {
      setFormData({ ...aboutContent });
    }
  }, [aboutContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    setFormData(prev => ({
      ...prev,
      interests: [...(prev.interests || []), newInterest.trim()]
    }));
    setNewInterest('');
  };

  const handleRemoveInterest = (index: number) => {
    setFormData(prev => ({
      ...prev,
      interests: (prev.interests || []).filter((_, i) => i !== index)
    }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);

    try {
      dataService.updateAboutContent(formData);
      updateAboutContent(formData);

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setIsSaving(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to save about content:', err);
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            About Section Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Edit your story, career goals, and core tech interests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 shadow-sm animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Saved!</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition active:scale-95 ${
              saved
                ? 'bg-emerald-600 text-white'
                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-500/25'
            }`}
          >
            {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Saved!' : isSaving ? 'Saving...' : 'Save About Information'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Section Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            About Description
          </label>
          <textarea
            name="description"
            rows={5}
            value={formData.description || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Career Goals & Aspirations
          </label>
          <textarea
            name="career_goals"
            rows={3}
            value={formData.career_goals || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Interests List */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Core Interests & Focus Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {(formData.interests || []).map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300 border border-primary-200 dark:border-primary-800"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(idx)}
                  className="p-0.5 hover:text-red-500 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newInterest}
              onChange={e => setNewInterest(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddInterest();
                }
              }}
              placeholder="e.g. Artificial General Intelligence"
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm"
            />
            <button
              type="button"
              onClick={handleAddInterest}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Tag</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="submit"
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition active:scale-95 ${
              saved
                ? 'bg-emerald-600 text-white'
                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-500/25'
            }`}
          >
            {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Saved Successfully!' : isSaving ? 'Saving...' : 'Save About Information'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
