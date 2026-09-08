import { useEffect, useMemo, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  WORK_FILTERS,
  WORK_ITEMS,
  WORKS_PAGE_SIZE,
  type WorkCategory,
} from '../../data/homeContent'
import './WorksIsotope.css'

export function WorksIsotope() {
  const [filter, setFilter] = useState<WorkCategory>('All')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (filter === 'All') return WORK_ITEMS
    return WORK_ITEMS.filter((item) => item.category === filter)
  }, [filter])

  const pageCount = Math.max(1, Math.ceil(filtered.length / WORKS_PAGE_SIZE))

  useEffect(() => {
    setPage(1)
  }, [filter])

  useEffect(() => {
    if (page > pageCount) setPage(pageCount)
  }, [page, pageCount])

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [filter, page])

  const pageItems = filtered.slice(
    (page - 1) * WORKS_PAGE_SIZE,
    page * WORKS_PAGE_SIZE,
  )

  return (
    <section id="works" className="works section-block" aria-labelledby="works-title">
      <div className="section-inner">
        <p className="eyebrow reveal-item">Works</p>
        <h2 id="works-title" className="section-title reveal-item">
          Filter the archive
        </h2>
        <p className="section-lede reveal-item">
          Isotope-style categories with pagination — no jQuery, layout stays in React.
        </p>

        <div
          className="works-filters reveal-item"
          role="toolbar"
          aria-label="Filter works by category"
        >
          {WORK_FILTERS.map((cat) => {
            const active = filter === cat
            return (
              <button
                key={cat}
                type="button"
                className={active ? 'filter-chip is-active' : 'filter-chip'}
                aria-pressed={active}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {pageItems.length === 0 ? (
          <p className="works-empty reveal-item" role="status">
            No matches in this category.
          </p>
        ) : (
          <ul className="works-grid reveal-item">
            {pageItems.map((item) => (
              <li key={item.id} className="works-card">
                <div className="works-card-meta">
                  <span>{item.category}</span>
                  <span>{item.year}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </li>
            ))}
          </ul>
        )}

        <nav className="works-pagination reveal-item" aria-label="Works pages">
          <button
            type="button"
            className="page-btn"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <p className="page-status" aria-live="polite">
            Page {page} of {pageCount}
          </p>
          <button
            type="button"
            className="page-btn"
            disabled={page >= pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          >
            Next
          </button>
        </nav>
      </div>
    </section>
  )
}
