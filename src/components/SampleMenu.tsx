import { useEffect, useState } from 'react'
import './SampleMenu.css'

const MENU_ITEMS = [
  { label: 'Studio', href: '#studio' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Works', href: '#works' },
  { label: 'Signals', href: '#signals' },
  { label: 'Craft', href: '#craft' },
  { label: 'Contact', href: '#close' },
] as const

export function SampleMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('sample-menu-open', open)
    return () => document.body.classList.remove('sample-menu-open')
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className="sample-menu">
      <div className="sample-menu-inner">
        <a className="sample-menu-brand" href="#" onClick={closeMenu}>
          VELORA
        </a>

        <button
          type="button"
          className="sample-menu-toggle"
          aria-expanded={open}
          aria-controls="sample-menu-panel"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="sample-menu-toggle-bar" aria-hidden="true" />
          <span className="sample-menu-toggle-bar" aria-hidden="true" />
          <span className="sample-menu-toggle-bar" aria-hidden="true" />
        </button>

        <nav
          id="sample-menu-panel"
          className={open ? 'sample-menu-nav is-open' : 'sample-menu-nav'}
          aria-label="Sample menu"
        >
          <ul className="sample-menu-list">
            {MENU_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <a className="sample-menu-link" href={href} onClick={closeMenu}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
