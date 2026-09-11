import React, { useState } from 'react';
import { ExternalLink, Video, PlusCircle, Code2, ArrowRight, Layers } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SectionHeading } from './common/SectionHeading';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types';
import { Link } from 'react-router-dom';

export const Projects: React.FC = () => {
  const { publishedProjects, sectionSettings } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  if (!sectionSettings.projects) return null;

  const categories = ['All', ...Array.from(new Set(publishedProjects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? publishedProjects
    : publishedProjects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Works"
          title="Projects & Case Studies"
          subtitle="Explore academic and development projects built with AI coding workflows, React, and databases"
        />

        {/* Categories Bar */}
        {publishedProjects.length > 0 && categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Empty State when no projects exist yet (Requirement 14 & 65) */}
        {publishedProjects.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center p-10 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl shadow-soft space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto shadow-sm">
              <Layers className="w-7 h-7" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Projects will be added soon.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Currently building and documenting technical projects in Computer Science Engineering (AI & AGI). Live demos and repositories will be featured here upon release.
              </p>
            </div>

            <div className="pt-1">
              <Link
                to="/admin/projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 hover:bg-primary-100 dark:hover:bg-primary-900/60 transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Projects in Admin Dashboard</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(proj => (
              <div
                key={proj.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    {proj.main_image ? (
                      <img
                        src={proj.main_image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 p-6 text-center">
                        <Code2 className="w-10 h-10 mb-2 opacity-50" />
                        <span className="text-xs font-semibold">{proj.category}</span>
                      </div>
                    )}
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white backdrop-blur-xs shadow-xs border border-slate-200/50 dark:border-slate-700/50">
                        {proj.category}
                      </span>
                    </div>

                    {proj.status && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-primary-600/90 text-white backdrop-blur-xs shadow-xs">
                          {proj.status}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">
                      {proj.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {proj.short_description}
                    </p>

                    {/* Tech Badges */}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.technologies.slice(0, 4).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {proj.technologies.length > 4 && (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-400">
                            +{proj.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalProject(proj)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {proj.github_url && (
                      <a
                        href={proj.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600 border border-slate-200 dark:border-slate-700"
                        title="GitHub Repository"
                      >
                        <Code2 className="w-4 h-4" />
                      </a>
                    )}
                    {proj.demo_url && (
                      <a
                        href={proj.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white transition"
                        title="Live Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
