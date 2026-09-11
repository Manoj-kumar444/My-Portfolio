import { supabase, isSupabaseConfigured } from './supabase';
import { dataService } from './dataService';

export interface SyncResult {
  success: boolean;
  message: string;
  syncedTables?: string[];
  errors?: string[];
}

export const supabaseSync = {
  isConfigured(): boolean {
    return isSupabaseConfigured && supabase !== null;
  },

  async testConnection(): Promise<{ connected: boolean; latencyMs?: number; error?: string; tablesExist?: boolean }> {
    if (!this.isConfigured() || !supabase) {
      return { connected: false, error: 'Supabase credentials not configured' };
    }

    const start = Date.now();
    try {
      const { data, error } = await supabase.from('profiles').select('id').limit(1);
      const latencyMs = Date.now() - start;

      if (error) {
        if (error.code === 'PGRST205' || (error.message && error.message.includes('does not exist'))) {
          return {
            connected: true,
            latencyMs,
            tablesExist: false,
            error: 'Connected to Supabase Cloud! Please run supabase/setup_all.sql in your Supabase SQL Editor.'
          };
        }
        return { connected: false, error: error.message };
      }

      return { connected: true, latencyMs, tablesExist: true };
    } catch (err: any) {
      return { connected: false, error: err?.message || 'Network connection failed' };
    }
  },

  async fetchFromSupabase(): Promise<boolean> {
    if (!this.isConfigured() || !supabase) return false;

    try {
      // 1. Profile
      const { data: profileData, error: profileErr } = await supabase.from('profiles').select('*').limit(1);
      if (!profileErr && profileData && profileData.length > 0) {
        dataService.updateProfile(profileData[0]);
      }

      // 2. Home Content
      const { data: homeData, error: homeErr } = await supabase.from('home_content').select('*').limit(1);
      if (!homeErr && homeData && homeData.length > 0) {
        dataService.updateHomeContent(homeData[0]);
      }

      // 3. About Content
      const { data: aboutData, error: aboutErr } = await supabase.from('about_content').select('*').limit(1);
      if (!aboutErr && aboutData && aboutData.length > 0) {
        dataService.updateAboutContent(aboutData[0]);
      }

      // 4. Navigation
      const { data: navData, error: navErr } = await supabase.from('navigation').select('*').order('order_index');
      if (!navErr && navData && navData.length > 0) {
        localStorage.setItem('smk_navigation', JSON.stringify(navData));
      }

      // 5. Education
      const { data: eduData, error: eduErr } = await supabase.from('education').select('*').order('order_index');
      if (!eduErr && eduData && eduData.length > 0) {
        localStorage.setItem('smk_education', JSON.stringify(eduData));
      }

      // 6. Skills
      const { data: skillsData, error: skErr } = await supabase.from('skills').select('*').order('order_index');
      if (!skErr && skillsData && skillsData.length > 0) {
        localStorage.setItem('smk_skills', JSON.stringify(skillsData));
      }

      // 7. Projects
      const { data: projData, error: prjErr } = await supabase.from('projects').select('*').order('order_index');
      if (!prjErr && projData) {
        localStorage.setItem('smk_projects', JSON.stringify(projData));
      }

      // 8. Certifications
      const { data: certData, error: certErr } = await supabase.from('certifications').select('*').order('order_index');
      if (!certErr && certData) {
        localStorage.setItem('smk_certifications', JSON.stringify(certData));
      }

      // 9. Experience
      const { data: expData, error: expErr } = await supabase.from('experience').select('*').order('order_index');
      if (!expErr && expData) {
        localStorage.setItem('smk_experience', JSON.stringify(expData));
      }

      // 10. Achievements
      const { data: achData, error: achErr } = await supabase.from('achievements').select('*').order('order_index');
      if (!achErr && achData) {
        localStorage.setItem('smk_achievements', JSON.stringify(achData));
      }

      // 11. Learning
      const { data: lrnData, error: lrnErr } = await supabase.from('learning').select('*').order('order_index');
      if (!lrnErr && lrnData && lrnData.length > 0) {
        localStorage.setItem('smk_learning', JSON.stringify(lrnData));
      }

      // 12. Services
      const { data: srvData, error: srvErr } = await supabase.from('services').select('*').order('order_index');
      if (!srvErr && srvData) {
        localStorage.setItem('smk_services', JSON.stringify(srvData));
      }

      // 13. Social Links
      const { data: socData, error: socErr } = await supabase.from('social_links').select('*').order('order_index');
      if (!socErr && socData && socData.length > 0) {
        localStorage.setItem('smk_social_links', JSON.stringify(socData));
      }

      // 14. Website Settings
      const { data: webData, error: webErr } = await supabase.from('website_settings').select('*').limit(1);
      if (!webErr && webData && webData.length > 0) {
        dataService.updateWebsiteSettings(webData[0]);
      }

      // 15. Section Settings
      const { data: secData, error: secErr } = await supabase.from('section_settings').select('*').limit(1);
      if (!secErr && secData && secData.length > 0) {
        dataService.updateSectionSettings(secData[0]);
      }

      // 16. SEO Settings
      const { data: seoData, error: seoErr } = await supabase.from('seo_settings').select('*').limit(1);
      if (!seoErr && seoData && seoData.length > 0) {
        dataService.updateSeoSettings(seoData[0]);
      }

      // 17. Footer Settings
      const { data: footerData, error: footerErr } = await supabase.from('footer_settings').select('*').limit(1);
      if (!footerErr && footerData && footerData.length > 0) {
        dataService.updateFooterSettings(footerData[0]);
      }

      return true;
    } catch (err) {
      console.warn('Supabase fetch notice:', err);
      return false;
    }
  },

  subscribeToRealtime(onUpdate: () => void) {
    if (!this.isConfigured() || !supabase) return () => {};
    const client = supabase;

    try {
      const channel = client
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public'
          },
          async () => {
            await this.fetchFromSupabase();
            onUpdate();
          }
        )
        .subscribe();

      return () => {
        client.removeChannel(channel);
      };
    } catch (err) {
      console.warn('Realtime subscription notice:', err);
      return () => {};
    }
  },

  async syncAllToSupabase(): Promise<SyncResult> {
    if (!this.isConfigured() || !supabase) {
      return { success: false, message: 'Supabase is not configured' };
    }

    const synced: string[] = [];
    const errors: string[] = [];

    try {
      // 1. Profile
      const profile = dataService.getProfile();
      if (profile) {
        const { error } = await supabase.from('profiles').upsert([
          {
            id: 'profile-1',
            full_name: profile.full_name,
            degree: profile.degree,
            specialization: profile.specialization,
            current_year: profile.current_year,
            university: profile.university,
            native_location: profile.native_location,
            edu_location: profile.edu_location,
            email: profile.email,
            phone: profile.phone,
            bio: profile.bio,
            profile_photo: profile.profile_photo || '',
            updated_at: new Date().toISOString()
          }
        ]);
        if (error) errors.push(`profiles: ${error.message}`);
        else synced.push('profiles');
      }

      // 2. Home Content
      const home = dataService.getHomeContent();
      if (home) {
        const { error } = await supabase.from('home_content').upsert([
          {
            id: 'home-1',
            greeting: home.greeting,
            title: home.title,
            professional_title: home.professional_title,
            hero_description: home.hero_description,
            primary_btn_text: home.primary_btn_text,
            primary_btn_link: home.primary_btn_link,
            secondary_btn_text: home.secondary_btn_text,
            secondary_btn_link: home.secondary_btn_link,
            resume_btn_enabled: home.resume_btn_enabled,
            hero_visible: home.hero_visible,
            profile_image_url: home.profile_image_url || '',
            image_fit: home.image_fit || 'top',
            updated_at: new Date().toISOString()
          }
        ]);
        if (error) errors.push(`home_content: ${error.message}`);
        else synced.push('home_content');
      }

      // 3. About Content
      const about = dataService.getAboutContent();
      if (about) {
        const { error } = await supabase.from('about_content').upsert([
          {
            id: 'about-1',
            title: about.title,
            description: about.description,
            interests: about.interests || [],
            career_goals: about.career_goals || '',
            updated_at: new Date().toISOString()
          }
        ]);
        if (error) errors.push(`about_content: ${error.message}`);
        else synced.push('about_content');
      }

      // 4. Education
      const education = dataService.getEducation();
      if (education.length > 0) {
        const payload = education.map(e => ({
          id: e.id,
          degree: e.degree,
          course: e.course || '',
          specialization: e.specialization || '',
          institution: e.institution,
          campus: e.campus || '',
          university: e.university || '',
          location: e.location,
          start_year: e.start_year || '',
          end_year: e.end_year || '',
          current_status: e.current_status || '',
          marks: e.marks || null,
          percentage: e.percentage || null,
          cgpa: e.cgpa || null,
          description: e.description || '',
          order_index: e.order_index
        }));
        const { error } = await supabase.from('education').upsert(payload);
        if (error) errors.push(`education: ${error.message}`);
        else synced.push('education');
      }

      // 5. Skills
      const skills = dataService.getSkills();
      if (skills.length > 0) {
        const payload = skills.map(s => ({
          id: s.id,
          name: s.name,
          category: s.category,
          level: s.level,
          percentage: s.percentage,
          icon: s.icon || '',
          description: s.description || '',
          is_enabled: s.is_enabled,
          order_index: s.order_index
        }));
        const { error } = await supabase.from('skills').upsert(payload);
        if (error) errors.push(`skills: ${error.message}`);
        else synced.push('skills');
      }

      // 6. Projects
      const projects = dataService.getProjects();
      if (projects.length > 0) {
        const payload = projects.map(p => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          short_description: p.short_description,
          full_description: p.full_description || '',
          main_image: p.main_image || '',
          screenshots: p.screenshots || [],
          technologies: p.technologies || [],
          features: p.features || [],
          category: p.category || 'Web Application',
          status: p.status || 'In Progress',
          github_url: p.github_url || '',
          demo_url: p.demo_url || '',
          video_url: p.video_url || '',
          order_index: p.order_index,
          is_featured: p.is_featured,
          is_published: p.is_published
        }));
        const { error } = await supabase.from('projects').upsert(payload);
        if (error) errors.push(`projects: ${error.message}`);
        else synced.push('projects');
      }

      // 7. Social Links
      const social = dataService.getSocialLinks();
      if (social.length > 0) {
        const payload = social.map(s => ({
          id: s.id,
          platform: s.platform,
          label: s.label,
          url: s.url || '',
          icon: s.icon,
          is_enabled: s.is_enabled,
          order_index: s.order_index
        }));
        const { error } = await supabase.from('social_links').upsert(payload);
        if (error) errors.push(`social_links: ${error.message}`);
        else synced.push('social_links');
      }

      // 8. Learning
      const learning = dataService.getLearning();
      if (learning.length > 0) {
        const payload = learning.map(l => ({
          id: l.id,
          topic: l.topic,
          description: l.description || '',
          category: l.category || 'Technology',
          progress: l.progress || 50,
          status: l.status || 'Learning',
          order_index: l.order_index,
          icon: l.icon || ''
        }));
        const { error } = await supabase.from('learning').upsert(payload);
        if (error) errors.push(`learning: ${error.message}`);
        else synced.push('learning');
      }

      // 9. Website Settings
      const webSettings = dataService.getWebsiteSettings();
      if (webSettings) {
        const { error } = await supabase.from('website_settings').upsert([
          {
            id: 'web-settings-1',
            theme: webSettings.theme,
            primary_color: webSettings.primary_color,
            secondary_color: webSettings.secondary_color,
            button_style: webSettings.button_style,
            card_radius: webSettings.card_radius,
            font: webSettings.font,
            animation_intensity: webSettings.animation_intensity,
            updated_at: new Date().toISOString()
          }
        ]);
        if (error) errors.push(`website_settings: ${error.message}`);
        else synced.push('website_settings');
      }

      // 10. Section Settings
      const secSettings = dataService.getSectionSettings();
      if (secSettings) {
        const { error } = await supabase.from('section_settings').upsert([
          {
            id: 'sec-settings-1',
            ...secSettings,
            updated_at: new Date().toISOString()
          }
        ]);
        if (error) errors.push(`section_settings: ${error.message}`);
        else synced.push('section_settings');
      }

      // 11. Footer Settings
      const footer = dataService.getFooterSettings();
      if (footer) {
        const { error } = await supabase.from('footer_settings').upsert([
          {
            id: 'footer-settings-1',
            name: footer.name,
            title: footer.title,
            copyright_text: footer.copyright_text,
            tagline: footer.tagline,
            show_social_links: footer.show_social_links,
            show_back_to_top: footer.show_back_to_top,
            back_to_top_enabled: footer.back_to_top_enabled,
            updated_at: new Date().toISOString()
          }
        ]);
        if (error) errors.push(`footer_settings: ${error.message}`);
        else synced.push('footer_settings');
      }

      if (synced.length > 0) {
        dataService.logActivity('Cloud Sync', 'Supabase', `Synced ${synced.length} tables`, 'Uploaded local data to Supabase Cloud');
      }

      const hasFatalErrors = errors.length > 0 && synced.length === 0;
      return {
        success: !hasFatalErrors,
        message: hasFatalErrors
          ? `Sync notice: Please create tables in Supabase SQL editor using supabase/setup_all.sql. Details: ${errors[0]}`
          : `Successfully synced ${synced.length} tables to Supabase Cloud!`,
        syncedTables: synced,
        errors
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || 'Sync failed due to an unexpected error.'
      };
    }
  }
};
