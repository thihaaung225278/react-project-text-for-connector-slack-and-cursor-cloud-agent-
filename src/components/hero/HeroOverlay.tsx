import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

type HeroOverlayProps = {
  reducedMotion: boolean
}

export function HeroOverlay({ reducedMotion }: HeroOverlayProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!rootRef.current) return

      if (reducedMotion) {
        gsap.set(['.hero-brand', '.hero-headline', '.hero-lede', '.hero-actions a'], {
          opacity: 1,
          y: 0,
        })
        return
      }

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .from('.hero-brand', { y: 28, opacity: 0, duration: 0.7 })
        .from('.hero-headline', { y: 48, opacity: 0, duration: 0.9 }, '-=0.35')
        .from('.hero-lede', { y: 28, opacity: 0, duration: 0.7 }, '-=0.45')
        .from(
          '.hero-actions a',
          { y: 20, opacity: 0, duration: 0.55, stagger: 0.12 },
          '-=0.35',
        )

      gsap.to('.hero-orb-hint', {
        opacity: 0.35,
        duration: 1.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
    },
    { dependencies: [reducedMotion], scope: rootRef },
  )

  return (
    <div className="hero-overlay" ref={rootRef}>
      <p className="hero-brand">VELORA</p>
      <h1 className="hero-headline">
        Motion that
        <span> feels alive</span>
      </h1>
      <p className="hero-lede">
        A cinematic home built with React, Three.js, and GSAP — light, depth, and
        timing in one composition.
      </p>
      <div className="hero-actions">
        <a className="btn btn-primary" href="#studio">
          Enter studio
        </a>
        <a className="btn btn-ghost" href="#craft">
          See the craft
        </a>
      </div>
      <p className="hero-orb-hint" aria-hidden="true">
        scroll
      </p>
    </div>
  )
}
