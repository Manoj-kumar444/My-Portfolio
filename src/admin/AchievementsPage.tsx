import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Trophy, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Achievement, AchievementCategory } from '../types';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const AchievementsPage: React.FC = () => {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = useData();
  const [editingItem, setEditingItem] = useState<Partial<Achievement> | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const categories: AchievementCategory[] = ['Award', 'Hackathon', 'Competition', 'Academic', 'Workshop', 'Event', 'Other'];

  const handleOpenNew = () => {
    setEditingItem({
      title: '',
      category: 'Academic',
      organization: '',
      date: new Date().getFullYear().toString(),
      description: '',
      credential_url: '',
      is_published: true,
      order_index: achievements.length + 1
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title) return;

    if (editingItem.id) {
      updateAchievement(editingItem.id, editingItem);
    } else {
      addAchievement(editingItem as Omit<Achievement, 'id'>);
    }
    setEditingItem(null);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteAchievement(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Achievements & Recognitions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage academic awards, hackathons, and milestones (Empty state when none).
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingItem.id ? 'Edit Achievement' : 'Add Achievement'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. 1st Place - University AI Hackathon"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={editingItem.category || 'Academic'}
                    onChange={e => setEditingItem({ ...editingItem, category: e.target.value as AchievementCategory })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Date / Year
                  </label>
                  <input
                    type="text"
                    value={editingItem.date || ''}
                    onChange={e => setEditingItem({ ...editingItem, date: e.target.value })}
                    placeholder="e.g. 2025"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Issuing Organization / Event
                </label>
                <input
                  type="text"
                  value={editingItem.organization || ''}
                  onChange={e => setEditingItem({ ...editingItem, organization: e.target.value })}
                  placeholder="e.g. Aurora Deemed to be University"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingItem.description || ''}
                  onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={editingItem.is_published ?? true}
                    onChange={e => setEditingItem({ ...editingItem, is_published: e.target.checked })}
                    className="w-4 h-4 rounded text-primary-600"
                  />
                  <span>Published on Website</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md"
                >
                  Save Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {achievements.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl space-y-3">
          <Trophy className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No achievements added yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            The public site displays an elegant empty state until you add your competitive and academic milestones.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map(a => (
            <div
              key={a.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    {a.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingItem(a)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(a.id)}
                      className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                  {a.title}
                </h3>
                <p className="text-xs font-semibold text-primary-600">{a.organization}</p>
                {a.description && <p className="text-xs text-slate-500 mt-2">{a.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Achievement"
        message="Are you sure you want to delete this achievement?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
