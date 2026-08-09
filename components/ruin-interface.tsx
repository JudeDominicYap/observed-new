'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUp, Code2, Link, Mail, MoveDown } from 'lucide-react'

const navItems = ['about', 'skills', 'projects', 'education', 'certificates', 'contact']

export function RuinInterface() {
  const eyeRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('about')
  const [showTop, setShowTop] = useState(false)

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
      if (!eyeRef.current) return
      const options = perches()
        .map((perch, index) => ({ ...perch, index, distance: Math.hypot(perch.x - avoidX, perch.y - avoidY) }))
        .filter((perch) => perch.index !== currentPerch && perch.distance > 180)
      const next = options[Math.floor(Math.random() * options.length)] ?? perches()[0]
      currentPerch = next.index ?? 0
      eyeRef.current.classList.add('relocating')
      eyeRef.current.style.setProperty('--observer-x', `${Math.round(next.x)}px`)
      eyeRef.current.style.setProperty('--observer-y', `${Math.round(next.y)}px`)
      window.setTimeout(() => eyeRef.current?.classList.remove('relocating'), 320)
    }

    const aim = (clientX: number, clientY: number) => {
      if (reduced || !eyeRef.current) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = eyeRef.current?.getBoundingClientRect()
        if (!rect || !eyeRef.current) return
        const dx = clientX - (rect.left + rect.width / 2)
        const dy = clientY - (rect.top + rect.height / 2)
        const distance = Math.max(1, Math.hypot(dx, dy))
        if (distance < 105 && Date.now() - lastRelocation > 700) {
          lastRelocation = Date.now()
          relocate(clientX, clientY)
          return
        }
        eyeRef.current.style.setProperty('--eye-x', `${(dx / distance) * 5}px`)
        eyeRef.current.style.setProperty('--eye-y', `${(dy / distance) * 4}px`)
        eyeRef.current.style.setProperty('--eye-angle', `${Math.atan2(dy, dx) * (180 / Math.PI)}deg`)
      })
    }

    const idleScan = () => {
      if (reduced || !eyeRef.current) return
      const time = Date.now() / 1300
      eyeRef.current.style.setProperty('--eye-x', `${Math.sin(time) * 6}px`)
      eyeRef.current.style.setProperty('--eye-y', `${Math.cos(time * 0.7) * 3}px`)
      idleFrame = requestAnimationFrame(idleScan)
    }

    const handlePointer = (event: PointerEvent) => {
      cancelAnimationFrame(idleFrame)
      window.clearTimeout(idleTimer)
      aim(event.clientX, event.clientY)
      if (event.pointerType === 'touch') idleTimer = window.setTimeout(idleScan, 1800)
    }

    const handleScroll = () => setShowTop(window.scrollY > 520)
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

  const engage = (id: string) => setActive(id)

  return (
    <div className="ruin-shell" data-active={active}>
      <div className="world-backdrop" aria-hidden="true">
        <div className="distant-towers" />
        <div className="pixel-fog fog-one" />
        <div className="pixel-fog fog-two" />
        <div className="spore-field" />
        <div className="utility-spine"><i /><i /><i /><i /><i /><i /></div>
      </div>

      <div className="mechanical-observer" ref={eyeRef} aria-hidden="true">
        <div className="observer-cable" />
        <div className="observer-bracket" />
        <div className="observer-body">
          <span className="observer-rivet rivet-one" />
          <span className="observer-rivet rivet-two" />
          <div className="observer-lid">
            <div className="observer-eye"><span className="observer-pupil" /></div>
          </div>
          <span className="observer-signal" />
        </div>
        <div className="observer-vine" />
        <span className="observer-tag">IX·O3 / AWAKE</span>
      </div>

      <header className="site-header">
        <nav className="navbar" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Jude Dominic Yap, home">
            <span className="brand-glyph">⌁</span><span>JDY</span><small>ARCHIVE // 12</small>
          </a>
          <div className="nav-links">
            {navItems.map((item, index) => (
              <a key={item} href={`#${item}`} className={active === item ? 'active' : ''} onClick={() => engage(item)}>
                <span>{String(index + 1).padStart(2, '0')}</span>{item}
              </a>
            ))}
          </div>
          <span className="system-status"><i /> ECOSYSTEM ACTIVE</span>
        </nav>
      </header>

      <main id="top">
        <section className="hero chamber" aria-labelledby="hero-title">
          <div className="chamber-code" aria-hidden="true">SECTOR Λ-17 · SIGNAL RESTORED</div>
          <div className="hero-copy">
            <p className="eyebrow"><span /> FOUND TRANSMISSION / 2026</p>
            <h1 id="hero-title">JUDE<br /><em>DOMINIC YAP</em></h1>
            <h2>Aspiring Engineer</h2>
            <p className="hero-description">Grade 12 STEM student passionate about engineering, Python programming, and technology. I enjoy solving problems, learning new skills, and building projects that challenge me to grow.</p>
            <div className="hero-actions">
              <a href="#projects" className="industrial-button" onClick={() => engage('projects')}>Open project archive <span>→</span></a>
              <a href="#contact" className="text-link" onClick={() => engage('contact')}>Establish contact</a>
            </div>
          </div>
          <div className="portrait-bay">
            <div className="portrait-frame">
              <img src="/profile.jpg" alt="Jude Dominic Yap" />
              <div className="portrait-scan" aria-hidden="true" />
              <span className="corner c1" /><span className="corner c2" /><span className="corner c3" /><span className="corner c4" />
            </div>
            <div className="bio-readout"><span>SUBJECT: JDY</span><span>STATUS: LEARNING</span><span>PATH: ENGINEERING</span></div>
            <div className="hanging-vine" aria-hidden="true"><i /><i /><i /><i /></div>
          </div>
          <a href="#about" className="descent" aria-label="Continue to about section"><MoveDown size={18} /> DESCEND INTO ARCHIVE</a>
        </section>

        <Section id="about" index="I" title="Recovered Profile" active={active} onEngage={engage}>
          <div className="story-grid">
            <p className="lead">I am a Grade 12 STEM student at Las Piñas National Senior High School – Talon Dos Campus.</p>
            <p>My interests include engineering, programming, and emerging technologies. I&apos;m currently strengthening my technical foundation while preparing for an engineering degree.</p>
            <div className="artifact" aria-hidden="true"><span>⌁⌁</span><i /><b>KNOWLEDGE<br />PERSISTS</b></div>
          </div>
        </Section>

        <Section id="skills" index="II" title="Operational Systems" active={active} onEngage={engage}>
          <div className="systems-grid">
            <ArchiveCard code="SYS / 01" title="Programming" items={['Python']} signal="STABLE" />
            <ArchiveCard code="SYS / 02" title="Tools" items={['Git', 'GitHub', 'Visual Studio Code']} signal="ONLINE" />
            <ArchiveCard code="SYS / 03" title="Human Protocols" items={['Problem Solving', 'Critical Thinking', 'Communication', 'Teamwork', 'Adaptability', 'Time Management']} signal="GROWING" wide />
          </div>
        </Section>

        <Section id="projects" index="III" title="Created Projects" active={active} onEngage={engage}>
          <div className="project-grid">
            <Project code="A-001" title="Facial Recognition System" text="A Facial Recognition System built using Python and OpenCV." state="CREATING" />
            <Project code="A-002" title="Developer Mini Projects" text="A growing collection of creative mini projects demonstrating programming fundamentals." state="PROGRESSING" />
            <Project code="A-003" title="Future Engineering Projects" text="This chamber will house future engineering and technology projects." state="AWAITING" />
          </div>
        </Section>

        <Section id="education" index="IV" title="Learning Chronicle" active={active} onEngage={engage}>
          <div className="chronicle">
            <span className="chronicle-year">2025<br />— NOW</span>
            <div><p className="micro-label">ACTIVE INSTITUTION</p><h3>Las Piñas National Senior High School</h3><p>Talon Dos Campus · STEM Strand</p></div>
            <span className="growth-meter" aria-label="Learning in progress"><i /></span>
          </div>
          <div className="chronicle">
            <span className="chronicle-year">2016<br />— 2025</span>
            <div><p className="micro-label">PREVIOUS INSTITUTION</p><h3>Las Piñas National High School</h3><p>Almanza</p></div>
            <span className="growth-meter" aria-label="Learning in progress"><i /></span>
          </div>
        </Section>

        <Section id="certificates" index="V" title="Sealed Records" active={active} onEngage={engage}>
          <div className="sealed-record">
            <div className="seal" aria-hidden="true">◇<span>⌁</span></div>
            <div><p className="micro-label">ARCHIVE CHAMBER LOCKED</p><h3>New records are taking root.</h3><p>Certificates and milestones will surface here as they are recovered.</p></div>
          </div>
        </Section>
        
        <Section id="certificates" index="V" title="Unsealed Records" active={active} onEngage={engage}>
           <div><p className="micro-label">New Records Have Taken Root</p></div>
          <div className="sealed-record">
            <span className="seal">July<br />2025</span>
            <div><p className="micro-label">Certificate of Completion</p><h3>Introduction to Modern AI</h3><p>offered by DICT-ITU DTC Initiative
through the Cisco Networking Academy program.</p></div>
          </div>
          <div className="sealed-record">
            <span className="seal">August<br />2026</span>
            <div><p className="micro-label">Certificate of Completion</p><h3>Python Essentials 1</h3><p>offered by Networking Academy
through the Cisco Networking Academy program.</p></div>
          </div>
        </Section>

        <Section id="contact" index="VI" title="Open Transmission" active={active} onEngage={engage}>
          <div className="contact-grid">
            <div><p className="lead">The old network still listens.</p><p>Send a signal through any surviving channel.</p></div>
            <div className="contact-links">
              <a href="https://linkedin.com/in/judedominicyap" target="_blank" rel="noreferrer"><Link size={18} /> LinkedIn <span>↗</span></a>
              <a href="https://github.com/JudeDominicYap" target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub <span>↗</span></a>
              <a href="mailto:judedominic.yap@gmail.com"><Mail size={18} /> Email <span>↗</span></a>
            </div>
          </div>
        </Section>
      </main>

      <footer><span>JDY // ARCHIVE END ♡</span><p>© 2026 Jude Dominic Yap. All Rights Reserved.</p><span>THE GARDEN REMEMBERS</span></footer>
      <button className={`top-button ${showTop ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUp size={18} /></button>
    </div>
  )
}

function Section({ id, index, title, active, onEngage, children }: { id: string; index: string; title: string; active: string; onEngage: (id: string) => void; children: React.ReactNode }) {
  return (
    <section id={id} className={`section chamber ${active === id ? 'engaged' : ''}`} onMouseEnter={() => onEngage(id)} onFocusCapture={() => onEngage(id)} aria-labelledby={`${id}-title`}>
      <div className="section-node" aria-hidden="true"><i /></div>
      <header className="section-heading"><span>{index}</span><div><p>CHAMBER {index} / RECOVERED</p><h2 id={`${id}-title`}>{title}</h2></div><b>⌁⌁⌁</b></header>
      {children}
    </section>
  )
}

function ArchiveCard({ code, title, items, signal, wide = false }: { code: string; title: string; items: string[]; signal: string; wide?: boolean }) {
  return <article className={`archive-card ${wide ? 'wide' : ''}`}><div className="card-top"><span>{code}</span><i />{signal}</div><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul><div className="card-moss" aria-hidden="true" /></article>
}

function Project({ code, title, text, state }: { code: string; title: string; text: string; state: string }) {
  return <article className="project-card"><div className="project-code">{code}<span>{state}</span></div><div className="project-window" aria-hidden="true"><i /><i /><i /><b /></div><h3>{title}</h3><p>{text}</p><span className="root-line" aria-hidden="true" /></article>
}
