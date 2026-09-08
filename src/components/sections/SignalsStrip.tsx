import { SIGNAL_QUOTES } from '../../data/homeContent'
import './SignalsStrip.css'

export function SignalsStrip() {
  return (
    <section
      id="signals"
      className="signals section-block"
      aria-labelledby="signals-title"
    >
      <div className="section-inner">
        <p className="eyebrow reveal-item">Signals</p>
        <h2 id="signals-title" className="section-title reveal-item">
          Voices from the work
        </h2>
        <ul className="signals-list">
          {SIGNAL_QUOTES.map((item) => (
            <li key={item.id} className="signal-card reveal-item">
              <blockquote>
                <p>“{item.quote}”</p>
                <footer>
                  <cite>{item.name}</cite>
                  <span>{item.role}</span>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
