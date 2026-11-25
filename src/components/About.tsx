import { useInView } from '../hooks/useInView'
import './About.css'

const photos = [
  { file: 'facade.webp', alt: 'Фасад клиники «Целитель»', caption: 'Фасад клиники', w: 1280, h: 960 },
  { file: 'reception.webp', alt: 'Ресепшен клиники', caption: 'Ресепшен', w: 1280, h: 853 },
  { file: 'treatment-room-gold.webp', alt: 'Кабинет клиники', caption: 'Кабинет', w: 1280, h: 960 },
  { file: 'treatment-room-white.webp', alt: 'Кабинет клиники', caption: 'Кабинет', w: 960, h: 1280 },
  { file: 'waiting-room.webp', alt: 'Зона ожидания клиники', caption: 'Зона ожидания', w: 1280, h: 960 },
]

export default function About() {
  const [ref, visible] = useInView<HTMLDivElement>()

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="container">
        <header className="about__head">
          <div>
            <span className="about__kicker">О клинике</span>
            <h2 id="about-title" className="about__title">
              Клиника <em>изнутри</em>
            </h2>
          </div>
          <p className="about__lead">
            Фотографии клиники «Целитель» в Краснодаре: вход, ресепшен,
            кабинеты и зона ожидания.
          </p>
        </header>

        <div ref={ref} className={`about__grid${visible ? ' is-visible' : ''}`}>
          {photos.map((p, i) => (
            <figure key={p.file} className="about__item" style={{ ['--i' as string]: i }}>
              <img
                src={`/images/clinic/${p.file}`}
                alt={p.alt}
                width={p.w}
                height={p.h}
                loading="lazy"
              />
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}