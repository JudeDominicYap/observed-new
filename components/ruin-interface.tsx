'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowUp, Plane, Mail, MoveDown, ExternalLink, Rocket, Wind, Gauge, Orbit, Code2, ChevronRight, Target, GraduationCap, Award } from 'lucide-react'

const Github = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.52-1.54 6.52-7.1a5.3 5.3 0 0 0-1.5-3.75 5.1 5.1 0 0 0-.1-3.8s-1.1-.35-3.5 1.25a12.8 12.8 0 0 0-7 0C6.1 2.3 5 2.65 5 2.65a5.1 5.1 0 0 0-.1 3.8A5.3 5.3 0 0 0 3 10.1c0 5.56 3.34 6.75 6.52 7.1a4.8 4.8 0 0 0-1 3.02v4"/></svg>;
const Linkedin = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' }
]

const projects = [
  {
    code: 'AERO-001',
    title: 'Facial Recognition System',
    description: 'A Facial Recognition System built using Python and OpenCV. Potential applications in automated airport security systems and pilot identification protocols.',
    state: 'ACTIVE',
    tech: ['Python', 'OpenCV', 'Machine Learning'],
    link: '#'
  },
  {
    code: 'AERO-002',
    title: 'Developer Mini Projects',
    description: 'A growing collection of creative mini projects demonstrating programming fundamentals and problem-solving methodologies essential for aerospace engineering.',
    state: 'IN_PROGRESS',
    tech: ['Python', 'JavaScript', 'Git'],
    link: 'https://github.com/JudeDominicYap'
  },
  {
    code: 'AERO-003',
    title: 'Future Aerospace Projects',
    description: 'This hangar will house future aeronautical and aerospace engineering projects including flight simulations, aerodynamics analysis, and propulsion systems.',
    state: 'STANDBY',
    tech: ['Coming Soon'],
    link: '#'
  }
]

function Section({ id, index, title, active, onEngage, children }: { id: string; index: string; title: string; active: string; onEngage: (id: string) => void; children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add('visible')
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id={id} 
      className={`section ${active === id ? 'engaged' : ''}`}
      onMouseEnter={() => onEngage(id)}
    >
      <div className="section-heading">
        <span>{index}</span>
        <p>// {title}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function SystemsCard({ code, title, items, status, wide, icon }: { code: string; title: string; items: string[]; status: string; wide?: boolean; icon: React.ReactNode }) {
function SystemsCard({ code, title, items, status, wide, icon, index }: { code: string; title: string; items: string[]; status: string; wide?: boolean; icon: React.ReactNode; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            cardRef.current?.classList.add('visible')
          }, index * 100)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div className={`system-card ${wide ? 'wide' : ''}`}>
    <div ref={cardRef} className={`system-card ${wide ? 'wide' : ''}`}>
      <div className="card-top">
        {icon}
        <span>{code}</span>
        <i />
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

function AircraftBay({ code, title, text, status, tech, onClick }: { code: string; title: string; text: string; status: string; tech: string[]; onClick: () => void }) {
function AircraftBay({ code, title, text, status, tech, onClick, index }: { code: string; title: string; text: string; status: string; tech: string[]; onClick: () => void; index: number }) {
  const bayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            bayRef.current?.classList.add('visible')
          }, index * 150)
        }
      },
      { threshold: 0.1 }
    )

    if (bayRef.current) {
      observer.observe(bayRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div className="aircraft-bay" onClick={onClick}>
    <div ref={bayRef} className="aircraft-bay" onClick={onClick}>
      <div className="project-code">
        <span>{code}</span>
        <span>{status}</span>
      </div>
      <div className="project-window">
        <i /><i /><i />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="project-tech">
        {tech.map((t) => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>
      <div className="hover-indicator">
        <span>CLICK TO VIEW</span>
        <ExternalLink size={16} />
      </div>
    </div>
  )
}

export function AeronauticalInterface() {
  const radarRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState('about')
  const [showTop, setShowTop] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [modalProject, setModalProject] = useState<typeof projects[0] | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [altitude, setAltitude] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const engage = useCallback((id: string) => setActive(id), [])

  // Custom cursor trail effect
  // Custom cursor effect
  useEffect(() => {
    const cursorDot = document.createElement('div')
    cursorDot.className = 'cursor-dot'
    document.body.appendChild(cursorDot)

    const cursorRing = document.createElement('div')
    cursorRing.className = 'cursor-ring'
    document.body.appendChild(cursorRing)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      cursorDot.style.left = `${e.clientX}px`
      cursorDot.style.top = `${e.clientY}px`
      
      cursorRing.style.left = `${e.clientX}px`
      cursorRing.style.top = `${e.clientY}px`
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        cursorDot.classList.add('active')
        cursorRing.classList.add('active')
        setIsHovering(true)
      } else {
        cursorDot.classList.remove('active')
        cursorRing.classList.remove('active')
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.removeChild(cursorDot)
      document.body.removeChild(cursorRing)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  // Particle trail effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      size: number
    }> = []

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      for (let i = 0; i < 3; i++) {
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          life: 1,
          size: Math.random() * 3 + 1
          size: Math.random() * 2 + 1
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02
        p.size *= 0.98
        p.life -= 0.03
        p.size *= 0.97

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 200, ${p.life * 0.6})`
        ctx.fillStyle = `rgba(0, 212, 255, ${p.life * 0.4})`
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Radar observer effect
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
      { x: window.innerWidth * 0.52, y: window.innerHeight * 0.1 },
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
      window.setTimeout(() => radarRef.current?.classList.remove('relocating'), 320)
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
      window.clearTimeout(idleTimer)
      aim(event.clientX, event.clientY)
      if (event.pointerType === 'touch') idleTimer = window.setTimeout(idleScan, 1800)
    }

    const handleScroll = () => {
      setShowTop(window.scrollY > 520)
      setAltitude(Math.floor(window.scrollY / 10))
      setSpeed(Math.min(100, Math.floor(window.scrollY / 50)))
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
      window.clearTimeout(idleTimer)
    }
  }, [])

  const handleProjectClick = (project: typeof projects[0]) => {
    if (project.link && project.link !== '#') {
      window.open(project.link, '_blank', 'noopener,noreferrer')
    } else {
      setModalProject(project)
    }
  }

  return (
    <div className="aero-shell" data-active={active}>
      <canvas ref={canvasRef} className="cursor-canvas" aria-hidden="true" />

      {/* Animated background with flight path */}
      <div className="sky-backdrop" aria-hidden="true">
        <div className="altitude-lines" />
        <div className="cloud-layer cloud-one" />
        <div className="cloud-layer cloud-two" />
        <div className="star-field" />
        <div className="flight-path">
          <svg viewBox="0 0 1200 800" preserveAspectRatio="none">
            <path className="flight-trail" d="M0,400 C200,350 400,450 600,400 S1000,350 1200,400" />
            <circle className="waypoint" cx="200" cy="375" r="4" />
            <circle className="waypoint" cx="600" cy="400" r="4" />
            <circle className="waypoint" cx="1000" cy="375" r="4" />
          </svg>
        </div>
        <div className="instrument-panel">
          <div className="gauge altitude-gauge">
            <Gauge size={48} />
            <span className="gauge-value">{altitude}</span>
            <span className="gauge-label">ALTITUDE</span>
          </div>
          <div className="gauge speed-gauge">
            <Wind size={48} />
            <span className="gauge-value">{speed * 10}</span>
            <span className="gauge-label">SPEED</span>
          </div>
        </div>
      </div>

      {/* Radar Observer - Aviation themed */}
      <div className="radar-observer" ref={radarRef} aria-hidden="true">
        <div className="radar-dish">
          <div className="radar-screen">
            <div className="radar-sweep" />
            <div className="radar-blip" />
            <div className="radar-grid" />
          </div>
        </div>
        <div className="radar-base" />
        <div className="radar-antenna" />
        <span className="radar-tag">RADAR // ACTIVE</span>
      </div>

      <header className="cockpit-header">
        <nav className="navigation-panel" aria-label="Primary navigation">
          <a className="pilot-badge" href="#top" aria-label="Jude Dominic Yap, home">
            <div className="badge-emblem">
              <Plane size={20} />
            </div>
            <div className="badge-info">
              <span>JDY</span>
              <small>PILOT // AERONAUTICAL</small>
            </div>
          </a>
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
          <div className={`nav-instruments ${isMenuOpen ? 'open' : ''}`}>
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? 'active' : ''}
                onClick={() => {
                  engage(item.id)
                  setIsMenuOpen(false)
                }}
              >
                <span className="nav-indicator">{String(index + 1).padStart(2, '0')}</span>
                <span className="nav-label">{item.label}</span>
                {active === item.id && <span className="nav-light" />}
              </a>
            ))}
          </div>
          <div className="flight-status">
            <span className="status-light" />
            <span>SYSTEMS ONLINE</span>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero hangar" aria-labelledby="hero-title">
          <div className="hangar-designator" aria-hidden="true">HANGAR A-17 · FLIGHT READY</div>
          <div className="hero-cockpit">
            <p className="call-sign"><span /> CLEARANCE GRANTED / 2026</p>
            <h1 id="hero-title">JUDE<br /><em>DOMINIC YAP</em></h1>
            <div className="pilot-rank">
              <Rocket size={24} />
              <h2>ASPIRING AERONAUTICAL ENGINEER</h2>
              <Orbit size={24} />
            </div>
            <p className="mission-brief">Grade 12 STEM student with ambitions soaring toward aerospace engineering. Passionate about aerodynamics, propulsion systems, and flight mechanics. Building a foundation in programming and engineering principles to navigate the skies of tomorrow.</p>
            <div className="pre-flight-checklist">
              <a href="#projects" className="thrust-button" onClick={() => engage('projects')}>
                <Rocket size={18} />
                <span>VIEW PROJECT HANGAR</span>
              </a>
              <a href="#contact" className="comm-link" onClick={() => engage('contact')}>
                <span>ESTABLISH COMMUNICATION</span>
              </a>
            </div>
          </div>
          <div className="pilot-profile">
            <div className="profile-frame">
              <div className="frame-corner tl" />
              <div className="frame-corner tr" />
              <div className="frame-corner bl" />
              <div className="frame-corner br" />
              <img src="/profile.jpg" alt="Jude Dominic Yap" />
              <img src="/profile.jpg" alt="Jude Dominic Yap" onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%231a2744" width="400" height="500"/%3E%3Ctext fill="%2300d4ff" font-family="monospace" font-size="20" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EPROFILE IMAGE%3C/text%3E%3C/svg%3E'
              }} />
              <div className="hud-overlay" aria-hidden="true">
                <div className="hud-line horizontal" />
                <div className="hud-line vertical" />
                <div className="hud-circle" />
                <div className="hud-target" />
              </div>
            </div>
            <div className="pilot-data">
              <div className="data-row"><span>PILOT:</span><span>JDY</span></div>
              <div className="data-row"><span>STATUS:</span><span>TRAINING</span></div>
              <div className="data-row"><span>TRAJECTORY:</span><span>AERONAUTICS</span></div>
            </div>
            <div className="jet-stream" aria-hidden="true">
              <div className="stream" />
              <div className="stream" />
              <div className="stream" />
            </div>
          </div>
          <a href="#about" className="descend-indicator" aria-label="Continue to about section">
            <MoveDown size={18} />
            <span>DESCEND TO BRIEFING</span>
          </a>
        </section>

        <Section id="about" index="01" title="PILOT PROFILE" active={active} onEngage={engage}>
          <div className="briefing-grid">
            <p className="lead">I am a Grade 12 STEM student at Las Piñas National Senior High School – Talon Dos Campus, preparing for takeoff into the field of aeronautical engineering.</p>
            <p>My passion lies in understanding the principles of flight, aircraft design, and aerospace technology. Currently building my technical foundation through programming and engineering coursework while preparing for university-level aerospace studies.</p>
            <div className="flight-manual" aria-hidden="true">
              <Plane size={48} />
              <b>ENGINEERING<br />AHEAD</b>
            </div>
          </div>
        </Section>

        <Section id="skills" index="02" title="TECHNICAL SYSTEMS" active={active} onEngage={engage}>
          <div className="systems-array">
            <SystemsCard code="SYS-01" title="Programming Languages" items={['Python']} status="OPERATIONAL" icon={<Code2 size={24} />} />
            <SystemsCard code="SYS-02" title="Engineering Tools" items={['Git', 'GitHub', 'Visual Studio Code']} status="ONLINE" icon={<Gauge size={24} />} />
            <SystemsCard code="SYS-03" title="Core Competencies" items={['Problem Solving', 'Critical Thinking', 'Communication', 'Teamwork', 'Adaptability', 'Time Management']} status="DEVELOPING" wide icon={<Wind size={24} />} />
            <SystemsCard code="SYS-01" title="Programming Languages" items={['Python']} status="OPERATIONAL" icon={<Code2 size={24} />} index={0} />
            <SystemsCard code="SYS-02" title="Engineering Tools" items={['Git', 'GitHub', 'Visual Studio Code']} status="ONLINE" icon={<Gauge size={24} />} index={1} />
            <SystemsCard code="SYS-03" title="Core Competencies" items={['Problem Solving', 'Critical Thinking', 'Communication', 'Teamwork', 'Adaptability', 'Time Management']} status="DEVELOPING" wide icon={<Wind size={24} />} index={2} />
          </div>
        </Section>

        <Section id="projects" index="03" title="PROJECT HANGAR" active={active} onEngage={engage}>
          <div className="hangar-bay">
            {projects.map((project) => (
            {projects.map((project, index) => (
              <AircraftBay
                key={project.code}
                code={project.code}
                title={project.title}
                text={project.description}
                status={project.state}
                tech={project.tech}
                onClick={() => handleProjectClick(project)}
                index={index}
              />
            ))}
          </div>
        </Section>

        <Section id="education" index="04" title="FLIGHT LOG" active={active} onEngage={engage}>
          <div className="flight-log">
            <span className="log-date">2025<br />— PRESENT</span>
            <div className="log-entry">
              <p className="log-type">CURRENT STATION</p>
              <h3>Las Piñas National Senior High School</h3>
              <p>Talon Dos Campus · STEM Strand</p>
            </div>
            <span className="progress-thrust" aria-label="Learning in progress"><i /></span>
          </div>
          <div className="flight-log">
            <span className="log-date">2016<br />— 2025</span>
            <div className="log-entry">
              <p className="log-type">PREVIOUS STATION</p>
              <h3>Las Piñas National High School</h3>
              <p>Almanza</p>
            </div>
            <span className="progress-thrust" aria-label="Learning completed"><i /></span>
          </div>
        </Section>

        <Section id="certificates" index="05" title="CERTIFICATIONS" active={active} onEngage={engage}>
          <div className="certificate-display">
            <div className="certificate-plaque">
              <span className="plaque-date">JULY<br />2025</span>
              <div className="plaque-content">
                <p className="plaque-type">Certificate of Completion</p>
                <h3>Introduction to Modern AI</h3>
                <p>Offered by DICT-ITU DTC Initiative through the Cisco Networking Academy program.</p>
                <div className="plaque-seal">AI</div>
              </div>
            </div>
            <div className="certificate-plaque">
              <span className="plaque-date">AUGUST<br />2026</span>
              <div className="plaque-content">
                <p className="plaque-type">Certificate of Completion</p>
                <h3>Python Essentials 1</h3>
                <p>Offered by Cisco Networking Academy program.</p>
                <div className="plaque-seal">PY</div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="contact" index="06" title="COMMUNICATIONS" active={active} onEngage={engage}>
          <div className="comms-array">
            <div>
              <p className="lead">Communication channels are open.</p>
              <p>Reach out through any available frequency.</p>
            </div>
            <div className="comms-links">
              <a href="https://linkedin.com/in/judedominicyap" target="_blank" rel="noreferrer" className="comm-channel">
                <Linkedin size={18} />
                <Linkedin size={16} />
                <span>LinkedIn</span>
                <ExternalLink size={14} />
              </a>
              <a href="https://github.com/JudeDominicYap" target="_blank" rel="noreferrer" className="comm-channel">
                <Github size={18} />
                <Github size={16} />
                <span>GitHub</span>
                <ExternalLink size={14} />
              </a>
              <a href="mailto:judedominic.yap@gmail.com" className="comm-channel">
                <Mail size={18} />
                <Mail size={16} />
                <span>Email</span>
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="comms-actions">
              <a href="mailto:judedominic.yap@gmail.com?subject=Aerospace Collaboration&body=Hi Jude, I'm interested in..." className="thrust-button">
                <Mail size={18} />
                <span>INITIATE CONTACT</span>
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer>
        <p>© 2026 JUDE DOMINIC YAP // ALL SYSTEMS OPERATIONAL</p>
        <p>DESIGNED WITH AERONAUTICAL PRECISION</p>
      </footer>

      <button
        className={`top-button ${showTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      {modalProject && (
        <div className="modal-overlay" onClick={() => setModalProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalProject(null)}>&times;</button>
            <div className="modal-header">
              <span className="modal-code">{modalProject.code}</span>
              <span className="modal-state">{modalProject.state}</span>
            </div>
            <h3 className="modal-title">{modalProject.title}</h3>
            <p className="modal-description">{modalProject.description}</p>
            <div className="modal-tech">
              {modalProject.tech.map((t) => (
                <span key={t} className="tech-tag-modal">{t}</span>
              ))}
            </div>
            <div className="modal-actions">
              {modalProject.link && modalProject.link !== '#' ? (
                <a href={modalProject.link} target="_blank" rel="noopener noreferrer" className="thrust-button">
                  <ExternalLink size={16} />
                  <span>VIEW PROJECT</span>
                </a>
              ) : (
                <span className="status-message">Project details coming soon...</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
