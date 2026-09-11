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
            error: 'Connected to Supabase Cloud! Please run the SQL schema in your Supabase SQL Editor.'
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

      // 3. Education
      const { data: eduData, error: eduErr } = await supabase.from('education').select('*').order('order_index');
      if (!eduErr && eduData && eduData.length > 0) {
        localStorage.setItem('smk_education', JSON.stringify(eduData));
      }

      // 4. Skills
      const { data: skillsData, error: skErr } = await supabase.from('skills').select('*').order('order_index');
      if (!skErr && skillsData && skillsData.length > 0) {
        localStorage.setItem('smk_skills', JSON.stringify(skillsData));
      }

      // 5. Projects
      const { data: projData, error: prjErr } = await supabase.from('projects').select('*').order('order_index');
      if (!prjErr && projData && projData.length > 0) {
        localStorage.setItem('smk_projects', JSON.stringify(projData));
      }

      // 6. Social Links
      const { data: socData, error: socErr } = await supabase.from('social_links').select('*').order('order_index');
      if (!socErr && socData && socData.length > 0) {
        localStorage.setItem('smk_social_links', JSON.stringify(socData));
      }

      return true;
    } catch (err) {
      console.warn('Supabase fetch notice:', err);
      return false;
    }
  },

  async syncAllToSupabase(): Promise<SyncResult> {
    if (!this.isConfigured() || !supabase) {
      return { success: false, message: 'Supabase is not configured in .env' };
    }

    const synced: string[] = [];
    const errors: string[] = [];

    try {
      // 1. Profile
      const profile = dataService.getProfile();
      if (profile) {
        const { error } = await supabase.from('profiles').upsert([
          {
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
            profile_photo: profile.profile_photo,
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
            profile_image_url: home.profile_image_url,
            image_fit: home.image_fit || 'top',
            updated_at: new Date().toISOString()
          }
        ]);
        if (error) errors.push(`home_content: ${error.message}`);
        else synced.push('home_content');
      }

      // 3. Education
      const education = dataService.getEducation();
      if (education.length > 0) {
        const payload = education.map(e => ({
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
          marks: e.marks || '',
          percentage: e.percentage || '',
          cgpa: e.cgpa || '',
          description: e.description || '',
          order_index: e.order_index
        }));
        const { error } = await supabase.from('education').upsert(payload);
        if (error) errors.push(`education: ${error.message}`);
        else synced.push('education');
      }

      // 4. Skills
      const skills = dataService.getSkills();
      if (skills.length > 0) {
        const payload = skills.map(s => ({
          name: s.name,
          category: s.category,
          level: s.level,
          percentage: s.percentage,
          is_enabled: s.is_enabled,
          order_index: s.order_index
        }));
        const { error } = await supabase.from('skills').upsert(payload);
        if (error) errors.push(`skills: ${error.message}`);
        else synced.push('skills');
      }

      // 5. Social Links
      const social = dataService.getSocialLinks();
      if (social.length > 0) {
        const payload = social.map(s => ({
          platform: s.platform,
          label: s.label,
          url: s.url,
          icon: s.icon,
          is_enabled: s.is_enabled,
          order_index: s.order_index
        }));
        const { error } = await supabase.from('social_links').upsert(payload);
        if (error) errors.push(`social_links: ${error.message}`);
        else synced.push('social_links');
      }

      if (synced.length > 0) {
        dataService.logActivity('Cloud Sync', 'Supabase', `Synced ${synced.length} tables`, 'Uploaded local data to Supabase Cloud');
      }

      const hasFatalErrors = errors.length > 0 && synced.length === 0;
      return {
        success: !hasFatalErrors,
        message: hasFatalErrors
          ? `Sync notice: Please create the tables first in your Supabase SQL Editor. Error: ${errors[0]}`
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
