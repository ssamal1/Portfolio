import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Projects() {
  const [darkMode, setDarkMode] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [hoveredLink, setHoveredLink] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') setDarkMode(true);
    setThemeReady(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      }
      return next;
    });
  };

  useEffect(() => {
    const color = darkMode ? '#000' : '#f8f4ec';
    const primary = darkMode ? '#eaeaea' : '#26324b';
    const secondary = darkMode ? '#cccccc' : '#444444';
    const hoverBg = darkMode ? 'transparent' : 'rgba(0,0,0,0.05)';

    document.body.style.background = color;
    const root = document.documentElement;
    root.style.setProperty('--text-primary', primary);
    root.style.setProperty('--text-secondary', secondary);
    root.style.setProperty('--hover-bg', hoverBg);
  }, [darkMode]);

  return (
    <div style={{ minHeight: '100vh', background: darkMode ? '#000' : '#f8f4ec' }}>
      <Header
        navRef={navRef}
        hoveredLink={hoveredLink}
        setHoveredLink={setHoveredLink}
        darkMode={darkMode}
        themeReady={themeReady}
        toggleDarkMode={toggleDarkMode}
      />
      <main className="projects-container">
        <h1 className="projects-title">My Projects</h1>
        <div className="projects-grid">
          {/* Placeholder for projects */}
          <Link href="/projects/margo" passHref legacyBehavior>
            <div className="project-card">
              <h3>Margo</h3>
              <p>A WebGL/GLSL level-set solver for 2D fluid dynamics and game theory with real-time visualization and GPU acceleration.</p>
            </div>
          </Link>
          <Link href="/projects/upnow" passHref legacyBehavior>
            <div className="project-card">
              <h3>UpNow</h3>
              <p>An iOS alarm app that generates and adapts unique AI-composed melodies based on your wake-up patterns to help you wake up more naturally.</p>
            </div>
          </Link>
          <Link href="/projects/thia" passHref legacyBehavior>
            <div className="project-card">
              <h3>THIA</h3>
              <p>An AI therapist that uses NLP and sentiment analysis to provide personalized mental health support through natural conversations.</p>
            </div>
          </Link>
          <Link href="/projects/orca" passHref legacyBehavior>
            <div className="project-card">
              <h3>ORCA</h3>
              <p>An AI music production platform that generates editable sheet music with audio, preserving musical creativity and expression.</p>
            </div>
          </Link>
          <Link href="/projects/covid-funding" passHref legacyBehavior>
            <div className="project-card">
              <h3>COVID Funding Analysis</h3>
              <p>Geospatial analysis of CARES Act spending to identify effective COVID-19 mitigation strategies in California.</p>
            </div>
          </Link>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes border-sweep {
          0% { background-position: 0 0; }
          25% { background-position: 100% 0; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0 100%; }
          100% { background-position: 0 0; }
        }
        .projects-container {
          animation: fade-in-up 0.6s ease-out forwards;
          color: ${darkMode ? '#fff' : '#000'};
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 10rem 2rem;
          font-family: inherit;
        }
        .projects-title {
          font-size: 36px;
          font-weight: 800;
          margin: 0 0 48px 0;
          text-align: left;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }
        .project-card {
          --bg-rgb: ${darkMode ? '30, 30, 30' : '253, 245, 230'}; /* Tan color for light mode */
          --highlight-rgb: ${darkMode ? '255, 255, 255' : '0, 0, 0'};

          padding: 1.5rem;
          border-radius: 12px;
          background: rgb(var(--bg-rgb));
          border: 1px solid rgba(var(--highlight-rgb), 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .project-card {
          cursor: pointer;
        }

        .project-card:hover {
          --bg-color: linear-gradient(rgb(var(--bg-rgb)), rgb(var(--bg-rgb)));
          --border-color: linear-gradient(145deg,
            rgba(var(--highlight-rgb), 0.8) 0%,
            rgba(var(--highlight-rgb), 0) 49.5%,
            rgba(var(--highlight-rgb), 0) 50.5%,
            rgba(var(--highlight-rgb), 0.8) 100%);

          border-color: transparent;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          background:
            var(--bg-color) padding-box,
            var(--border-color) border-box;
          
          background-size: 150% 150%;
          animation: border-sweep 5s linear infinite;
        }
        .project-card h3 {
          margin: 0 0 1rem 0;
          font-size: 20px;
          text-decoration: none;
          color: ${darkMode ? '#fff' : '#000'};
        }
        .project-card p {
          font-size: 16px;
          line-height: 1.6;
          color: ${darkMode ? '#ccc' : '#333'};
          text-decoration: none;
          margin: 0;
        }
      `}</style>
      <Footer />
    </div>
  );
}
