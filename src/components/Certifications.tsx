import React from 'react';
import { Award, ExternalLink, Calendar, PlusCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SectionHeading } from './common/SectionHeading';
import { Link } from 'react-router-dom';

export const Certifications: React.FC = () => {
  const { publishedCertifications, sectionSettings } = useData();

  if (!sectionSettings.certifications) return null;

  return (
    <section id="certifications" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Credentials & Courses"
          title="Certifications"
          subtitle="Validated certifications, course completions, and technical credentials"
        />

        {/* Empty State when no certifications exist yet (Requirement 14 & 65) */}
        {publishedCertifications.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center p-10 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl shadow-soft space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-7 h-7" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Certifications will be added soon.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Currently pursuing technical coursework and certifications. Verified credentials will be showcased here upon completion.
              </p>
            </div>

            <div className="pt-1">
              <Link
                to="/admin/certifications"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 hover:bg-primary-100 transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Manage Certifications in Admin</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedCertifications.map(cert => (
              <div
                key={cert.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg hover:border-primary-400 dark:hover:border-primary-600 transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
                      <Award className="w-6 h-6" />
                    </div>
                    {cert.year && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{cert.year}</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {cert.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-primary-600 dark:text-primary-400 mt-0.5">
                      {cert.organization}
                    </p>
                    {cert.description && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                        {cert.description}
                      </p>
                    )}
                  </div>
                </div>

                {cert.credential_url && cert.credential_url.trim().length > 0 && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700 transition"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};