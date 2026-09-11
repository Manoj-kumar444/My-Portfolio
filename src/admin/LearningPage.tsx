import React, { useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { LearningTopic, LearningStatus } from '../types';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const LearningPage: React.FC = () => {
  const { learningTopics, addLearningTopic, updateLearningTopic, deleteLearningTopic } = useData();
  const [editingTopic, setEditingTopic] = useState<Partial<LearningTopic> | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const statuses: LearningStatus[] = ['Learning', 'Practicing', 'Completed'];

  const handleOpenNew = () => {
    setEditingTopic({
      topic_name: '',
      category: 'AI & AGI',
      platform_or_resource: '',
      status: 'Learning',
      progress_percentage: 50,
      notes: '',
      key_takeaways: [],
      is_published: true,
      order_index: learningTopics.length + 1
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTopic || !editingTopic.topic_name) return;

    if (editingTopic.id) {
      updateLearningTopic(editingTopic.id, editingTopic);
    } else {
      addLearningTopic(editingTopic as Omit<LearningTopic, 'id'>);
    }
    setEditingTopic(null);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteLearningTopic(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Current Learning & Exploration Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your ongoing exploration in AI, AGI architectures, and web technologies.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Topic</span>
        </button>
      </div>

      {editingTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingTopic.id ? 'Edit Learning Topic' : 'Add Learning Topic'}
              </h3>
              <button
                onClick={() => setEditingTopic(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Topic / Course Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingTopic.topic_name || ''}
                  onChange={e => setEditingTopic({ ...editingTopic, topic_name: e.target.value })}
                  placeholder="e.g. Transformer Models & Attention Mechanisms"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingTopic.category || ''}
                    onChange={e => setEditingTopic({ ...editingTopic, category: e.target.value })}
                    placeholder="e.g. AI / Web Dev"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={editingTopic.status || 'Learning'}
                    onChange={e => setEditingTopic({ ...editingTopic, status: e.target.value as LearningStatus })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  >
                    {statuses.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Platform / Resource
                </label>
                <input
                  type="text"
                  value={editingTopic.platform_or_resource || ''}
                  onChange={e => setEditingTopic({ ...editingTopic, platform_or_resource: e.target.value })}
                  placeholder="e.g. DeepLearning.AI / Self-Study"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Progress Percentage ({editingTopic.progress_percentage || 50}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editingTopic.progress_percentage || 50}
                  onChange={e => setEditingTopic({ ...editingTopic, progress_percentage: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Notes & Takeaways
                </label>
                <textarea
                  rows={2}
                  value={editingTopic.notes || ''}
                  onChange={e => setEditingTopic({ ...editingTopic, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingTopic(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md"
                >
                  Save Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {learningTopics.map(t => (
          <div
            key={t.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">
                {t.category}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingTopic(t)}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTargetId(t.id)}
                  className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.topic_name}
            </h3>
            {t.platform_or_resource && (
              <p className="text-xs text-slate-500 font-medium">{t.platform_or_resource}</p>
            )}

            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>{t.status}</span>
                <span>{t.progress_percentage}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 rounded-full"
                  style={{ width: `${t.progress_percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Topic"
        message="Are you sure you want to remove this learning item?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
