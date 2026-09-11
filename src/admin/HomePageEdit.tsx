import React, { useState, useEffect, useRef } from 'react';
import { Save, CheckCircle2, Upload, Image as ImageIcon, Trash2, Link as LinkIcon, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useData } from '../context/DataContext';
import { dataService } from '../lib/dataService';
import { normalizeImageUrl, processImageFile } from '../lib/imageHelper';

export const HomePageEdit: React.FC = () => {
  const { homeContent, updateHomeContent, profile } = useData();
  const [formData, setFormData] = useState({ ...homeContent });
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (homeContent) {
      setFormData({ ...homeContent });
      setImageError(false);
    }
  }, [homeContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => {
      const updatedVal = name === 'profile_image_url' ? normalizeImageUrl(value) : value;
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : updatedVal
      };
    });

    if (name === 'profile_image_url') {
      setImageError(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const dataUrl = await processImageFile(file);
      setFormData(prev => ({
        ...prev,
        profile_image_url: dataUrl
      }));
      setImageError(false);
    } catch (err) {
      console.error('Failed to process image:', err);
      alert('Could not process the selected image. Please try another file.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleClearImage = () => {
    setFormData(prev => ({
      ...prev,
      profile_image_url: ''
    }));
    setImageError(false);
  };

  const handleUseProfilePhoto = () => {
    if (profile.profile_photo) {
      setFormData(prev => ({
        ...prev,
        profile_image_url: profile.profile_photo
      }));
      setImageError(false);
    } else {
      alert('No profile photo set in Profile Settings yet.');
    }
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        ...formData,
        profile_image_url: normalizeImageUrl(formData.profile_image_url || ''),
        image_fit: formData.image_fit || 'top'
      };

      dataService.updateHomeContent(payload);
      updateHomeContent(payload);

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setIsSaving(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to save home content:', err);
      setIsSaving(false);
    }
  };

  const currentImgSrc = (formData.profile_image_url || '').trim();
  const fitMode = formData.image_fit || 'top';

  const getPreviewFitClass = () => {
    if (fitMode === 'contain') return 'w-full h-full object-contain bg-slate-100 dark:bg-slate-800';
    if (fitMode === 'cover') return 'w-full h-full object-cover object-center';
    return 'w-full h-full object-cover object-top';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Hero & Home Content Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Customize main banner text, call-to-actions, and your full portrait Hero profile photo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 shadow-sm animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Saved!</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition active:scale-95 ${
              saved
                ? 'bg-emerald-600 text-white'
                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-500/25'
            }`}
          >
            {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Saved!' : isSaving ? 'Saving...' : 'Save Hero Content'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Full Hero Profile Photo Card */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary-600" />
                <span>Full Hero Profile Photo</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Displays your full portrait picture without cutting off your face or head.
              </p>
            </div>
            {currentImgSrc && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                Full Image Active
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Live Portrait Preview Box */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between w-full px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Full Portrait Preview
                </span>
                <span className="text-[10px] text-primary-600 font-semibold uppercase">
                  {fitMode === 'top' ? 'Top Aligned' : fitMode === 'contain' ? 'Uncropped' : 'Centered'}
                </span>
              </div>

              {/* Exact Hero Aspect Ratio 3:4 */}
              <div className="relative w-full max-w-[240px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-700 flex items-center justify-center bg-slate-200 dark:bg-slate-800">
                {currentImgSrc && !imageError ? (
                  <img
                    src={currentImgSrc}
                    alt="Hero Portrait Preview"
                    onError={() => setImageError(true)}
                    className={getPreviewFitClass()}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-primary-700 via-primary-600 to-blue-500 flex flex-col items-center justify-center text-white text-center p-3">
                    <div className="text-3xl font-black tracking-wider">SMK</div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-primary-100 mt-1">
                      Default Badge
                    </span>
                  </div>
                )}
              </div>

              {imageError && currentImgSrc && (
                <p className="text-[11px] text-rose-500 font-semibold text-center">
                  ⚠️ Image URL failed to load. Falling back to default badge.
                </p>
              )}
            </div>

            {/* Controls & Inputs */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Image Fit Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-primary-600" />
                  <span>Image Crop / Display Mode</span>
                </label>
                <select
                  name="image_fit"
                  value={formData.image_fit || 'top'}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  <option value="top">🌟 Full Portrait (Focus Top - No Head Cut-off)</option>
                  <option value="contain">🖼️ 100% Uncropped (Contain Full Photo with background)</option>
                  <option value="cover">🎯 Centered Fill (Crop to Center)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Choose <b>Full Portrait</b> to ensure your entire head, face, and shirt are completely visible.
                </p>
              </div>

              {/* File Upload Option */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Upload Photo from Computer
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="hero-file-upload"
                  />
                  <label
                    htmlFor="hero-file-upload"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition shadow-sm ${
                      isUploading
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700 text-white'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isUploading ? 'Processing Image...' : 'Choose Image File'}</span>
                  </label>

                  {profile.profile_photo && profile.profile_photo !== currentImgSrc && (
                    <button
                      type="button"
                      onClick={handleUseProfilePhoto}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                      <span>Use Profile Photo</span>
                    </button>
                  )}

                  {currentImgSrc && (
                    <button
                      type="button"
                      onClick={handleClearImage}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Photo</span>
                    </button>
                  )}
                </div>
              </div>

              {/* URL Input Option */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Or Paste Public Image URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="profile_image_url"
                    value={formData.profile_image_url || ''}
                    onChange={handleChange}
                    placeholder="https://... or Google Drive link"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Text Content Card */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Greeting Text
              </label>
              <input
                type="text"
                name="greeting"
                value={formData.greeting || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Main Name / Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Professional Subtitle
              </label>
              <input
                type="text"
                name="professional_title"
                value={formData.professional_title || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Hero Introduction Paragraph
            </label>
            <textarea
              name="hero_description"
              rows={3}
              value={formData.hero_description || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Primary Button Text
              </label>
              <input
                type="text"
                name="primary_btn_text"
                value={formData.primary_btn_text || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Primary Button Link (Anchor or URL)
              </label>
              <input
                type="text"
                name="primary_btn_link"
                value={formData.primary_btn_link || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Secondary Button Text
              </label>
              <input
                type="text"
                name="secondary_btn_text"
                value={formData.secondary_btn_text || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Secondary Button Link (Anchor or URL)
              </label>
              <input
                type="text"
                name="secondary_btn_link"
                value={formData.secondary_btn_link || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                name="resume_btn_enabled"
                checked={formData.resume_btn_enabled || false}
                onChange={handleChange}
                className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
              />
              <span>Enable Resume Download Button</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                name="hero_visible"
                checked={formData.hero_visible || false}
                onChange={handleChange}
                className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
              />
              <span>Hero Section Visible</span>
            </label>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="submit"
              disabled={isSaving}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition active:scale-95 ${
                saved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-500/25'
              }`}
            >
              {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{saved ? 'Saved Successfully!' : isSaving ? 'Saving...' : 'Save Hero Content'}</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
