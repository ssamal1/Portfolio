import React, { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`blur-header ${darkMode ? 'dark' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-group">
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
            <Link href="/projects" legacyBehavior>
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
                Projects
              </a>
            </Link>
          </nav>
        </div>
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
        .blur-header {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: auto;
          display: flex;
          align-items: center;
          justify-content: space-between; /* Push items to ends */
          gap: 96px; /* Even larger space between nav group and icon */

          padding: 6px 120px 6px 40px; /* Further increase right padding */
          z-index: 1000;
          border-radius: 999px; /* True pill shape */
          transition: all 0.4s ease;

          /* Initial State: Transparent */
          background: transparent;
          border: 0 !important; /* Forcefully remove border in unscrolled state */
          box-shadow: none;
          color: #222654;
        }

        .blur-header.dark {
          color: #eaeaea;
        }

        /* Ensure nav links inherit white color in dark mode even if overridden globally */
        .blur-header.dark .blur-nav-link {
          color: #eaeaea !important;
        }

        /* Make dark-mode icon (sun outline and rays) white in dark theme */
        .blur-header.dark .night-toggle .sun {
          border-color: #ffffff;
        }
        .blur-header.dark .night-toggle .sun .ray {
          background: #ffffff;
        }
        .blur-header.dark .night-toggle .moon {
          stroke: #ffffff;
        }

        /* Scrolled State: Pill Appears */
        .blur-header.scrolled {
          background: rgba(255, 255, 255, 0.45);
          border: 1.5px solid rgba(0,0,0,0.08);
          box-shadow: 0 8px 40px rgba(0,0,0,0.12);
          -webkit-backdrop-filter: blur(24px) saturate(1.6);
          backdrop-filter: blur(24px) saturate(1.6);
        }

        .blur-header.dark.scrolled {
          background: rgba(30, 30, 30, 0.65);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .blur-nav {
          display: flex;
          align-items: center;
          position: relative;
        }

        .blur-nav-link {
          font-size: 20px; /* Substantial font size increase */
          font-weight: 500;
          color: inherit;
          text-decoration: none;
          padding: 18px 48px; /* Substantial padding increase for generous spacing */
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .nav-highlighter {
          position: absolute;
          top: 10%; /* Center for 80% height */
          height: 80%;
          background: rgba(0,0,0,0.05);
          border-radius: 999px; /* Match pill shape */
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }

        .blur-header.dark .nav-highlighter {
          background: rgba(255,255,255,0.15);
        }

        .night-toggle {
          margin-left: 0; /* Rely on gap and padding for spacing */
          background: transparent;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          flex-shrink: 0; /* Prevent icon from shrinking */
          cursor: pointer;
          transition: background 0.25s ease;
        }

        /* Hover visible regardless of scroll state */
        .night-toggle:hover {
          background: rgba(0,0,0,0.08);
        }
        .blur-header.dark .night-toggle:hover {
          background: rgba(255,255,255,0.14);
        }

        .blur-header.scrolled .night-toggle {
          background: transparent; /* No default background when scrolled */
        }

        .blur-header.scrolled .night-toggle:hover {
          background: rgba(0,0,0,0.12); /* Visible hover in light mode */
        }

        .blur-header.dark.scrolled .night-toggle {
          background: transparent; /* No default background in dark mode */
        }

        .blur-header.dark.scrolled .night-toggle:hover {
          background: rgba(255,255,255,0.2); /* Visible hover in dark mode */
        }

        /* --------- Remove any gradient/outline before scroll --------- */
        /* Remove gradient, border, and after-shadow before scroll */
        :global(.blur-header:not(.scrolled))::after { display:none !important; }
        .blur-header:not(.scrolled) {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

          background: rgba(255,255,255,0.2); /* Visible hover in dark mode */
        }

        .night-toggle .moon {
          stroke: inherit;
        }
      `}</style>
    </>
  );
}
