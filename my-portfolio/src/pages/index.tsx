import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'

export default function Home() {
  const words = [
    'Software Developer',
    'Researcher',
    'Computer Science Student',
    'Mathematician',
  ]
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState<'fade-in' | 'fade-out'>('fade-in')
  const [darkMode, setDarkMode] = useState(false)
  const [headerReady, setHeaderReady] = useState(false)
  const [themeReady, setThemeReady] = useState(false)
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      }
      return next;
    });
  };

  const navRef = useRef<HTMLElement>(null)
  const [hoveredLink, setHoveredLink] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })

  useEffect(() => {
    // after mount: sync dark mode from storage & trigger header animation
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') setDarkMode(true);
    setThemeReady(true);
    const t = setTimeout(() => setHeaderReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Restore scroll position on page load & save on scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = sessionStorage.getItem('scrollY');
    if (saved) {
      window.scrollTo(0, parseInt(saved, 10));
    }
    const handleScroll = () => {
      sessionStorage.setItem('scrollY', String(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Glassy translucent header in dark mode
  const headerStyle = darkMode ? {
    background: 'rgba(0,0,0,0.45)',
    border: '1.5px solid rgba(255,255,255,0.35)',
    boxShadow: '0 8px 40px 0 rgba(0,0,0,0.60), 0 2px 24px 0 rgba(255,255,255,0.08)',
    color: '#ffffff',
    WebkitBackdropFilter: 'blur(26px) saturate(1.6)',
    backdropFilter: 'blur(26px) saturate(1.6)'
  } : {}

  // Sync page background via CSS variable for full-page coverage
  useEffect(() => {
    const color = darkMode ? '#000' : '#f8f4ec';
    const primary = darkMode ? '#eaeaea' : '#26324b';
    const secondary = darkMode ? '#cccccc' : '#444444';
    document.documentElement.style.setProperty('--page-bg', color);
    document.documentElement.style.setProperty('--text-primary', primary);
    document.documentElement.style.setProperty('--text-secondary', secondary);
    document.body.style.background = color;
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade('fade-out')
      setTimeout(() => {
        setIndex(i => (i + 1) % words.length)
        setFade('fade-in')
      }, 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: darkMode ? '#000' : '#f8f4ec'
      }}>
        <Header
          navRef={navRef}
          hoveredLink={hoveredLink}
          setHoveredLink={setHoveredLink}
          darkMode={darkMode}
          themeReady={themeReady}
          toggleDarkMode={toggleDarkMode}
        />
        <div className={headerReady ? 'upfade-enter' : 'upfade-init'} style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 56
        }}>
          <div style={{
            flexShrink: 0,
            width: 220,
            height: 220,
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 4px 32px 0 rgba(0,0,0,0.10)',
            border: '4px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff'
          }}>
            <Image
              src="/me.jpg"
              alt="Sanat Samal"
              width={220}
              height={220}
              style={{ objectFit: 'cover', borderRadius: '50%' }}
              priority
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
            <h1 style={{
              fontSize: 56,
              fontWeight: 800,
              color: darkMode ? '#eaeaea' : '#222',
              margin: 0,
              fontFamily: 'inherit',
              letterSpacing: 0.01
            }}>
              Hello, I am Sanat Samal
            </h1>
            <h2 className={fade} style={{
              fontSize: 36,
              fontWeight: 500,
              color: darkMode ? '#cccccc' : '#555',
              margin: '18px 0 0 2px',
              minHeight: 44,
              transition: 'opacity 0.5s',
            }}>
              {words[index]}
            </h2>
          </div>
        </div>
      </div>
      <section className={`about-me-section ${headerReady ? 'upfade-enter' : 'upfade-init'}`}>
        <h2>About Me</h2>
        <p className="about-me-text">
          I am an insatiably curious software engineer, machine learning researcher, systems tinkerer, and competitive mathematician. I love diving deep into anything that sparks my interest—whether it’s peeling back the layers of a large-language model, implementing file-system syscalls, or experimenting with tropical fruit trees that shouldn’t survive in Southern California.
        </p>
      </section>
      <style jsx>{`
        .fade-in {
          opacity: 1;
          transition: opacity 0.5s ease-in;
        }
        .fade-out {
          /* existing fade-out */
          opacity: 0;
          transition: opacity 0.5s ease-out;
        }

        /* -------- entrance rise + fade ---------- */
        .upfade-init {
          opacity: 0;
          transform: translateY(24px);
        }
        .upfade-enter {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .blur-header {
          transform-origin: center;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .blur-header.init {
          transform: translateX(-50%) scaleX(0);
        }
        .blur-header.enter {
          transform: translateX(-50%) scaleX(1);
        }

        .blur-header {
          /* Common styles */
          position: fixed;
          top: 2rem;
          left: 50%;
           transform: translateX(-50%);
          width: min(90vw, 700px);
          min-width: 340px;
          min-height: 54px;
          padding: 1.1rem 2.8rem;
          z-index: 1000;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: backdrop-filter;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          overflow: hidden;

          /* Light Mode Styles */
          background: rgba(255, 255, 255, 0.6);
          border: 1.5px solid rgba(255,255,255,0.55);
          box-shadow: 0 8px 40px 0 rgba(60,60,120,0.18), 0 2px 24px 0 rgba(180,200,255,0.13);
          -webkit-backdrop-filter: blur(22px) saturate(1.6);
          backdrop-filter: blur(22px) saturate(1.6);
          color: #222;
        }


        .blur-header::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: inset 0 1.5px 12px 0 rgba(200,210,255,0.09);
          pointer-events: none;
        }
        .blur-nav {
          position: relative; /* For the highlighter */
          display: flex;
          gap: 1.0rem;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .blur-nav-link {
          font-size: 1.38rem;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.02em;
          padding: 0.7em 3.1em;
          border-radius: 2.2em;
          transition: color 0.18s;
          color: #222;
          z-index: 1; /* Keep links on top */
        }
        .blur-nav-link:focus {
          outline: none;
        }
        .nav-highlighter {
          position: absolute;
          top: 0;
          height: 100%;
          background: rgba(0,0,0,0.08); /* Match light mode toggle hover */
          border-radius: 9999px;
          transition: left 0.25s cubic-bezier(0.25, 0.1, 0.25, 1), width 0.25s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.15s linear, background 0.3s ease;
          pointer-events: none;
          z-index: 0;
        }
        .dark .nav-highlighter {
          background: rgba(255,255,255,0.1); /* Match dark mode toggle hover */
        }



        .night-toggle {
          position: absolute;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .night-toggle:hover {
          background: rgba(0,0,0,0.08);
        }
        .night-toggle .sun, .night-toggle .moon {
          position: absolute;
          transition: all 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
        .night-toggle .sun {
          width: 8px; /* Make circle smaller */
          height: 8px;
          border-radius: 50%;
          background: transparent; /* Hollow out the circle */
          border: 2px solid #333; /* Create the outline */
          transform: scale(1);
          opacity: 1;
        }
        .night-toggle .sun .ray {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 5px;
          margin-left: -1px;
          margin-top: -2.5px;
          background: #333;
          border-radius: 2px;
          transform-origin: center;
          transition: all 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
        .night-toggle .sun .ray:nth-child(1) { transform: rotate(0deg) translateY(-12px); }
        .night-toggle .sun .ray:nth-child(2) { transform: rotate(45deg) translateY(-12px); }
        .night-toggle .sun .ray:nth-child(3) { transform: rotate(90deg) translateY(-12px); }
        .night-toggle .sun .ray:nth-child(4) { transform: rotate(135deg) translateY(-12px); }
        .night-toggle .sun .ray:nth-child(5) { transform: rotate(180deg) translateY(-12px); }
        .night-toggle .sun .ray:nth-child(6) { transform: rotate(225deg) translateY(-12px); }
        .night-toggle .sun .ray:nth-child(7) { transform: rotate(270deg) translateY(-12px); }
        .night-toggle .sun .ray:nth-child(8) { transform: rotate(315deg) translateY(-12px); }

        .night-toggle .moon {
          width: 24px; /* Larger */
          height: 24px;
          position: relative;
          transform: scale(0);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
        
        /* removed */
          content: '';
          position: absolute;
          inset: 0;
          border: 2px solid #fff;
          border-radius: 50%;
        }
        
        /* removed */
          content: '';
          position: absolute;
          top: 2px;
          left: 8px; /* shift right to create crescent facing upward-right */
          width: 20px;
          height: 20px;
          background: #000;
          border-radius: 50%;
        }

        .night-toggle.dark {
          transform: translateY(-50%); /* Remove rotation */
        }
        .night-toggle.dark:hover {
          background: rgba(255,255,255,0.1);
        }
        .night-toggle.dark .sun {
          transform: scale(0);
          opacity: 0;
        }
        .night-toggle.dark .moon {
          transform: scale(1);
          opacity: 1;
        }
        .night-toggle:focus {
          outline: none;
        }
        .about-me-section {
          max-width: 540px;
          margin: 48px auto 128px auto;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .about-me-section h2 {
          color: ${darkMode ? '#eee' : '#2a2a2a'};
          margin: 0 0 18px 0;
          font-size: 2.2rem;

          font-weight: 700;
        }
        .about-me-text {
          color: ${darkMode ? '#ddd' : '#444'};
          margin: 0;
          font-size: 1.35rem;
          line-height: 1.7;

          text-align: center;
          font-weight: 400;
          letter-spacing: 0.01em;
          padding: 0 4px;
        }
      `}</style>
      <style jsx global>{`
        :root {
          --page-bg: #f8f4ec;
          --text-primary: #26324b;
          --text-secondary: #444444;
          --page-bg: #f8f4ec;
        }
        /* fixed header link color */
        .blur-header .blur-nav-link { color: #26324b !important; }
        /* dynamic color bindings */
        .about-me-section h2 {
          color: var(--text-primary);
        }
        .about-me-text {
          color: var(--text-secondary);
        }

        html, body {
          background: var(--page-bg);
          margin: 0;
          padding: 0;
          min-height: 100vh;
          width: 100vw;
          box-sizing: border-box;
        }
      `}</style>
    </>
  )
}