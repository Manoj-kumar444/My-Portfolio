import React, { useState } from 'react';
import { Plus, Edit2, Trash2, FolderGit2, ExternalLink, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Project, ProjectStatus } from '../types';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const ProjectsPage: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  const statuses: ProjectStatus[] = ['Planning', 'In Progress', 'Completed', 'Maintenance'];

  const handleOpenNew = () => {
    setEditingProject({
      title: '',
      slug: '',
      short_description: '',
      full_description: '',
      main_image: '',
      screenshots: [],
      technologies: [],
      features: [],
      category: 'Web Development',
      status: 'In Progress',
      github_url: '',
      demo_url: '',
      video_url: '',
      is_featured: false,
      is_published: true,
      order_index: projects.length + 1
    });
    setTechInput('');
    setFeatureInput('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    const slug = editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload = {
      ...editingProject,
      slug
    };

    if (editingProject.id) {
      updateProject(editingProject.id, payload);
    } else {
      addProject(payload as Omit<Project, 'id'>);
    }
    setEditingProject(null);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteProject(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const addTech = () => {
    if (!techInput.trim() || !editingProject) return;
    setEditingProject({
      ...editingProject,
      technologies: [...(editingProject.technologies || []), techInput.trim()]
    });
    setTechInput('');
  };

  const removeTech = (idx: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      technologies: (editingProject.technologies || []).filter((_, i) => i !== idx)
    });
  };

  const addFeature = () => {
    if (!featureInput.trim() || !editingProject) return;
    setEditingProject({
      ...editingProject,
      features: [...(editingProject.features || []), featureInput.trim()]
    });
    setFeatureInput('');
  };

  const removeFeature = (idx: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      features: (editingProject.features || []).filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Projects Portfolio Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Add, update, or publish your engineering and academic projects with full case study details.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingProject.id ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="e.g. AI Workflow Engine"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.category || ''}
                    onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                    placeholder="e.g. Web Dev / AI / System"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={editingProject.status || 'Completed'}
                    onChange={e => setEditingProject({ ...editingProject, status: e.target.value as ProjectStatus })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  >
                    {statuses.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Main Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.main_image || ''}
                    onChange={e => setEditingProject({ ...editingProject, main_image: e.target.value })}
                    placeholder="https://example.com/cover.jpg"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Short Summary Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.short_description || ''}
                  onChange={e => setEditingProject({ ...editingProject, short_description: e.target.value })}
                  placeholder="Brief 1-2 sentence overview for cards..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    GitHub Repo URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.github_url || ''}
                    onChange={e => setEditingProject({ ...editingProject, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.demo_url || ''}
                    onChange={e => setEditingProject({ ...editingProject, demo_url: e.target.value })}
                    placeholder="https://demo.vercel.app"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Video Demo URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.video_url || ''}
                    onChange={e => setEditingProject({ ...editingProject, video_url: e.target.value })}
                    placeholder="https://youtube.com/..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>
              </div>

              {/* Technologies Tags */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Technologies
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(editingProject.technologies || []).map((tech, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300"
                    >
                      <span>{tech}</span>
                      <button type="button" onClick={() => removeTech(i)} className="hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTech();
                      }
                    }}
                    placeholder="e.g. React, Supabase"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800"
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Key Features
                </label>
                <div className="space-y-1 mb-2">
                  {(editingProject.features || []).map((feat, i) => (
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
                    placeholder="e.g. Real-time Supabase Database Sync"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold"
                  >
                    Add Feature
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={editingProject.is_featured || false}
                    onChange={e => setEditingProject({ ...editingProject, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-primary-600"
                  />
                  <span>Featured Project</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={editingProject.is_published ?? true}
                    onChange={e => setEditingProject({ ...editingProject, is_published: e.target.checked })}
                    className="w-4 h-4 rounded text-primary-600"
                  />
                  <span>Published on Website</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects List / Empty State */}
      {projects.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl space-y-3">
          <FolderGit2 className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No projects added yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click "Add Project" above to create your first verified project case study.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(proj => (
            <div
              key={proj.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft overflow-hidden flex flex-col justify-between"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">
                    {proj.category}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    {proj.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {proj.short_description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {(proj.technologies || []).slice(0, 3).map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {t}
                    </span>
                  ))}
                  {(proj.technologies && proj.technologies.length > 3) && (
                    <span className="text-[10px] text-slate-400">+{proj.technologies.length - 3}</span>
                  )}
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className={`text-xs font-bold ${proj.is_published ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {proj.is_published ? 'Published' : 'Draft'}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingProject(proj)}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-600 border border-slate-200 dark:border-slate-700"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(proj.id)}
                    className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Project"
        message="Are you sure you want to delete this project? All associated media and case study records will be removed."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
