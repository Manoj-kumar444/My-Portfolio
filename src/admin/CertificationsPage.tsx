import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Award, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Certification } from '../types';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const CertificationsPage: React.FC = () => {
  const { certifications, addCertification, updateCertification, deleteCertification } = useData();
  const [editingCert, setEditingCert] = useState<Partial<Certification> | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleOpenNew = () => {
    setEditingCert({
      title: '',
      organization: '',
      year: new Date().getFullYear().toString(),
      credential_id: '',
      credential_url: '',
      description: '',
      is_featured: false,
      is_published: true,
      order_index: certifications.length + 1
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert || !editingCert.title || !editingCert.organization) return;

    if (editingCert.id) {
      updateCertification(editingCert.id, editingCert);
    } else {
      addCertification(editingCert as Omit<Certification, 'id'>);
    }
    setEditingCert(null);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteCertification(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Certifications Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showcase validated course completions and certificates (Zero fake data policy).
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingCert.id ? 'Edit Certification' : 'Add New Certification'}
              </h3>
              <button
                onClick={() => setEditingCert(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Certification Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.title || ''}
                  onChange={e => setEditingCert({ ...editingCert, title: e.target.value })}
                  placeholder="e.g. Database Management Systems Specialization"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCert.organization || ''}
                    onChange={e => setEditingCert({ ...editingCert, organization: e.target.value })}
                    placeholder="e.g. Coursera / NPTEL / IBM"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Year / Issue Date
                  </label>
                  <input
                    type="text"
                    value={editingCert.year || ''}
                    onChange={e => setEditingCert({ ...editingCert, year: e.target.value })}
                    placeholder="e.g. 2025"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Credential Verification URL
                </label>
                <input
                  type="text"
                  value={editingCert.credential_url || ''}
                  onChange={e => setEditingCert({ ...editingCert, credential_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingCert.description || ''}
                  onChange={e => setEditingCert({ ...editingCert, description: e.target.value })}
                  placeholder="Brief description of skills covered..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={editingCert.is_published ?? true}
                    onChange={e => setEditingCert({ ...editingCert, is_published: e.target.checked })}
                    className="w-4 h-4 rounded text-primary-600"
                  />
                  <span>Published on Website</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md"
                >
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {certifications.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl space-y-3">
          <Award className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No certifications added yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            The public site will display an elegant empty state until you add your completed credentials.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map(c => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">{c.year}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingCert(c)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(c.id)}
                      className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {c.title}
                </h3>
                <p className="text-xs font-semibold text-primary-600">{c.organization}</p>
                {c.description && <p className="text-xs text-slate-500 mt-2">{c.description}</p>}
              </div>

              {c.credential_url && (
                <a
                  href={c.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-primary-600 hover:text-primary-700"
                >
                  Verify Link ↗
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Certification"
        message="Are you sure you want to delete this certification record?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
