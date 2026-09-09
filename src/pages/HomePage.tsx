import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SampleMenu } from '../components/SampleMenu'
import { HeroScene } from '../components/hero/HeroScene'
import { HeroOverlay } from '../components/hero/HeroOverlay'
import { ShowcaseCarousel } from '../components/sections/ShowcaseCarousel'
import { WorksIsotope } from '../components/sections/WorksIsotope'
import { SignalsStrip } from '../components/sections/SignalsStrip'
import { CloseCta } from '../components/sections/CloseCta'
import './HomePage.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

export function HomePage() {
  const reducedMotion = usePrefersReducedMotion()
  const pageRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reducedMotion || !pageRef.current) return

      const ctx = gsap.context(() => {
        const batches = [
          { trigger: '#studio', sel: '.studio-panel' },
          { trigger: '#showcase', sel: '#showcase .reveal-item' },
          { trigger: '#works', sel: '#works .reveal-item' },
          { trigger: '#signals', sel: '#signals .reveal-item' },
          { trigger: '#craft', sel: '.craft-line' },
          { trigger: '#close', sel: '#close .reveal-item' },
        ]

        batches.forEach(({ trigger, sel }) => {
          gsap.from(sel, {
            scrollTrigger: {
              trigger,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
            y: 48,
            opacity: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power2.out',
          })
        })
      }, pageRef)

      return () => ctx.revert()
    },
    { dependencies: [reducedMotion], scope: pageRef },
  )

  return (
    <main className="home" ref={pageRef}>
      <SampleMenu />
      <section className="hero" aria-label="Velora home">
        <div className="hero-stage">
          <HeroScene reducedMotion={reducedMotion} />
          <div className="hero-haze" aria-hidden="true" />
          <HeroOverlay reducedMotion={reducedMotion} />
        </div>
      </section>

      <section id="studio" className="studio section-block" aria-labelledby="studio-title">
        <div className="section-inner studio-inner">
          <p className="eyebrow studio-panel">The studio</p>
          <h2 id="studio-title" className="section-title studio-panel">
            Depth, timing, and restraint
          </h2>
          <p className="section-lede studio-panel">
            WebGL carries the atmosphere. GSAP shapes the narrative. Together they
            keep the first viewport to one job: brand, one line, one promise, one
            path forward.
          </p>
          <ul className="studio-list">
            <li className="studio-panel">
              <strong>Three.js</strong>
              <span>Living geometry and light</span>
            </li>
            <li className="studio-panel">
              <strong>GSAP</strong>
              <span>Intro + scroll choreography</span>
            </li>
            <li className="studio-panel">
              <strong>React 19</strong>
              <span>Clean composition, safe cleanup</span>
            </li>
          </ul>
        </div>
      </section>

      <ShowcaseCarousel reducedMotion={reducedMotion} />
      <WorksIsotope />
      <SignalsStrip />

      <section id="craft" className="craft section-block" aria-labelledby="craft-title">
        <div className="section-inner craft-inner">
          <h2 id="craft-title" className="craft-line section-title">
            Built to feel deliberate
          </h2>
          <p className="craft-line section-lede">
            Reduced-motion prefers stillness. WebGL failure falls back to atmosphere
            alone. New chapters below — reel, archive, signals — never crowd the hero.
          </p>
        </div>
      </section>

      <CloseCta />
    </main>
  )
}
