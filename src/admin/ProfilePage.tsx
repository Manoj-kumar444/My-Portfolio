import React, { useState, useEffect, useRef } from 'react';
import { Save, CheckCircle2, Upload, Trash2, Image as ImageIcon, Link as LinkIcon, User } from 'lucide-react';
import { useData } from '../context/DataContext';
import { dataService } from '../lib/dataService';
import { normalizeImageUrl, processImageFile } from '../lib/imageHelper';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, homeContent, updateHomeContent } = useData();
  const [formData, setFormData] = useState({ ...profile });
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setFormData({ ...profile });
      setImageError(false);
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'profile_photo' ? normalizeImageUrl(value) : value
    }));

    if (name === 'profile_photo') {
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
        profile_photo: dataUrl
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

  const handleClearPhoto = () => {
    setFormData(prev => ({
      ...prev,
      profile_photo: ''
    }));
    setImageError(false);
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        ...formData,
        profile_photo: normalizeImageUrl(formData.profile_photo || '')
      };

      // 1. Direct persistence to dataService
      dataService.updateProfile(payload);
      // 2. Context update
      updateProfile(payload);

      // If homeContent has no image, sync it
      if (!homeContent.profile_image_url && payload.profile_photo) {
        dataService.updateHomeContent({ profile_image_url: payload.profile_photo });
        updateHomeContent({ profile_image_url: payload.profile_photo });
      }

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setIsSaving(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to save profile:', err);
      setIsSaving(false);
    }
  };

  const currentImgSrc = (formData.profile_photo || '').trim();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Personal Profile & Identity
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your verified personal details, education background, bio, and profile photo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 shadow-sm animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile Saved!</span>
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
            <span>{saved ? 'Saved!' : isSaving ? 'Saving...' : 'Save Profile Information'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Photo Section */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary-600" />
              <span>Profile Photo & Avatar</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload a picture from your device or specify an image URL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Photo Preview */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-md border-4 border-white dark:border-slate-700 flex items-center justify-center bg-slate-200 dark:bg-slate-800">
                {currentImgSrc && !imageError ? (
                  <img
                    src={currentImgSrc}
                    alt="Profile Preview"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-primary-700 to-blue-600 flex flex-col items-center justify-center text-white">
                    <User className="w-12 h-12 text-white/80" />
                    <span className="text-[10px] font-bold uppercase mt-1 text-primary-100">
                      No Photo
                    </span>
                  </div>
                )}
              </div>

              {imageError && currentImgSrc && (
                <p className="text-[11px] text-rose-500 font-semibold text-center">
                  ⚠️ Invalid image link
                </p>
              )}
            </div>

            {/* Photo Controls */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Upload Photo from Device
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="profile-file-upload"
                  />
                  <label
                    htmlFor="profile-file-upload"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition shadow-sm ${
                      isUploading
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700 text-white'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isUploading ? 'Uploading...' : 'Choose Photo File'}</span>
                  </label>

                  {currentImgSrc && (
                    <button
                      type="button"
                      onClick={handleClearPhoto}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Photo</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Or Paste Photo URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="profile_photo"
                    value={formData.profile_photo || ''}
                    onChange={handleChange}
                    placeholder="https://... or Google Drive link"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Profile Details Form */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                required
                value={formData.full_name || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Degree *
              </label>
              <input
                type="text"
                name="degree"
                required
                value={formData.degree || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Specialization *
              </label>
              <input
                type="text"
                name="specialization"
                required
                value={formData.specialization || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Current Level / Year *
              </label>
              <input
                type="text"
                name="current_year"
                required
                value={formData.current_year || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                University *
              </label>
              <input
                type="text"
                name="university"
                required
                value={formData.university || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Phone Number *
              </label>
              <input
                type="text"
                name="phone"
                required
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Native Location *
              </label>
              <input
                type="text"
                name="native_location"
                required
                value={formData.native_location || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                University Location *
              </label>
              <input
                type="text"
                name="edu_location"
                required
                value={formData.edu_location || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Professional Bio / Summary *
            </label>
            <textarea
              name="bio"
              required
              rows={4}
              value={formData.bio || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-400">
              * Indicates required field. Updates apply immediately to live website.
            </p>

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
              <span>{saved ? 'Saved Successfully!' : isSaving ? 'Saving...' : 'Save Profile Information'}</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
