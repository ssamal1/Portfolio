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

  // sine-wave canvas with crab
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    // Crab state - slower movement speed
    let crabX = 100
    let crabY = 80
    let targetX = 200
    let targetY = 120
    let isMoving = false
    let waitTime = 0
    let walkCycle = 0
    let speed = 1.5 // Reduced from 3 to 1.5 for slower scuttling
    
    // Footprint tracking
    const footprints: Array<{x: number, y: number, age: number, opacity: number, dots: Array<{offsetX: number, offsetY: number, size: number}>}> = []
    const maxFootprints = 150
    let footprintTimer = 0

    // Seashells
    const seashells: Array<{type: 'conch' | 'scallop' | 'spiral', x: number, y: number, size: number, rotation: number, color: string}> = []
    const numSeashells = 10 // Number of seashells to draw

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawCrab = () => {
      const size = 40
      const bodyWidth = size * 0.8
      const bodyHeight = size * 0.6
      
      // Update crab movement behavior - extended movement area
      const maxX = canvas.width * 0.35 // Increased from 0.4 to 0.6
      const maxY = canvas.height * 0.6 // Increased from 0.3 to 0.6 for lower movement
      
      if (!isMoving && waitTime <= 0) {
        // Pick a new random target
        targetX = 50 + Math.random() * (maxX - 100)
        targetY = 50 + Math.random() * (maxY - 100)
        isMoving = true
      }
      
      if (isMoving) {
        // Move towards target
        const dx = targetX - crabX
        const dy = targetY - crabY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > 5) {
          // Normalize direction and apply speed
          crabX += (dx / distance) * speed
          crabY += (dy / distance) * speed
          walkCycle += 0.2 // Reduced from 0.3 to 0.2 for slower leg animation
        } else {
          // Reached target, start waiting
          isMoving = false
          waitTime = 90 + Math.random() * 180 // Increased wait time from 60-180 to 90-270 frames
        }
      } else {
        // Waiting at current position
        waitTime--
        walkCycle += 0.03 // Reduced from 0.05 to 0.03 for slower idle animation
      }
      
      // Update footprint timer
      footprintTimer++
      
      // Age and fade footprints
      for (let i = footprints.length - 1; i >= 0; i--) {
        const print = footprints[i]
        print.age++
        print.opacity = Math.max(0, 0.8 - (print.age / 300)) // Fade over 5 seconds at 60fps
        
        if (print.opacity <= 0 || footprints.length > maxFootprints) {
          footprints.splice(i, 1)
        }
      }
      
      ctx.save()
      ctx.translate(crabX, crabY)
      
      // Crab body
      ctx.fillStyle = '#D2691E'
      ctx.strokeStyle = '#8B4513'
      ctx.lineWidth = 2
      
      // Main body (oval)
      ctx.beginPath()
      ctx.ellipse(0, 0, bodyWidth/2, bodyHeight/2, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      
      // Draw legs with two joints each
      const legPositions = [
        [-bodyWidth/3, -bodyHeight/4],
        [-bodyWidth/2, 0],
        [-bodyWidth/3, bodyHeight/4],
        [bodyWidth/3, -bodyHeight/4],
        [bodyWidth/2, 0],
        [bodyWidth/3, bodyHeight/4]
      ]
      
      legPositions.forEach((pos, i) => {
        const side = i < 3 ? -1 : 1
        const legWalk = isMoving ? Math.sin(walkCycle + i * 0.8) * 0.4 : Math.sin(walkCycle + i * 0.3) * 0.1
        
        // First joint
        const joint1X = pos[0] + side * 15
        const joint1Y = pos[1] + legWalk * 8
        
        // Second joint
        const joint2X = joint1X + side * 12
        const joint2Y = joint1Y + 10 + legWalk * 5
        
        // Foot
        const footX = joint2X + side * 8
        const footY = joint2Y + 8 + legWalk * 3
        
        // Draw leg segments as rounded rectangles
        ctx.fillStyle = '#A0522D'
        ctx.strokeStyle = '#8B4513'
        ctx.lineWidth = 1
        
        // First segment (body to joint1)
        const seg1Length = Math.sqrt((joint1X - pos[0])**2 + (joint1Y - pos[1])**2)
        const seg1Angle = Math.atan2(joint1Y - pos[1], joint1X - pos[0])
        
        ctx.save()
        ctx.translate(pos[0], pos[1])
        ctx.rotate(seg1Angle)
        ctx.beginPath()
        ctx.roundRect(0, -2, seg1Length, 4, 2)
        ctx.fill()
        ctx.stroke()
        ctx.restore()
        
        // Second segment (joint1 to joint2)
        const seg2Length = Math.sqrt((joint2X - joint1X)**2 + (joint2Y - joint1Y)**2)
        const seg2Angle = Math.atan2(joint2Y - joint1Y, joint2X - joint1X)
        
        ctx.save()
        ctx.translate(joint1X, joint1Y)
        ctx.rotate(seg2Angle)
        ctx.beginPath()
        ctx.roundRect(0, -1.5, seg2Length, 3, 1.5)
        ctx.fill()
        ctx.stroke()
        ctx.restore()
        
        // Third segment (joint2 to foot)
        const seg3Length = Math.sqrt((footX - joint2X)**2 + (footY - joint2Y)**2)
        const seg3Angle = Math.atan2(footY - joint2Y, footX - joint2X)
        
        ctx.save()
        ctx.translate(joint2X, joint2Y)
        ctx.rotate(seg3Angle)
        ctx.beginPath()
        ctx.roundRect(0, -1, seg3Length, 2, 1)
        ctx.fill()
        ctx.stroke()
        ctx.restore()
        
        // Draw joint circles
        ctx.fillStyle = '#8B4513'
        ctx.beginPath()
        ctx.arc(joint1X, joint1Y, 2.5, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.beginPath()
        ctx.arc(joint2X, joint2Y, 2, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw foot
        ctx.fillStyle = '#654321'
        ctx.beginPath()
        ctx.arc(footX, footY, 1.5, 0, Math.PI * 2)
        ctx.fill()
        
        // Add footprint when moving - simplified logic
        if (isMoving && footprintTimer % 12 === 0) {
          const globalFootX = crabX + footX
          const globalFootY = crabY + footY
          
          // Only add footprint if it's on the "sand" (above water level)
          const currentWaterLevel = canvas.height * 0.85
          if (globalFootY < currentWaterLevel - 30) {
            // Create fixed dot positions when footprint is created
            const numDots = 2 + Math.floor(Math.random() * 2) // 2-3 dots per footprint
            const dots = []
            
            for (let j = 0; j < numDots; j++) {
              dots.push({
                offsetX: (Math.random() - 0.5) * 4, // Random spread within 4px
                offsetY: (Math.random() - 0.5) * 3, // Random spread within 3px
                size: 1 + Math.random() * 1.5 // Random size 1-2.5px
              })
            }
            
            footprints.push({
              x: globalFootX,
              y: globalFootY,
              age: 0,
              opacity: 0.7,
              dots: dots
            })
          }
        }
      })
      
      // Claws - slower animation
      const clawSize = 12
      const clawAngle = isMoving ? Math.sin(walkCycle * 0.6) * 0.3 : Math.sin(walkCycle * 0.15) * 0.1 // Reduced animation speed
      
      // Left claw
      ctx.save()
      ctx.translate(-bodyWidth/2 - 8, -5)
      ctx.rotate(clawAngle)
      ctx.fillStyle = '#B22222'
      ctx.strokeStyle = '#8B0000'
      ctx.lineWidth = 2
      
      // Claw base
      ctx.beginPath()
      ctx.ellipse(0, 0, clawSize/2, clawSize/3, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      
      // Upper pincer - sharp triangular shape
      ctx.fillStyle = '#CD5C5C'
      ctx.strokeStyle = '#8B0000'
      ctx.lineWidth = 1
      
      const pincerOpenAngle = isMoving ? Math.sin(walkCycle * 0.4) * 0.4 + 0.3 : Math.sin(walkCycle * 0.08) * 0.2 + 0.1 // Slower pincer animation
      
      ctx.save()
      ctx.rotate(-pincerOpenAngle)
      ctx.beginPath()
      ctx.moveTo(-clawSize/4, -2)
      ctx.lineTo(-clawSize/2 - 4, -8)
      ctx.lineTo(-clawSize/2 - 2, -10)
      ctx.lineTo(-clawSize/4 + 2, -4)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      
      // Sharp tip highlight
      ctx.fillStyle = '#FFF'
      ctx.beginPath()
      ctx.arc(-clawSize/2 - 3, -9, 0.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      
      // Lower pincer - sharp triangular shape
      ctx.save()
      ctx.rotate(pincerOpenAngle)
      ctx.fillStyle = '#CD5C5C'
      ctx.strokeStyle = '#8B0000'
      ctx.lineWidth = 1
      
      ctx.beginPath()
      ctx.moveTo(-clawSize/4, 2)
      ctx.lineTo(-clawSize/2 - 4, 8)
      ctx.lineTo(-clawSize/2 - 2, 10)
      ctx.lineTo(-clawSize/4 + 2, 4)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      
      // Sharp tip highlight
      ctx.fillStyle = '#FFF'
      ctx.beginPath()
      ctx.arc(-clawSize/2 - 3, 9, 0.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      
      ctx.restore()
      
      // Right claw
      ctx.save()
      ctx.translate(bodyWidth/2 + 8, -5)
      ctx.rotate(-clawAngle)
      ctx.fillStyle = '#B22222'
      ctx.strokeStyle = '#8B0000'
      ctx.lineWidth = 2
      
      // Claw base
      ctx.beginPath()
      ctx.ellipse(0, 0, clawSize/2, clawSize/3, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      
      // Upper pincer - sharp triangular shape
      ctx.fillStyle = '#CD5C5C'
      ctx.strokeStyle = '#8B0000'
      ctx.lineWidth = 1
      
      ctx.save()
      ctx.rotate(pincerOpenAngle)
      ctx.beginPath()
      ctx.moveTo(clawSize/4, -2)
      ctx.lineTo(clawSize/2 + 4, -8)
      ctx.lineTo(clawSize/2 + 2, -10)
      ctx.lineTo(clawSize/4 - 2, -4)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      
      // Sharp tip highlight
      ctx.fillStyle = '#FFF'
      ctx.beginPath()
      ctx.arc(clawSize/2 + 3, -9, 0.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      
      // Lower pincer - sharp triangular shape
      ctx.save()
      ctx.rotate(-pincerOpenAngle)
      ctx.fillStyle = '#CD5C5C'
      ctx.strokeStyle = '#8B0000'
      ctx.lineWidth = 1
      
      ctx.beginPath()
      ctx.moveTo(clawSize/4, 2)
      ctx.lineTo(clawSize/2 + 4, 8)
      ctx.lineTo(clawSize/2 + 2, 10)
      ctx.lineTo(clawSize/4 - 2, 4)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      
      // Sharp tip highlight
      ctx.fillStyle = '#FFF'
      ctx.beginPath()
      ctx.arc(clawSize/2 + 3, 9, 0.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      
      ctx.restore()
      
      // Eyes
      ctx.fillStyle = '#000'
      ctx.beginPath()
      ctx.arc(-8, -bodyHeight/3, 4, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(8, -bodyHeight/3, 4, 0, Math.PI * 2)
      ctx.fill()
      
      // Eye highlights
      ctx.fillStyle = '#FFF'
      ctx.beginPath()
      ctx.arc(-7, -bodyHeight/3 - 1, 1.5, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(9, -bodyHeight/3 - 1, 1.5, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.restore()
    }

    const drawFootprints = () => {
      // Draw footprints as dark sand dots
      footprints.forEach(print => {
        if (print.opacity > 0) {
          ctx.save()
          ctx.globalAlpha = print.opacity
          
          // Draw the pre-generated dots at their fixed positions
          print.dots.forEach(dot => {
            ctx.fillStyle = '#8B4513' // Simple dark brown
            ctx.beginPath()
            ctx.arc(print.x + dot.offsetX, print.y + dot.offsetY, dot.size, 0, Math.PI * 2)
            ctx.fill()
          })
          
          ctx.restore()
        }
      })
    }

    const drawSeashells = () => {
      const sandTop = canvas.height * 0.3; // Approx top of the sand area
      const sandBottom = canvas.height * 0.65; // Approx bottom of the sand area
      const rightMiddleXStart = canvas.width * 0.7; // Start from 60% of width
      const rightMiddleXEnd = canvas.width * 0.98; // End at 95% of width

      // Generate seashells once
      if (seashells.length === 0) {
        for (let i = 0; i < numSeashells; i++) {
          const type = ['conch', 'scallop', 'spiral'][Math.floor(Math.random() * 3)] as 'conch' | 'scallop' | 'spiral';
          const x = rightMiddleXStart + Math.random() * (rightMiddleXEnd - rightMiddleXStart);
          const y = sandTop + Math.random() * (sandBottom - sandTop);
          const size = 10 + Math.random() * 20; // Random size between 10 and 30
          const rotation = Math.random() * Math.PI * 2; // Random rotation
          const color = `hsl(${Math.random() * 30 + 20}, ${Math.random() * 30 + 50}%, ${Math.random() * 20 + 60}%)`; // Earthy tones

          seashells.push({ type, x, y, size, rotation, color });
        }
      }

      seashells.forEach(shell => {
        ctx.save();
        ctx.translate(shell.x, shell.y);
        ctx.rotate(shell.rotation);
        ctx.fillStyle = shell.color;
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 1;

        switch (shell.type) {
          case 'conch':
            // Simple conch shape (spiral-like)
            ctx.beginPath();
            for (let angle = 0; angle < Math.PI * 1.5; angle += 0.1) {
              const r = shell.size * (1 - angle / (Math.PI * 1.5));
              const x = r * Math.cos(angle);
              const y = r * Math.sin(angle);
              if (angle === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.quadraticCurveTo(shell.size * 0.8, -shell.size * 0.5, 0, 0); // Pointy end
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Add some texture lines
            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < 5; i++) {
              ctx.beginPath();
              ctx.arc(0, 0, shell.size * (0.8 - i * 0.15), 0, Math.PI * 1.5);
              ctx.stroke();
            }
            break;
          case 'scallop':
            // Scallop shell (fan-like)
            const numRidges = 7;
            const ridgeWidth = shell.size * 0.15;
            const ridgeHeight = shell.size * 0.8;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (let i = 0; i <= numRidges; i++) {
              const angle = Math.PI / (numRidges + 1) * i - Math.PI / 2;
              const x1 = Math.cos(angle) * (shell.size * 0.1);
              const y1 = Math.sin(angle) * (shell.size * 0.1);
              const x2 = Math.cos(angle) * ridgeHeight;
              const y2 = Math.sin(angle) * ridgeHeight;

              ctx.lineTo(x1, y1);
              ctx.quadraticCurveTo(
                x2 + Math.cos(angle + Math.PI / 2) * ridgeWidth,
                y2 + Math.sin(angle + Math.PI / 2) * ridgeWidth,
                x2, y2
              );
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Add inner lines for ridges
            ctx.strokeStyle = 'rgba(0,0,0,0.15)';
            ctx.lineWidth = 1;
            for (let i = 0; i <= numRidges; i++) {
              const angle = Math.PI / (numRidges + 1) * i - Math.PI / 2;
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(Math.cos(angle) * ridgeHeight * 0.9, Math.sin(angle) * ridgeHeight * 0.9);
              ctx.stroke();
            }
            break;
          case 'spiral':
            // Simple spiral shell
            ctx.beginPath();
            for (let angle = 0; angle < Math.PI * 4; angle += 0.1) {
              const x = (shell.size * 0.05) * angle * Math.cos(angle);
              const y = (shell.size * 0.05) * angle * Math.sin(angle);
              if (angle === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.stroke();
            ctx.fill();

            // Add a small opening/tip
            ctx.beginPath();
            ctx.arc(0, 0, shell.size * 0.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            break;
        }

        ctx.restore();
      });
    };

    const drawWave = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const baseWaterLevel  = h * 0.85
      const tideAmplitude   = h * 0.1
      const minWaterLevel   = h * 0.9
      const waveAmp         = 28
      const freq            = 0.005
      const tideSpeed       = 0.003
      const waveSpeed       = 0.01

      const tideOffset = tideAmplitude * Math.sin(time * tideSpeed)
      const lvl = Math.min(baseWaterLevel + tideOffset, minWaterLevel)

      // opaque gradient for water
// turquoise-to-light-blue gradient for water
  const grad = ctx.createLinearGradient(0, lvl - waveAmp, 0, h)
  // at the very surface of the waves, keep your light-blue
  grad.addColorStop(0, 'rgba(160,216,239,1)')
  // halfway down, start mixing in turquoise
  grad.addColorStop(0.5, '#40E0D0')
  // at the bottom, full turquoise
  grad.addColorStop(1, '#48D1CC')
  ctx.fillStyle = grad
      // fill waves
      ctx.beginPath()
      ctx.moveTo(0, h)
      ctx.lineTo(0, lvl)
      for (let x = 0; x <= w; x += 2) {
        const p = waveAmp * Math.sin(freq * x + time * waveSpeed)
        const r = waveAmp * 0.3 * Math.cos(freq * x * 1.8 + time * waveSpeed * 0.7)
        ctx.lineTo(x, lvl + p + r)
      }
      ctx.lineTo(w, h)
      ctx.closePath()
      ctx.fill()

      // foam line
      ctx.strokeStyle = 'rgba(255,255,255,1)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = 0; x <= w; x += 2) {
        const p = waveAmp * Math.sin(freq * x + time * waveSpeed)
        const r = waveAmp * 0.3 * Math.cos(freq * x * 1.8 + time * waveSpeed * 0.7)
        x === 0
          ? ctx.moveTo(x, lvl + p + r)
          : ctx.lineTo(x, lvl + p + r)
      }
      ctx.stroke()

      // Draw footprints first (behind the crab)
      drawFootprints()

      // Draw the crab
      drawCrab()

      // Draw seashells
      drawSeashells()

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
        className="wave-canvas"
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
        I am an insatiably curious software engineer, machine learning researcher, systems tinkerer, competitive mathematician, and aviation & national security aficionado. To put myself in a nutshell: I love diving deep into anything that sparks my interest—whether it’s peeling back the layers of a large-language model, implementing file‐system syscalls in Nachos, or experimenting with tropical fruit trees that shouldn’t survive in Southern California.

I’m motivated by challenges of all kinds: architecting a Koopman-based safety controller in UCSD’s robotics lab, squeezing every millisecond out of a Verilog-encrypted pipeline, drafting the perfect fantasy‐football lineup, or coaxing an iOS alarm app to generate genuinely novel wake-up melodies. While I thrive on mastering the rules, my favorite moments come from rewriting them and surprising everyone—myself included.

During my young professional career, I:
	•	Built UpNow, an iOS alarm-clock app that leverages Magenta models on Google Cloud to generate adaptive, ever-fresh wake-up tunes.
	•	Researched safe autonomy at UCSD’s Safe Autonomous Systems Lab, developing learned Koopman lifts for provably stable control of nonlinear robotic systems.
	•	Implemented core OS features in Nachos for ECE260C—designing memory-mapped encryption logic with multiple LFSRs and extending UserProcess.java to handle file‐system syscalls.
	•	Engineered a multi-label musical-instrument classifier, combining VGGish feature extraction with RNN layers to achieve over 83% accuracy on the IRMAS dataset.
	•	Served as Infrastructure Director at UCSD’s Data Science Society (DS3), where I maintained and scaled our community’s web infrastructure and mentored new members.

I’ve taken a wide range of courses in algorithms & data structures, operating systems, computer architecture, machine learning, control theory, and numerical methods, including:
	•	CSE 100: Algorithms & Analysis
	•	CSE 212: Operating Systems
	•	ECE 260C: Hardware & Sequential Logic (Verilog)
	•	CSE 291: Machine Learning
	•	MATH 20E: Vector Calculus

In the future, I:
	•	Plan to launch ambitious personal projects and secure internships or on-campus research roles that push the boundaries of AI, robotics, and cloud computing.
	•	Aim to pursue graduate studies (Master’s or PhD) in Machine Learning and Safe Autonomous Systems.
	•	Want to explore cutting-edge innovations—quantum computing, advanced numerical algorithms, and beyond—through formal coursework and self-directed research.
	•	Will cultivate skills “off the clock,” too: refining my woodworking chops, growing a tropical plant nursery, and deepening my investing know-how.        </p>
      </section>

      {/* gradient-only spacer */}
      <div className="gradient-spacer" />

      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          min-height: 100vh;
          padding: 30vh 2rem 0;

        }
        .wave-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }
        .shimmer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 11;
        }
        .hero-content {
          position: relative;
          z-index: 12;
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
          margin: -15rem auto 4rem;
          padding: 0;
          max-width: 800px;
        }
        .about-me h3 {
          margin: 0 0 1rem;
          font-size: 2.5rem;
          text-align: center;
          color: #333;
        }
        .about-me p {
          margin: 30;
          font-size: 1.8rem;
          line-height: 1.6;
          color: #555;
        }

        .gradient-spacer {
          height: 50vh;
          width: 100%;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: linear-gradient(
            90deg,
            rgba(250, 243, 221, 0.9),
            rgba(210, 180, 140, 0.9)
          );
          background-attachment: fixed;
        }
      `}</style>
    </>
  )
}