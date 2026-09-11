import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';

// Public Page
import { HomePage } from './pages/HomePage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin CMS Pages
import { AdminLayout } from './admin/AdminLayout';
import { DashboardPage } from './admin/DashboardPage';
import { ProfilePage } from './admin/ProfilePage';
import { HomePageEdit } from './admin/HomePageEdit';
import { AboutPageEdit } from './admin/AboutPageEdit';
import { NavigationPage } from './admin/NavigationPage';
import { EducationPage } from './admin/EducationPage';
import { SkillsPage } from './admin/SkillsPage';
import { ProjectsPage } from './admin/ProjectsPage';
import { CertificationsPage } from './admin/CertificationsPage';
import { ExperiencePage } from './admin/ExperiencePage';
import { AchievementsPage } from './admin/AchievementsPage';
import { LearningPage } from './admin/LearningPage';
import { ServicesPage } from './admin/ServicesPage';
import { MessagesPage } from './admin/MessagesPage';
import { ResumePage } from './admin/ResumePage';
import { SocialLinksPage } from './admin/SocialLinksPage';
import { MediaLibraryPage } from './admin/MediaLibraryPage';
import { AppearancePage } from './admin/AppearancePage';
import { SectionsPage } from './admin/SectionsPage';
import { SeoPage } from './admin/SeoPage';
import { SettingsPage } from './admin/SettingsPage';
import { ActivityLogPage } from './admin/ActivityLogPage';

export function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Website */}
              <Route path="/" element={<HomePage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Admin Panel (Protected) */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="home" element={<HomePageEdit />} />
                <Route path="about" element={<AboutPageEdit />} />
                <Route path="navigation" element={<NavigationPage />} />
                <Route path="education" element={<EducationPage />} />
                <Route path="skills" element={<SkillsPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="certifications" element={<CertificationsPage />} />
                <Route path="experience" element={<ExperiencePage />} />
                <Route path="achievements" element={<AchievementsPage />} />
                <Route path="learning" element={<LearningPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="resume" element={<ResumePage />} />
                <Route path="social-links" element={<SocialLinksPage />} />
                <Route path="media" element={<MediaLibraryPage />} />
                <Route path="appearance" element={<AppearancePage />} />
                <Route path="sections" element={<SectionsPage />} />
                <Route path="seo" element={<SeoPage />} />
                <Route path="activity" element={<ActivityLogPage />} />
                <Route path="activity-log" element={<ActivityLogPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
