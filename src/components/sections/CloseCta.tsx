import './CloseCta.css'

export function CloseCta() {
  return (
    <section id="close" className="close section-block" aria-labelledby="close-title">
      <div className="section-inner close-inner">
        <p className="eyebrow reveal-item">Next</p>
        <h2 id="close-title" className="section-title reveal-item">
          Bring the next chapter
        </h2>
        <p className="section-lede reveal-item">
          Tell us the brand, the constraint, and the feeling. We will answer with
          light, timing, and restraint.
        </p>
        <div className="close-actions reveal-item">
          <a className="btn btn-primary" href="mailto:hello@velora.studio">
            Start a project
          </a>
          <a className="btn btn-ghost" href="#showcase">
            Back to reel
          </a>
        </div>
      </div>
    </section>
  )
}
