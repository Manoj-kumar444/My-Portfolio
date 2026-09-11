-- ==========================================================
-- SAHUKARI MANOJ KUMAR PORTFOLIO & CMS DATABASE SCHEMA
-- Target Database: Supabase PostgreSQL
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ABOUT CONTENT TABLE
CREATE TABLE IF NOT EXISTS public.about_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL DEFAULT 'About Me',
    description TEXT NOT NULL,
    interests TEXT[] DEFAULT ARRAY['Web Development', 'AI-assisted Coding', 'Databases', 'Modern Software Technologies'],
    career_goals TEXT DEFAULT 'Aspiring software engineer passionate about modern web technologies and AI integrations.',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. NAVIGATION ITEMS
CREATE TABLE IF NOT EXISTS public.navigation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    path TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    is_custom BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Frontend', 'Database', 'AI / Development Tools', 'Languages'
    level TEXT NOT NULL, -- 'Basic / Learning', 'Learning / Familiar', 'Good / Intermediate'
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
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    full_description TEXT,
    main_image TEXT,
    screenshots TEXT[] DEFAULT ARRAY[]::TEXT[],
    technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    category TEXT DEFAULT 'Web Application',
    status TEXT NOT NULL DEFAULT 'In Progress', -- 'Planning', 'In Progress', 'Completed', 'Maintenance'
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
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'Technology',
    progress INT DEFAULT 50,
    status TEXT NOT NULL DEFAULT 'Learning', -- 'Learning', 'Practicing', 'Completed'
    start_date TEXT,
    completion_date TEXT,
    icon TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. RESUMES TABLE
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform TEXT NOT NULL,
    label TEXT NOT NULL,
    url TEXT,
    icon TEXT NOT NULL,
    is_enabled BOOLEAN DEFAULT true,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. MEDIA LIBRARY TABLE
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INT,
    category TEXT DEFAULT 'general',
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. WEBSITE & SECTION SETTINGS
CREATE TABLE IF NOT EXISTS public.website_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    theme TEXT DEFAULT 'light',
    primary_color TEXT DEFAULT '#2563eb',
    secondary_color TEXT DEFAULT '#64748b',
    button_style TEXT DEFAULT 'rounded-lg',
    card_radius TEXT DEFAULT '0.75rem',
    font TEXT DEFAULT 'Inter',
    animation_intensity TEXT DEFAULT 'subtle',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.section_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- 18. SEO SETTINGS
CREATE TABLE IF NOT EXISTS public.seo_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    website_title TEXT DEFAULT 'Sahukari Manoj Kumar | B.Tech CSE – AI & AGI Student',
    meta_description TEXT DEFAULT 'Portfolio of Sahukari Manoj Kumar, a B.Tech CSE – AI & AGI student interested in web development, AI-assisted coding, databases, and modern technologies.',
    keywords TEXT DEFAULT 'Sahukari Manoj Kumar, Portfolio, CSE, AI, AGI, Web Development, Supabase, Student Developer',
    author TEXT DEFAULT 'Sahukari Manoj Kumar',
    og_title TEXT DEFAULT 'Sahukari Manoj Kumar | B.Tech CSE – AI & AGI Student',
    og_description TEXT DEFAULT 'Portfolio of Sahukari Manoj Kumar, a B.Tech CSE – AI & AGI student interested in web development, AI-assisted coding, databases, and modern technologies.',
    og_image TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. FOOTER SETTINGS
CREATE TABLE IF NOT EXISTS public.footer_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT DEFAULT 'Sahukari Manoj Kumar',
    title TEXT DEFAULT 'B.Tech CSE – AI & AGI Student',
    copyright_text TEXT DEFAULT '© 2026 Sahukari Manoj Kumar. All Rights Reserved.',
    back_to_top_enabled BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action TEXT NOT NULL,
    admin_email TEXT NOT NULL,
    item_type TEXT,
    item_title TEXT,
    details TEXT,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);