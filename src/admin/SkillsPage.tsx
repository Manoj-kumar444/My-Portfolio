import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Code2, X, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Skill, SkillCategory, SkillLevel } from '../types';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const SkillsPage: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useData();
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: SkillCategory[] = ['Frontend', 'Database', 'AI / Development Tools', 'Languages', 'Other'];
  const skillLevels: SkillLevel[] = ['Basic / Learning', 'Learning / Familiar', 'Good / Intermediate', 'Proficient'];

  const handleOpenNew = () => {
    setEditingSkill({
      name: '',
      category: 'Frontend',
      level: 'Learning / Familiar',
      percentage: 75,
      is_enabled: true,
      order_index: skills.length + 1
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name) return;

    if (editingSkill.id) {
      updateSkill(editingSkill.id, editingSkill);
    } else {
      addSkill(editingSkill as Omit<Skill, 'id'>);
    }
    setEditingSkill(null);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteSkill(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Skills & Technical Stack
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your verified technical tools, frontend frameworks, and AI workflows.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 pt-2">
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedCategory === cat
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Modal Form */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingSkill.id ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button
                onClick={() => setEditingSkill(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ''}
                  onChange={e => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  placeholder="e.g. Tailwind CSS / Supabase / Antigravity"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={editingSkill.category || 'Frontend'}
                    onChange={e => setEditingSkill({ ...editingSkill, category: e.target.value as SkillCategory })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Proficiency Level
                  </label>
                  <select
                    value={editingSkill.level || 'Good / Intermediate'}
                    onChange={e => setEditingSkill({ ...editingSkill, level: e.target.value as SkillLevel })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  >
                    {skillLevels.map(lvl => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Proficiency Meter Percentage ({editingSkill.percentage || 75}%)
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={editingSkill.percentage || 75}
                  onChange={e => setEditingSkill({ ...editingSkill, percentage: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="skill_enabled"
                  checked={editingSkill.is_enabled ?? true}
                  onChange={e => setEditingSkill({ ...editingSkill, is_enabled: e.target.checked })}
                  className="w-4 h-4 rounded text-primary-600"
                />
                <label htmlFor="skill_enabled" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Visible on public website
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid of Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map(skill => (
          <div
            key={skill.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg transition space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
                  {skill.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                  {skill.name}
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingSkill(skill)}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTargetId(skill.id)}
                  className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>{skill.level}</span>
                <span>{skill.percentage}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 rounded-full"
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Skill"
        message="Are you sure you want to delete this skill? It will no longer appear on your live portfolio."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
