import React, { useState, useRef } from 'react';
import { Plus, Image as ImageIcon, Copy, Check, Trash2, Upload } from 'lucide-react';
import { useData } from '../context/DataContext';
import { processImageFile } from '../lib/imageHelper';

export const MediaLibraryPage: React.FC = () => {
  const { mediaItems, addMediaItem, deleteMediaItem } = useData();
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    addMediaItem({
      title: newTitle.trim() || 'Portfolio Image',
      url: newUrl.trim(),
      media_type: 'image'
    });
    setNewUrl('');
    setNewTitle('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const dataUrl = await processImageFile(file);
      addMediaItem({
        title: file.name.replace(/\.[^/.]+$/, "") || 'Uploaded Image',
        url: dataUrl,
        media_type: 'image'
      });
    } catch (err) {
      console.error('Failed to upload file:', err);
      alert('Could not upload image file.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Media Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Upload local images from your device or store public URLs. One-click copy URLs to use across projects, avatars, and certificates.
        </p>
      </div>

      {/* Add Media Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Device Upload */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-primary-600" />
              <span>Upload from Device</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select any PNG, JPG, or WEBP image from your computer to store in the portfolio library.
            </p>
          </div>

          <div className="pt-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="media-lib-upload"
            />
            <label
              htmlFor="media-lib-upload"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition shadow-md ${
                isUploading
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'Uploading Image...' : 'Choose Image File'}</span>
            </label>
          </div>
        </div>

        {/* URL Link Add */}
        <form onSubmit={handleAddUrl} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-primary-600" />
            <span>Add via Public Image URL</span>
          </h3>
          <div className="space-y-2">
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Image Title / Label"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="text"
              required
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              placeholder="https://images.unsplash.com/... or Google Drive URL"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition"
          >
            Add URL to Library
          </button>
        </form>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaItems.map(item => (
          <div
            key={item.id}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-soft flex flex-col justify-between group"
          >
            <div className="h-32 bg-slate-100 dark:bg-slate-800 overflow-hidden relative flex items-center justify-center">
              <img
                src={item.url || item.file_url}
                alt={item.title || item.filename}
                className="w-full h-full object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="p-3 space-y-2">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {item.title || item.filename}
              </p>
              <div className="flex items-center justify-between gap-1">
                <button
                  onClick={() => copyToClipboard(item.url || item.file_url || "", item.id)}
                  className="flex items-center gap-1 text-[11px] font-bold text-primary-600 hover:text-primary-700"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                </button>
                <button
                  onClick={() => deleteMediaItem(item.id)}
                  className="p-1 text-slate-400 hover:text-red-500 rounded transition"
                  title="Delete image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
