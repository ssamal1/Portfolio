import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const words = [
    'Software Developer',
    'Researcher',
    'CS Student',
    'Mathematician',
  ]
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState<'fade-in' | 'fade-out'>('fade-in')

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
        background: '#f8f4ec'
      }}>
        <header className="blur-header">
          <span className="header-title">Sanat Samal</span>
        </header>
        <div style={{
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
              color: '#222',
              margin: 0,
              fontFamily: 'inherit',
              letterSpacing: 0.01
            }}>
              Hello, I am Sanat Samal
            </h1>
            <h2 className={fade} style={{
              fontSize: 36,
              fontWeight: 500,
              color: '#555',
              margin: '18px 0 0 2px',
              minHeight: 44,
              transition: 'opacity 0.5s',
            }}>
              {words[index]}
            </h2>
          </div>
        </div>
      </div>
      <section className="about-me-section">
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
          opacity: 0;
          transition: opacity 0.5s ease-out;
        }
        .blur-header {
          position: fixed;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          width: min(90vw, 500px);
          min-width: 200px;
          min-height: 54px;
          padding: 0.5rem 2.2rem;
          z-index: 1000;
          border-radius: 2.8rem 2.5rem 3.2rem 2.7rem / 2.7rem 3.1rem 2.6rem 3.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(120deg, rgba(255,255,255,0.60) 60%, rgba(220,230,255,0.32) 100%);
          border: 1.5px solid rgba(255,255,255,0.55);
          box-shadow: 0 8px 40px 0 rgba(60,60,120,0.18), 0 2px 24px 0 rgba(180,200,255,0.13);
          -webkit-backdrop-filter: blur(22px) saturate(1.6);
          backdrop-filter: blur(22px) saturate(1.6);
          will-change: backdrop-filter;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #222;
          overflow: hidden;
          position: fixed;
        }
        .blur-header::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 24px;
          right: 24px;
          height: 28%;
          border-radius: 2rem 2rem 1.5rem 1.5rem / 1.5rem 1.5rem 2rem 2rem;
          background: linear-gradient(120deg, rgba(255,255,255,0.23) 0%, rgba(255,255,255,0.03) 100%);
          pointer-events: none;
          filter: blur(1.7px);
          opacity: 0.38;
        }
        .blur-header::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: inset 0 1.5px 12px 0 rgba(200,210,255,0.09);
          pointer-events: none;
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
          margin: 0 0 18px 0;
          font-size: 2.2rem;
          color: #2a2a2a;
          font-weight: 700;
        }
        .about-me-text {
          margin: 0;
          font-size: 1.35rem;
          line-height: 1.7;
          color: #444;
          text-align: center;
          font-weight: 400;
          letter-spacing: 0.01em;
          padding: 0 4px;
        }
      `}</style>
      <style jsx global>{`
        html, body {
          background: #f8f4ec;
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