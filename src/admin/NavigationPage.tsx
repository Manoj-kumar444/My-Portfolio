import React, { useState, useEffect } from 'react';
import { Save, ArrowUp, ArrowDown, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { dataService } from '../lib/dataService';
import { NavigationItem } from '../types';

export const NavigationPage: React.FC = () => {
  const { navigationItems, updateNavigationItems } = useData();
  const [items, setItems] = useState<NavigationItem[]>([...navigationItems]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (navigationItems && navigationItems.length > 0) {
      setItems([...navigationItems]);
    }
  }, [navigationItems]);

  const handleToggle = (id: string) => {
    const updated = items.map(item => item.id === id ? { ...item, is_enabled: !item.is_enabled } : item);
    setItems(updated);
    dataService.updateNavigation(updated);
    updateNavigationItems(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // reindex
    updated.forEach((it, idx) => {
      it.order_index = idx + 1;
    });

    setItems(updated);
    dataService.updateNavigation(updated);
    updateNavigationItems(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSave = () => {
    dataService.updateNavigation(items);
    updateNavigationItems(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Navigation Menu Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Reorder, enable, or disable links displayed in the public header navbar.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold border border-emerald-200 shadow-sm animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved!</span>
            </div>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Navigation</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-center text-xs font-bold text-slate-400">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.label}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    {item.path}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-100"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={idx === items.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-100"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    item.is_enabled
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {item.is_enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
