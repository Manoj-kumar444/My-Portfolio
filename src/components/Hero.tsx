import React, { useState, useEffect } from 'react';
import { ArrowRight, FileDown, MapPin, Mail, GraduationCap } from 'lucide-react';
import { useData } from '../context/DataContext';
import { DynamicIcon } from './common/DynamicIcon';
import { normalizeImageUrl } from '../lib/imageHelper';

export const Hero: React.FC = () => {
  const { homeContent, activeSocialLinks, activeResume, profile } = useData();
  const [imageError, setImageError] = useState(false);

  // Determine active hero image
  const rawImage = homeContent.profile_image_url || profile.profile_photo || '';
  const activeImage = normalizeImageUrl(rawImage).trim();
  const fitMode = homeContent.image_fit || 'top';

  useEffect(() => {
    setImageError(false);
  }, [activeImage]);

  if (!homeContent.hero_visible) return null;

  const handleNav = (link: string) => {
    if (link.startsWith('#')) {
      const el = document.getElementById(link.substring(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(link, '_blank');
    }
  };

  const handleResumeClick = () => {
    if (activeResume?.file_url) {
      window.open(activeResume.file_url, '_blank');
    } else {
      const contact = document.getElementById('contact');
      if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine CSS class based on fitMode
  const getImageFitClass = () => {
    if (fitMode === 'contain') return 'w-full h-full object-contain bg-slate-100 dark:bg-slate-800';
    if (fitMode === 'cover') return 'w-full h-full object-cover object-center';
    return 'w-full h-full object-cover object-top'; // default: 'top' ensures head is never cut off
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200/80 dark:border-primary-800/50 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Undergraduate – 2nd Year CSE (AI & AGI)</span>
            </div>

            {/* Greeting & Headline */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
                {homeContent.greeting || "HELLO, I'M"}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                {homeContent.title || 'Sahukari Manoj Kumar'}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300">
                {homeContent.professional_title || 'B.Tech CSE – AI & AGI Student'}
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              {homeContent.hero_description}
            </p>

            {/* Quick Context Highlights */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium pt-1">
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span>Aurora Deemed to be University</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span>Andhra Pradesh / Telangana</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => handleNav(homeContent.primary_btn_link || '#projects')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition active:translate-y-0"
              >
                <span>{homeContent.primary_btn_text || 'Explore My Projects'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {homeContent.resume_btn_enabled && (
                <button
                  onClick={handleResumeClick}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 shadow-soft hover:-translate-y-0.5 transition active:translate-y-0"
                >
                  <FileDown className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span>{homeContent.secondary_btn_text || 'Download Resume'}</span>
                </button>
              )}
            </div>

            {/* Social Links */}
            {activeSocialLinks.length > 0 && (
              <div className="pt-4 flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Connect:
                </span>
                <div className="flex items-center gap-2">
                  {activeSocialLinks.map(social => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-700 shadow-sm transition hover:scale-105"
                    >
                      <DynamicIcon name={social.icon || social.platform} className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Hero Card Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer Decorative Gradient Border */}
              <div className="relative p-1.5 rounded-3xl bg-gradient-to-b from-primary-500/30 via-slate-200 to-transparent dark:from-primary-500/20 dark:via-slate-800 dark:to-transparent shadow-soft-lg">
                <div className="bg-white dark:bg-slate-900 rounded-[22px] p-6 sm:p-7 space-y-5 border border-slate-100 dark:border-slate-800">
                  
                  {/* Full Portrait Frame */}
                  <div className="flex justify-center">
                    {activeImage && !imageError ? (
                      <div className="relative group w-full max-w-[280px] sm:max-w-[320px]">
                        <div className="w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-md border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <img
                            src={activeImage}
                            alt={profile.full_name || 'Sahukari Manoj Kumar'}
                            onError={() => setImageError(true)}
                            className={`${getImageFitClass()} transition duration-500 group-hover:scale-105`}
                          />
                        </div>
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none" />
                      </div>
                    ) : (
                      <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl bg-gradient-to-tr from-primary-700 via-primary-600 to-blue-500 flex flex-col items-center justify-center text-white shadow-lg border-4 border-white dark:border-slate-800 relative group overflow-hidden">
                        <div className="text-4xl sm:text-5xl font-black tracking-wider">
                          SMK
                        </div>
                        <span className="text-[11px] font-semibold uppercase tracking-widest mt-1 text-primary-100">
                          Portfolio
                        </span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </div>

                  {/* Profile Info Summary */}
                  <div className="text-center space-y-1.5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {profile.full_name || 'Sahukari Manoj Kumar'}
                    </h3>
                    <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                      {profile.specialization || 'CSE – AI & AGI Undergraduate'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {profile.university || 'Aurora Deemed to be University'} • {profile.current_year || '2nd Year'}
                    </p>
                  </div>

                  {/* Mini Skill Tags */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap justify-center gap-1.5">
                    {['Web Dev', 'AI Coding', 'DBMS', 'Supabase', 'Tailwind'].map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Direct Contact Button */}
                  <a
                    href={`mailto:${profile.email || '16manojkumars@gmail.com'}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-primary-700 dark:text-primary-300 bg-primary-50 hover:bg-primary-100 dark:bg-primary-950/60 dark:hover:bg-primary-900/60 transition"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{profile.email || '16manojkumars@gmail.com'}</span>
                  </a>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
