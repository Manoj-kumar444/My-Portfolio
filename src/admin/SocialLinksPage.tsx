import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, CheckCircle2, Globe, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SocialLink } from '../types';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { DynamicIcon } from '../components/common/DynamicIcon';

export const SocialLinksPage: React.FC = () => {
  const { socialLinks, addSocialLink, updateSocialLink, deleteSocialLink } = useData();
  const [editingLink, setEditingLink] = useState<Partial<SocialLink> | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const platforms = [
    { name: 'GitHub', icon: 'github', placeholder: 'https://github.com/manojkumar' },
    { name: 'LinkedIn', icon: 'linkedin', placeholder: 'https://linkedin.com/in/manojkumar' },
    { name: 'LeetCode', icon: 'leetcode', placeholder: 'https://leetcode.com/u/manojkumar' },
    { name: 'Email', icon: 'mail', placeholder: 'mailto:16manojkumars@gmail.com' },
    { name: 'Twitter / X', icon: 'twitter', placeholder: 'https://x.com/manojkumar' },
    { name: 'Instagram', icon: 'instagram', placeholder: 'https://instagram.com/manojkumar' },
    { name: 'YouTube', icon: 'youtube', placeholder: 'https://youtube.com/@manojkumar' },
    { name: 'Discord', icon: 'discord', placeholder: 'https://discord.gg/...' },
    { name: 'Telegram', icon: 'telegram', placeholder: 'https://t.me/manojkumar' },
    { name: 'WhatsApp', icon: 'whatsapp', placeholder: 'https://wa.me/919440760898' },
    { name: 'Kaggle', icon: 'kaggle', placeholder: 'https://kaggle.com/manojkumar' },
    { name: 'Personal Website', icon: 'globe', placeholder: 'https://manojkumar.dev' }
  ];

  const handleOpenNew = () => {
    setEditingLink({
      platform: 'GitHub',
      label: 'GitHub Profile',
      url: '',
      icon: 'github',
      is_enabled: true,
      order_index: socialLinks.length + 1
    });
  };

  const handleSelectPreset = (preset: typeof platforms[0]) => {
    setEditingLink(prev => ({
      ...prev,
      platform: preset.name,
      label: preset.name,
      icon: preset.icon,
      url: prev?.url || ''
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink || !editingLink.url || !editingLink.platform) {
      alert('Please provide both the Platform and Profile URL.');
      return;
    }

    const payload = {
      ...editingLink,
      icon: editingLink.icon || editingLink.platform.toLowerCase()
    };

    if (editingLink.id) {
      updateSocialLink(editingLink.id, payload);
    } else {
      addSocialLink(payload as Omit<SocialLink, 'id'>);
    }
    setEditingLink(null);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteSocialLink(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Social Profiles & Brand Logos
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your verified social profiles with official brand logos (GitHub, LinkedIn, LeetCode, Email, etc.).
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Social Link</span>
        </button>
      </div>

      {editingLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-600">
                  <DynamicIcon name={editingLink.icon || editingLink.platform} className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editingLink.id ? 'Edit Social Link' : 'Add Social Link & Logo'}
                </h3>
              </div>
              <button
                onClick={() => setEditingLink(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Quick Platform Select
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {platforms.map(p => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => handleSelectPreset(p)}
                    className={`flex items-center gap-1.5 p-2 rounded-xl border text-xs font-bold transition ${
                      editingLink.platform === p.name || editingLink.icon === p.icon
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <DynamicIcon name={p.icon} className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{p.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4 pt-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Platform Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingLink.platform || ''}
                    onChange={e => setEditingLink({ ...editingLink, platform: e.target.value, label: e.target.value })}
                    placeholder="e.g. GitHub / LinkedIn / LeetCode"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Icon Keyword / Brand
                  </label>
                  <input
                    type="text"
                    value={editingLink.icon || ''}
                    onChange={e => setEditingLink({ ...editingLink, icon: e.target.value })}
                    placeholder="github / linkedin / leetcode / mail"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Profile URL / Link *
                </label>
                <input
                  type="text"
                  required
                  value={editingLink.url || ''}
                  onChange={e => setEditingLink({ ...editingLink, url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="link_enabled"
                  checked={editingLink.is_enabled ?? true}
                  onChange={e => setEditingLink({ ...editingLink, is_enabled: e.target.checked })}
                  className="w-4 h-4 rounded text-primary-600"
                />
                <label htmlFor="link_enabled" className="text-xs font-semibold cursor-pointer">
                  Visible on public website
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingLink(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md active:scale-95"
                >
                  Save Link & Logo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Social Links List */}
      <div className="space-y-3">
        {socialLinks.map(link => (
          <div
            key={link.id}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 shrink-0">
                <DynamicIcon name={link.icon || link.platform} className="w-5 h-5" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {link.platform}
                  </h4>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      link.is_enabled && link.url
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                    }`}
                  >
                    {link.is_enabled && link.url ? 'Active' : !link.url ? 'No URL' : 'Hidden'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate max-w-md font-mono">
                  {link.url || 'No URL configured'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {link.url && (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-primary-600"
                  title="Open Link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => setEditingLink(link)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600"
                title="Edit Link"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteTargetId(link.id)}
                className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100"
                title="Delete Link"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Social Profile"
        message="Are you sure you want to remove this social link?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
