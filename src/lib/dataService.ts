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
  WebsiteSettings,
  SectionSettings,
  SeoSettings,
  FooterSettings,
  Resume,
  Message,
  MediaItem,
  ActivityLog
} from '../types';
import {
  initialProfile,
  initialHomeContent,
  initialAboutContent,
  initialNavigation,
  initialEducation,
  initialSkills,
  initialProjects,
  initialCertifications,
  initialExperience,
  initialAchievements,
  initialLearning,
  initialServices,
  initialSocialLinks,
  initialWebsiteSettings,
  initialSectionSettings,
  initialSeoSettings,
  initialFooterSettings,
  initialResumes,
  initialMessages,
  initialMedia,
  initialActivityLogs
} from './initialData';

const STORAGE_KEYS = {
  PROFILE: 'smk_profile',
  HOME: 'smk_home_content',
  ABOUT: 'smk_about_content',
  NAVIGATION: 'smk_navigation',
  EDUCATION: 'smk_education',
  SKILLS: 'smk_skills',
  PROJECTS: 'smk_projects',
  CERTIFICATIONS: 'smk_certifications',
  EXPERIENCE: 'smk_experience',
  ACHIEVEMENTS: 'smk_achievements',
  LEARNING: 'smk_learning',
  SERVICES: 'smk_services',
  SOCIAL_LINKS: 'smk_social_links',
  WEBSITE_SETTINGS: 'smk_website_settings',
  SECTION_SETTINGS: 'smk_section_settings',
  SEO_SETTINGS: 'smk_seo_settings',
  FOOTER_SETTINGS: 'smk_footer_settings',
  RESUMES: 'smk_resumes',
  MESSAGES: 'smk_messages',
  MEDIA: 'smk_media',
  ACTIVITY_LOGS: 'smk_activity_logs'
};

type Listener = () => void;
const listeners: Set<Listener> = new Set();

// 1. Cross-Tab Real-time Broadcast Channel
const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('smk_portfolio_realtime_sync') : null;

if (syncChannel) {
  syncChannel.onmessage = (event) => {
    if (event.data && event.data.type === 'SMK_SYNC') {
      listeners.forEach(fn => {
        try { fn(); } catch (err) { console.error('Listener error', err); }
      });
    }
  };
}

// 2. Storage event listener for cross-window sync
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key && (event.key.startsWith('smk_') || event.key === 'smk_activity_logs')) {
      listeners.forEach(fn => {
        try { fn(); } catch (err) { console.error('Listener error', err); }
      });
    }
  });
}

function notifyListeners() {
  listeners.forEach(fn => {
    try { fn(); } catch (err) { console.error('Listener error', err); }
  });
  if (syncChannel) {
    try {
      syncChannel.postMessage({ type: 'SMK_SYNC', timestamp: Date.now() });
    } catch {
      // ignore
    }
  }
}

function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifyListeners();
  } catch (err) {
    console.error('Failed to write to localStorage', err);
  }
}

export const dataService = {
  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },

  // 1. Profile
  getProfile(): Profile {
    return getStored<Profile>(STORAGE_KEYS.PROFILE, initialProfile);
  },
  updateProfile(data: Partial<Profile>): Profile {
    const current = this.getProfile();
    const updated = { ...current, ...data, updated_at: new Date().toISOString() };
    setStored(STORAGE_KEYS.PROFILE, updated);
    this.logActivity('Profile Updated', 'Profile', updated.full_name, 'Personal details updated');
    return updated;
  },

  // 2. Home Content
  getHomeContent(): HomeContent {
    return getStored<HomeContent>(STORAGE_KEYS.HOME, initialHomeContent);
  },
  updateHomeContent(data: Partial<HomeContent>): HomeContent {
    const current = this.getHomeContent();
    const updated = { ...current, ...data, updated_at: new Date().toISOString() };
    setStored(STORAGE_KEYS.HOME, updated);
    this.logActivity('Hero Updated', 'Home', updated.title, 'Hero greeting or headline updated');
    return updated;
  },

  // 3. About Content
  getAboutContent(): AboutContent {
    return getStored<AboutContent>(STORAGE_KEYS.ABOUT, initialAboutContent);
  },
  updateAboutContent(data: Partial<AboutContent>): AboutContent {
    const current = this.getAboutContent();
    const updated = { ...current, ...data, updated_at: new Date().toISOString() };
    setStored(STORAGE_KEYS.ABOUT, updated);
    this.logActivity('About Updated', 'About', updated.title, 'About text and interests updated');
    return updated;
  },

  // 4. Navigation
  getNavigation(): NavigationItem[] {
    const items = getStored<NavigationItem[]>(STORAGE_KEYS.NAVIGATION, initialNavigation);
    return items.sort((a, b) => a.order_index - b.order_index);
  },
  updateNavigation(items: NavigationItem[]): void {
    setStored(STORAGE_KEYS.NAVIGATION, items);
    this.logActivity('Navigation Reordered', 'Navigation', items.length + ' items', 'Updated navigation ordering/status');
  },
  addNavigationItem(item: Omit<NavigationItem, 'id'>): NavigationItem {
    const current = this.getNavigation();
    const newItem: NavigationItem = {
      ...item,
      id: 'nav-' + Date.now()
    };
    current.push(newItem);
    setStored(STORAGE_KEYS.NAVIGATION, current);
    this.logActivity('Navigation Added', 'Navigation', newItem.label, 'Added nav link ' + newItem.path);
    return newItem;
  },
  updateNavigationItem(item: NavigationItem): void {
    const current = this.getNavigation().map(n => (n.id === item.id ? item : n));
    setStored(STORAGE_KEYS.NAVIGATION, current);
    this.logActivity('Navigation Item Updated', 'Navigation', item.label, 'Updated nav label/path');
  },
  deleteNavigationItem(id: string): void {
    const target = this.getNavigation().find(n => n.id === id);
    const updated = this.getNavigation().filter(n => n.id !== id);
    setStored(STORAGE_KEYS.NAVIGATION, updated);
    if (target) {
      this.logActivity('Navigation Deleted', 'Navigation', target.label, 'Removed nav item');
    }
  },

  // 5. Education
  getEducation(): Education[] {
    const items = getStored<Education[]>(STORAGE_KEYS.EDUCATION, initialEducation);
    return items.sort((a, b) => a.order_index - b.order_index);
  },
  addEducation(data: Omit<Education, 'id'>): Education {
    const current = this.getEducation();
    const newItem: Education = {
      ...data,
      id: 'edu-' + Date.now()
    };
    current.push(newItem);
    setStored(STORAGE_KEYS.EDUCATION, current);
    this.logActivity('Education Added', 'Education', newItem.degree, 'Added ' + newItem.institution);
    return newItem;
  },
  updateEducation(item: Partial<Education> & { id: string }): void {
    const current = this.getEducation().map(e => (e.id === item.id ? { ...e, ...item } : e));
    setStored(STORAGE_KEYS.EDUCATION, current);
    this.logActivity('Education Updated', 'Education', item.degree || 'Education', 'Updated ' + (item.institution || ''));
  },
  deleteEducation(id: string): void {
    const target = this.getEducation().find(e => e.id === id);
    const updated = this.getEducation().filter(e => e.id !== id);
    setStored(STORAGE_KEYS.EDUCATION, updated);
    if (target) {
      this.logActivity('Education Deleted', 'Education', target.degree, 'Deleted ' + target.institution);
    }
  },

  // 6. Skills
  getSkills(): Skill[] {
    const items = getStored<Skill[]>(STORAGE_KEYS.SKILLS, initialSkills);
    return items.sort((a, b) => a.order_index - b.order_index);
  },
  addSkill(data: Omit<Skill, 'id'>): Skill {
    const current = this.getSkills();
    const newItem: Skill = {
      ...data,
      id: 'sk-' + Date.now()
    };
    current.push(newItem);
    setStored(STORAGE_KEYS.SKILLS, current);
    this.logActivity('Skill Added', 'Skill', newItem.name, 'Added ' + newItem.name + ' under ' + newItem.category);
    return newItem;
  },
  updateSkill(item: Partial<Skill> & { id: string }): void {
    const current = this.getSkills().map(s => (s.id === item.id ? { ...s, ...item } : s));
    setStored(STORAGE_KEYS.SKILLS, current);
    this.logActivity('Skill Updated', 'Skill', item.name || 'Skill', 'Updated skill level');
  },
  deleteSkill(id: string): void {
    const target = this.getSkills().find(s => s.id === id);
    const updated = this.getSkills().filter(s => s.id !== id);
    setStored(STORAGE_KEYS.SKILLS, updated);
    if (target) {
      this.logActivity('Skill Deleted', 'Skill', target.name, 'Deleted skill ' + target.name);
    }
  },

  // 7. Projects
  getProjects(): Project[] {
    const items = getStored<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
    return items.sort((a, b) => a.order_index - b.order_index);
  },
  getPublishedProjects(): Project[] {
    return this.getProjects().filter(p => p.is_published);
  },
  addProject(data: Omit<Project, 'id' | 'slug'>): Project {
    const current = this.getProjects();
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ('proj-' + Date.now());
    const newProj: Project = {
      ...data,
      id: 'proj-' + Date.now(),
      slug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    current.push(newProj);
    setStored(STORAGE_KEYS.PROJECTS, current);
    this.logActivity('Project Created', 'Project', newProj.title, 'Created project with status ' + newProj.status);
    return newProj;
  },
  updateProject(item: Partial<Project> & { id: string }): void {
    const current = this.getProjects().map(p => (p.id === item.id ? { ...p, ...item, updated_at: new Date().toISOString() } : p));
    setStored(STORAGE_KEYS.PROJECTS, current);
    this.logActivity('Project Updated', 'Project', item.title || 'Project', 'Updated project details');
  },
  duplicateProject(id: string): Project | null {
    const target = this.getProjects().find(p => p.id === id);
    if (!target) return null;
    const duplicated: Project = {
      ...target,
      id: 'proj-' + Date.now(),
      title: target.title + ' (Copy)',
      slug: target.slug + '-copy-' + Date.now().toString().slice(-4),
      is_published: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    const current = this.getProjects();
    current.push(duplicated);
    setStored(STORAGE_KEYS.PROJECTS, current);
    this.logActivity('Project Duplicated', 'Project', duplicated.title, 'Duplicated from ' + target.title);
    return duplicated;
  },
  deleteProject(id: string): void {
    const target = this.getProjects().find(p => p.id === id);
    const updated = this.getProjects().filter(p => p.id !== id);
    setStored(STORAGE_KEYS.PROJECTS, updated);
    if (target) {
      this.logActivity('Project Deleted', 'Project', target.title, 'Deleted project');
    }
  },

  // 8. Certifications
  getCertifications(): Certification[] {
    const items = getStored<Certification[]>(STORAGE_KEYS.CERTIFICATIONS, initialCertifications);
    return items.sort((a, b) => a.order_index - b.order_index);
  },
  getPublishedCertifications(): Certification[] {
    return this.getCertifications().filter(c => c.is_published);
  },
  addCertification(data: Omit<Certification, 'id'>): Certification {
    const current = this.getCertifications();
    const newItem: Certification = {
      ...data,
      id: 'cert-' + Date.now()
    };
    current.push(newItem);
    setStored(STORAGE_KEYS.CERTIFICATIONS, current);
    this.logActivity('Certification Added', 'Certification', newItem.title, 'Issued by ' + newItem.organization);
    return newItem;
  },
  updateCertification(item: Partial<Certification> & { id: string }): void {
    const current = this.getCertifications().map(c => (c.id === item.id ? { ...c, ...item } : c));
    setStored(STORAGE_KEYS.CERTIFICATIONS, current);
    this.logActivity('Certification Updated', 'Certification', item.title || 'Certification', 'Updated certification');
  },
  deleteCertification(id: string): void {
    const target = this.getCertifications().find(c => c.id === id);
    const updated = this.getCertifications().filter(c => c.id !== id);
    setStored(STORAGE_KEYS.CERTIFICATIONS, updated);
    if (target) {
      this.logActivity('Certification Deleted', 'Certification', target.title, 'Deleted certificate');
    }
  },

  // 9. Experience
  getExperience(): Experience[] {
    const items = getStored<Experience[]>(STORAGE_KEYS.EXPERIENCE, initialExperience);
    return items.sort((a, b) => a.order_index - b.order_index);
  },
  getPublishedExperience(): Experience[] {
    return this.getExperience().filter(e => e.is_published);
  },
  addExperience(data: Omit<Experience, 'id'>): Experience {
    const current = this.getExperience();
    const newItem: Experience = {
      ...data,
      id: 'exp-' + Date.now()
    };
    current.push(newItem);
    setStored(STORAGE_KEYS.EXPERIENCE, current);
    this.logActivity('Experience Added', 'Experience', newItem.role + ' at ' + newItem.company, 'Added experience record');
    return newItem;
  },
  updateExperience(item: Partial<Experience> & { id: string }): void {
    const current = this.getExperience().map(e => (e.id === item.id ? { ...e, ...item } : e));
    setStored(STORAGE_KEYS.EXPERIENCE, current);
    this.logActivity('Experience Updated', 'Experience', item.company || 'Experience', 'Updated role');
  },
  deleteExperience(id: string): void {
    const target = this.getExperience().find(e => e.id === id);
    const updated = this.getExperience().filter(e => e.id !== id);
    setStored(STORAGE_KEYS.EXPERIENCE, updated);
    if (target) {
      this.logActivity('Experience Deleted', 'Experience', target.role + ' at ' + target.company, 'Deleted experience record');
    }
  },

  // 10. Achievements
  getAchievements(): Achievement[] {
    const items = getStored<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS, initialAchievements);
    return items.sort((a, b) => a.order_index - b.order_index);
  },
  getPublishedAchievements(): Achievement[] {
    return this.getAchievements().filter(a => a.is_published);
  },
  addAchievement(data: Omit<Achievement, 'id'>): Achievement {
    const current = this.getAchievements();
    const newItem: Achievement = {
      ...data,
      id: 'ach-' + Date.now()
    };
    current.push(newItem);
    setStored(STORAGE_KEYS.ACHIEVEMENTS, current);
    this.logActivity('Achievement Added', 'Achievement', newItem.title, 'Category: ' + newItem.category);
    return newItem;
  },
  updateAchievement(item: Partial<Achievement> & { id: string }): void {
    const current = this.getAchievements().map(a => (a.id === item.id ? { ...a, ...item } : a));
    setStored(STORAGE_KEYS.ACHIEVEMENTS, current);
    this.logActivity('Achievement Updated', 'Achievement', item.title || 'Achievement', 'Updated achievement');
  },
  deleteAchievement(id: string): void {
    const target = this.getAchievements().find(a => a.id === id);
    const updated = this.getAchievements().filter(a => a.id !== id);
    setStored(STORAGE_KEYS.ACHIEVEMENTS, updated);
    if (target) {
      this.logActivity('Achievement Deleted', 'Achievement', target.title, 'Deleted achievement');
    }
  },

  // 11. Learning Journey
  getLearning(): LearningTopic[] {
    const items = getStored<LearningTopic[]>(STORAGE_KEYS.LEARNING, initialLearning);
    return items.sort((a, b) => a.order_index - b.order_index);
  },
  addLearning(data: Omit<LearningTopic, 'id'>): LearningTopic {
    const current = this.getLearning();
    const newItem: LearningTopic = {
      ...data,
      id: 'lrn-' + Date.now()
    };
    current.push(newItem);
    setStored(STORAGE_KEYS.LEARNING, current);
    this.logActivity('Learning Topic Added', 'Learning', newItem.topic, 'Progress: ' + newItem.progress + '%');
    return newItem;
  },
  updateLearning(item: Partial<LearningTopic> & { id: string }): void {
    const current = this.getLearning().map(l => (l.id === item.id ? { ...l, ...item } : l));
    setStored(STORAGE_KEYS.LEARNING, current);
    this.logActivity('Learning Updated', 'Learning', item.topic || 'Learning topic', 'Updated progress');
  },
  deleteLearning(id: string): void {
    const target = this.getLearning().find(l => l.id === id);
    const updated = this.getLearning().filter(l => l.id !== id);
    setStored(STORAGE_KEYS.LEARNING, updated);
    if (target) {
      this.logActivity('Learning Topic Deleted', 'Learning', target.topic, 'Deleted topic');
    }
  },

  // 12. Services
  getServices(): Service[] {
    const items = getStored<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    return items.sort((a, b) => a.order_index - b.order_index);
  },
  getEnabledServices(): Service[] {
    return this.getServices().filter(s => s.is_enabled);
  },
  addService(data: Omit<Service, 'id'>): Service {
    const current = this.getServices();
    const newItem: Service = {
      ...data,
      id: 'srv-' + Date.now()
    };
    current.push(newItem);
    setStored(STORAGE_KEYS.SERVICES, current);
    this.logActivity('Service Added', 'Services', newItem.name, 'Added offering');
    return newItem;
  },
  updateService(item: Partial<Service> & { id: string }): void {
    const current = this.getServices().map(s => (s.id === item.id ? { ...s, ...item } : s));
    setStored(STORAGE_KEYS.SERVICES, current);
    this.logActivity('Service Updated', 'Service', item.name || 'Service', 'Updated service');
  },
  deleteService(id: string): void {
    const target = this.getServices().find(s => s.id === id);
    const updated = this.getServices().filter(s => s.id !== id);
    setStored(STORAGE_KEYS.SERVICES, updated);
    if (target) {
      this.logActivity('Service Deleted', 'Services', target.name, 'Deleted offering');
    }
  },

  // 13. Messages
  getMessages(): Message[] {
    const items = getStored<Message[]>(STORAGE_KEYS.MESSAGES, initialMessages);
    return items.sort((a, b) => new Date(b.created_at || b.timestamp || "").getTime() - new Date(a.created_at || a.timestamp || "").getTime());
  },
  addMessage(data: Omit<Message, 'id' | 'created_at' | 'is_read'>): Message {
    const current = this.getMessages();
    const newMsg: Message = {
      ...data,
      id: 'msg-' + Date.now(),
      is_read: false,
      created_at: new Date().toISOString()
    };
    current.unshift(newMsg);
    setStored(STORAGE_KEYS.MESSAGES, current);
    this.logActivity('Contact Message Received', 'Messages', newMsg.name, 'Subject: ' + newMsg.subject);
    return newMsg;
  },
  toggleMessageStar(id: string): void {
    const current = this.getMessages().map(m => (m.id === id ? { ...m, is_starred: !m.is_starred } : m));
    setStored(STORAGE_KEYS.MESSAGES, current);
  },
  toggleMessageArchive(id: string): void {
    const current = this.getMessages().map(m => (m.id === id ? { ...m, is_archived: !m.is_archived } : m));
    setStored(STORAGE_KEYS.MESSAGES, current);
  },
  markMessageRead(id: string, is_read: boolean): void {
    const current = this.getMessages().map(m => (m.id === id ? { ...m, is_read } : m));
    setStored(STORAGE_KEYS.MESSAGES, current);
  },
  deleteMessage(id: string): void {
    const target = this.getMessages().find(m => m.id === id);
    const updated = this.getMessages().filter(m => m.id !== id);
    setStored(STORAGE_KEYS.MESSAGES, updated);
    if (target) {
      this.logActivity('Message Deleted', 'Messages', target.name, 'Deleted contact message');
    }
  },

  // 14. Resumes
  getResumes(): Resume[] {
    return getStored<Resume[]>(STORAGE_KEYS.RESUMES, initialResumes);
  },
  getActiveResume(): Resume | undefined {
    return this.getResumes().find(r => r.is_active);
  },
  addResume(data: Omit<Resume, 'id' | 'uploaded_at'>): Resume {
    const current = this.getResumes();
    if (data.is_active) {
      current.forEach(r => (r.is_active = false));
    }
    const newResume: Resume = {
      ...data,
      id: 'res-' + Date.now(),
      uploaded_at: new Date().toISOString()
    };
    current.unshift(newResume);
    setStored(STORAGE_KEYS.RESUMES, current);
    this.logActivity('Resume Uploaded', 'Resume', newResume.title, 'Version ' + newResume.version);
    return newResume;
  },
  setActiveResume(id: string): void {
    const current = this.getResumes().map(r => ({
      ...r,
      is_active: r.id === id
    }));
    setStored(STORAGE_KEYS.RESUMES, current);
    const active = current.find(r => r.id === id);
    if (active) {
      this.logActivity('Active Resume Changed', 'Resume', active.title, 'Activated version ' + active.version);
    }
  },
  deleteResume(id: string): void {
    const target = this.getResumes().find(r => r.id === id);
    const updated = this.getResumes().filter(r => r.id !== id);
    setStored(STORAGE_KEYS.RESUMES, updated);
    if (target) {
      this.logActivity('Resume Deleted', 'Resume', target.title, 'Removed resume version');
    }
  },

  // 15. Social Links
  getSocialLinks(): SocialLink[] {
    const items = getStored<SocialLink[]>(STORAGE_KEYS.SOCIAL_LINKS, initialSocialLinks);
    return items.sort((a, b) => a.order_index - b.order_index);
  },
  getActiveSocialLinks(): SocialLink[] {
    return this.getSocialLinks().filter(s => s.is_enabled && s.url && s.url.trim().length > 0);
  },
  addSocialLink(data: Omit<SocialLink, 'id'>): SocialLink {
    const current = this.getSocialLinks();
    const newItem: SocialLink = {
      ...data,
      id: 'soc-' + Date.now()
    };
    current.push(newItem);
    setStored(STORAGE_KEYS.SOCIAL_LINKS, current);
    this.logActivity('Social Link Added', 'Social Links', newItem.platform, 'Added ' + newItem.platform);
    return newItem;
  },
  updateSocialLink(item: Partial<SocialLink> & { id: string }): void {
    const current = this.getSocialLinks().map(s => (s.id === item.id ? { ...s, ...item } : s));
    setStored(STORAGE_KEYS.SOCIAL_LINKS, current);
    this.logActivity('Social Link Updated', 'Social', item.platform || 'Link', 'Updated social URL');
  },
  deleteSocialLink(id: string): void {
    const target = this.getSocialLinks().find(s => s.id === id);
    const updated = this.getSocialLinks().filter(s => s.id !== id);
    setStored(STORAGE_KEYS.SOCIAL_LINKS, updated);
    if (target) {
      this.logActivity('Social Link Deleted', 'Social Links', target.platform, 'Removed link');
    }
  },

  // 16. Media Library
  getMedia(): MediaItem[] {
    return getStored<MediaItem[]>(STORAGE_KEYS.MEDIA, initialMedia);
  },
  addMedia(data: Omit<MediaItem, 'id' | 'uploaded_at'>): MediaItem {
    const current = this.getMedia();
    const newItem: MediaItem = {
      ...data,
      id: 'med-' + Date.now(),
      uploaded_at: new Date().toISOString()
    };
    current.unshift(newItem);
    setStored(STORAGE_KEYS.MEDIA, current);
    this.logActivity('Media Uploaded', 'Media Library', newItem.filename, 'Category: ' + newItem.category);
    return newItem;
  },
  deleteMedia(id: string): void {
    const target = this.getMedia().find(m => m.id === id);
    const updated = this.getMedia().filter(m => m.id !== id);
    setStored(STORAGE_KEYS.MEDIA, updated);
    if (target) {
      this.logActivity('Media Deleted', 'Media Library', target.filename, 'Removed file from library');
    }
  },

  // 17. Settings
  getWebsiteSettings(): WebsiteSettings {
    return getStored<WebsiteSettings>(STORAGE_KEYS.WEBSITE_SETTINGS, initialWebsiteSettings);
  },
  updateWebsiteSettings(data: Partial<WebsiteSettings>): WebsiteSettings {
    const current = this.getWebsiteSettings();
    const updated = { ...current, ...data };
    setStored(STORAGE_KEYS.WEBSITE_SETTINGS, updated);
    this.applyTheme(updated);
    this.logActivity('Appearance Settings Changed', 'Settings', 'Appearance', 'Updated theme or colors');
    return updated;
  },
  applyTheme(settings: WebsiteSettings): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.style.setProperty('--color-primary-600', settings.primary_color || '#2563eb');
    root.style.setProperty('--radius-theme', settings.card_radius || '0.75rem');
  },

  getSectionSettings(): SectionSettings {
    return getStored<SectionSettings>(STORAGE_KEYS.SECTION_SETTINGS, initialSectionSettings);
  },
  updateSectionSettings(data: Partial<SectionSettings>): SectionSettings {
    const current = this.getSectionSettings();
    const updated = { ...current, ...data };
    setStored(STORAGE_KEYS.SECTION_SETTINGS, updated);
    this.logActivity('Section Visibility Updated', 'Settings', 'Sections', 'Toggled section visibility');
    return updated;
  },

  getSeoSettings(): SeoSettings {
    return getStored<SeoSettings>(STORAGE_KEYS.SEO_SETTINGS, initialSeoSettings);
  },
  updateSeoSettings(data: Partial<SeoSettings>): SeoSettings {
    const current = this.getSeoSettings();
    const updated = { ...current, ...data };
    setStored(STORAGE_KEYS.SEO_SETTINGS, updated);
    this.logActivity('SEO Settings Updated', 'Settings', 'SEO', 'Updated metadata');
    return updated;
  },

  getFooterSettings(): FooterSettings {
    return getStored<FooterSettings>(STORAGE_KEYS.FOOTER_SETTINGS, initialFooterSettings);
  },
  updateFooterSettings(data: Partial<FooterSettings>): FooterSettings {
    const current = this.getFooterSettings();
    const updated = { ...current, ...data };
    setStored(STORAGE_KEYS.FOOTER_SETTINGS, updated);
    this.logActivity('Footer Updated', 'Settings', 'Footer', 'Updated copyright or branding');
    return updated;
  },

  // 18. Activity Logs
  getActivityLogs(): ActivityLog[] {
    const logs = getStored<ActivityLog[]>(STORAGE_KEYS.ACTIVITY_LOGS, initialActivityLogs);
    return logs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },
  logActivity(action: string, itemType?: string, itemTitle?: string, details?: string): void {
    const logs = this.getActivityLogs();
    const newLog: ActivityLog = {
      id: 'act-' + Date.now(),
      action,
      admin_email: '16manojkumars@gmail.com',
      item_type: itemType,
      item_title: itemTitle,
      details,
      created_at: new Date().toISOString()
    };
    logs.unshift(newLog);
    const trimmed = logs.slice(0, 100);
    setStored(STORAGE_KEYS.ACTIVITY_LOGS, trimmed);
  },
  clearActivityLogs(): void {
    setStored(STORAGE_KEYS.ACTIVITY_LOGS, []);
  },

  // 19. Backup & Reset
  exportFullBackup(): string {
    return this.exportBackup();
  },
  exportBackup(): string {
    const data = {
      profile: this.getProfile(),
      home: this.getHomeContent(),
      about: this.getAboutContent(),
      navigation: this.getNavigation(),
      education: this.getEducation(),
      skills: this.getSkills(),
      projects: this.getProjects(),
      certifications: this.getCertifications(),
      experience: this.getExperience(),
      achievements: this.getAchievements(),
      learning: this.getLearning(),
      services: this.getServices(),
      social_links: this.getSocialLinks(),
      resumes: this.getResumes(),
      messages: this.getMessages(),
      media: this.getMedia(),
      website_settings: this.getWebsiteSettings(),
      section_settings: this.getSectionSettings(),
      seo_settings: this.getSeoSettings(),
      footer_settings: this.getFooterSettings(),
      exported_at: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(data, null, 2);
  },

  importBackup(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.profile) setStored(STORAGE_KEYS.PROFILE, data.profile);
      if (data.home) setStored(STORAGE_KEYS.HOME, data.home);
      if (data.about) setStored(STORAGE_KEYS.ABOUT, data.about);
      if (data.navigation) setStored(STORAGE_KEYS.NAVIGATION, data.navigation);
      if (data.education) setStored(STORAGE_KEYS.EDUCATION, data.education);
      if (data.skills) setStored(STORAGE_KEYS.SKILLS, data.skills);
      if (data.projects) setStored(STORAGE_KEYS.PROJECTS, data.projects);
      if (data.certifications) setStored(STORAGE_KEYS.CERTIFICATIONS, data.certifications);
      if (data.experience) setStored(STORAGE_KEYS.EXPERIENCE, data.experience);
      if (data.achievements) setStored(STORAGE_KEYS.ACHIEVEMENTS, data.achievements);
      if (data.learning) setStored(STORAGE_KEYS.LEARNING, data.learning);
      if (data.services) setStored(STORAGE_KEYS.SERVICES, data.services);
      if (data.social_links) setStored(STORAGE_KEYS.SOCIAL_LINKS, data.social_links);
      if (data.resumes) setStored(STORAGE_KEYS.RESUMES, data.resumes);
      if (data.website_settings) setStored(STORAGE_KEYS.WEBSITE_SETTINGS, data.website_settings);
      if (data.section_settings) setStored(STORAGE_KEYS.SECTION_SETTINGS, data.section_settings);
      if (data.seo_settings) setStored(STORAGE_KEYS.SEO_SETTINGS, data.seo_settings);
      if (data.footer_settings) setStored(STORAGE_KEYS.FOOTER_SETTINGS, data.footer_settings);
      this.logActivity('Backup Restored', 'System', 'Data Import', 'Imported data from JSON backup');
      notifyListeners();
      return true;
    } catch (err) {
      console.error('Import failed', err);
      return false;
    }
  },

  factoryReset(): void {
    this.resetToDefaults();
  },
  resetToDefaults(): void {
    localStorage.clear();
    notifyListeners();
    this.logActivity('Factory Reset', 'System', 'All Content', 'Reset portfolio to verified default values');
  }
};