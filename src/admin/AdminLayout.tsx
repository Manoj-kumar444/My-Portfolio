import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, User, Home, Info, Menu, GraduationCap, 
  Code2, FolderGit2, Award, Briefcase, Trophy, BookOpen, 
  Wrench, Mail, FileText, Share2, Image, Palette, 
  ToggleLeft, Globe, Settings, History, LogOut, Sun, Moon, 
  ExternalLink, X, ShieldCheck, Menu as HamburgerIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { unreadMessagesCount } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Declarative Protected Route Guard
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  interface NavItem {
    label: string;
    path: string;
    icon: any;
    exact?: boolean;
    badge?: number;
  }
  interface NavGroup {
    group: string;
    items: NavItem[];
  }

  const navGroups: NavGroup[] = [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, exact: true }
      ]
    },
    {
      group: 'Core Information',
      items: [
        { label: 'Personal Profile', path: '/admin/profile', icon: User },
        { label: 'Hero / Home Section', path: '/admin/home', icon: Home },
        { label: 'About Section', path: '/admin/about', icon: Info },
        { label: 'Navigation Menu', path: '/admin/navigation', icon: Menu }
      ]
    },
    {
      group: 'Portfolio Content',
      items: [
        { label: 'Education', path: '/admin/education', icon: GraduationCap },
        { label: 'Skills & Tech Stack', path: '/admin/skills', icon: Code2 },
        { label: 'Projects & Work', path: '/admin/projects', icon: FolderGit2 },
        { label: 'Certifications', path: '/admin/certifications', icon: Award },
        { label: 'Experience & Roles', path: '/admin/experience', icon: Briefcase },
        { label: 'Achievements', path: '/admin/achievements', icon: Trophy },
        { label: 'Learning Timeline', path: '/admin/learning', icon: BookOpen },
        { label: 'Services', path: '/admin/services', icon: Wrench }
      ]
    },
    {
      group: 'Communications & Media',
      items: [
        { 
          label: 'Messages Inbox', 
          path: '/admin/messages', 
          icon: Mail, 
          badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined 
        },
        { label: 'Resume Manager', path: '/admin/resume', icon: FileText },
        { label: 'Social Links', path: '/admin/social-links', icon: Share2 },
        { label: 'Media Library', path: '/admin/media', icon: Image }
      ]
    },
    {
      group: 'Configuration & System',
      items: [
        { label: 'Appearance & Themes', path: '/admin/appearance', icon: Palette },
        { label: 'Section Visibility', path: '/admin/sections', icon: ToggleLeft },
        { label: 'SEO & Metadata', path: '/admin/seo', icon: Globe },
        { label: 'Settings & Backups', path: '/admin/settings', icon: Settings },
        { label: 'Activity Audit Log', path: '/admin/activity-log', icon: History }
      ]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col lg:flex-row text-slate-800 dark:text-slate-200">
      
      {/* Mobile Header Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <HamburgerIcon className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold text-xs">
              SMK
            </span>
            <span className="font-bold text-sm text-slate-900 dark:text-white">Admin CMS</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            to="/"
            target="_blank"
            className="p-2 rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-400"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Sidebar Backdrop on Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden animate-fadeIn"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-primary-500/20">
              SMK
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>SMK Admin</span>
                <ShieldCheck className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Content Management</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links Scroll Area */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                {group.group}
              </p>
              {group.items.map((item, iIdx) => {
                const IconComp = item.icon;
                const isActive = item.exact 
                  ? (location.pathname === item.path || (item.path === '/admin/dashboard' && location.pathname === '/admin'))
                  : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={iIdx}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComp className={`w-4 h-4 ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-600 text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[140px]">
                {user?.email || 'Admin Active'}
              </span>
            </div>
            <button
              onClick={toggleTheme}
              title="Toggle Theme"
              className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary-600"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition shadow-xs"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition shadow-xs"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
