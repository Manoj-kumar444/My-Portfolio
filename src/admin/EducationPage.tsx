import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, GraduationCap } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Education } from '../types';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const EducationPage: React.FC = () => {
  const { educationList, addEducation, updateEducation, deleteEducation } = useData();
  const [editingItem, setEditingItem] = useState<Partial<Education> | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleOpenNew = () => {
    setEditingItem({
      degree: '',
      course: '',
      specialization: '',
      institution: '',
      campus: '',
      university: '',
      location: '',
      start_year: '',
      end_year: '',
      current_status: '',
      marks: '',
      percentage: '',
      cgpa: '',
      description: '',
      order_index: educationList.length + 1
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.degree || !editingItem.institution) return;

    if (editingItem.id) {
      updateEducation(editingItem.id, editingItem);
    } else {
      addEducation(editingItem as Omit<Education, 'id'>);
    }
    setEditingItem(null);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteEducation(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Education Timeline Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your verified degrees, intermediate, and schooling records.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingItem.id ? 'Edit Education Entry' : 'Add New Education Entry'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Degree / Certificate Level *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.degree || ''}
                    onChange={e => setEditingItem({ ...editingItem, degree: e.target.value })}
                    placeholder="e.g. B.Tech / Intermediate / 10th Standard"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Course / Branch / Stream
                  </label>
                  <input
                    type="text"
                    value={editingItem.course || ''}
                    onChange={e => setEditingItem({ ...editingItem, course: e.target.value })}
                    placeholder="e.g. Computer Science Engineering – AI & AGI"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Institution / School Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.institution || ''}
                    onChange={e => setEditingItem({ ...editingItem, institution: e.target.value })}
                    placeholder="e.g. Aurora Deemed to be University / Sri Chaitanya"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Campus / Branch
                  </label>
                  <input
                    type="text"
                    value={editingItem.campus || ''}
                    onChange={e => setEditingItem({ ...editingItem, campus: e.target.value })}
                    placeholder="e.g. Abdul Kalam Campus"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.location || ''}
                    onChange={e => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="e.g. Bhongir, Hyderabad, Telangana"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Start Year
                  </label>
                  <input
                    type="text"
                    value={editingItem.start_year || ''}
                    onChange={e => setEditingItem({ ...editingItem, start_year: e.target.value })}
                    placeholder="e.g. 2025"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    End Year / Expected
                  </label>
                  <input
                    type="text"
                    value={editingItem.end_year || ''}
                    onChange={e => setEditingItem({ ...editingItem, end_year: e.target.value })}
                    placeholder="e.g. 2029 / Present"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Marks Obtained
                  </label>
                  <input
                    type="text"
                    value={editingItem.marks || ''}
                    onChange={e => setEditingItem({ ...editingItem, marks: e.target.value })}
                    placeholder="e.g. 832 / 1000 or 428 / 600"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Percentage / CGPA
                  </label>
                  <input
                    type="text"
                    value={editingItem.percentage || ''}
                    onChange={e => setEditingItem({ ...editingItem, percentage: e.target.value })}
                    placeholder="e.g. 83.2% or 8.5 CGPA"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Additional Academic Highlights
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Key achievements, subjects, or notes..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {educationList.map(item => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft flex items-start justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600">
                  <GraduationCap className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.degree}
                  </h3>
                  <p className="text-xs text-primary-600 font-semibold">
                    {item.institution} {item.campus ? `• ${item.campus}` : ''}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-2">
                <span>📍 {item.location}</span>
                <span>📅 {item.start_year} - {item.end_year || 'Present'}</span>
                {item.percentage && <span className="font-bold text-slate-700 dark:text-slate-300">Score: {item.percentage}</span>}
                {item.marks && <span>(Marks: {item.marks})</span>}
              </div>

              {item.description && (
                <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                  {item.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingItem(item)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteTargetId(item.id)}
                className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Education Entry"
        message="Are you sure you want to remove this academic record? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
