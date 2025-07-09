import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';

export default function CV() {
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
    document.documentElement.style.setProperty('--page-bg', color);
    document.documentElement.style.setProperty('--text-primary', primary);
    document.documentElement.style.setProperty('--text-secondary', secondary);
    document.body.style.background = color;
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
      <div style={{ paddingTop: '8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: 56, fontWeight: 800, color: darkMode ? '#eaeaea' : '#222', margin: 0, fontFamily: 'inherit', letterSpacing: 0.01 }}>
          Curriculum Vitae
        </h1>
        <div style={{ marginTop: 32, width: '100%', maxWidth: 800, background: darkMode ? '#181818' : '#fff', borderRadius: 24, boxShadow: '0 4px 32px 0 rgba(0,0,0,0.10)', padding: 40 }}>
          <p style={{ color: darkMode ? '#cccccc' : '#444', fontSize: 20 }}>
            This is a placeholder for your CV. Add your CV content here.
          </p>
        </div>
      </div>
    </div>
  );
}
