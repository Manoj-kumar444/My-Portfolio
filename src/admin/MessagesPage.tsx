import React, { useState } from 'react';
import { Mail, Trash2, Star, Archive, Search, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Message } from '../types';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const MessagesPage: React.FC = () => {
  const { messages, markMessageRead, toggleMessageStar, toggleMessageArchive, deleteMessage } = useData();
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread' && msg.is_read) return false;
    if (filter === 'starred' && !msg.is_starred) return false;
    if (filter === 'archived' && !msg.is_archived) return false;
    if (filter !== 'archived' && msg.is_archived) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        msg.name.toLowerCase().includes(q) ||
        msg.email.toLowerCase().includes(q) ||
        msg.subject.toLowerCase().includes(q) ||
        msg.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSelect = (msg: Message) => {
    setSelectedMsg(msg);
    if (!msg.is_read) {
      markMessageRead(msg.id, true);
    }
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteMessage(deleteTargetId);
      if (selectedMsg?.id === deleteTargetId) {
        setSelectedMsg(null);
      }
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Messages & Inquiries Inbox
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time messages submitted via the public portfolio contact form.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'unread', 'starred', 'archived'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
              filter === tab
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid Layout: Messages List & Detail Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* List Column */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 max-h-[650px] overflow-y-auto">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No messages found in this view.
            </div>
          ) : (
            filteredMessages.map(msg => (
              <div
                key={msg.id}
                onClick={() => handleSelect(msg)}
                className={`p-4 cursor-pointer transition flex items-start justify-between gap-3 ${
                  selectedMsg?.id === msg.id
                    ? 'bg-primary-50/70 dark:bg-primary-950/40 border-l-4 border-primary-600'
                    : 'hover:bg-slate-50/60 dark:hover:bg-slate-850'
                } ${!msg.is_read ? 'font-bold' : 'opacity-85'}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {msg.name}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {msg.created_at || 'Recent'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 truncate">
                    {msg.subject}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {msg.message}
                  </p>
                </div>

                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => toggleMessageStar(msg.id)}
                    className={`p-1 rounded ${msg.is_starred ? 'text-amber-500' : 'text-slate-300'}`}
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Details Pane */}
        <div className="lg:col-span-7">
          {selectedMsg ? (
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6 animate-fadeIn">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedMsg.subject}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedMsg.name}</span>
                    <span>&lt;{selectedMsg.email}&gt;</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{selectedMsg.created_at || 'Just now'}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleMessageStar(selectedMsg.id)}
                    className={`p-2 rounded-xl border border-slate-200 dark:border-slate-700 ${
                      selectedMsg.is_starred ? 'bg-amber-50 text-amber-600' : 'text-slate-400'
                    }`}
                  >
                    <Star className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleMessageArchive(selectedMsg.id)}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                    title={selectedMsg.is_archived ? 'Unarchive' : 'Archive'}
                  >
                    <Archive className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeleteTargetId(selectedMsg.id)}
                    className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedMsg.message}
              </div>

              <div className="flex justify-end pt-2">
                <a
                  href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject)}`}
                  className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs shadow-md transition inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-center text-slate-400 text-xs">
              Select a message on the left to read full contents.
            </div>
          )}
        </div>

      </div>

      <ConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Delete Message"
        message="Are you sure you want to permanently delete this message?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
