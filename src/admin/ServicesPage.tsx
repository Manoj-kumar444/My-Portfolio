import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Wrench, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Service } from '../types';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const ServicesPage: React.FC = () => {
  const { services, addService, updateService, deleteService } = useData();
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [featureInput, setFeatureInput] = useState('');

  const handleOpenNew = () => {
    setEditingService({
      name: '',
      description: '',
      icon: 'Layout',
      features: [],
      is_enabled: true,
      order_index: services.length + 1
    });
    setFeatureInput('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.name) return;

    if (editingService.id) {
      updateService(editingService.id, editingService);
    } else {
      addService(editingService as Omit<Service, 'id'>);
    }
    setEditingService(null);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteService(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const addFeature = () => {
    if (!featureInput.trim() || !editingService) return;
    setEditingService({
      ...editingService,
      features: [...(editingService.features || []), featureInput.trim()]
    });
    setFeatureInput('');
  };

  const removeFeature = (idx: number) => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      features: (editingService.features || []).filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Services Management (Optional)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure technical services offered. Can be hidden entirely in Section Settings.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingService.id ? 'Edit Service' : 'Add Service'}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingService.name || ''}
                  onChange={e => setEditingService({ ...editingService, name: e.target.value })}
                  placeholder="e.g. Responsive Frontend Development"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingService.description || ''}
                  onChange={e => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              {/* Features List */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Included Capabilities
                </label>
                <div className="space-y-1 mb-2">
                  {(editingService.features || []).map((feat, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs">
                      <span>• {feat}</span>
                      <button type="button" onClick={() => removeFeature(i)} className="text-red-500">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={e => setFeatureInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                    placeholder="e.g. Modern UI with Tailwind CSS"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="srv_enabled"
                  checked={editingService.is_enabled ?? true}
                  onChange={e => setEditingService({ ...editingService, is_enabled: e.target.checked })}
                  className="w-4 h-4 rounded text-primary-600"
                />
                <label htmlFor="srv_enabled" className="text-xs font-semibold">
                  Enable Service
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map(s => (
          <div
            key={s.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold ${s.is_enabled ? 'text-emerald-600' : 'text-slate-400'}`}>
                {s.is_enabled ? 'Active' : 'Disabled'}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingService(s)}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTargetId(s.id)}
                  className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">{s.name}</h3>
            <p className="text-xs text-slate-500">{s.description}</p>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Service"
        message="Are you sure you want to remove this service?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
