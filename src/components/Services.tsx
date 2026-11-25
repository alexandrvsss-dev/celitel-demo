import { useEffect, useRef, useState } from 'react'
import './Services.css'

/* ==========================================================
   Данные направлений
   Описания и списки процедур взяты из брифа и намеренно
   нейтральны: без цен, сроков, гарантий и обещаний результата.
   TODO: тексты и перечень процедур согласовать с клиникой.
   TODO: ссылки ведут на маршруты из брифа; пока в проекте нет
   роутера, переход просто перезагрузит главную страницу.
   ========================================================== */

type ServiceId =
  | 'therapy'
  | 'implant'
  | 'prosthetics'
  | 'orthodontics'
  | 'hygiene'
  | 'kids'

type Service = {
  id: ServiceId
  title: string
  description: string
  tags: string[]
  href: string
}

const services: Service[] = [
  {
    id: 'therapy',
    title: 'Лечение зубов',
    description:
      'Осмотр, консультация и лечение кариеса, пульпита и периодонтита, а также восстановление формы зуба.',
    tags: ['Кариес', 'Пульпит', 'Периодонтит', 'Реставрация'],
    href: '/services/therapy',
  },
  {
    id: 'implant',
    title: 'Имплантация',
    description:
      'Установка зубных имплантов и костная пластика. Подходящий вариант обсуждается после осмотра врачом.',
    tags: ['Имплантация', 'Костная пластика'],
    href: '/services/surgery-implantation',
  },
  {
    id: 'prosthetics',
    title: 'Протезирование',
    description:
      'Коронки, виниры и люминиры для восстановления внешнего вида и функции зубов.',
    tags: ['Коронки', 'Виниры', 'Люминиры'],
    href: '/services/orthopedics',
  },
  {
    id: 'orthodontics',
    title: 'Исправление прикуса',
    description:
      'Брекет-системы для выравнивания зубов и коррекции прикуса. Решение о методе принимает врач.',
    tags: ['Брекет-системы', 'Консультация ортодонта'],
    href: '/services/orthodontics',
  },
  {
    id: 'hygiene',
    title: 'Профессиональная гигиена',
    description:
      'Комплексная чистка, удаление зубного камня, Air-Flow и отбеливание.',
    tags: ['Air-Flow', 'Удаление камня', 'Отбеливание'],
    href: '/services/hygiene-whitening',
  },
  {
    id: 'kids',
    title: 'Детская стоматология',
    description:
      'Профилактика, лечение и удаление молочных зубов для маленьких пациентов.',
    tags: ['Фторирование', 'Герметизация', 'Молочные зубы'],
    href: '/services/childrens-dentistry',
  },
]

/* ==========================================================
   Появление блока при прокрутке
   ========================================================== */

function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, visible] as const
}
/* ==========================================================
   Иллюстрации (честные SVG-заглушки, а не фото клиники)
   ========================================================== */

const TOOTH_PATH =
  'M7.5 3C5.2 3 3.5 4.9 3.5 7.4c0 2 .7 3.3 1.2 5.1.6 2.1.5 4.5 1.3 6.6.4 1.1 1.2 1.9 2.1 1.9 1.6 0 1.5-3.2 2.2-4.6.3-.6.7-.9 1.2-.9s.9.3 1.2.9c.7 1.4.6 4.6 2.2 4.6.9 0 1.7-.8 2.1-1.9.8-2.1.7-4.5 1.3-6.6.5-1.8 1.2-3.1 1.2-5.1C20.5 4.9 18.8 3 16.5 3c-1.7 0-2.6.9-4.5.9S9.2 3 7.5 3z'

const palettes: Record<ServiceId, [string, string]> = {
  therapy: ['#0b2545', '#1b4a73'],
  implant: ['#0f3a5c', '#0f8f98'],
  prosthetics: ['#10335a', '#2a6f8f'],
  orthodontics: ['#0b2545', '#2a5d8f'],
  hygiene: ['#0f6f7a', '#19a7a8'],
  kids: ['#1b5f8a', '#4fb9b6'],
}

const illustrationLabels: Record<ServiceId, string> = {
  therapy: 'Иллюстрация: зуб',
  implant: 'Иллюстрация: зубной имплант',
  prosthetics: 'Иллюстрация: накладка на зуб',
  orthodontics: 'Иллюстрация: брекет-система',
  hygiene: 'Иллюстрация: чистка зубов',
  kids: 'Иллюстрация: улыбающийся зуб',
}

function Glyph({ id }: { id: ServiceId }) {
  const toothFill = `url(#${id}-tooth)`

  switch (id) {
    case 'therapy':
      return (
        <g>
          <path
            d={TOOTH_PATH}
            transform="translate(156 66) scale(7)"
            fill={toothFill}
            stroke="#ffffff"
            strokeWidth="0.3"
            strokeLinejoin="round"
          />
          <circle cx="330" cy="96" r="22" fill="none" stroke="#7fd3d0" strokeWidth="3" />
          <path
            d="M321 96l7 7 13-14"
            fill="none"
            stroke="#7fd3d0"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )

    case 'implant':
      return (
        <g>
          <rect x="190" y="52" width="100" height="70" rx="32" fill={toothFill} />
          <rect x="224" y="122" width="32" height="14" rx="3" fill="#7fd3d0" />
          <path d="M221 136h38l-7 88q-12 10-24 0z" fill="#d9f1f0" />
          <g stroke="#0f8f98" strokeWidth="3" strokeLinecap="round">
            <line x1="222" y1="152" x2="258" y2="152" />
            <line x1="223" y1="168" x2="257" y2="168" />
            <line x1="224" y1="184" x2="256" y2="184" />
            <line x1="225" y1="200" x2="255" y2="200" />
            <line x1="227" y1="214" x2="253" y2="214" />
          </g>
        </g>
      )

    case 'prosthetics':
      return (
        <g>
          <path
            d={TOOTH_PATH}
            transform="translate(186 56) scale(7)"
            fill="#7fd3d0"
            opacity="0.45"
          />
          <path
            d={TOOTH_PATH}
            transform="translate(146 76) scale(7)"
            fill={toothFill}
            stroke="#ffffff"
            strokeWidth="0.3"
            strokeLinejoin="round"
          />
        </g>
      )

    case 'orthodontics': {
      const offsets = [20, 7, 0, 7, 20]
      return (
        <g>
          {offsets.map((dy, i) => (
            <rect
              key={i}
              x={104 + i * 52}
              y={96 + dy}
              width="44"
              height="72"
              rx="18"
              fill={toothFill}
            />
          ))}
          <path
            d={offsets
              .map((dy, i) => `${i === 0 ? 'M' : 'L'}${126 + i * 52} ${130 + dy}`)
              .join(' ')}
            fill="none"
            stroke="#7fd3d0"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {offsets.map((dy, i) => (
            <rect
              key={`b${i}`}
              x={116 + i * 52}
              y={120 + dy}
              width="20"
              height="20"
              rx="5"
              fill="#0f8f98"
              stroke="#ffffff"
              strokeWidth="2"
            />
          ))}
        </g>
      )
    }

    case 'hygiene':
      return (
        <g>
          <path
            d={TOOTH_PATH}
            transform="translate(156 66) scale(7)"
            fill={toothFill}
            stroke="#ffffff"
            strokeWidth="0.3"
            strokeLinejoin="round"
          />
          <g fill="#ffffff">
            <path d="M336 70l6 16 16 6-16 6-6 16-6-16-16-6 16-6z" />
            <path d="M120 112l4 11 11 4-11 4-4 11-4-11-11-4 11-4z" opacity="0.75" />
          </g>
          <g fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2.5">
            <circle cx="350" cy="168" r="9" />
            <circle cx="372" cy="196" r="5" />
            <circle cx="112" cy="196" r="7" />
          </g>
        </g>
      )

    case 'kids':
      return (
        <g>
          <path
            d={TOOTH_PATH}
            transform="translate(156 66) scale(7)"
            fill={toothFill}
            stroke="#ffffff"
            strokeWidth="0.3"
            strokeLinejoin="round"
          />
          <circle cx="219" cy="130" r="5" fill="#0b2545" />
          <circle cx="261" cy="130" r="5" fill="#0b2545" />
          <path
            d="M226 150q14 14 28 0"
            fill="none"
            stroke="#0b2545"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M352 80l7 16 17 2-13 11 4 17-15-9-15 9 4-17-13-11 17-2z"
            fill="#ffffff"
            opacity="0.9"
          />
        </g>
      )
  }
}

function ServiceArt({ id }: { id: ServiceId }) {
  const [from, to] = palettes[id]

  return (
    <svg
      className="service-card__art"
      viewBox="0 0 480 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={illustrationLabels[id]}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <linearGradient id={`${id}-tooth`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d9f1f0" />
        </linearGradient>
      </defs>

      <rect width="480" height="300" fill={`url(#${id}-bg)`} />
      <circle cx="400" cy="30" r="150" fill="#7fd3d0" opacity="0.14" />
      <circle cx="60" cy="290" r="120" fill="#ffffff" opacity="0.06" />
      <g fill="none" stroke="#7fd3d0" strokeOpacity="0.3" strokeWidth="1.5">
        <circle cx="240" cy="150" r="118" />
        <circle cx="240" cy="150" r="158" strokeDasharray="5 9" />
      </g>

      <Glyph id={id} />
    </svg>
  )
}

/*
  Если в public/images/services/<id>.jpg лежит реальное фото —
  показываем его. Если файла нет — остаётся иллюстрация.
*/
function ServiceVisual({ service }: { service: Service }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (imageFailed) return <ServiceArt id={service.id} />

  return (
    <img
      className="service-card__photo"
      src={`/images/services/${service.id}.jpg`}
      alt={`Фото: ${service.title}`}
      width={960}
      height={600}
      loading="lazy"
      onError={() => setImageFailed(true)}
    />
  )
}

/* ==========================================================
   Карточка и блок
   ========================================================== */

function ArrowRight() {
  return (
    <svg
      className="service-card__arrow"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article
      className="service-card"
      style={{ ['--i' as string]: index }}
    >
      <div className="service-card__media">
        <ServiceVisual service={service} />
        <span className="service-card__number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="service-card__body">
        <h3 className="service-card__title">{service.title}</h3>
        <p className="service-card__text">{service.description}</p>

        <ul className="service-card__tags" aria-label="Что входит">
          {service.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <a
          className="service-card__link"
          href={service.href}
          aria-label={`Подробнее: ${service.title}`}
        >
          Подробнее
          <ArrowRight />
        </a>
      </div>
    </article>
  )
}

export default function Services() {
  const [gridRef, visible] = useInView<HTMLDivElement>()

  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="container">
        <header className="services__head">
          <div>
            <span className="services__kicker">Направления</span>
            <h2 id="services-title" className="services__title">
              Основные <em>направления</em> клиники
            </h2>
          </div>
          <p className="services__lead">
            Всё необходимое для здоровья зубов в одном месте: от осмотра и
            лечения до протезирования и детской стоматологии.
          </p>
        </header>

        <div
          ref={gridRef}
          className={`services__grid${visible ? ' is-visible' : ''}`}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}