import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderGit2, Code2, Award, Mail, GraduationCap, 
  ExternalLink, PlusCircle, ArrowUpRight, History, 
  ShieldCheck, CheckCircle2, Clock
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const DashboardPage: React.FC = () => {
  const { 
    profile, 
    projects, 
    skills, 
    certifications, 
    messages, 
    unreadMessagesCount,
    activityLogs 
  } = useData();

  const stats = [
    {
      title: 'Total Projects',
      value: projects.length,
      subtitle: `${projects.filter(p => p.is_published).length} Published`,
      icon: FolderGit2,
      path: '/admin/projects',
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400'
    },
    {
      title: 'Skills Configured',
      value: skills.length,
      subtitle: 'Across 4 Categories',
      icon: Code2,
      path: '/admin/skills',
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-400'
    },
    {
      title: 'Certifications',
      value: certifications.length,
      subtitle: `${certifications.filter(c => c.is_published).length} Published`,
      icon: Award,
      path: '/admin/certifications',
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400'
    },
    {
      title: 'Inbox Messages',
      value: messages.length,
      subtitle: `${unreadMessagesCount} Unread`,
      icon: Mail,
      path: '/admin/messages',
      color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-400'
    }
  ];

  const recentMessages = messages.slice(0, 3);
  const recentLogs = activityLogs.slice(0, 5);

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary-600 via-primary-700 to-indigo-700 text-white shadow-xl shadow-primary-600/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-200" />
            <span>Admin Control Center • Single Source of Truth</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {profile.full_name || 'Sahukari Manoj Kumar'}!
          </h1>
          <p className="text-xs sm:text-sm text-primary-100 max-w-xl leading-relaxed">
            Manage your personal portfolio, profile details, academic records, tech skills, and incoming messages seamlessly in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-primary-700 text-xs sm:text-sm font-bold shadow-md hover:bg-primary-50 transition active:scale-95"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <Link
              key={idx}
              to={stat.path}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg hover:border-primary-300 dark:hover:border-primary-700 transition group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {stat.subtitle}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Quick Actions & Overview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-primary-600" />
              <span>Quick Management Actions</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Link
                to="/admin/projects"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-600 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-primary-50/40 transition group"
              >
                <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary-600">
                  + Add New Project
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Publish a new development or academic project
                </p>
              </Link>

              <Link
                to="/admin/skills"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-600 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-primary-50/40 transition group"
              >
                <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary-600">
                  Manage Skills
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Update proficiency levels and tools
                </p>
              </Link>

              <Link
                to="/admin/profile"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-600 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-primary-50/40 transition group"
              >
                <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary-600">
                  Edit Personal Info
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Update bio, location, education status
                </p>
              </Link>

              <Link
                to="/admin/sections"
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-600 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-primary-50/40 transition group"
              >
                <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary-600">
                  Toggle Sections
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Hide or reveal sections on live portfolio
                </p>
              </Link>
            </div>
          </div>

          {/* Recent Inquiries Card */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary-600" />
                <span>Recent Inquiries</span>
              </h3>
              <Link
                to="/admin/messages"
                className="text-xs font-bold text-primary-600 hover:text-primary-700"
              >
                View All Messages ({messages.length})
              </Link>
            </div>

            {recentMessages.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                No messages received yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentMessages.map(msg => (
                  <Link
                    key={msg.id}
                    to="/admin/messages"
                    className="block p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-primary-300 transition"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {msg.name}
                      </p>
                      <span className="text-[10px] text-slate-400">{msg.created_at || 'Recent'}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                      {msg.subject}
                    </p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {msg.message}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Activity Audit Log */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <History className="w-5 h-5 text-primary-600" />
                <span>Recent Activity Log</span>
              </h3>
              <Link
                to="/admin/activity-log"
                className="text-xs font-bold text-primary-600 hover:text-primary-700"
              >
                Full Audit Log
              </Link>
            </div>

            {recentLogs.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                No activity logged yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentLogs.map(log => (
                  <div
                    key={log.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800 text-xs"
                  >
                    <Clock className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        {log.action}
                      </p>
                      <p className="text-slate-500 text-[11px] truncate mt-0.5">
                        {log.details}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {log.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
