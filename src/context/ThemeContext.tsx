import React, { createContext, useContext, useState, useEffect } from 'react';
import { WebsiteSettings } from '../types';
import { dataService } from '../lib/dataService';

interface ThemeContextType {
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  toggleDarkMode: () => void;
  isDark: boolean;
  theme: 'light' | 'dark' | 'system';
  toggleTheme: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<WebsiteSettings>(() => dataService.getWebsiteSettings());

  useEffect(() => {
    dataService.applyTheme(settings);
    const unsubscribe = dataService.subscribe(() => {
      const current = dataService.getWebsiteSettings();
      setSettings(current);
      dataService.applyTheme(current);
    });
    return unsubscribe;
  }, []);

  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    const updated = dataService.updateWebsiteSettings(newSettings);
    setSettings(updated);
  };

  const toggleDarkMode = () => {
    const nextTheme = settings.theme === 'dark' ? 'light' : 'dark';
    updateSettings({ theme: nextTheme });
  };

  return (
    <ThemeContext.Provider
      value={{
        settings,
        updateSettings,
        toggleDarkMode,
        isDark: settings.theme === 'dark',
        theme: settings.theme,
        toggleTheme: toggleDarkMode,
        primaryColor: settings.primary_color,
        setPrimaryColor: (color: string) => updateSettings({ primary_color: color })
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
