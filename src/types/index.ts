export type SkillCategory = 'Frontend' | 'Database' | 'AI / Development Tools' | 'Languages' | 'Other';
export type SkillLevel = 'Basic / Learning' | 'Learning / Familiar' | 'Good / Intermediate' | 'Proficient';
export type ProjectStatus = 'Planning' | 'In Progress' | 'Completed' | 'Maintenance';
export type LearningStatus = 'Learning' | 'Practicing' | 'Completed';
export type AchievementCategory = 'Award' | 'Hackathon' | 'Competition' | 'Academic' | 'Workshop' | 'Event' | 'Other';

export interface Profile {
  id: string;
  full_name: string;
  degree: string;
  specialization: string;
  current_year: string;
  university: string;
  native_location: string;
  edu_location: string;
  email: string;
  phone: string;
  bio: string;
  profile_photo?: string;
  created_at?: string;
  updated_at?: string;
}

export interface HomeContent {
  id: string;
  greeting: string;
  title: string;
  professional_title: string;
  hero_description: string;
  primary_btn_text: string;
  primary_btn_link: string;
  secondary_btn_text: string;
  secondary_btn_link: string;
  resume_btn_enabled: boolean;
  hero_visible: boolean;
  profile_image_url?: string;
  image_fit?: 'top' | 'contain' | 'cover';
  updated_at?: string;
}

export interface AboutContent {
  id: string;
  title: string;
  description: string;
  interests: string[];
  career_goals: string;
  updated_at?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  order_index: number;
  is_enabled: boolean;
  is_custom?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  course?: string;
  specialization?: string;
  institution: string;
  campus?: string;
  university?: string;
  location: string;
  start_year?: string;
  end_year?: string;
  current_status?: string;
  marks?: string;
  percentage?: string;
  cgpa?: string;
  description?: string;
  logo_url?: string;
  order_index: number;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  percentage?: number;
  icon?: string;
  description?: string;
  order_index: number;
  is_enabled: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description?: string;
  main_image?: string;
  screenshots?: string[];
  technologies?: string[];
  features?: string[];
  category: string;
  status: ProjectStatus;
  github_url?: string;
  demo_url?: string;
  video_url?: string;
  project_date?: string;
  problem_statement?: string;
  solution?: string;
  development_process?: string;
  challenges?: string;
  future_improvements?: string;
  is_featured: boolean;
  is_published: boolean;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  year?: string;
  issue_date?: string;
  credential_id?: string;
  credential_url?: string;
  image_url?: string;
  pdf_url?: string;
  description?: string;
  is_featured?: boolean;
  is_published: boolean;
  order_index: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  employment_type: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
  logo_url?: string;
  certificate_url?: string;
  is_published: boolean;
  order_index: number;
}

export interface Achievement {
  id: string;
  title: string;
  category: AchievementCategory;
  organization?: string;
  date?: string;
  description?: string;
  image_url?: string;
  certificate_url?: string;
  credential_url?: string;
  is_featured?: boolean;
  is_published: boolean;
  order_index: number;
}

export interface LearningTopic {
  id: string;
  topic: string;
  topic_name?: string;
  description?: string;
  category: string;
  progress: number;
  progress_percentage?: number;
  status: LearningStatus;
  platform_or_resource?: string;
  notes?: string;
  key_takeaways?: string[];
  is_published?: boolean;
  start_date?: string;
  completion_date?: string;
  icon?: string;
  order_index: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon?: string;
  features?: string[];
  is_enabled: boolean;
  order_index: number;
}

export interface Message {
  timestamp?: string;
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  is_starred?: boolean;
  is_archived?: boolean;
  created_at: string;
}

export interface Resume {
  id: string;
  title: string;
  file_name?: string;
  file_url: string;
  file_size?: string;
  version?: string;
  is_active: boolean;
  uploaded_at?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string;
  is_enabled: boolean;
  order_index: number;
}

export interface MediaItem {
  id: string;
  title?: string;
  filename?: string;
  url?: string;
  file_url?: string;
  media_type?: string;
  file_type?: string;
  file_size?: number;
  category?: string;
  uploaded_at?: string;
}

export interface WebsiteSettings {
  theme: 'light' | 'dark' | 'system';
  primary_color: string;
  secondary_color: string;
  button_style: 'rounded-none' | 'rounded-md' | 'rounded-lg' | 'rounded-xl' | 'rounded-full';
  card_radius: string;
  font: string;
  animation_intensity: 'none' | 'subtle' | 'normal';
}

export interface SectionSettings {
  home: boolean;
  about: boolean;
  education: boolean;
  skills: boolean;
  projects: boolean;
  certifications: boolean;
  experience: boolean;
  achievements: boolean;
  learning: boolean;
  services: boolean;
  contact: boolean;
}

export interface SeoSettings {
  title?: string;
  website_title: string;
  description?: string;
  meta_description: string;
  keywords: string;
  author: string;
  canonical_url?: string;
  og_title: string;
  og_description: string;
  og_image?: string;
}

export interface FooterSettings {
  name?: string;
  title?: string;
  copyright_text: string;
  tagline: string;
  show_social_links: boolean;
  show_back_to_top: boolean;
  back_to_top_enabled?: boolean;
}

export interface ActivityLog {
  id: string;
  action: string;
  category?: string;
  target_name?: string;
  item_type?: string;
  item_title?: string;
  details?: string;
  timestamp?: string;
  created_at: string;
  admin_email?: string;
}
