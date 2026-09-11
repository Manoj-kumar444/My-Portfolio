import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Education } from '../components/Education';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Certifications } from '../components/Certifications';
import { Experience } from '../components/Experience';
import { Achievements } from '../components/Achievements';
import { Learning } from '../components/Learning';
import { Services } from '../components/Services';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { useData } from '../context/DataContext';

export const HomePage: React.FC = () => {
  const { seoSettings } = useData();

  useEffect(() => {
    if (seoSettings.website_title) {
      document.title = seoSettings.website_title;
    }
  }, [seoSettings]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-navy-900 dark:text-slate-100 flex flex-col justify-between selection:bg-primary-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Achievements />
        <Learning />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};