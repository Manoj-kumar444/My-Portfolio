import React, { useState } from 'react';
import { Plus, FileText, CheckCircle2, Trash2, ExternalLink, Download, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Resume } from '../types';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const ResumePage: React.FC = () => {
  const { resumeList, addResume, setActiveResume, deleteResume } = useData();
  const [editingItem, setEditingItem] = useState<Partial<Resume> | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleOpenNew = () => {
    setEditingItem({
      title: 'Sahukari_Manoj_Kumar_Resume.pdf',
      file_url: '',
      file_size: '150 KB',
      is_active: true
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title || !editingItem.file_url) return;

    addResume(editingItem as Omit<Resume, 'id'>);
    setEditingItem(null);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteResume(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Resume & CV Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your downloadable resume PDF links and versions.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Upload / Link Resume</span>
        </button>
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Add New Resume Version
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
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="Sahukari_Manoj_Kumar_Resume.pdf"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Public PDF URL / Google Drive / Cloudinary URL *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.file_url || ''}
                  onChange={e => setEditingItem({ ...editingItem, file_url: e.target.value })}
                  placeholder="https://drive.google.com/... or https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  File Size
                </label>
                <input
                  type="text"
                  value={editingItem.file_size || ''}
                  onChange={e => setEditingItem({ ...editingItem, file_size: e.target.value })}
                  placeholder="e.g. 180 KB"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
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
                  Save Resume
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {resumeList.map(res => (
          <div
            key={res.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-400">
                  Size: {res.file_size || 'PDF'} • Updated: {res.uploaded_at || 'Recent'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {res.is_active ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Active on Public Site
                </span>
              ) : (
                <button
                  onClick={() => setActiveResume(res.id)}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Set as Active
                </button>
              )}

              {res.file_url && (
                <a
                  href={res.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <button
                onClick={() => setDeleteTargetId(res.id)}
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
        title="Delete Resume"
        message="Are you sure you want to remove this resume record?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
