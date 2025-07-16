import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  details: string[];
  github?: string;
  projectUrl?: string;
  paperUrl?: string;
}

// Simple SVG icon components
const ExternalLinkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: '8px' }}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

// Simple GitHub SVG icon component
const GitHubIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ marginRight: '8px' }}
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const PaperIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: '8px' }}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') setDarkMode(true);
    
    const color = darkMode ? '#000' : '#f8f4ec';
    document.body.style.background = color;
  }, [darkMode]);

  // Project data with detailed information
  const projects: Record<string, Project> = {
    'margo': {
      title: 'Margo',
      description: 'Interactive level-set solver for Hamilton-Jacobi PDEs with GPU acceleration',
      github: 'https://github.com/willsharpless/margo',
      projectUrl: 'https://willsharpless.github.io/margo/?dt=0.001&fo=0.999&dp=0.000125&cm=1&cx=-1.6979&cy=0.05835000000000001&w=4.7276&h=4.7276&bc=%2F%2F%20Given%20any%20state%2C%20we%20decide%20the%20initial%20value%20%28boundary%20condition%29%2C%0A%2F%2F%20defining%20a%20shape%20where%20the%20value%20is%20zero.%0A%0Afloat%20get_bc_reach%28vec2%20state%2C%20float%20sign%2C%20float%20time%29%20%7B%0A%0A%20%20float%20val%20%3D%20length%28state%29%20-%200.1%3B%20%2F%2F%20ball%0A%20%20%20%20%0A%20%20return%20val%3B%0A%7D%0A%20%20%0Afloat%20get_bc_avoid%28vec2%20state%2C%20float%20sign%2C%20float%20time%29%20%7B%0A%0A%20%20float%20val%20%3D%20max%28abs%285.*%28state.x%2B0.5%29%29%2C%20abs%28state.y%20%2B%20cos%280.005%20*%20frame%29%29%29%20-%200.3%3B%20%2F%2F%20box%0A%20%20float%20val2%20%3D%20max%28abs%285.*%28state.x%2B1.%29%29%2C%20abs%28state.y%20%2B%20cos%280.005%20*%20frame%20%2B%203.14%29%29%29%20-%200.3%3B%20%2F%2F%20box%0A%20%20float%20val3%20%3D%20max%28abs%285.*%28state.x%2B1.5%29%29%2C%20abs%28state.y%20%2B%20cos%280.005%20*%20frame%29%29%29%20-%200.3%3B%20%2F%2F%20box%0A%20%20%20%20%0A%20%20return%20min%28min%28val%2C%20val2%29%2C%20val3%29%3B%0A%7D%0A%20%20%0Afloat%20get_bc%28vec2%20state%2C%20float%20sign%2C%20float%20time%29%20%7B%0A%0A%20%20float%20valR%20%3D%20get_bc_reach%28state%2C%20sign%2C%20time%29%3B%0A%20%20float%20valA%20%3D%20get_bc_avoid%28state%2C%20sign%2C%20time%29%3B%0A%20%20float%20val%20%3D%20max%28valR%2C%20-valA%29%3B%0A%20%20%20%20%0A%20%20return%20val%3B%0A%7D%0A%20%20%0A%2F%2F%20to%20see%20it%2C%0A%2F%2F%20%5Bclick%20screen%2C%20%27w%27%5D&bccode=%2F%2F%20Given%20any%20state%2C%20we%20decide%20the%20initial%20value%20%28boundary%20condition%29%2C%0A%2F%2F%20defining%20a%20shape%20where%20the%20value%20is%20zero.%0A%0Afloat%20get_bc_reach%28vec2%20state%2C%20float%20sign%2C%20float%20time%29%20%7B%0A%0A%20%20float%20val%20%3D%20length%28state%29%20-%200.1%3B%20%2F%2F%20ball%0A%20%20%20%20%0A%20%20return%20val%3B%0A%7D%0A%20%20%0Afloat%20get_bc_avoid%28vec2%20state%2C%20float%20sign%2C%20float%20time%29%20%7B%0A%0A%20%20float%20val%20%3D%20max%28abs%285.*%28state.x%2B0.5%29%29%2C%20abs%28state.y%20%2B%20cos%280.005%20*%20frame%29%29%29%20-%200.3%3B%20%2F%2F%20box%0A%20%20float%20val2%20%3D%20max%28abs%285.*%28state.x%2B1.%29%29%2C%20abs%28state.y%20%2B%20cos%280.005%20*%20frame%20%2B%203.14%29%29%29%20-%200.3%3B%20%2F%2F%20box%0A%20%20float%20val3%20%3D%20max%28abs%285.*%28state.x%2B1.5%29%29%2C%20abs%28state.y%20%2B%20cos%280.005%20*%20frame%29%29%29%20-%200.3%3B%20%2F%2F%20box%0A%20%20%20%20%0A%20%20return%20min%28min%28val%2C%20val2%29%2C%20val3%29%3B%0A%7D%0A%20%20%0Afloat%20get_bc%28vec2%20state%2C%20float%20sign%2C%20float%20time%29%20%7B%0A%0A%20%20float%20valR%20%3D%20get_bc_reach%28state%2C%20sign%2C%20time%29%3B%0A%20%20float%20valA%20%3D%20get_bc_avoid%28state%2C%20sign%2C%20time%29%3B%0A%20%20float%20val%20%3D%20max%28valR%2C%20-valA%29%3B%0A%20%20%20%20%0A%20%20return%20val%3B%0A%7D%0A%20%20%0A%2F%2F%20to%20see%20it%2C%0A%2F%2F%20%5Bclick%20screen%2C%20%27w%27%5D&val=%2F%2F%20Given%20any%20state%2C%20we%20decide%20the%20momentum%20%28hamiltonian%29%2C%0A%2F%2F%20defining%20how%20the%20value%20evolves.%0A%0Afloat%20get_ham%28vec2%20state%2C%20vec2%20costate%2C%20float%20time%29%20%7B%0A%0A%20%20%2F%2F%20Control%0A%20%20float%20hamC%20%3D%20dot%28abs%28vec2%280.0%2C%200.5%29%20*%20costate%29%2C%20vec2%281.%29%29%3B%0A%0A%20%20%2F%2F%20Disturbance%0A%20%20float%20hamD%20%3D%20-dot%28abs%28vec2%280.0%2C%200.1%29%20*%20costate%29%2C%20vec2%281.%29%29%3B%0A%0A%20%20return%20-dot%28costate%2C%20get_vel%28state%29%29%20%2B%20hamC%20%2B%20hamD%3B%0A%7D%0A%0A%2F%2F%20we%20may%20also%20filter%20evolution%0Afloat%20filter_val%28float%20valNext%2C%20float%20val%2C%20float%20valR%2C%20float%20valA%29%20%7B%0A%0A%20%20return%20max%28min%28valNext%2C%20valR%29%2C%20-valA%29%3B%20%2F%2F%20BRAT%20%28set%20Dual%20in%20Shape...%29%0A%7D%0A%0A%2F%2F%20to%20see%20it%2C%0A%2F%2F%20%5Bclick%20screen%2C%20%27enter%27%5D&valcode=%2F%2F%20Given%20any%20state%2C%20we%20decide%20the%20momentum%20%28hamiltonian%29%2C%0A%2F%2F%20defining%20how%20the%20value%20evolves.%0A%0Afloat%20get_ham%28vec2%20state%2C%20vec2%20costate%2C%20float%20time%29%20%7B%0A%0A%20%20%2F%2F%20Control%0A%20%20float%20hamC%20%3D%20dot%28abs%28vec2%280.0%2C%200.5%29%20*%20costate%29%2C%20vec2%281.%29%29%3B%0A%0A%20%20%2F%2F%20Disturbance%0A%20%20float%20hamD%20%3D%20-dot%28abs%28vec2%280.0%2C%200.1%29%20*%20costate%29%2C%20vec2%281.%29%29%3B%0A%0A%20%20return%20-dot%28costate%2C%20get_vel%28state%29%29%20%2B%20hamC%20%2B%20hamD%3B%0A%7D%0A%0A%2F%2F%20we%20may%20also%20filter%20evolution%0Afloat%20filter_val%28float%20valNext%2C%20float%20val%2C%20float%20valR%2C%20float%20valA%29%20%7B%0A%0A%20%20return%20max%28min%28valNext%2C%20valR%29%2C%20-valA%29%3B%20%2F%2F%20BRAT%20%28set%20Dual%20in%20Shape...%29%0A%7D%0A%0A%2F%2F%20to%20see%20it%2C%0A%2F%2F%20%5Bclick%20screen%2C%20%27enter%27%5D&vf=%2F%2F%20Given%20any%20point%20%28state%29%2C%20we%20decide%20how%20it%20moves%20%28velocity%29%2C%0A%2F%2F%20defining%20how%20space%20flows.%0A%0Avec2%20get_vel%28vec2%20s%29%20%7B%0A%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20v.x%20%3D%201.%3B%0A%20%20v.y%20%3D%20cos%285.%20*%20s.x%29%3B%0A%0A%20%20return%20v%3B%0A%7D%0A%20%20%0A%2F%2F%20to%20see%20it%2C%0A%2F%2F%20%5Bclick%20screen%2C%20%27f%27%5D&code=%2F%2F%20Given%20any%20point%20%28state%29%2C%20we%20decide%20how%20it%20moves%20%28velocity%29%2C%0A%2F%2F%20defining%20how%20space%20flows.%0A%0Avec2%20get_vel%28vec2%20s%29%20%7B%0A%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20v.x%20%3D%201.%3B%0A%20%20v.y%20%3D%20cos%285.%20*%20s.x%29%3B%0A%0A%20%20return%20v%3B%0A%7D%0A%20%20%0A%2F%2F%20to%20see%20it%2C%0A%2F%2F%20%5Bclick%20screen%2C%20%27f%27%5D&bcmode=3',
      details: [
        'Solves Hamilton-Jacobi partial differential equations (PDEs) to model dynamic shape evolution and optimal control problems, enabling real-time visualization of complex systems like fluid dynamics and path planning',
        'Leverages WebGL/GLSL shaders for GPU acceleration, achieving real-time performance by parallelizing computations across thousands of threads',
        'Implements a custom texture-based computation pipeline that efficiently handles large-scale simulations through optimized memory access patterns and particle bank optimization',
        'Utilizes first-order integrators with adaptive timesteps and upwind finite difference schemes to ensure numerical stability while accurately approximating solutions to complex PDEs',
        'Provides an intuitive web-based interface that makes advanced control theory and dynamic systems research accessible without specialized hardware'
      ]
    },
    'upnow': {
      title: 'UpNow',
      description: 'AI alarm clock that adapts generated melodies to your wake-up patterns for a better morning experience',
      github: 'https://github.com/ssamal1/UpNowRepo/tree/main',
      details: [
        'Generates infinite unique wake-up melodies using Google\'s Magenta attention_rnn model for dynamic sound generation',
        'Implements reinforcement learning to adapt alarm sounds based on user response patterns and wake-up effectiveness',
        'Tracks snooze behavior over time to optimize alarm characteristics for better wake-up success',
        'Features progressive volume increase and gentle waking sequences to reduce sleep inertia',
        'Customizable alarm settings with support for multiple alarms, recurring schedules, and personalized sound profiles',
        'Server-based architecture for MIDI generation with local audio playback and offline support',
        'Minimalist iOS interface designed for intuitive alarm management and sleep tracking'
      ]
    },
    'thia': {
      title: 'THIA',
      description: 'Project Lead | AI-driven therapeutic avatar developed with UC San Diego CSES',
      details: [
        'Developed an AI therapeutic assistant providing accessible mental health support through natural conversations with a responsive 3D avatar, addressing the need for scalable mental health solutions',
        'Engineered a multimodal emotion recognition system using Wav2vec2, achieving 97% accuracy on CREMA-D, enabling nuanced understanding of user emotions',
        'Built a real-time TTS pipeline with FastSpeech2 and HiFi-GAN for natural, low-latency speech synthesis synchronized with 3D avatar animations',
        'Integrated Mistral 7B LLM with RAG architecture to deliver context-aware, empathetic responses while maintaining therapeutic best practices',
        'Created a Unity-based animation system that dynamically adjusts facial expressions based on conversation context and detected emotions'
      ]
    },
    'orca': {
      title: 'ORCA',
      description: 'AI music production platform developed with UC San Diego CSES',
      details: [
        'Advanced music analysis pipeline using computer vision (OpenCV) for sheet music processing, featuring contour detection and symbol recognition with specialized handling for musical notation elements like half and whole notes',
        'Machine learning-powered genre classification combining SVM for traditional features and RNNs for temporal patterns, achieving robust categorization across diverse musical styles',
        'Transformer-based music generation system trained on extensive MIDI datasets, capable of creating coherent musical phrases while respecting music theory constraints',
        'Real-time audio processing with polyphonic transcription, leveraging custom algorithms for instrument separation and note detection with high temporal precision',
        'Interactive music editing environment with intelligent music theory assistance, including automatic chord recognition, voice leading suggestions, and style-appropriate harmonization'
      ]
    },
    'covid-funding': {
      title: 'COVID-19 Funding Impact Analysis',
      description: 'Spatiotemporal analysis of CARES Act effectiveness in California',
      paperUrl: 'https://drive.google.com/file/d/1IvfyvAF1mJjXNod-Fong7IAb8dGBKWyS/view?usp=sharing',
      details: [
        'Conducted geospatial analysis of $30.75B in CARES Act funding across California counties using Moran\'s I statistic and kNN-weighted spatial autocorrelation',
        'Developed a Python-based pipeline for processing and analyzing bimonthly COVID-19 case data from March 2020 to December 2021, identifying significant hotspots and coldspots',
        'Found that counties allocating funds to public health and safety personnel experienced better COVID-19 mitigation compared to those focusing on testing and contact tracing',
        'Created interactive visualizations tracking the evolution of COVID-19 hotspots in California, revealing shifting patterns from northern to southern counties over time',
        'Utilized GeoPandas for spatial analysis and Matplotlib for generating time-series heatmaps, providing actionable insights for public health policy decisions'
      ]
    }
  };

  const project = projects[id as keyof typeof projects] || { title: 'Project Not Found', description: 'The requested project could not be found.' };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: darkMode ? '#000' : '#f8f4ec', 
      padding: '2rem',
      animation: 'fadeInUp 0.6s ease-out forwards'
    }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        body {
          margin: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #333;
        }
        
        .github-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: inherit;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.9;
          padding: 0.45rem 1.5rem;
          border-radius: 100px;
          border: 1px solid currentColor;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          width: fit-content;
          min-width: 100px;
          transform: translateY(0);
          background: transparent;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .github-link:hover {
          opacity: 1;
          background: rgba(0, 0, 0, 0.05);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .dark .github-link {
          opacity: 0.9;
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        .project-link, .github-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: inherit;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.9;
          padding: 0.45rem 1.5rem;
          border-radius: 100px;
          border: 1px solid currentColor;
          margin: 0.5rem 0.5rem 0 0;
          font-size: 0.9rem;
          width: fit-content;
          min-width: 100px;
          transform: translateY(0);
          background: transparent;
          position: relative;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .project-link:hover,
        .github-link:hover {
          opacity: 1;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .project-link:active,
        .github-link:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        /* Light mode hover */
        .github-link:hover,
        .github-link:focus,
        .project-link:hover,
        .project-link:focus {
          opacity: 1;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          background: rgba(0, 0, 0, 0.04);
        }
        
        /* Dark mode styles */
        .dark-mode.github-link,
        .dark-mode.project-link {
          border: 1px solid rgba(255, 255, 255, 0.5);
          color: #fff;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3);
        }
        
        .dark-mode.github-link:hover,
        .dark-mode.github-link:focus,
        .dark-mode.project-link:hover,
        .dark-mode.project-link:focus {
          background: #2d3748 !important;
          border-color: rgba(255, 255, 255, 0.7) !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
        }
        
        .github-link:active,
        .project-link:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .project-highlight {
          margin-bottom: 0.75rem;
          position: relative;
          padding-left: 1.5rem;
        }
        
        .project-highlight::before {
          content: '•';
          color: inherit;
          position: absolute;
          left: 0;
          font-size: 1.2rem;
          line-height: 1.4;
          opacity: 0.6;
        }
        
        .back-button {
          display: inline-flex !important;
          align-items: center !important;
          margin-bottom: 2.5rem !important;
          color: rgba(0,0,0,0.8) !important;
          text-decoration: none !important;
          font-size: 1rem !important;
          font-weight: 500 !important;
          letter-spacing: 0.5px !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          padding: 0.5rem 0.5rem 0.5rem 0 !important;
          background: none !important;
          cursor: pointer !important;
          border: none !important;
          font-family: inherit !important;
        }
        
        .dark .back-button {
          color: rgba(255,255,255,0.8) !important;
        }
        
        .back-button:hover {
          color: #000 !important;
          transform: translateX(-4px) !important;
        }
        
        .dark .back-button:hover {
          color: #fff !important;
        }
        
        .arrow-container {
          display: inline-flex !important;
          margin-right: 8px !important;
          width: 16px !important;
          justify-content: flex-start !important;
          overflow: visible !important;
        }
        
        .arrow {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          min-width: 16px !important;
        }
        
        .back-button:hover .arrow {
          transform: translateX(-4px) !important;
        }
      `}</style>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className={darkMode ? 'dark' : ''}>
          <Link 
            href="/projects" 
            className="back-button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: 'inherit',
              backgroundColor: 'transparent',
              padding: '0.5rem 0.5rem 0.5rem 0'
            }}
          >
            <div className="arrow-container">
              <svg 
                className="arrow"
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </div>
            <span>Back to Projects</span>
          </Link>
        </div>
        <div className="project-detail" style={{ 
          color: darkMode ? '#fff' : '#000',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
            color: darkMode ? '#fff' : '#000',
          }}>{project.title}</h1>
          
          <div style={{ 
            marginBottom: '2rem'
          }}>
            <p style={{
              fontSize: '1.1rem',
              color: darkMode ? '#aaa' : '#666',
              margin: '0 0 0.5rem 0',
              fontStyle: 'italic'
            }}>{project.description}</p>
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}>
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`github-link ${darkMode ? 'dark-mode' : ''}`}
                >
                  <GitHubIcon />
                  GitHub
                </a>
              )}
              {project.projectUrl && (
                <a 
                  href={project.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`project-link ${darkMode ? 'dark-mode' : ''}`}
                >
                  <ExternalLinkIcon />
                  View Project
                </a>
              )}
              {project.paperUrl && (
                <a 
                  href={project.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`project-link ${darkMode ? 'dark-mode' : ''}`}
                  style={{ minWidth: '120px' }}
                >
                  <PaperIcon />
                  View Paper
                </a>
              )}
            </div>
          </div>
          
          <div style={{
            backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            borderRadius: '8px',
            padding: '1.5rem',
            marginTop: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.3rem',
              marginTop: '0',
              marginBottom: '1rem',
              color: darkMode ? '#fff' : '#000',
              borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              paddingBottom: '0.5rem'
            }}>
              Project Highlights
            </h2>
            <ul style={{
              paddingLeft: '1.5rem',
              margin: '0',
              listStyleType: 'none'
            }}>
              {project.details?.map((detail, index) => (
                <li key={index} className="project-highlight">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ProjectDetail;
