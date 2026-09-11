import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Briefcase, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Experience } from '../types';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const ExperiencePage: React.FC = () => {
  const { experienceList, addExperience, updateExperience, deleteExperience } = useData();
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleOpenNew = () => {
    setEditingExp({
      company: '',
      role: '',
      employment_type: 'Internship',
      location: '',
      start_date: '',
      end_date: '',
      is_current: false,
      description: '',
      responsibilities: [],
      technologies: [],
      is_published: true,
      order_index: experienceList.length + 1
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp || !editingExp.company || !editingExp.role) return;

    if (editingExp.id) {
      updateExperience(editingExp.id, editingExp);
    } else {
      addExperience(editingExp as Omit<Experience, 'id'>);
    }
    setEditingExp(null);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteExperience(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Experience & Internships Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your verified work roles, internships, and technical responsibilities.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingExp.id ? 'Edit Experience' : 'Add Experience'}
              </h3>
              <button
                onClick={() => setEditingExp(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Role Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.role || ''}
                    onChange={e => setEditingExp({ ...editingExp, role: e.target.value })}
                    placeholder="e.g. Frontend Developer Intern"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.company || ''}
                    onChange={e => setEditingExp({ ...editingExp, company: e.target.value })}
                    placeholder="e.g. Tech Studio"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={editingExp.start_date || ''}
                    onChange={e => setEditingExp({ ...editingExp, start_date: e.target.value })}
                    placeholder="e.g. Jun 2025"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    End Date / Status
                  </label>
                  <input
                    type="text"
                    value={editingExp.end_date || ''}
                    onChange={e => setEditingExp({ ...editingExp, end_date: e.target.value })}
                    placeholder="e.g. Aug 2025 / Present"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingExp.description || ''}
                  onChange={e => setEditingExp({ ...editingExp, description: e.target.value })}
                  placeholder="Responsibilities and accomplishments..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {experienceList.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl space-y-3">
          <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No experience records added yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Practical internships and roles will appear here once you add them.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {experienceList.map(exp => (
            <div
              key={exp.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft flex items-start justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {exp.role}
                </h3>
                <p className="text-xs font-semibold text-primary-600">
                  {exp.company} • {exp.employment_type}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}
                </p>
                {exp.description && <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{exp.description}</p>}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingExp(exp)}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTargetId(exp.id)}
                  className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Experience"
        message="Are you sure you want to remove this experience entry?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
