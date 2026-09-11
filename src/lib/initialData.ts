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

export const initialProfile: Profile = {
  id: 'profile-1',
  full_name: 'Sahukari Manoj Kumar',
  degree: 'B.Tech',
  specialization: 'Computer Science Engineering – AI & AGI',
  current_year: '2nd Year',
  university: 'Aurora Deemed to be University',
  native_location: 'L.N. Peta Junction, Srikakulam, Andhra Pradesh, India',
  edu_location: 'Bhongir, Hyderabad, Telangana',
  email: '16manojkumars@gmail.com',
  phone: '9440760898',
  bio: 'I am Sahukari Manoj Kumar, a second-year B.Tech Computer Science Engineering student specializing in CSE – AI & AGI. I am interested in web development, AI-assisted coding, databases, and modern software technologies. I enjoy learning new technologies and using them to create practical and useful projects.',
  profile_photo: ''
};

export const initialHomeContent: HomeContent = {
  id: 'home-1',
  greeting: "HELLO, I'M",
  title: 'Sahukari Manoj Kumar',
  professional_title: 'B.Tech CSE – AI & AGI Student',
  hero_description: 'I am a second-year Computer Science Engineering student interested in web development, AI-assisted coding, databases, and modern technologies. I enjoy learning new technologies and building practical digital projects.',
  primary_btn_text: 'Explore My Projects',
  primary_btn_link: '#projects',
  secondary_btn_text: 'Download Resume',
  secondary_btn_link: '#resume',
  resume_btn_enabled: true,
  hero_visible: true,
  profile_image_url: ''
};

export const initialAboutContent: AboutContent = {
  id: 'about-1',
  title: 'About Me',
  description: 'I am Sahukari Manoj Kumar, a second-year B.Tech Computer Science Engineering student specializing in CSE – AI & AGI. I am interested in web development, AI-assisted coding, databases, and modern software technologies. I enjoy learning new technologies and using them to create practical and useful projects.',
  interests: [
    'Web Development',
    'AI-assisted Coding & Modern Tooling',
    'Relational Databases & Supabase',
    'Tailwind CSS & Responsive UI',
    'Artificial Intelligence & AGI Concepts'
  ],
  career_goals: 'Aspiring software developer looking forward to applying modern web technologies, full-stack practices, and AI-assisted workflows to solve real-world problems.'
};

export const initialNavigation: NavigationItem[] = [
  { id: 'nav-1', label: 'Home', path: '#home', order_index: 1, is_enabled: true },
  { id: 'nav-2', label: 'About', path: '#about', order_index: 2, is_enabled: true },
  { id: 'nav-3', label: 'Education', path: '#education', order_index: 3, is_enabled: true },
  { id: 'nav-4', label: 'Skills', path: '#skills', order_index: 4, is_enabled: true },
  { id: 'nav-5', label: 'Projects', path: '#projects', order_index: 5, is_enabled: true },
  { id: 'nav-6', label: 'Certifications', path: '#certifications', order_index: 6, is_enabled: true },
  { id: 'nav-7', label: 'Experience', path: '#experience', order_index: 7, is_enabled: false },
  { id: 'nav-8', label: 'Achievements', path: '#achievements', order_index: 8, is_enabled: false },
  { id: 'nav-9', label: 'Learning', path: '#learning', order_index: 9, is_enabled: true },
  { id: 'nav-10', label: 'Contact', path: '#contact', order_index: 10, is_enabled: true }
];

export const initialEducation: Education[] = [
  {
    id: 'edu-1',
    degree: 'B.Tech',
    course: 'Computer Science Engineering',
    specialization: 'CSE – AI & AGI',
    institution: 'Aurora Deemed to be University',
    campus: 'Main Campus',
    university: 'Aurora Deemed to be University',
    location: 'Bhongir, Hyderabad, Telangana',
    start_year: '2025',
    end_year: '2029',
    current_status: 'Undergraduate – 2nd Year',
    marks: undefined,
    percentage: undefined,
    cgpa: undefined,
    description: 'Specializing in Computer Science with focus on Artificial Intelligence and Artificial General Intelligence concepts.',
    order_index: 1
  },
  {
    id: 'edu-2',
    degree: '12th / Intermediate',
    course: 'Intermediate (MPC)',
    specialization: 'Higher Secondary Education',
    institution: 'Sri Chaitanya',
    campus: 'Abdul Kalam Campus',
    university: 'Board of Intermediate Education, AP',
    location: 'Visakhapatnam, Andhra Pradesh',
    start_year: '2023',
    end_year: '2025',
    current_status: 'Completed',
    marks: '832',
    percentage: '83.2%',
    cgpa: undefined,
    description: 'Mathematics, Physics, and Chemistry (MPC) stream with 83.2% aggregate score.',
    order_index: 2
  },
  {
    id: 'edu-3',
    degree: '10th Standard',
    course: 'Secondary School Certificate (SSC)',
    specialization: 'General Secondary Education',
    institution: 'ZPHS School',
    campus: undefined,
    university: 'Board of Secondary Education, AP',
    location: 'L.N. Peta, Andhra Pradesh',
    start_year: '2022',
    end_year: '2023',
    current_status: 'Completed',
    marks: '428',
    percentage: undefined,
    cgpa: undefined,
    description: 'Completed Secondary School Certificate examination scoring 428 marks.',
    order_index: 3
  }
];

export const initialSkills: Skill[] = [
  { id: 'sk-1', name: 'HTML', category: 'Frontend', level: 'Good / Intermediate', percentage: 80, icon: 'Code2', description: 'Semantic HTML5 structure and clean document markup', order_index: 1, is_enabled: true },
  { id: 'sk-2', name: 'CSS', category: 'Frontend', level: 'Good / Intermediate', percentage: 75, icon: 'Palette', description: 'Responsive layouts, Flexbox, CSS Grid, and custom styles', order_index: 2, is_enabled: true },
  { id: 'sk-3', name: 'JavaScript', category: 'Frontend', level: 'Basic / Learning', percentage: 50, icon: 'FileCode2', description: 'Core programming concepts, ES6+ syntax, and DOM manipulation', order_index: 3, is_enabled: true },
  { id: 'sk-4', name: 'Bootstrap', category: 'Frontend', level: 'Learning / Familiar', percentage: 60, icon: 'Layout', description: 'Responsive layout grids and UI components', order_index: 4, is_enabled: true },
  { id: 'sk-5', name: 'Tailwind CSS', category: 'Frontend', level: 'Learning / Familiar', percentage: 65, icon: 'Sparkles', description: 'Utility-first modern styling and responsive interface design', order_index: 5, is_enabled: true },
  { id: 'sk-6', name: 'DBMS', category: 'Database', level: 'Learning / Familiar', percentage: 60, icon: 'Database', description: 'Database Management Systems, relational architecture, and SQL querying', order_index: 6, is_enabled: true },
  { id: 'sk-7', name: 'Supabase', category: 'Database', level: 'Learning / Familiar', percentage: 65, icon: 'Server', description: 'PostgreSQL database, Row Level Security, Auth, and instant REST APIs', order_index: 7, is_enabled: true },
  { id: 'sk-8', name: 'Antigravity', category: 'AI / Development Tools', level: 'Learning / Familiar', percentage: 75, icon: 'Bot', description: 'AI-assisted development and modern coding tools I use for learning and building projects', order_index: 8, is_enabled: true },
  { id: 'sk-9', name: 'Replit', category: 'AI / Development Tools', level: 'Learning / Familiar', percentage: 70, icon: 'Terminal', description: 'Cloud IDE, interactive coding, and rapid testing environment', order_index: 9, is_enabled: true },
  { id: 'sk-10', name: 'Claude', category: 'AI / Development Tools', level: 'Learning / Familiar', percentage: 75, icon: 'Cpu', description: 'AI coding assistance for reasoning, architecture, and debugging', order_index: 10, is_enabled: true },
  { id: 'sk-11', name: 'AI-assisted coding', category: 'AI / Development Tools', level: 'Learning / Familiar', percentage: 80, icon: 'Wand2', description: 'Modern development tools and workflows for building and learning', order_index: 11, is_enabled: true },
  { id: 'sk-12', name: 'English', category: 'Languages', level: 'Good / Intermediate', percentage: 85, icon: 'Languages', description: 'Professional and academic communication', order_index: 12, is_enabled: true },
  { id: 'sk-13', name: 'Telugu', category: 'Languages', level: 'Proficient', percentage: 100, icon: 'MessageSquare', description: 'Native language proficiency', order_index: 13, is_enabled: true },
  { id: 'sk-14', name: 'German', category: 'Languages', level: 'Basic / Learning', percentage: 25, icon: 'Globe', description: 'Basic conversational and elementary language learning', order_index: 14, is_enabled: true }
];

export const initialProjects: Project[] = [];

export const initialCertifications: Certification[] = [];

export const initialExperience: Experience[] = [];

export const initialAchievements: Achievement[] = [];

export const initialLearning: LearningTopic[] = [
  { id: 'lrn-1', topic: 'JavaScript', description: 'Mastering DOM interactions, async/await, and ES6+ features', category: 'Frontend', progress: 60, status: 'Learning', order_index: 1, icon: 'FileCode2' },
  { id: 'lrn-2', topic: 'Web Development', description: 'Building full-stack, responsive modern web applications', category: 'Full-Stack', progress: 65, status: 'Learning', order_index: 2, icon: 'Globe' },
  { id: 'lrn-3', topic: 'AI-assisted coding', description: 'Leveraging AI tools for accelerated prototyping and clean code practices', category: 'AI & Tools', progress: 75, status: 'Practicing', order_index: 3, icon: 'Bot' },
  { id: 'lrn-4', topic: 'DBMS', description: 'Relational data structures, normalization, and relational querying', category: 'Database', progress: 60, status: 'Learning', order_index: 4, icon: 'Database' },
  { id: 'lrn-5', topic: 'Supabase', description: 'Backend integration, PostgreSQL tables, RLS security, and storage', category: 'Database', progress: 60, status: 'Learning', order_index: 5, icon: 'Server' },
  { id: 'lrn-6', topic: 'Tailwind CSS', description: 'Crafting responsive layouts, dark mode styles, and design systems', category: 'Frontend', progress: 70, status: 'Practicing', order_index: 6, icon: 'Sparkles' },
  { id: 'lrn-7', topic: 'AI & AGI concepts', description: 'Exploring machine intelligence foundations and neural concepts', category: 'Core CSE', progress: 50, status: 'Learning', order_index: 7, icon: 'Brain' },
  { id: 'lrn-8', topic: 'Modern development tools', description: 'Git, Vite, VS Code workflows, and cloud developer platforms', category: 'Tooling', progress: 70, status: 'Practicing', order_index: 8, icon: 'Terminal' }
];

export const initialServices: Service[] = [
  {
    id: 'srv-1',
    name: 'Frontend Development',
    description: 'Clean, responsive UI development using modern HTML, CSS, Tailwind CSS, and JavaScript.',
    icon: 'Layout',
    features: ['Responsive Layouts', 'Tailwind CSS Styling', 'Clean Semantic HTML', 'Mobile-First Design'],
    is_enabled: true,
    order_index: 1
  },
  {
    id: 'srv-2',
    name: 'Database Integration',
    description: 'Relational database setup and Supabase PostgreSQL integration for web applications.',
    icon: 'Database',
    features: ['Supabase Integration', 'PostgreSQL Tables', 'Row Level Security', 'REST APIs'],
    is_enabled: true,
    order_index: 2
  },
  {
    id: 'srv-3',
    name: 'AI-assisted Development',
    description: 'Modern rapid prototyping and coding assistance using AI-powered developer tools.',
    icon: 'Bot',
    features: ['Rapid Prototyping', 'Modern Tooling', 'Code Optimization', 'Tool Integration'],
    is_enabled: true,
    order_index: 3
  }
];

export const initialSocialLinks: SocialLink[] = [
  { id: 'soc-1', platform: 'Email', label: 'Email', url: 'mailto:16manojkumars@gmail.com', icon: 'Mail', is_enabled: true, order_index: 1 },
  { id: 'soc-2', platform: 'GitHub', label: 'GitHub', url: '', icon: 'Github', is_enabled: false, order_index: 2 },
  { id: 'soc-3', platform: 'LinkedIn', label: 'LinkedIn', url: '', icon: 'Linkedin', is_enabled: false, order_index: 3 },
  { id: 'soc-4', platform: 'Instagram', label: 'Instagram', url: '', icon: 'Instagram', is_enabled: false, order_index: 4 },
  { id: 'soc-5', platform: 'YouTube', label: 'YouTube', url: '', icon: 'Youtube', is_enabled: false, order_index: 5 }
];

export const initialWebsiteSettings: WebsiteSettings = {
  theme: 'light',
  primary_color: '#2563eb',
  secondary_color: '#64748b',
  button_style: 'rounded-xl',
  card_radius: '0.75rem',
  font: 'Inter',
  animation_intensity: 'subtle'
};

export const initialSectionSettings: SectionSettings = {
  home: true,
  about: true,
  education: true,
  skills: true,
  projects: true,
  certifications: true,
  experience: false,
  achievements: false,
  learning: true,
  services: false,
  contact: true
};

export const initialSeoSettings: SeoSettings = {
  website_title: 'Sahukari Manoj Kumar | B.Tech CSE – AI & AGI Student',
  meta_description: 'Portfolio of Sahukari Manoj Kumar, a B.Tech CSE – AI & AGI student interested in web development, AI-assisted coding, databases, and modern technologies.',
  keywords: 'Sahukari Manoj Kumar, Portfolio, B.Tech CSE, AI, AGI, Web Development, Supabase, Student Developer, Aurora University',
  author: 'Sahukari Manoj Kumar',
  og_title: 'Sahukari Manoj Kumar | B.Tech CSE – AI & AGI Student',
  og_description: 'Portfolio of Sahukari Manoj Kumar, a B.Tech CSE – AI & AGI student interested in web development, AI-assisted coding, databases, and modern technologies.'
};

export const initialFooterSettings: FooterSettings = {
  name: 'Sahukari Manoj Kumar',
  title: 'B.Tech CSE - AI & AGI Student',
  copyright_text: '© 2026 Sahukari Manoj Kumar. All Rights Reserved.',
  tagline: 'Undergraduate Portfolio • Aurora Deemed to be University',
  show_social_links: true,
  show_back_to_top: true,
  back_to_top_enabled: true
};

export const initialResumes: Resume[] = [];
export const initialMessages: Message[] = [];
export const initialMedia: MediaItem[] = [];
export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'act-1',
    action: 'System Initialized',
    admin_email: '16manojkumars@gmail.com',
    item_type: 'System',
    item_title: 'Portfolio System Ready',
    details: 'Initial profile data loaded for Sahukari Manoj Kumar',
    created_at: new Date().toISOString()
  }
];
