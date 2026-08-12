'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { 
  ArrowUp, Plane, Mail, MoveDown, ExternalLink, Rocket, Wind, Gauge, Orbit, 
  Code2, ChevronRight, Target, GraduationCap, Award, FileText, Zap, Eye, 
  Activity, Settings, Maximize2, Minimize2, ShieldCheck, Cpu
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Inline SVG components for social icons
const Github = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.52-1.54 6.52-7.1a5.3 5.3 0 0 0-1.5-3.75 5.1 5.1 0 0 0-.1-3.8s-1.1-.35-3.5 1.25a12.8 12.8 0 0 0-7 0C6.1 2.3 5 2.65 5 2.65a5.1 5.1 0 0 0-.1 3.8A5.3 5.3 0 0 0 3 10.1c0 5.56 3.34 6.75 6.52 7.1a4.8 4.8 0 0 0-1 3.02v4"/>
  </svg>
)

const Linkedin = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const navItems = [
  { id: 'about', label: 'Profile', code: '01' },
  { id: 'skills', label: 'Systems', code: '02' },
  { id: 'projects', label: 'Hangar', code: '03' },
  { id: 'education', label: 'Flight Log', code: '04' },
  { id: 'certificates', label: 'Credentials', code: '05' },
  { id: 'contact', label: 'Comms', code: '06' }
]

const projects = [
  {
    code: 'AERO-001',
    title: 'Facial Recognition System',
    description: 'Advanced biometric identification protocol using Python/OpenCV. Potential integration for airport security automation.',
    state: 'ACTIVE',
    tech: ['Python', 'OpenCV', 'ML'],
    link: '#'
  },
  {
    code: 'AERO-002',
    title: 'Dev Mini Projects',
    description: 'Collection of algorithmic solutions demonstrating core programming logic and problem-solving methodologies.',
    state: 'DEPLOYED',
    tech: ['JS', 'Git', 'Algo'],
    link: 'https://github.com/JudeDominicYap'
  },
  {
    code: 'AERO-003',
    title: 'Future Aerospace',
    description: 'Reserved hangar space for upcoming CFD simulations, propulsion analysis, and flight dynamics modeling.',
    state: 'STANDBY',
    tech: ['R&D', 'Sim'],
    link: '#'
  }
]

const flightLogs: any[] = []
const certificates: any[] = []

interface SectionProps {
  id: string
  index: string
  title: string
  active: string
  onEngage: (id: string) => void
  children: React.ReactNode
  icon?: LucideIcon
}

function Section({ id, index, title, active, onEngage, children, icon: Icon }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`section ${active === id ? 'engaged' : ''}`}
      onMouseEnter={() => onEngage(id)}
    >
      <div className="section-heading">
        <div className="section-icon">
          {Icon && <Icon size={24} />}
        </div>
        <div className="section-meta">
          <span className="section-code">{index}</span>
          <p>// {title.toUpperCase()}</p>
        </div>
        <h2>{title}</h2>
        <div className="section-status-light" />
      </div>
      {children}
    </section>
  )
}

interface SystemsCardProps {
  code: string
  title: string
  items: string[]
  status: string
  wide?: boolean
  icon?: LucideIcon
}

function SystemsCard({ code, title, items, status, wide, icon: Icon }: SystemsCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5
    setTransform({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 })
  }

  return (
    <div 
      ref={cardRef}
      className={`system-card ${wide ? 'wide' : ''}`}
      style={{ transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-header">
        <div className="card-top">
          {Icon && <Icon size={18} />}
          <span>{code}</span>
        </div>
        <div className={`status-indicator ${status.toLowerCase()}`}>
          <span className="led" />
          <span>{status}</span>
        </div>
      </div>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="card-moss" />
    </div>
  )
}

interface AircraftBayProps {
  project: typeof projects[0]
  onClick: () => void
}

function AircraftBay({ project, onClick }: AircraftBayProps) {
  const bayRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bayRef.current) return
    const rect = bayRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    setTransform({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 })
  }

  return (
    <div 
      ref={bayRef}
      className="aircraft-bay"
      style={{ transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)` }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-header">
        <span className="project-code">{project.code}</span>
        <div className={`status-badge ${project.state.toLowerCase()}`}>
          <span className="blink-dot" />
          {project.state}
        </div>
      </div>
      <div className="project-visual">
        <div className="hologram-grid" />
        <Plane className="hologram-plane" size={48} />
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-tech">
        {project.tech.map((t) => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>
      <button className="inspect-btn">
        <Eye size={14} /> INSPECT SYSTEM
      </button>
    </div>
  )
}

export function AeronauticalInterface() {
  const radarRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailCanvasRef = useRef<HTMLCanvasElement>(null)
  
  const [active, setActive] = useState('about')
  const [showTop, setShowTop] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [modalProject, setModalProject] = useState<typeof projects[0] | null>(null)
  const [altitude, setAltitude] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [units, setUnits] = useState<'IMPERIAL' | 'METRIC'>('IMPERIAL')
  
  // Cockpit Toggles
  const [radarVisible, setRadarVisible] = useState(true)
  const [telemetryVisible, setTelemetryVisible] = useState(true)
  const [hudMode, setHudMode] = useState<'CYAN' | 'GREEN'>('CYAN')
  
  // Flight Data
  const [pitch, setPitch] = useState(0)
  const [heading, setHeading] = useState(0)
  const [gForce, setGForce] = useState(1.0)

  const engage = useCallback((id: string) => setActive(id), [])

  // Custom Cursor Logic with Orientation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return
      
      // Update position
      cursorRef.current.style.left = `${e.clientX}px`
      cursorRef.current.style.top = `${e.clientY}px`
      
      // Calculate angle based on movement delta would require tracking previous pos
      // For smooth rotation, we use velocity vector
      const now = performance.now()
      const dx = e.movementX
      const dy = e.movementY
      
      if (dx !== 0 || dy !== 0) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90 // +90 to align SVG
        cursorRef.current.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`
        
        // Add particles based on speed
        const speed = Math.sqrt(dx*dx + dy*dy)
        if (speed > 5 && trailCanvasRef.current) {
          const ctx = trailCanvasRef.current.getContext('2d')
          if (ctx) {
            ctx.beginPath()
            ctx.arc(e.clientX, e.clientY, Math.random() * 3 + 1, 0, Math.PI * 2)
            ctx.fillStyle = hudMode === 'CYAN' ? 'rgba(0, 229, 255, 0.5)' : 'rgba(0, 255, 106, 0.5)'
            ctx.fill()
          }
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [hudMode])

  // Particle Trail Animation Loop
  useEffect(() => {
    const canvas = trailCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'source-over'
      requestAnimationFrame(animate)
    }
    animate()
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Radar & Scroll Logic
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let idleTimer = 0
    let idleFrame = 0
    let lastRelocation = 0
    let currentPerch = -1

    const perches = () => [
      { x: window.innerWidth * 0.08, y: window.innerHeight * 0.2 },
      { x: window.innerWidth * 0.82, y: window.innerHeight * 0.16 },
      { x: window.innerWidth * 0.88, y: window.innerHeight * 0.68 },
      { x: window.innerWidth * 0.12, y: window.innerHeight * 0.72 },
    ]

    const relocate = (avoidX = -1000, avoidY = -1000) => {
      if (!radarRef.current) return
      const options = perches()
        .map((perch, index) => ({ ...perch, index, distance: Math.hypot(perch.x - avoidX, perch.y - avoidY) }))
        .filter((perch) => perch.index !== currentPerch && perch.distance > 180)
      const next = options[Math.floor(Math.random() * options.length)] ?? perches()[0]
      currentPerch = next.index ?? 0
      radarRef.current.classList.add('relocating')
      radarRef.current.style.setProperty('--radar-x', `${Math.round(next.x)}px`)
      radarRef.current.style.setProperty('--radar-y', `${Math.round(next.y)}px`)
      setTimeout(() => radarRef.current?.classList.remove('relocating'), 320)
    }

    const aim = (clientX: number, clientY: number) => {
      if (reduced || !radarRef.current) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = radarRef.current?.getBoundingClientRect()
        if (!rect || !radarRef.current) return
        const dx = clientX - (rect.left + rect.width / 2)
        const dy = clientY - (rect.top + rect.height / 2)
        const distance = Math.max(1, Math.hypot(dx, dy))
        if (distance < 105 && Date.now() - lastRelocation > 700) {
          lastRelocation = Date.now()
          relocate(clientX, clientY)
          return
        }
        radarRef.current.style.setProperty('--radar-dot-x', `${(dx / distance) * 5}px`)
        radarRef.current.style.setProperty('--radar-dot-y', `${(dy / distance) * 4}px`)
        radarRef.current.style.setProperty('--radar-angle', `${Math.atan2(dy, dx) * (180 / Math.PI)}deg`)
      })
    }

    const idleScan = () => {
      if (reduced || !radarRef.current) return
      const time = Date.now() / 1300
      radarRef.current.style.setProperty('--radar-dot-x', `${Math.sin(time) * 6}px`)
      radarRef.current.style.setProperty('--radar-dot-y', `${Math.cos(time * 0.7) * 3}px`)
      idleFrame = requestAnimationFrame(idleScan)
    }

    const handlePointer = (event: PointerEvent) => {
      cancelAnimationFrame(idleFrame)
      clearTimeout(idleTimer)
      aim(event.clientX, event.clientY)
      if (event.pointerType === 'touch') idleTimer = window.setTimeout(idleScan, 1800)
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      setShowTop(scrollY > 520)
      
      // Simulate flight data
      setAltitude(Math.floor(scrollY / 10))
      setSpeed(Math.min(999, Math.floor(scrollY / 5)))
      setPitch(Math.max(-20, Math.min(20, Math.floor((window.scrollY % 100) - 50) / 5)))
      setHeading((scrollY * 0.5) % 360)
      setGForce((1 + Math.sin(scrollY * 0.01) * 0.2).toFixed(2))
    }

    const sections = navItems.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-25% 0px -55%', threshold: [0.1, 0.35, 0.6] },
    )
    sections.forEach((section) => observer.observe(section))

    relocate()
    window.addEventListener('pointermove', handlePointer, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    idleTimer = window.setTimeout(idleScan, 1800)
    handleScroll()
    
    return () => {
      observer.disconnect()
      window.removeEventListener('pointermove', handlePointer)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(frame)
      cancelAnimationFrame(idleFrame)
      clearTimeout(idleTimer)
    }
  }, [])

  const toggleUnits = () => setUnits(prev => prev === 'IMPERIAL' ? 'METRIC' : 'IMPERIAL')
  const toggleHudMode = () => setHudMode(prev => prev === 'CYAN' ? 'GREEN' : 'CYAN')

  const handleProjectClick = (project: typeof projects[0]) => {
    if (project.link && project.link !== '#') {
      window.open(project.link, '_blank', 'noopener,noreferrer')
    } else {
      setModalProject(project)
    }
  }

  return (
    <div className={`aero-shell ${hudMode.toLowerCase()}-mode`} data-active={active}>
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 5L35 35L20 28L5 35L20 5Z" fill="var(--cursor-fill)" stroke="var(--primary)" strokeWidth="2"/>
          <circle cx="20" cy="20" r="3" fill="var(--primary)" className="cursor-glow"/>
        </svg>
      </div>
      <canvas ref={trailCanvasRef} className="trail-canvas" aria-hidden="true" />

      {/* Background Elements */}
      <div className="sky-backdrop" aria-hidden="true">
        <div className="grid-overlay" />
        <div className="cloud-layer cloud-one" />
        <div className="cloud-layer cloud-two" />
        <div className="star-field" />
      </div>

      {/* Radar Observer */}
      {radarVisible && (
        <div className="radar-observer" ref={radarRef} aria-hidden="true">
          <div className="radar-dish">
            <div className="radar-screen">
              <div className="radar-sweep" />
              <div className="radar-blip" />
              <div className="radar-grid" />
            </div>
          </div>
          <div className="radar-base" />
          <span className="radar-tag">RADAR // ACTIVE</span>
        </div>
      )}

      {/* Cockpit Header */}
      <header className="cockpit-header">
        <div className="cockpit-panel">
          <div className="panel-left">
            <div className="brand-unit">
              <div className="emblem">
                <Plane size={20} />
              </div>
              <div className="brand-text">
                <span>JDY AEROSPACE</span>
                <small>SYSTEMS ONLINE</small>
              </div>
            </div>
          </div>

          <nav className={`nav-cluster ${isMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${active === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  engage(item.id)
                  setIsMenuOpen(false)
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span className="link-code">{item.code}</span>
                <span className="link-label">{item.label}</span>
                {active === item.id && <span className="nav-led" />}
              </a>
            ))}
          </nav>

          <div className="panel-right">
            <div className="flight-data-mini">
              <span>PITCH: {pitch}°</span>
              <span>HDG: {Math.floor(heading)}°</span>
              <span>G: {gForce}</span>
            </div>
            <button 
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                <span /><span /><span />
              </div>
            </button>
          </div>
        </div>
        
        {/* Control Toggles */}
        <div className="control-strip">
          <button 
            className={`toggle-btn ${radarVisible ? 'active' : ''}`}
            onClick={() => setRadarVisible(!radarVisible)}
            title="Toggle Radar"
          >
            <Activity size={14} /> RADAR
          </button>
          <button 
            className={`toggle-btn ${telemetryVisible ? 'active' : ''}`}
            onClick={() => setTelemetryVisible(!telemetryVisible)}
            title="Toggle Telemetry"
          >
            <Gauge size={14} /> TELEMETRY
          </button>
          <button 
            className={`toggle-btn ${hudMode === 'GREEN' ? 'active' : ''}`}
            onClick={toggleHudMode}
            title="Toggle HUD Mode"
          >
            <Eye size={14} /> {hudMode}
          </button>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="clearance-badge">
              <ShieldCheck size={16} /> CLEARANCE LEVEL 5
            </div>
            <h1 className="hero-title">
              JUDE <br />
              <span className="outline-text">DOMINIC YAP</span>
            </h1>
            <div className="role-pill">
              <Rocket size={16} />
              <span>ASPIRING AERONAUTICAL ENGINEER</span>
              <Orbit size={16} />
            </div>
            <p className="mission-statement">
              Grade 12 STEM student specializing in aerodynamics and propulsion systems. 
              Engineering the future of flight through code and calculation.
            </p>
            <div className="action-cluster">
              <a href="#projects" className="primary-btn" onClick={() => engage('projects')}>
                <Cpu size={18} /> VIEW PROJECTS
              </a>
              <a href="#contact" className="secondary-btn" onClick={() => engage('contact')}>
                ESTABLISH COMMS
              </a>
            </div>
          </div>

          <div className="pilot-profile-container">
            <div className="hud-frame">
              <div className="corner tl" />
              <div className="corner tr" />
              <div className="corner bl" />
              <div className="corner br" />
              
              <div className="image-wrapper">
                <img src="/profile.jpg" alt="Pilot Profile" className="pilot-img" />
                <div className="scan-line" />
              </div>

              <div className="hud-overlay">
                <div className="crosshair-h" />
                <div className="crosshair-v" />
                <div className="target-circle" />
                <div className="coordinates">
                  <span>34.0522° N</span>
                  <span>118.2437° W</span>
                </div>
                <div className="telemetry-ticks">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="tick" style={{ top: `${i * 14}%` }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat-row">
                <span>ID:</span> <span>JDY-2026</span>
              </div>
              <div className="stat-row">
                <span>STATUS:</span> <span className="blink">TRAINING</span>
              </div>
              <div className="stat-row">
                <span>TRAJECTORY:</span> <span>AERONAUTICS</span>
              </div>
            </div>
          </div>
          
          <a href="#about" className="scroll-indicator">
            <MoveDown size={20} />
            <span>DESCEND</span>
          </a>
        </section>

        <Section id="about" index="01" title="PILOT PROFILE" active={active} onEngage={engage} icon={Target}>
          <div className="briefing-grid">
            <div className="briefing-text">
              <p className="lead">Candidate is a Grade 12 STEM student at Las Piñas National Senior High School, currently in pre-flight preparation for aerospace engineering studies.</p>
              <p>Core competencies include fluid dynamics analysis, propulsion system theory, and computational modeling. Actively developing technical stack proficiency to support future R&D initiatives.</p>
            </div>
            <div className="briefing-visual">
              <div className="schematic-box">
                <Plane size={64} className="schematic-icon" />
                <div className="schematic-lines" />
                <span>ENGINEERING // READY</span>
              </div>
            </div>
          </div>
        </Section>

        <Section id="skills" index="02" title="TECHNICAL SYSTEMS" active={active} onEngage={engage} icon={Code2}>
          <div className="systems-array">
            <SystemsCard code="SYS-01" title="Programming Languages" items={['Python', 'JavaScript', 'SQL']} status="ONLINE" icon={Code2} />
            <SystemsCard code="SYS-02" title="Engineering Tools" items={['Git', 'GitHub', 'VS Code', 'CAD Basics']} status="ONLINE" icon={Settings} />
            <SystemsCard code="SYS-03" title="Core Competencies" items={['Fluid Dynamics', 'Thermodynamics', 'Problem Solving', 'Data Analysis']} status="OPTIMAL" wide icon={Wind} />
          </div>
        </Section>

        <Section id="projects" index="03" title="PROJECT HANGAR" active={active} onEngage={engage} icon={Rocket}>
          <div className="hangar-bay">
            {projects.map((project) => (
              <AircraftBay
                key={project.code}
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        </Section>

        <Section id="education" index="04" title="FLIGHT LOG" active={active} onEngage={engage} icon={GraduationCap}>
          {flightLogs.length > 0 ? (
            <div className="log-list">
              {flightLogs.map((log, i) => (
                <div key={i} className="log-entry">
                  <span className="log-date">{log.date}</span>
                  <div className="log-content">
                    <h4>{log.title}</h4>
                    <p>{log.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <FileText size={48} />
              <h3>NO FLIGHT LOGS RECORDED</h3>
              <p>Academic history will be populated upon mission completion.</p>
            </div>
          )}
        </Section>

        <Section id="certificates" index="05" title="CREDENTIALS" active={active} onEngage={engage} icon={Award}>
          {certificates.length > 0 ? (
            <div className="cert-grid">
              {certificates.map((cert, i) => (
                <div key={i} className="cert-card">
                  <div className="cert-seal"><Award size={32} /></div>
                  <h4>{cert.title}</h4>
                  <p>{cert.issuer}</p>
                  <span className="cert-date">{cert.date}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Award size={48} />
              <h3>NO CREDENTIALS ISSUED</h3>
              <p>Certification records will appear here upon program graduation.</p>
            </div>
          )}
        </Section>

        <Section id="contact" index="06" title="COMMUNICATIONS" active={active} onEngage={engage} icon={Mail}>
          <div className="comms-deck">
            <div className="comms-info">
              <h3>ESTABLISH UPLINK</h3>
              <p>All communication channels are open and monitored. Select frequency for transmission.</p>
            </div>
            <div className="comms-links">
              <a href="https://linkedin.com/in/judedominicyap" target="_blank" rel="noreferrer" className="comm-link">
                <Linkedin size={20} />
                <span>LINKEDIN_NETWORK</span>
                <ExternalLink size={16} />
              </a>
              <a href="https://github.com/JudeDominicYap" target="_blank" rel="noreferrer" className="comm-link">
                <Github size={20} />
                <span>GITHUB_REPO</span>
                <ExternalLink size={16} />
              </a>
              <a href="mailto:judedominic.yap@gmail.com" className="comm-link">
                <Mail size={20} />
                <span>EMAIL_DIRECT</span>
                <ExternalLink size={16} />
              </a>
            </div>
            <a href="mailto:judedominic.yap@gmail.com" className="transmit-btn">
              <Zap size={18} /> INITIATE TRANSMISSION
            </a>
          </div>
        </Section>
      </main>

      <footer>
        <div className="footer-content">
          <p>© 2026 JUDE DOMINIC YAP // ALL SYSTEMS NOMINAL</p>
          <p>DESIGNED WITH AERONAUTICAL PRECISION</p>
        </div>
      </footer>

      {/* Telemetry Gauges */}
      {telemetryVisible && (
        <div className="telemetry-panel">
          <div className="gauge-cluster" onClick={toggleUnits}>
            <div className="gauge main-gauge">
              <svg viewBox="0 0 100 100" className="gauge-svg">
                <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="var(--border)" strokeWidth="8" strokeLinecap="round" />
                <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="var(--primary)" strokeWidth="8" strokeLinecap="round" 
                  strokeDasharray={`${(altitude % 1000) / 10} 1000`} />
              </svg>
              <div className="gauge-value">{altitude}</div>
              <div className="gauge-label">ALTITUDE ({units === 'IMPERIAL' ? 'FT' : 'M'})</div>
            </div>
            <div className="gauge main-gauge">
              <svg viewBox="0 0 100 100" className="gauge-svg">
                <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="var(--border)" strokeWidth="8" strokeLinecap="round" />
                <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" 
                  strokeDasharray={`${(speed % 100) / 1} 1000`} />
              </svg>
              <div className="gauge-value">{speed}</div>
              <div className="gauge-label">SPEED ({units === 'IMPERIAL' ? 'KTS' : 'KM/H'})</div>
            </div>
          </div>
          <button className="top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ArrowUp size={20} />
          </button>
        </div>
      )}

      {/* Modal */}
      {modalProject && (
        <div className="modal-overlay" onClick={() => setModalProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalProject(null)}>×</button>
            <div className="modal-header">
              <span className="modal-code">{modalProject.code}</span>
              <span className={`modal-status ${modalProject.state.toLowerCase()}`}>{modalProject.state}</span>
            </div>
            <h3 className="modal-title">{modalProject.title}</h3>
            <p className="modal-desc">{modalProject.description}</p>
            <div className="modal-tech">
              {modalProject.tech.map((t) => (
                <span key={t} className="tech-chip">{t}</span>
              ))}
            </div>
            <div className="modal-actions">
              {modalProject.link && modalProject.link !== '#' ? (
                <a href={modalProject.link} target="_blank" rel="noopener noreferrer" className="primary-btn">
                  <ExternalLink size={16} /> LAUNCH PROJECT
                </a>
              ) : (
                <span className="status-msg">DATA ENCRYPTED // COMING SOON</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
