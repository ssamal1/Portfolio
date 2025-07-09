import React from 'react';
import Link from 'next/link';

export default function Header({
  navRef,
  hoveredLink,
  setHoveredLink,
  darkMode,
  themeReady,
  toggleDarkMode,
}: {
  navRef: React.RefObject<HTMLElement | null>,
  hoveredLink: { left: number; width: number; opacity: number },
  setHoveredLink: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>,
  darkMode: boolean,
  themeReady: boolean,
  toggleDarkMode: () => void,
}) {
  return (
    <>
      <header className={`blur-header ${darkMode ? 'dark' : ''}`}>
        <nav
          className="blur-nav"
          ref={navRef}
          onMouseLeave={() => setHoveredLink(prev => ({ ...prev, opacity: 0 }))}
        >
          <div className="nav-highlighter" style={hoveredLink} />
          <Link href="/" legacyBehavior>
            <a
              className="blur-nav-link"
              onMouseEnter={e => {
                if (navRef.current) {
                  setHoveredLink({
                    left: e.currentTarget.offsetLeft,
                    width: e.currentTarget.offsetWidth,
                    opacity: 1,
                  });
                }
              }}
            >
              About
            </a>
          </Link>
          <Link href="/cv" legacyBehavior>
            <a
              className="blur-nav-link"
              onMouseEnter={e => {
                if (navRef.current) {
                  setHoveredLink({
                    left: e.currentTarget.offsetLeft,
                    width: e.currentTarget.offsetWidth,
                    opacity: 1,
                  });
                }
              }}
            >
              CV
            </a>
          </Link>
          <a
            className="blur-nav-link"
            href="#projects"
            onMouseEnter={e => {
              if (navRef.current) {
                setHoveredLink({
                  left: e.currentTarget.offsetLeft,
                  width: e.currentTarget.offsetWidth,
                  opacity: 1,
                });
              }
            }}
          >
            Projects
          </a>
        </nav>
        {themeReady && (
          <button
            className={`night-toggle ${darkMode ? 'dark' : ''}`}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <span className="sun">
              <span className="ray"></span>
              <span className="ray"></span>
              <span className="ray"></span>
              <span className="ray"></span>
              <span className="ray"></span>
              <span className="ray"></span>
              <span className="ray"></span>
              <span className="ray"></span>
            </span>
            <svg className="moon" viewBox="0 0 24 24" width="24" height="24" strokeWidth="1.5" stroke="#000" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </button>
        )}
      </header>
      <style jsx>{`
        .blur-header.dark {
          background: rgba(255,255,255,0.45); /* More transparent white for better blur */
          border: 1.5px solid rgba(0,0,0,0.10);
          box-shadow: 0 8px 40px 0 rgba(0,0,0,0.10), 0 2px 24px 0 rgba(0,0,0,0.06);
          color: #000000; /* Black text for contrast */
          -webkit-backdrop-filter: blur(26px) saturate(1.6);
          backdrop-filter: blur(26px) saturate(1.6);
        }
      `}</style>
    </>
  );
}
