// pages/index.tsx
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const words = [
    'Software Developer',
    'Researcher',
    'CS Student',
    'Mathematician',
  ]
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState<'fade-in' | 'fade-out'>('fade-in')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // cycle roles
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

  // sine-wave canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const baseWaterLevel = canvas.height * 0.85
      const tideAmplitude   = canvas.height * 0.1
      const minWaterLevel   = canvas.height * 0.9
      const waveAmp         = 28
      const freq            = 0.005
      const tideSpeed       = 0.003
      const waveSpeed       = 0.015

      const tideOffset = tideAmplitude * Math.sin(time * tideSpeed)
      const lvl = Math.min(baseWaterLevel + tideOffset, minWaterLevel)

      const grad = ctx.createLinearGradient(
        0, lvl - waveAmp,
        0, canvas.height
      )
      grad.addColorStop(0, 'rgba(160, 216, 239, 0.7)')
      grad.addColorStop(0.3, 'rgba(160, 216, 239, 0.8)')
      grad.addColorStop(1, 'rgba(160, 216, 239, 0.9)')

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)
      ctx.lineTo(0, lvl)
      for (let x = 0; x <= canvas.width; x += 2) {
        const primary = waveAmp * Math.sin(freq * x + time * waveSpeed)
        const rolling = waveAmp * 0.3 * Math.cos(
          freq * x * 1.8 + time * waveSpeed * 0.7
        )
        const y = lvl + primary + rolling
        ctx.lineTo(x, y)
      }
      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()
      ctx.fill()

      // foam line
      ctx.strokeStyle = 'rgba(255,255,255,0.4)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = 0; x <= canvas.width; x += 2) {
        const primary = waveAmp * Math.sin(freq * x + time * waveSpeed)
        const rolling = waveAmp * 0.3 * Math.cos(
          freq * x * 1.8 + time * waveSpeed * 0.7
        )
        const y = lvl + primary + rolling
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()

      time++
      animationId = requestAnimationFrame(drawWave)
    }

    resizeCanvas()
    drawWave()
    window.addEventListener('resize', resizeCanvas)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <>
      {/* wave canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* shimmer */}
      <div className="shimmer" />

      {/* hero */}
      <div className="hero">
        <div className="hero-content">
          <div className="photo">
            <Image
              src="/me.jpg"
              alt="Sanat Samal"
              width={240}
              height={240}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="text">
            <h1>Hello, I am Sanat Samal</h1>
            <h2 className={`role ${fade}`}>{words[index]}</h2>
          </div>
        </div>
      </div>

      {/* about me */}
      <section className="about-me" id="about-me">
        <h3>About Me</h3>
        <p>
          I’m Sanat Samal, a UCSD CS undergrad and Regents Scholar with a passion
          for building AI-driven applications. Currently I’m working on adaptive
          audio generation for my UpNow alarm app, research in safe autonomy at
          UCSD’s SAS Lab, and honing my skills in full-stack development and
          machine learning.
        </p>
      </section>

      <style jsx>{`
        .hero {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          width: 100vw;
          /* remove min-height so hero only takes up as much space as needed */
          /* padding pushes content down */
          padding: 30vh 2rem 0;
        }
        .hero-content {
          display: flex;
          align-items: flex-start;
          transform: translateX(-5%);
        }
        .photo {
          flex-shrink: 0;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid rgba(0, 0, 0, 0.8);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          margin-right: 3rem;
        }
        .text h1 {
          margin: 0;
          font-size: 4rem;
          color: #333;
        }
        .role {
          margin: 0.5rem 0 0;
          font-size: 3rem;
          color: #555;
        }
        .fade-in {
          opacity: 1;
          transition: opacity 0.5s ease-in;
        }
        .fade-out {
          opacity: 0;
          transition: opacity 0.5s ease-out;
        }

        .about-me {
          /* pull it up closer to the hero */
          margin: -8rem auto 4rem;
          padding: 30rem;
          max-width: 800px;
        }
        .about-me h3 {
          margin: 0 0 1rem;
          font-size: 2.5rem;
          /* center the title */
          text-align: center;
          color: #333;
        }
        .about-me p {
          margin: 0;
          font-size: 1.2rem;
          line-height: 1.6;
          color: #555;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(
            90deg,
            rgba(250, 243, 221, 0.9),
            rgba(210, 180, 140, 0.9)
          );
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
      `}</style>
    </>
  )
}