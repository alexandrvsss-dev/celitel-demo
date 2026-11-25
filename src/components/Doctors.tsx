import { useEffect, useRef, useState } from 'react'
import './Doctors.css'

/* ==========================================================
   Данные специалистов (из брифа)
   TODO: все сведения предварительные. До публикации клиника
   должна подтвердить: работает ли специалист, должность,
   специализации, стаж, образование, аккредитацию и дать
   согласие на размещение фотографии.
   ========================================================== */

type Doctor = {
  slug: string
  fullName: string
  /** Основная должность из брифа */
  role: string
  /** Все специализации из брифа */
  specialties: string[]
  /** Краткая информация — только то, что следует из брифа */
  summary: string
  /** Стаж из брифа. Не показывается, пока SHOW_EXPERIENCE = false */
  experienceYears?: number
}

/*
  TODO: стаж указан в брифе как «требует подтверждения».
  Переключите на true только после согласования с клиникой.
*/
const SHOW_EXPERIENCE = false

const doctors: Doctor[] = [
  {
    slug: 'rustamova-elvira',
    fullName: 'Рустамова Эльвира Казимагомедовна',
    role: 'Стоматолог',
    specialties: ['Стоматолог', 'Стоматолог-ортопед'],
    summary:
      'Ведёт приём по направлениям общей стоматологии и ортопедии.',
    experienceYears: 15,
  },
  {
    slug: 'mutakhari-misak',
    fullName: 'Мутахари Мисак',
    role: 'Стоматолог-терапевт',
    specialties: [
      'Стоматолог-терапевт',
      'Хирург',
      'Имплантолог',
      'Ортопед',
      'Ортодонт',
    ],
    summary:
      'Работает сразу в нескольких направлениях: терапия, хирургия, имплантация, ортопедия и ортодонтия.',
    experienceYears: 12,
  },
  {
    slug: 'guyvan-aleksey',
    fullName: 'Гуйван Алексей Владимирович',
    role: 'Стоматолог',
    specialties: ['Стоматолог'],
    summary: 'Ведёт приём по направлению общей стоматологии.',
    experienceYears: 14,
  },
]

function yearsLabel(n: number) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return `${n} год`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} года`
  return `${n} лет`
}

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
   Портрет: реальное фото или нейтральная заглушка
   ========================================================== */

/*
  Нейтральный силуэт — не фотография и не изображение конкретного
  человека. Показывается, пока в public/images/doctors/<slug>.jpg
  нет реального портрета.
*/
function PortraitPlaceholder({ slug }: { slug: string }) {
  return (
    <svg
      className="doctor-card__art"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Нейтральная заглушка вместо фотографии врача"
    >
      <defs>
        <linearGradient id={`${slug}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b2545" />
          <stop offset="1" stopColor="#1b4a73" />
        </linearGradient>
        <linearGradient id={`${slug}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9f1f0" />
          <stop offset="1" stopColor="#7fd3d0" />
        </linearGradient>
      </defs>

      <rect width="400" height="500" fill={`url(#${slug}-bg)`} />
      <circle cx="340" cy="60" r="170" fill="#7fd3d0" opacity="0.14" />
      <circle cx="40" cy="470" r="140" fill="#19a7a8" opacity="0.16" />

      <g fill="none" stroke="#7fd3d0" strokeOpacity="0.3" strokeWidth="1.5">
        <circle cx="200" cy="230" r="140" />
        <circle cx="200" cy="230" r="190" strokeDasharray="5 9" />
      </g>

      <circle cx="200" cy="190" r="62" fill={`url(#${slug}-body)`} />
      <path
        d="M72 500c0-86 58-148 128-148s128 62 128 148z"
        fill={`url(#${slug}-body)`}
      />
    </svg>
  )
}

function DoctorPortrait({ doctor }: { doctor: Doctor }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (imageFailed) {
    return (
      <>
        <PortraitPlaceholder slug={doctor.slug} />
        <span className="doctor-card__badge">Фото будет добавлено</span>
      </>
    )
  }

  return (
    <img
      className="doctor-card__photo"
      src={`/images/doctors/${doctor.slug}.jpg`}
      alt={`Фото: ${doctor.fullName}`}
      width={800}
      height={1000}
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
      className="doctor-card__arrow"
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

function DoctorCard({ doctor, index }: { doctor: Doctor; index: number }) {
  return (
    <article className="doctor-card" style={{ ['--i' as string]: index }}>
      <div className="doctor-card__media">
        <DoctorPortrait doctor={doctor} />
      </div>

      <div className="doctor-card__body">
        <p className="doctor-card__role">{doctor.role}</p>
        <h3 className="doctor-card__name">{doctor.fullName}</h3>
        <p className="doctor-card__text">{doctor.summary}</p>

        <ul className="doctor-card__tags" aria-label="Специализации">
          {doctor.specialties.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {SHOW_EXPERIENCE && doctor.experienceYears !== undefined && (
          <p className="doctor-card__experience">
            Стаж: {yearsLabel(doctor.experienceYears)}
          </p>
        )}

        <a
          className="doctor-card__link"
          href={`/doctors/${doctor.slug}`}
          aria-label={`Подробнее о враче: ${doctor.fullName}`}
        >
          Подробнее
          <ArrowRight />
        </a>
      </div>
    </article>
  )
}

export default function Doctors() {
  const [gridRef, visible] = useInView<HTMLDivElement>()

  return (
    <section className="doctors" id="doctors" aria-labelledby="doctors-title">
      <div className="container">
        <header className="doctors__head">
          <div>
            <span className="doctors__kicker">Врачи</span>
            <h2 id="doctors-title" className="doctors__title">
              Наши <em>специалисты</em>
            </h2>
          </div>
          <p className="doctors__lead">
            Врачи клиники ведут приём по основным стоматологическим
            направлениям. Запишитесь на консультацию, и администратор
            подскажет, к какому специалисту обратиться.
          </p>
        </header>

        <div
          ref={gridRef}
          className={`doctors__grid${visible ? ' is-visible' : ''}`}
        >
          {doctors.map((doctor, index) => (
            <DoctorCard key={doctor.slug} doctor={doctor} index={index} />
          ))}
        </div>

        {/* TODO: убрать после подтверждения сведений клиникой */}
        <p className="doctors__note">
          Информация о специалистах предварительная и будет уточнена клиникой
          перед публикацией сайта.
        </p>
      </div>
    </section>
  )
}