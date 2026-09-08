import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Keyboard, Autoplay } from 'swiper/modules'
import { SHOWCASE_SLIDES } from '../../data/homeContent'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './ShowcaseCarousel.css'

type ShowcaseCarouselProps = {
  reducedMotion: boolean
}

export function ShowcaseCarousel({ reducedMotion }: ShowcaseCarouselProps) {
  return (
    <section
      id="showcase"
      className="showcase section-block"
      aria-labelledby="showcase-title"
    >
      <div className="section-inner">
        <p className="eyebrow reveal-item">Showcase</p>
        <h2 id="showcase-title" className="section-title reveal-item">
          Selected sequences
        </h2>
        <p className="section-lede reveal-item">
          A photo reel that advances every two seconds — pause on hover, or use
          arrows and keyboard.
        </p>

        <div className="showcase-frame reveal-item">
          <Swiper
            modules={[Navigation, Pagination, A11y, Keyboard, Autoplay]}
            slidesPerView={1.08}
            spaceBetween={18}
            centeredSlides
            loop={!reducedMotion}
            speed={reducedMotion ? 0 : 650}
            autoplay={
              reducedMotion
                ? false
                : {
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
            }
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            breakpoints={{
              720: { slidesPerView: 1.35, spaceBetween: 22 },
              1100: { slidesPerView: 1.55, spaceBetween: 28 },
            }}
            className="showcase-swiper"
          >
            {SHOWCASE_SLIDES.map((slide) => (
              <SwiperSlide key={slide.id}>
                <article className="showcase-slide">
                  <img
                    className="showcase-photo"
                    src={slide.image}
                    alt={slide.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="showcase-copy">
                    <p className="showcase-kicker">{slide.kicker}</p>
                    <h3>{slide.title}</h3>
                    <p>{slide.blurb}</p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
