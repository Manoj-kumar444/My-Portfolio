-- ==========================================================
-- SAHUKARI MANOJ KUMAR PORTFOLIO - COMPLETE DATABASE SETUP
-- Schema + RLS Policies + Realtime + Verified Seed Data
-- Run this in Supabase Dashboard > SQL Editor > New Query
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY DEFAULT 'profile-1',
    full_name TEXT NOT NULL,
    degree TEXT NOT NULL,
    specialization TEXT NOT NULL,
    current_year TEXT NOT NULL,
    university TEXT NOT NULL,
    native_location TEXT NOT NULL,
    edu_location TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    bio TEXT NOT NULL,
    profile_photo TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. HOME CONTENT TABLE
CREATE TABLE IF NOT EXISTS public.home_content (
    id TEXT PRIMARY KEY DEFAULT 'home-1',
    greeting TEXT NOT NULL DEFAULT 'HELLO, I''M',
    title TEXT NOT NULL,
    professional_title TEXT NOT NULL,
    hero_description TEXT NOT NULL,
    primary_btn_text TEXT DEFAULT 'Explore My Projects',
    primary_btn_link TEXT DEFAULT '#projects',
    secondary_btn_text TEXT DEFAULT 'Download Resume',
    secondary_btn_link TEXT DEFAULT '#resume',
    resume_btn_enabled BOOLEAN DEFAULT true,
    hero_visible BOOLEAN DEFAULT true,
    profile_image_url TEXT,
    image_fit TEXT DEFAULT 'top',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ABOUT CONTENT TABLE
CREATE TABLE IF NOT EXISTS public.about_content (
    id TEXT PRIMARY KEY DEFAULT 'about-1',
    title TEXT NOT NULL DEFAULT 'About Me',
    description TEXT NOT NULL,
    interests TEXT[] DEFAULT ARRAY['Web Development', 'AI-assisted Coding & Modern Tooling', 'Relational Databases & Supabase', 'Tailwind CSS & Responsive UI', 'Artificial Intelligence & AGI Concepts'],
    career_goals TEXT DEFAULT 'Aspiring software developer looking forward to applying modern web technologies, full-stack practices, and AI-assisted workflows to solve real-world problems.',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. NAVIGATION ITEMS
CREATE TABLE IF NOT EXISTS public.navigation (
    id TEXT PRIMARY KEY DEFAULT ('nav-' || floor(random()*1000000)::text),
    label TEXT NOT NULL,
    path TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    is_custom BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
    id TEXT PRIMARY KEY DEFAULT ('edu-' || floor(random()*1000000)::text),
    degree TEXT NOT NULL,
    course TEXT,
    specialization TEXT,
    institution TEXT NOT NULL,
    campus TEXT,
    university TEXT,
    location TEXT NOT NULL,
    start_year TEXT,
    end_year TEXT,
    current_status TEXT,
    marks TEXT,
    percentage TEXT,
    cgpa TEXT,
    description TEXT,
    logo_url TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY DEFAULT ('sk-' || floor(random()*1000000)::text),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    level TEXT NOT NULL,
    percentage INT,
    icon TEXT,
    description TEXT,
    order_index INT NOT NULL DEFAULT 0,
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY DEFAULT ('proj-' || floor(random()*1000000)::text),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    full_description TEXT,
    main_image TEXT,
    screenshots TEXT[] DEFAULT ARRAY[]::TEXT[],
    technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    category TEXT DEFAULT 'Web Application',
    status TEXT NOT NULL DEFAULT 'In Progress',
    github_url TEXT,
    demo_url TEXT,
    video_url TEXT,
    project_date TEXT,
    problem_statement TEXT,
    solution TEXT,
    development_process TEXT,
    challenges TEXT,
    future_improvements TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
    id TEXT PRIMARY KEY DEFAULT ('cert-' || floor(random()*1000000)::text),
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    year TEXT,
    issue_date TEXT,
    credential_id TEXT,
    credential_url TEXT,
    image_url TEXT,
    pdf_url TEXT,
    description TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS public.experience (
    id TEXT PRIMARY KEY DEFAULT ('exp-' || floor(random()*1000000)::text),
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    employment_type TEXT DEFAULT 'Internship',
    location TEXT,
    start_date TEXT NOT NULL,
    end_date TEXT,
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    responsibilities TEXT[] DEFAULT ARRAY[]::TEXT[],
    technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
    logo_url TEXT,
    certificate_url TEXT,
    is_published BOOLEAN DEFAULT true,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.achievements (
    id TEXT PRIMARY KEY DEFAULT ('ach-' || floor(random()*1000000)::text),
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Academic',
    organization TEXT,
    date TEXT,
    description TEXT,
    image_url TEXT,
    certificate_url TEXT,
    credential_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. LEARNING JOURNEY TABLE
CREATE TABLE IF NOT EXISTS public.learning (
    id TEXT PRIMARY KEY DEFAULT ('lrn-' || floor(random()*1000000)::text),
    topic TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'Technology',
    progress INT DEFAULT 50,
    status TEXT NOT NULL DEFAULT 'Learning',
    start_date TEXT,
    completion_date TEXT,
    icon TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY DEFAULT ('srv-' || floor(random()*1000000)::text),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_enabled BOOLEAN DEFAULT true,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id TEXT PRIMARY KEY DEFAULT ('msg-' || floor(random()*1000000)::text),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. RESUMES TABLE
CREATE TABLE IF NOT EXISTS public.resumes (
    id TEXT PRIMARY KEY DEFAULT ('res-' || floor(random()*1000000)::text),
    title TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size TEXT,
    version TEXT DEFAULT '1.0',
    is_active BOOLEAN DEFAULT false,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. SOCIAL LINKS TABLE
CREATE TABLE IF NOT EXISTS public.social_links (
    id TEXT PRIMARY KEY DEFAULT ('soc-' || floor(random()*1000000)::text),
    platform TEXT NOT NULL,
    label TEXT NOT NULL,
    url TEXT,
    icon TEXT NOT NULL,
    is_enabled BOOLEAN DEFAULT true,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. WEBSITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.website_settings (
    id TEXT PRIMARY KEY DEFAULT 'web-settings-1',
    theme TEXT DEFAULT 'light',
    primary_color TEXT DEFAULT '#2563eb',
    secondary_color TEXT DEFAULT '#64748b',
    button_style TEXT DEFAULT 'rounded-xl',
    card_radius TEXT DEFAULT '0.75rem',
    font TEXT DEFAULT 'Inter',
    animation_intensity TEXT DEFAULT 'subtle',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. SECTION SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.section_settings (
    id TEXT PRIMARY KEY DEFAULT 'sec-settings-1',
    home BOOLEAN DEFAULT true,
    about BOOLEAN DEFAULT true,
    education BOOLEAN DEFAULT true,
    skills BOOLEAN DEFAULT true,
    projects BOOLEAN DEFAULT true,
    certifications BOOLEAN DEFAULT true,
    experience BOOLEAN DEFAULT false,
    achievements BOOLEAN DEFAULT false,
    learning BOOLEAN DEFAULT true,
    services BOOLEAN DEFAULT false,
    contact BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. SEO SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.seo_settings (
    id TEXT PRIMARY KEY DEFAULT 'seo-settings-1',
    website_title TEXT DEFAULT 'Sahukari Manoj Kumar | B.Tech CSE – AI & AGI Student',
    meta_description TEXT DEFAULT 'Portfolio of Sahukari Manoj Kumar, a B.Tech CSE – AI & AGI student interested in web development, AI-assisted coding, databases, and modern technologies.',
    keywords TEXT DEFAULT 'Sahukari Manoj Kumar, Portfolio, B.Tech CSE, AI, AGI, Web Development, Supabase, Student Developer, Aurora University',
    author TEXT DEFAULT 'Sahukari Manoj Kumar',
    og_title TEXT DEFAULT 'Sahukari Manoj Kumar | B.Tech CSE – AI & AGI Student',
    og_description TEXT DEFAULT 'Portfolio of Sahukari Manoj Kumar, a B.Tech CSE – AI & AGI student interested in web development, AI-assisted coding, databases, and modern technologies.',
    og_image TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. FOOTER SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.footer_settings (
    id TEXT PRIMARY KEY DEFAULT 'footer-settings-1',
    name TEXT DEFAULT 'Sahukari Manoj Kumar',
    title TEXT DEFAULT 'B.Tech CSE - AI & AGI Student',
    copyright_text TEXT DEFAULT '© 2026 Sahukari Manoj Kumar. All Rights Reserved.',
    tagline TEXT DEFAULT 'Undergraduate Portfolio • Aurora Deemed to be University',
    show_social_links BOOLEAN DEFAULT true,
    show_back_to_top BOOLEAN DEFAULT true,
    back_to_top_enabled BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id TEXT PRIMARY KEY DEFAULT ('act-' || floor(random()*1000000)::text),
    action TEXT NOT NULL,
    admin_email TEXT NOT NULL,
    item_type TEXT,
    item_title TEXT,
    details TEXT,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES - OPEN FOR ANONYMOUS CLIENT
-- ==========================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "profiles_policy" ON public.profiles;
DROP POLICY IF EXISTS "home_policy" ON public.home_content;
DROP POLICY IF EXISTS "about_policy" ON public.about_content;
DROP POLICY IF EXISTS "nav_policy" ON public.navigation;
DROP POLICY IF EXISTS "edu_policy" ON public.education;
DROP POLICY IF EXISTS "skills_policy" ON public.skills;
DROP POLICY IF EXISTS "projects_policy" ON public.projects;
DROP POLICY IF EXISTS "cert_policy" ON public.certifications;
DROP POLICY IF EXISTS "exp_policy" ON public.experience;
DROP POLICY IF EXISTS "ach_policy" ON public.achievements;
DROP POLICY IF EXISTS "learning_policy" ON public.learning;
DROP POLICY IF EXISTS "services_policy" ON public.services;
DROP POLICY IF EXISTS "messages_policy" ON public.messages;
DROP POLICY IF EXISTS "resumes_policy" ON public.resumes;
DROP POLICY IF EXISTS "social_policy" ON public.social_links;
DROP POLICY IF EXISTS "website_policy" ON public.website_settings;
DROP POLICY IF EXISTS "section_policy" ON public.section_settings;
DROP POLICY IF EXISTS "seo_policy" ON public.seo_settings;
DROP POLICY IF EXISTS "footer_policy" ON public.footer_settings;
DROP POLICY IF EXISTS "logs_policy" ON public.activity_logs;

-- Create permissive read/write policies for anon access
CREATE POLICY "profiles_policy" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "home_policy" ON public.home_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "about_policy" ON public.about_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "nav_policy" ON public.navigation FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "edu_policy" ON public.education FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "skills_policy" ON public.skills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "projects_policy" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "cert_policy" ON public.certifications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "exp_policy" ON public.experience FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "ach_policy" ON public.achievements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "learning_policy" ON public.learning FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "services_policy" ON public.services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "messages_policy" ON public.messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "resumes_policy" ON public.resumes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "social_policy" ON public.social_links FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "website_policy" ON public.website_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "section_policy" ON public.section_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "seo_policy" ON public.seo_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "footer_policy" ON public.footer_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "logs_policy" ON public.activity_logs FOR ALL USING (true) WITH CHECK (true);

-- ==========================================================
-- ENABLE SUPABASE REALTIME
-- ==========================================================
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE 
    public.profiles,
    public.home_content,
    public.about_content,
    public.navigation,
    public.education,
    public.skills,
    public.projects,
    public.certifications,
    public.experience,
    public.achievements,
    public.learning,
    public.services,
    public.messages,
    public.resumes,
    public.social_links,
    public.website_settings,
    public.section_settings,
    public.seo_settings,
    public.footer_settings,
    public.activity_logs;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;

-- ==========================================================
-- INSERT VERIFIED INITIAL DATA
-- ==========================================================

-- Clean tables before seeding
TRUNCATE TABLE public.profiles, public.home_content, public.about_content, public.navigation, public.education, public.skills, public.projects, public.certifications, public.experience, public.achievements, public.learning, public.services, public.social_links, public.website_settings, public.section_settings, public.seo_settings, public.footer_settings CASCADE;

-- 1. Profile
INSERT INTO public.profiles (id, full_name, degree, specialization, current_year, university, native_location, edu_location, email, phone, bio, profile_photo)
VALUES (
    'profile-1',
    'Sahukari Manoj Kumar',
    'B.Tech',
    'Computer Science Engineering – AI & AGI',
    '2nd Year',
    'Aurora Deemed to be University',
    'L.N. Peta Junction, Srikakulam, Andhra Pradesh, India',
    'Bhongir, Hyderabad, Telangana',
    '16manojkumars@gmail.com',
    '9440760898',
    'I am Sahukari Manoj Kumar, a second-year B.Tech Computer Science Engineering student specializing in CSE – AI & AGI. I am interested in web development, AI-assisted coding, databases, and modern software technologies. I enjoy learning new technologies and using them to create practical and useful projects.',
    ''
);

-- 2. Home Content
INSERT INTO public.home_content (id, greeting, title, professional_title, hero_description, primary_btn_text, primary_btn_link, secondary_btn_text, secondary_btn_link, resume_btn_enabled, hero_visible, profile_image_url, image_fit)
VALUES (
    'home-1',
    'HELLO, I''M',
    'Sahukari Manoj Kumar',
    'B.Tech CSE – AI & AGI Student',
    'I am a second-year Computer Science Engineering student interested in web development, AI-assisted coding, databases, and modern technologies. I enjoy learning new technologies and building practical digital projects.',
    'Explore My Projects',
    '#projects',
    'Download Resume',
    '#resume',
    true,
    true,
    '',
    'top'
);

-- 3. About Content
INSERT INTO public.about_content (id, title, description, interests, career_goals)
VALUES (
    'about-1',
    'About Me',
    'I am Sahukari Manoj Kumar, a second-year B.Tech Computer Science Engineering student specializing in CSE – AI & AGI. I am interested in web development, AI-assisted coding, databases, and modern software technologies. I enjoy learning new technologies and using them to create practical and useful projects.',
    ARRAY['Web Development', 'AI-assisted Coding & Modern Tooling', 'Relational Databases & Supabase', 'Tailwind CSS & Responsive UI', 'Artificial Intelligence & AGI Concepts'],
    'Aspiring software developer looking forward to applying modern web technologies, full-stack practices, and AI-assisted workflows to solve real-world problems.'
);

-- 4. Navigation
INSERT INTO public.navigation (id, label, path, order_index, is_enabled) VALUES
('nav-1', 'Home', '#home', 1, true),
('nav-2', 'About', '#about', 2, true),
('nav-3', 'Education', '#education', 3, true),
('nav-4', 'Skills', '#skills', 4, true),
('nav-5', 'Projects', '#projects', 5, true),
('nav-6', 'Certifications', '#certifications', 6, true),
('nav-7', 'Experience', '#experience', 7, false),
('nav-8', 'Achievements', '#achievements', 8, false),
('nav-9', 'Learning', '#learning', 9, true),
('nav-10', 'Contact', '#contact', 10, true);

-- 5. Education
INSERT INTO public.education (id, degree, course, specialization, institution, campus, university, location, start_year, end_year, current_status, marks, percentage, description, order_index) VALUES
('edu-1', 'B.Tech', 'Computer Science Engineering', 'CSE – AI & AGI', 'Aurora Deemed to be University', 'Main Campus', 'Aurora Deemed to be University', 'Bhongir, Hyderabad, Telangana', '2025', '2029', 'Undergraduate – 2nd Year', NULL, NULL, 'Specializing in Computer Science with focus on Artificial Intelligence and Artificial General Intelligence concepts.', 1),
('edu-2', '12th / Intermediate', 'Intermediate (MPC)', 'Higher Secondary Education', 'Sri Chaitanya', 'Abdul Kalam Campus', 'Board of Intermediate Education, AP', 'Visakhapatnam, Andhra Pradesh', '2023', '2025', 'Completed', '832', '83.2%', 'Mathematics, Physics, and Chemistry (MPC) stream with 83.2% aggregate score.', 2),
('edu-3', '10th Standard', 'Secondary School Certificate (SSC)', 'General Secondary Education', 'ZPHS School', NULL, 'Board of Secondary Education, AP', 'L.N. Peta, Andhra Pradesh', '2022', '2023', 'Completed', '428', NULL, 'Completed Secondary School Certificate examination scoring 428 marks.', 3);

-- 6. Skills
INSERT INTO public.skills (id, name, category, level, percentage, icon, description, order_index, is_enabled) VALUES
('sk-1', 'HTML', 'Frontend', 'Good / Intermediate', 80, 'Code2', 'Semantic HTML5 structure and clean document markup', 1, true),
('sk-2', 'CSS', 'Frontend', 'Good / Intermediate', 75, 'Palette', 'Responsive layouts, Flexbox, CSS Grid, and custom styles', 2, true),
('sk-3', 'JavaScript', 'Frontend', 'Basic / Learning', 50, 'FileCode2', 'Core programming concepts, ES6+ syntax, and DOM manipulation', 3, true),
('sk-4', 'Bootstrap', 'Frontend', 'Learning / Familiar', 60, 'Layout', 'Responsive layout grids and UI components', 4, true),
('sk-5', 'Tailwind CSS', 'Frontend', 'Learning / Familiar', 65, 'Sparkles', 'Utility-first modern styling and responsive interface design', 5, true),
('sk-6', 'DBMS', 'Database', 'Learning / Familiar', 60, 'Database', 'Database Management Systems, relational architecture, and SQL querying', 6, true),
('sk-7', 'Supabase', 'Database', 'Learning / Familiar', 65, 'Server', 'PostgreSQL database, Row Level Security, Auth, and instant REST APIs', 7, true),
('sk-8', 'Antigravity', 'AI / Development Tools', 'Learning / Familiar', 75, 'Bot', 'AI-assisted development and modern coding tools I use for learning and building projects', 8, true),
('sk-9', 'Replit', 'AI / Development Tools', 'Learning / Familiar', 70, 'Terminal', 'Cloud IDE, interactive coding, and rapid testing environment', 9, true),
('sk-10', 'Claude', 'AI / Development Tools', 'Learning / Familiar', 75, 'Cpu', 'AI coding assistance for reasoning, architecture, and debugging', 10, true),
('sk-11', 'AI-assisted coding', 'AI / Development Tools', 'Learning / Familiar', 80, 'Wand2', 'Modern development tools and workflows for building and learning', 11, true),
('sk-12', 'English', 'Languages', 'Good / Intermediate', 85, 'Languages', 'Professional and academic communication', 12, true),
('sk-13', 'Telugu', 'Languages', 'Proficient', 100, 'MessageSquare', 'Native language proficiency', 13, true),
('sk-14', 'German', 'Languages', 'Basic / Learning', 25, 'Globe', 'Basic conversational and elementary language learning', 14, true);

-- 7. Learning Journey
INSERT INTO public.learning (id, topic, description, category, progress, status, order_index, icon) VALUES
('lrn-1', 'JavaScript', 'Mastering DOM interactions, async/await, and ES6+ features', 'Frontend', 60, 'Learning', 1, 'FileCode2'),
('lrn-2', 'Web Development', 'Building full-stack, responsive modern web applications', 'Full-Stack', 65, 'Learning', 2, 'Globe'),
('lrn-3', 'AI-assisted coding', 'Leveraging AI tools for accelerated prototyping and clean code practices', 'AI & Tools', 75, 'Practicing', 3, 'Bot'),
('lrn-4', 'DBMS', 'Relational data structures, normalization, and relational querying', 'Database', 60, 'Learning', 4, 'Database'),
('lrn-5', 'Supabase', 'Backend integration, PostgreSQL tables, RLS security, and storage', 'Database', 60, 'Learning', 5, 'Server'),
('lrn-6', 'Tailwind CSS', 'Crafting responsive layouts, dark mode styles, and design systems', 'Frontend', 70, 'Practicing', 6, 'Sparkles'),
('lrn-7', 'AI & AGI concepts', 'Exploring machine intelligence foundations and neural concepts', 'Core CSE', 50, 'Learning', 7, 'Brain'),
('lrn-8', 'Modern development tools', 'Git, Vite, VS Code workflows, and cloud developer platforms', 'Tooling', 70, 'Practicing', 8, 'Terminal');

-- 8. Social Links
INSERT INTO public.social_links (id, platform, label, url, icon, is_enabled, order_index) VALUES
('soc-1', 'Email', 'Email', 'mailto:16manojkumars@gmail.com', 'Mail', true, 1),
('soc-2', 'GitHub', 'GitHub', '', 'Github', false, 2),
('soc-3', 'LinkedIn', 'LinkedIn', '', 'Linkedin', false, 3),
('soc-4', 'Instagram', 'Instagram', '', 'Instagram', false, 4),
('soc-5', 'YouTube', 'YouTube', '', 'Youtube', false, 5);

-- 9. Settings
INSERT INTO public.website_settings (id, theme, primary_color, secondary_color, button_style, card_radius, font, animation_intensity) VALUES
('web-settings-1', 'light', '#2563eb', '#64748b', 'rounded-xl', '0.75rem', 'Inter', 'subtle');

INSERT INTO public.section_settings (id, home, about, education, skills, projects, certifications, experience, achievements, learning, services, contact) VALUES
('sec-settings-1', true, true, true, true, true, true, false, false, true, false, true);

INSERT INTO public.seo_settings (id, website_title, meta_description, keywords, author, og_title, og_description) VALUES
('seo-settings-1', 'Sahukari Manoj Kumar | B.Tech CSE – AI & AGI Student', 'Portfolio of Sahukari Manoj Kumar, a B.Tech CSE – AI & AGI student interested in web development, AI-assisted coding, databases, and modern technologies.', 'Sahukari Manoj Kumar, Portfolio, B.Tech CSE, AI, AGI, Web Development, Supabase, Student Developer, Aurora University', 'Sahukari Manoj Kumar', 'Sahukari Manoj Kumar | B.Tech CSE – AI & AGI Student', 'Portfolio of Sahukari Manoj Kumar, a B.Tech CSE – AI & AGI student interested in web development, AI-assisted coding, databases, and modern technologies.');

INSERT INTO public.footer_settings (id, name, title, copyright_text, tagline, show_social_links, show_back_to_top, back_to_top_enabled) VALUES
('footer-settings-1', 'Sahukari Manoj Kumar', 'B.Tech CSE - AI & AGI Student', '© 2026 Sahukari Manoj Kumar. All Rights Reserved.', 'Undergraduate Portfolio • Aurora Deemed to be University', true, true, true);
