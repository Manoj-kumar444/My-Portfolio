-- ==========================================================
-- SAHUKARI MANOJ KUMAR PORTFOLIO SEED DATA
-- ==========================================================

-- Clean existing data
TRUNCATE TABLE public.profiles, public.home_content, public.about_content, public.navigation, public.education, public.skills, public.projects, public.certifications, public.experience, public.achievements, public.learning, public.services, public.social_links, public.website_settings, public.section_settings, public.seo_settings, public.footer_settings CASCADE;

-- 1. PROFILE
INSERT INTO public.profiles (
    full_name, degree, specialization, current_year, university, native_location, edu_location, email, phone, bio
) VALUES (
    'Sahukari Manoj Kumar',
    'B.Tech',
    'Computer Science Engineering – AI & AGI',
    '2nd Year',
    'Aurora Deemed to be University',
    'L.N. Peta Junction, Srikakulam, Andhra Pradesh, India',
    'Bhongir, Hyderabad, Telangana',
    '16manojkumars@gmail.com',
    '9440760898',
    'I am a second-year B.Tech Computer Science Engineering student specializing in CSE – AI & AGI. I am interested in web development, AI-assisted coding, databases, and modern software technologies. I enjoy learning new technologies and using them to create practical and useful projects.'
);

-- 2. HOME CONTENT
INSERT INTO public.home_content (
    greeting, title, professional_title, hero_description, primary_btn_text, primary_btn_link, secondary_btn_text, secondary_btn_link, resume_btn_enabled, hero_visible
) VALUES (
    'HELLO, I''M',
    'Sahukari Manoj Kumar',
    'B.Tech CSE – AI & AGI Student',
    'I am a second-year Computer Science Engineering student interested in web development, AI-assisted coding, databases, and modern technologies. I enjoy learning new technologies and building practical digital projects.',
    'Explore My Projects',
    '#projects',
    'Download Resume',
    '#resume',
    true,
    true
);

-- 3. ABOUT CONTENT
INSERT INTO public.about_content (
    title, description, interests, career_goals
) VALUES (
    'About Me',
    'I am Sahukari Manoj Kumar, a second-year B.Tech Computer Science Engineering student specializing in CSE – AI & AGI. I am interested in web development, AI-assisted coding, databases, and modern software technologies. I enjoy learning new technologies and using them to create practical and useful projects.',
    ARRAY['Web Development', 'AI-assisted Coding', 'Databases', 'Tailwind CSS & Modern UI', 'AI & AGI Concepts'],
    'Eager undergraduate aiming to master software engineering principles, full-stack development, and AI-assisted workflows to build impactful digital solutions.'
);

-- 4. NAVIGATION
INSERT INTO public.navigation (label, path, order_index, is_enabled) VALUES
('Home', '#home', 1, true),
('About', '#about', 2, true),
('Education', '#education', 3, true),
('Skills', '#skills', 4, true),
('Projects', '#projects', 5, true),
('Certifications', '#certifications', 6, true),
('Experience', '#experience', 7, false),
('Achievements', '#achievements', 8, false),
('Learning', '#learning', 9, true),
('Contact', '#contact', 10, true);

-- 5. EDUCATION
INSERT INTO public.education (
    degree, course, specialization, institution, campus, university, location, start_year, end_year, current_status, marks, percentage, order_index
) VALUES
(
    'B.Tech',
    'Computer Science Engineering',
    'AI & AGI',
    'Aurora Deemed to be University',
    'Main Campus',
    'Aurora Deemed to be University',
    'Bhongir, Hyderabad, Telangana',
    '2025',
    '2029',
    'Undergraduate – 2nd Year',
    NULL,
    NULL,
    1
),
(
    '12th / Intermediate',
    'Intermediate (MPC)',
    'Higher Secondary',
    'Sri Chaitanya',
    'Abdul Kalam Campus',
    'State Board of Intermediate Education',
    'Visakhapatnam, Andhra Pradesh',
    '2023',
    '2025',
    'Completed',
    '832',
    '83.2%',
    2
),
(
    '10th Standard',
    'Secondary School Certificate (SSC)',
    'Secondary Education',
    'ZPHS School',
    NULL,
    'Board of Secondary Education',
    'L.N. Peta, Andhra Pradesh',
    '2022',
    '2023',
    'Completed',
    '428',
    NULL,
    3
);

-- 6. SKILLS
INSERT INTO public.skills (name, category, level, percentage, icon, description, order_index, is_enabled) VALUES
('HTML', 'Frontend', 'Good / Intermediate', 80, 'Code2', 'Semantic HTML5 structure and accessible markup', 1, true),
('CSS', 'Frontend', 'Good / Intermediate', 75, 'Palette', 'Responsive layouts, Flexbox, Grid, and modern styles', 2, true),
('JavaScript', 'Frontend', 'Basic / Learning', 50, 'FileCode2', 'Core concepts, DOM manipulation, ES6+ features', 3, true),
('Bootstrap', 'Frontend', 'Learning / Familiar', 60, 'Layout', 'Component library and responsive grid systems', 4, true),
('Tailwind CSS', 'Frontend', 'Learning / Familiar', 65, 'Sparkles', 'Utility-first modern CSS framework for custom UIs', 5, true),
('DBMS', 'Database', 'Familiar', 60, 'Database', 'Database Management Systems, relational design, SQL', 6, true),
('Supabase', 'Database', 'Learning / Used for projects', 65, 'Server', 'PostgreSQL, Row Level Security, Authentication, and APIs', 7, true),
('Antigravity', 'AI / Development Tools', 'Familiar', 75, 'Bot', 'AI-assisted development and modern coding workflows', 8, true),
('Replit', 'AI / Development Tools', 'Familiar', 70, 'Terminal', 'Cloud-based development and collaborative prototyping', 9, true),
('Claude', 'AI / Development Tools', 'Familiar', 75, 'Cpu', 'AI assistance for code generation, logic, and debugging', 10, true),
('AI-assisted coding', 'AI / Development Tools', 'Familiar', 80, 'Wand2', 'Modern developer tools for learning and building projects', 11, true),
('English', 'Languages', 'Fluent / Professional', 90, 'Languages', 'Fluent written and verbal communication', 12, true),
('Telugu', 'Languages', 'Native', 100, 'MessageSquare', 'Native language proficiency', 13, true),
('German', 'Languages', 'Basic', 30, 'Globe', 'Basic elementary conversational and learning', 14, true);

-- 7. LEARNING JOURNEY
INSERT INTO public.learning (topic, description, category, progress, status, order_index) VALUES
('JavaScript Deep Dive', 'Mastering asynchronous programming, closures, and modern ES6+ paradigms', 'Frontend', 60, 'Learning', 1),
('Web Development Architecture', 'Building responsive, high-performance web applications and component design', 'Full-Stack', 65, 'Learning', 2),
('AI-assisted Coding Workflows', 'Leveraging AI tools to accelerate prototyping, testing, and debugging', 'AI & Tools', 75, 'Practicing', 3),
('DBMS & Relational Data', 'Relational database design, normal forms, indexing, and SQL queries', 'Database', 60, 'Learning', 4),
('Supabase & Backend Architecture', 'Implementing PostgreSQL schemas, authentication, RLS, and storage', 'Backend', 60, 'Learning', 5),
('Tailwind CSS Mastery', 'Creating polished, accessible, responsive design systems and themes', 'Frontend', 70, 'Practicing', 6),
('AI & AGI Foundations', 'Core concepts in Artificial Intelligence, Machine Learning, and reasoning models', 'AI & AGI', 50, 'Learning', 7),
('Modern Developer Tooling', 'Git, Vite, VS Code extensions, and continuous deployment workflows', 'Tooling', 70, 'Practicing', 8);

-- 8. SOCIAL LINKS
INSERT INTO public.social_links (platform, label, url, icon, is_enabled, order_index) VALUES
('Email', 'Email', 'mailto:16manojkumars@gmail.com', 'Mail', true, 1),
('GitHub', 'GitHub', '', 'Github', false, 2),
('LinkedIn', 'LinkedIn', '', 'Linkedin', false, 3),
('Instagram', 'Instagram', '', 'Instagram', false, 4),
('YouTube', 'YouTube', '', 'Youtube', false, 5);

-- 9. WEBSITE & SECTION SETTINGS
INSERT INTO public.website_settings (theme, primary_color, secondary_color, button_style, card_radius, font, animation_intensity) VALUES
('light', '#2563eb', '#64748b', 'rounded-xl', '0.75rem', 'Inter', 'subtle');

INSERT INTO public.section_settings (home, about, education, skills, projects, certifications, experience, achievements, learning, services, contact) VALUES
(true, true, true, true, true, true, false, false, true, false, true);

-- 10. SEO & FOOTER
INSERT INTO public.seo_settings (website_title, meta_description, keywords, author, og_title, og_description) VALUES
(
    'Sahukari Manoj Kumar | B.Tech CSE – AI & AGI Student',
    'Portfolio of Sahukari Manoj Kumar, a B.Tech CSE – AI & AGI student interested in web development, AI-assisted coding, databases, and modern technologies.',
    'Sahukari Manoj Kumar, Portfolio, CSE, AI, AGI, Web Development, Supabase, Student Developer, Aurora University',
    'Sahukari Manoj Kumar',
    'Sahukari Manoj Kumar | B.Tech CSE – AI & AGI Student',
    'Portfolio of Sahukari Manoj Kumar, a B.Tech CSE – AI & AGI student interested in web development, AI-assisted coding, databases, and modern technologies.'
);

INSERT INTO public.footer_settings (name, title, copyright_text, back_to_top_enabled) VALUES
('Sahukari Manoj Kumar', 'B.Tech CSE – AI & AGI Student', '© 2026 Sahukari Manoj Kumar. All Rights Reserved.', true);