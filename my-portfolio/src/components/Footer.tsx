import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const [headerReady, setHeaderReady] = useState(false);
  
  useEffect(() => {
    // Check for dark mode preference
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark') || 
                        (typeof window !== 'undefined' && 
                         window.matchMedia && 
                         window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDark(isDarkMode);
    };
    
    // Initial check
    checkDarkMode();
    
    // Watch for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);
    
    // Check when theme changes (for Next.js theme provider)
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => {
      mediaQuery.removeEventListener('change', checkDarkMode);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    // Small delay to ensure the header animation is complete
    const timer = setTimeout(() => {
      setHeaderReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <footer className={`contact-footer ${headerReady ? 'upfade-enter' : 'upfade-init'} ${isDark ? 'dark-mode' : ''}`}>
      <div className="contact-links">
        <a 
          href="https://www.linkedin.com/in/sanat-samal/" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="contact-link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
        <a 
          href="https://github.com/ssamal1" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="contact-link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
        <a 
          href="mailto:ssamal@ucsd.edu" 
          aria-label="Email"
          className="contact-link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>
      </div>
      <p className="copyright">
        © {new Date().getFullYear()} Sanat Samal. All rights reserved.
      </p>
      <style jsx>{`
        .contact-footer {
          text-align: center;
          padding: 1.5rem 0 2rem;
          margin-top: 1rem;
          width: 100%;
        }
        
        .contact-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .contact-link {
          color: var(--text-secondary);
          transition: all 0.3s ease;
          display: inline-flex;
          padding: 0.4rem;
          border-radius: 50%;
        }
        
        .contact-link:hover {
          transform: translateY(-3px);
          background: var(--hover-bg);
        }
        
        /* Hover effect for both light and dark modes */
        .contact-link:hover svg {
          stroke: var(--accent-color);
        }
        
        /* Dark mode hover */
        .dark-mode .contact-link:hover svg {
          stroke: #ffffff !important;
        }
        
        .contact-link svg {
          width: 24px;
          height: 24px;
        }
        
        .copyright {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin: 0;
          opacity: 0.8;
        }
        
        @media (max-width: 768px) {
          .contact-links {
            gap: 1.5rem;
          }
          
          .contact-link svg {
            width: 22px;
            height: 22px;
          }
        }
        
        /* Animation for the footer */
        .upfade-init {
          opacity: 0;
          transform: translateY(10px);
        }
        
        .upfade-enter {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
