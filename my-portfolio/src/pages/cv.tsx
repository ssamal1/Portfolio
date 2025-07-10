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
      <main className="cv-container">
        <h1 className="cv-title">Curriculum Vitae</h1>

        <section className="cv-section">
          <h2 className="section-title">Education</h2>
          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">University of California San Diego, La Jolla CA 92093</span>
              <span className="entry-date">Graduating June 2027</span>
            </div>
            <div className="entry-details">
              <b>Regents Scholar</b> &nbsp;|&nbsp; <b>5x Provost Honors</b><br />
              B.S. Computer Science, Minor in Mathematics
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        <section className="cv-section">
          <h2 className="section-title">Experience</h2>
          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">AI Engineer and Full Stack Intern @ Dwilar</span>
              <span className="entry-date">Jun 2025 - Current</span>
            </div>
            <ul className="entry-list">
              <li>Developing MVP for borderless AI credit assessment and AI agent for real estate.</li>
              <li>Integrating RESTful APIs (Plaid and Saltedge) for real-time financial data in intelligent credit assessment pipelines.</li>
              <li>Contributing to backend using Python, FastAPI, and SQLAlchemy for user management, KYC workflows, and open banking API endpoints.</li>
            </ul>
          </div>
          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">Software Engineering Intern @ U.S. Dept. of Commerce – Int’l Trade Administration</span>
              <span className="entry-date">Jun 2025 - Current</span>
            </div>
            <ul className="entry-list">
              <li>Developed Python tools to automate CRM data validation and client verification.</li>
              <li>Created scripts using pandas and requests to analyze Excel-based company lists and identify defunct websites via HTTP and heuristics.</li>
              <li>Built automated pipelines with Selenium, smtplib, and pandas for LinkedIn verification and email bounce detection.</li>
            </ul>
          </div>
          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">Researcher in UCSD Safe Autonomous Systems Lab</span>
              <span className="entry-date">Sep 2023 - Current</span>
            </div>
            <ul className="entry-list">
              <li>Developing GLSL-based tools for real-time visualization of Hamilton-Jacobi PDEs and dynamic systems.</li>
              <li>Researching methods to linearize complex robotic systems using learned Koopman lifts for enhanced safety.</li>
            </ul>
          </div>
          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">Computer Science Engineering Society (CSES)</span>
              <span className="entry-date">Nov 2024 – Current</span>
            </div>
            <ul className="entry-list">
              <li><b>Project Lead - AI Research and Development:</b> Lead a team of 10 to develop RAG-based LLMs for virtual therapy, leveraging Faster Whisper, SST, TTS, and PIFuHD for multimodal sentiment analysis and live avatars. Accepted to present paper at San Diego Tech Conference.</li>
              <li><b>Software Developer:</b> Developing ORCA for music creation and audio processing, implementing a hybrid SVM/RNN model for instrument and genre classification, and building computer vision tools to convert scoresheet images to audio.</li>
              <li><b>Director of Partnerships:</b> Facilitated partnership with Google for funding and mentorship, and fostered cross-campus collaboration for AI initiatives.</li>
            </ul>
          </div>
          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">App Developer, UpNow - IOS Alarm App</span>
              <span className="entry-date">June 2024 – Sep 2024</span>
            </div>
            <ul className="entry-list">
              <li>Developed a wake-up app using adaptive generative audio to boost alertness.</li>
              <li>Built a reinforcement learning model to optimize snooze time and generate personalized music notes using Google Magenta on GCP.</li>
              <li>Created a custom ML backend and Swift-based frontend for real-time audio generation.</li>
            </ul>
          </div>
          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">Epidemiological Data Analysis and Spatial Modeling of COVID-19</span>
              <span className="entry-date">Mar 2022 - Aug 2022</span>
            </div>
            <ul className="entry-list">
              <li>Modeled Covid hotspots using K-Nearest Neighbors (kNN) and Moran’s Statistic for public health insights.</li>
              <li>Built a predictive correlation model of public spending in California counties with hotspot analysis.</li>
              <li><a href="https://drive.google.com/file/d/1IvfyvAF1mJjXNod-Fong7IAb8dGBKWyS/view?usp=sharing" target="_blank" rel="noopener noreferrer">Paper</a></li>
            </ul>
          </div>
          <div className="entry">
            <div className="entry-header">
              <span className="entry-title">Built Huffman Tree File Compressor</span>
            </div>
            <ul className="entry-list">
              <li>Designed and implemented an optimized C++ file compressor with efficient encoding for all file formats.</li>
            </ul>
          </div>
        </section>

        <hr className="section-divider" />

        <section className="cv-section">
          <h2 className="section-title">Awards & Certificates</h2>
          <ul className="entry-list awards-list">
            <li><b>AIME, 2022 AMC 12A Qualifier:</b> Top ~5% of test takers (Top 3 in school).</li>
            <li><b>2022 Math League Nationals Qualifier, 2x Math League State Qualifier.</b></li>
          </ul>
        </section>

        <hr className="section-divider" />

        <section className="cv-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-section">
            <p><b>Languages:</b> Java, Swift, Python, C, C++, Julia, ARM Assembly, MATLAB, GLSL, HTML, CSS, JavaScript, PHP, SQL</p>
            <p><b>Libraries/Frameworks:</b> React, Node.js, PyTorch, Tensorflow, NumPy, Pygame, Tkinter, Flask, Pandas, WebGL, Vue</p>
            <p><b>Developer Tools:</b> VS Code, Xcode, Linux, Github, Google Cloud Platform, Docker</p>
          </div>
        </section>




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
        .cv-container {
          animation: fade-in-up 0.6s ease-out forwards;
          color: ${darkMode ? '#fff' : '#000'};
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 10rem 2rem;
          font-family: inherit;
        }
        .cv-title {
          font-size: 36px;
          font-weight: 800;
          margin: 0 0 48px 0;
          text-align: left;
        }
        .cv-section {
          margin-bottom: 32px;
        }
        .section-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
          border-bottom: 2px solid ${darkMode ? '#333' : '#eee'};
          padding-bottom: 8px;
        }
        .section-divider {
          border: 0;
          height: 1px;
          background: ${darkMode ? '#333' : '#ddd'};
          margin: 48px 0;
        }
        .entry {
          margin-bottom: 24px;
        }
        .entry:last-child {
          margin-bottom: 0;
        }
        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .entry-title {
          font-size: 18px;
          font-weight: 700;
        }
        .entry-date {
          font-size: 16px;
          font-style: italic;
          color: ${darkMode ? '#aaa' : '#555'};
        }
        .entry-details,
        .entry-list {
          font-size: 16px;
          line-height: 1.6;
          color: ${darkMode ? '#ccc' : '#333'};
        }
        .entry-list {
          padding-left: 20px;
          margin-top: 8px;
        }
        .entry-list li {
          margin-bottom: 8px;
        }
        .entry-list a {
          color: inherit;
          text-decoration: underline;
        }
        .awards-list {
          list-style-type: none;
          padding-left: 0;
        }
        .skills-section p {
          margin: 0 0 12px 0;
          font-size: 16px;
          line-height: 1.6;
        }
        .skills-section b {
          font-weight: 700;
        }
        .contact-section p {
          font-size: 18px;
          margin-bottom: 12px;
        }
        .contact-section a {
          color: ${darkMode ? '#1e90ff' : '#0070f3'};
          text-decoration: none;
        }
        .contact-section a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div style={{ height: 200 }}></div>
    </div>
  );
}
