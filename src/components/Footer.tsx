import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { useData } from '../context/DataContext';
import { DynamicIcon } from './common/DynamicIcon';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { footerSettings, navigation, activeSocialLinks, profile } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const enabledNav = navigation.filter(n => n.is_enabled);

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-100 dark:border-slate-900">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
                SMK
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {footerSettings.name || profile.full_name}
              </span>
            </div>
            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              {footerSettings.title || 'B.Tech CSE � AI & AGI Student'}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm font-normal">
              Specializing in Computer Science with a focus on AI & AGI concepts, web development, and modern database tools.
            </p>
            <div className="pt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-primary-600" />
              <a href={'mailto:' + profile.email} className="hover:text-primary-600 transition">
                {profile.email}
              </a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              {enabledNav.map(item => (
                <a
                  key={item.id}
                  href={item.path}
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Social & Portal
            </h4>
            {activeSocialLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {activeSocialLinks.map(soc => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={soc.label}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
                  >
                    <DynamicIcon name={soc.icon || soc.platform} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
            <div>
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary-600 dark:text-slate-400 transition"
              >
                <span>Admin CMS Portal &rarr;</span>
              </Link>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>{footerSettings.copyright_text}</p>

          {footerSettings.back_to_top_enabled && (
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};