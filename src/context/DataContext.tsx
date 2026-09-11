import { supabaseSync } from '../lib/supabaseSync';
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Profile,
  HomeContent,
  AboutContent,
  NavigationItem,
  Education,
  Skill,
  Project,
  Certification,
  Experience,
  Achievement,
  LearningTopic,
  Service,
  SocialLink,
  Resume,
  Message,
  MediaItem,
  WebsiteSettings,
  SectionSettings,
  SeoSettings,
  FooterSettings,
  ActivityLog
} from '../types';
import { dataService } from '../lib/dataService';

interface DataContextType {
  profile: Profile;
  updateProfile: (data: Partial<Profile>) => Profile;
  homeContent: HomeContent;
  updateHomeContent: (data: Partial<HomeContent>) => HomeContent;
  aboutContent: AboutContent;
  updateAboutContent: (data: Partial<AboutContent>) => AboutContent;
  navigation: NavigationItem[];
  navigationItems: NavigationItem[];
  updateNavigation: (items: NavigationItem[]) => void;
  updateNavigationItems: (items: NavigationItem[]) => void;
  addNavigationItem: (item: Omit<NavigationItem, 'id'>) => NavigationItem;
  deleteNavigationItem: (id: string) => void;
  education: Education[];
  educationList: Education[];
  addEducation: (data: Omit<Education, 'id'>) => Education;
  updateEducation: (id: string, data: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  skills: Skill[];
  addSkill: (data: Omit<Skill, 'id'>) => Skill;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  projects: Project[];
  publishedProjects: Project[];
  addProject: (data: Omit<Project, 'id' | 'slug'>) => Project;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => Project | null;
  certifications: Certification[];
  publishedCertifications: Certification[];
  addCertification: (data: Omit<Certification, 'id'>) => Certification;
  updateCertification: (id: string, data: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
  experience: Experience[];
  experienceList: Experience[];
  publishedExperience: Experience[];
  addExperience: (data: Omit<Experience, 'id'>) => Experience;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  achievements: Achievement[];
  publishedAchievements: Achievement[];
  addAchievement: (data: Omit<Achievement, 'id'>) => Achievement;
  updateAchievement: (id: string, data: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
  learning: LearningTopic[];
  learningTopics: LearningTopic[];
  addLearning: (data: Omit<LearningTopic, 'id'>) => LearningTopic;
  addLearningTopic: (data: Omit<LearningTopic, 'id'>) => LearningTopic;
  updateLearning: (id: string, data: Partial<LearningTopic>) => void;
  updateLearningTopic: (id: string, data: Partial<LearningTopic>) => void;
  deleteLearning: (id: string) => void;
  deleteLearningTopic: (id: string) => void;
  services: Service[];
  enabledServices: Service[];
  addService: (data: Omit<Service, 'id'>) => Service;
  updateService: (id: string, data: Partial<Service>) => void;
  deleteService: (id: string) => void;
  socialLinks: SocialLink[];
  activeSocialLinks: SocialLink[];
  addSocialLink: (data: Omit<SocialLink, 'id'>) => SocialLink;
  updateSocialLink: (id: string, data: Partial<SocialLink>) => void;
  deleteSocialLink: (id: string) => void;
  resumes: Resume[];
  resumeList: Resume[];
  activeResume: Resume | undefined;
  addResume: (data: Omit<Resume, 'id' | 'uploaded_at'>) => Resume;
  setActiveResume: (id: string) => void;
  deleteResume: (id: string) => void;
  messages: Message[];
  unreadMessagesCount: number;
  unreadMessageCount: number;
  addMessage: (data: Omit<Message, 'id' | 'created_at' | 'is_read'>) => Message;
  markMessageRead: (id: string, is_read: boolean) => void;
  toggleMessageStar: (id: string) => void;
  toggleMessageArchive: (id: string) => void;
  deleteMessage: (id: string) => void;
  media: MediaItem[];
  mediaItems: MediaItem[];
  addMediaItem: (data: { title: string; url: string; media_type?: string }) => MediaItem;
  deleteMediaItem: (id: string) => void;
  websiteSettings: WebsiteSettings;
  updateWebsiteSettings: (data: Partial<WebsiteSettings>) => WebsiteSettings;
  sectionSettings: SectionSettings;
  updateSectionSettings: (data: Partial<SectionSettings>) => SectionSettings;
  seoSettings: SeoSettings;
  updateSeoSettings: (data: Partial<SeoSettings>) => SeoSettings;
  footerSettings: FooterSettings;
  updateFooterSettings: (data: Partial<FooterSettings>) => FooterSettings;
  activityLogs: ActivityLog[];
  clearActivityLogs: () => void;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, setDataVersion] = useState(0);

  useEffect(() => {
    // 1. Initial Cloud Sync from Supabase if connected
    supabaseSync.fetchFromSupabase().then(() => {
      setDataVersion(v => v + 1);
    }).catch(() => {});

    // 2. Subscribe to Supabase Cloud Postgres Realtime changes
    const unsubscribeCloud = supabaseSync.subscribeToRealtime(() => {
      setDataVersion(v => v + 1);
    });

    // 3. Subscribe to local data events
    const unsubscribeLocal = dataService.subscribe(() => {
      setDataVersion(v => v + 1);
    });

    return () => {
      if (unsubscribeCloud) unsubscribeCloud();
      if (unsubscribeLocal) unsubscribeLocal();
    };
  }, []);

  const refreshData = () => {
    setDataVersion(v => v + 1);
  };

  const profile = dataService.getProfile();
  const homeContent = dataService.getHomeContent();
  const aboutContent = dataService.getAboutContent();
  const navigation = dataService.getNavigation();
  const education = dataService.getEducation();
  const skills = dataService.getSkills();
  const projects = dataService.getProjects();
  const publishedProjects = dataService.getPublishedProjects();
  const certifications = dataService.getCertifications();
  const publishedCertifications = dataService.getPublishedCertifications();
  const experience = dataService.getExperience();
  const publishedExperience = dataService.getPublishedExperience();
  const achievements = dataService.getAchievements();
  const publishedAchievements = dataService.getPublishedAchievements();
  const learning = dataService.getLearning();
  const services = dataService.getServices();
  const enabledServices = dataService.getEnabledServices();
  const socialLinks = dataService.getSocialLinks();
  const activeSocialLinks = dataService.getActiveSocialLinks();
  const resumes = dataService.getResumes();
  const activeResume = dataService.getActiveResume();
  const messages = dataService.getMessages();
  const unreadMessagesCount = messages.filter(m => !m.is_read).length;
  const unreadMessageCount = unreadMessagesCount;
  const media = dataService.getMedia();
  const sectionSettings = dataService.getSectionSettings();
  const seoSettings = dataService.getSeoSettings();
  const footerSettings = dataService.getFooterSettings();
  const activityLogs = dataService.getActivityLogs();

  const value: DataContextType = {
    profile,
    updateProfile: (data) => dataService.updateProfile(data),
    homeContent,
    updateHomeContent: (data) => dataService.updateHomeContent(data),
    aboutContent,
    updateAboutContent: (data) => dataService.updateAboutContent(data),
    navigation,
    navigationItems: navigation,
    updateNavigation: (items) => dataService.updateNavigation(items),
    updateNavigationItems: (items) => dataService.updateNavigation(items),
    addNavigationItem: (item) => dataService.addNavigationItem(item),
    deleteNavigationItem: (id) => dataService.deleteNavigationItem(id),
    education,
    educationList: education,
    addEducation: (data) => dataService.addEducation(data),
    updateEducation: (id, data) => {
      const target = education.find(e => e.id === id);
      if (target) dataService.updateEducation({ ...target, ...data });
    },
    deleteEducation: (id) => dataService.deleteEducation(id),
    skills,
    addSkill: (data) => dataService.addSkill(data),
    updateSkill: (id, data) => {
      const target = skills.find(s => s.id === id);
      if (target) dataService.updateSkill({ ...target, ...data });
    },
    deleteSkill: (id) => dataService.deleteSkill(id),
    projects,
    publishedProjects,
    addProject: (data) => dataService.addProject(data),
    updateProject: (id, data) => {
      const target = projects.find(p => p.id === id);
      if (target) dataService.updateProject({ ...target, ...data });
    },
    deleteProject: (id) => dataService.deleteProject(id),
    duplicateProject: (id) => dataService.duplicateProject(id),
    certifications,
    publishedCertifications,
    addCertification: (data) => dataService.addCertification(data),
    updateCertification: (id, data) => {
      const target = certifications.find(c => c.id === id);
      if (target) dataService.updateCertification({ ...target, ...data });
    },
    deleteCertification: (id) => dataService.deleteCertification(id),
    experience,
    experienceList: experience,
    publishedExperience,
    addExperience: (data) => dataService.addExperience(data),
    updateExperience: (id, data) => {
      const target = experience.find(e => e.id === id);
      if (target) dataService.updateExperience({ ...target, ...data });
    },
    deleteExperience: (id) => dataService.deleteExperience(id),
    achievements,
    publishedAchievements,
    addAchievement: (data) => dataService.addAchievement(data),
    updateAchievement: (id, data) => {
      const target = achievements.find(a => a.id === id);
      if (target) dataService.updateAchievement({ ...target, ...data });
    },
    deleteAchievement: (id) => dataService.deleteAchievement(id),
    learning,
    learningTopics: learning,
    addLearning: (data) => dataService.addLearning(data),
    addLearningTopic: (data) => dataService.addLearning({
      ...data,
      topic: (data as any).topic_name || data.topic || 'New Topic',
      progress: (data as any).progress_percentage || data.progress || 50
    }),
    updateLearning: (id, data) => {
      const target = learning.find(l => l.id === id);
      if (target) dataService.updateLearning({ ...target, ...data });
    },
    updateLearningTopic: (id, data) => {
      const target = learning.find(l => l.id === id);
      if (target) {
        dataService.updateLearning({
          ...target,
          ...data,
          topic: (data as any).topic_name || data.topic || target.topic,
          progress: (data as any).progress_percentage || data.progress || target.progress
        });
      }
    },
    deleteLearning: (id) => dataService.deleteLearning(id),
    deleteLearningTopic: (id) => dataService.deleteLearning(id),
    services,
    enabledServices,
    addService: (data) => dataService.addService(data),
    updateService: (id, data) => {
      const target = services.find(s => s.id === id);
      if (target) dataService.updateService({ ...target, ...data });
    },
    deleteService: (id) => dataService.deleteService(id),
    socialLinks,
    activeSocialLinks,
    addSocialLink: (data) => dataService.addSocialLink(data),
    updateSocialLink: (id, data) => {
      const target = socialLinks.find(s => s.id === id);
      if (target) dataService.updateSocialLink({ ...target, ...data });
    },
    deleteSocialLink: (id) => dataService.deleteSocialLink(id),
    resumes,
    resumeList: resumes,
    activeResume,
    addResume: (data) => dataService.addResume(data),
    setActiveResume: (id) => dataService.setActiveResume(id),
    deleteResume: (id) => dataService.deleteResume(id),
    messages,
    unreadMessagesCount,
    unreadMessageCount,
    addMessage: (data) => dataService.addMessage(data),
    markMessageRead: (id, is_read) => dataService.markMessageRead(id, is_read),
    toggleMessageStar: (id) => dataService.toggleMessageStar(id),
    toggleMessageArchive: (id) => dataService.toggleMessageArchive(id),
    deleteMessage: (id) => dataService.deleteMessage(id),
    media,
    mediaItems: media,
    addMediaItem: (data) => dataService.addMedia({
      filename: data.title,
      file_url: data.url,
      file_type: data.media_type || 'image',
      category: 'general'
    }),
    deleteMediaItem: (id) => dataService.deleteMedia(id),
    websiteSettings: dataService.getWebsiteSettings(),
    updateWebsiteSettings: (data) => dataService.updateWebsiteSettings(data),
    sectionSettings,
    updateSectionSettings: (data) => dataService.updateSectionSettings(data),
    seoSettings,
    updateSeoSettings: (data) => dataService.updateSeoSettings(data),
    footerSettings,
    updateFooterSettings: (data) => dataService.updateFooterSettings(data),
    activityLogs,
    clearActivityLogs: () => dataService.clearActivityLogs(),
    refreshData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
