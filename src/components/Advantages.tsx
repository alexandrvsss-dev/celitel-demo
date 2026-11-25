import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'
import './Advantages.css'

/*
  TODO: формулировки нейтральные и требуют согласования с клиникой.
  В брифе подтверждены только: несколько направлений в одной клинике
  и рентген зубов как услуга. Характеристики оборудования, методики
  и «современность» в брифе не указаны.
  После подтверждения заголовок №2 можно заменить на
  «Современное диагностическое оборудование».
*/
type Advantage = { title: string; text: string; icon: ReactNode }

const advantages: Advantage[] = [
  {
    title: 'Комплексный подход к лечению',
    text: 'Врач оценивает состояние зубов в целом и обсуждает с вами порядок лечения.',
    icon: (
      <>
        <path d="M12 3 3 8l9 5 9-5-9-5z" />
        <path d="m3 13 9 5 9-5" />
        <path d="m3 17.5 9 5 9-5" opacity=".5" />
      </>
    ),
  },
  {
    title: 'Диагностика перед началом лечения',
    text: 'Осмотр и диагностика помогают врачу оценить ситуацию до выбора тактики.',
    icon: (
      <>
        <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
        <circle cx="12" cy="12" r="3.5" />
      </>
    ),
  },
  {
    title: 'Несколько направлений в одной клинике',
    text: 'Терапия, хирургия, имплантация, протезирование, ортодонтия и детская стоматология.',
    icon: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
      </>
    ),
  },
  {
    title: 'Индивидуальный план лечения',
    text: 'План обсуждается с врачом после осмотра с учётом ваших особенностей.',
    icon: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2.5" />
        <path d="M9 4V3h6v1" />
        <path d="m9 13 2.2 2.2L15.5 11" />
      </>
    ),
  },
]

export default function Advantages() {
  const [ref, visible] = useInView<HTMLUListElement>()

  return (
    <section className="advantages" id="advantages" aria-labelledby="advantages-title">
      <div className="container advantages__layout">
        <header className="advantages__head">
          <span className="advantages__kicker">Преимущества</span>
          <h2 id="advantages-title" className="advantages__title">
            Почему выбирают <em>нас?</em>
          </h2>
          <p className="advantages__lead">
            Мы стремимся, чтобы визит к стоматологу был понятным: от
            консультации до плана лечения.
          </p>
          <a className="btn btn--primary" href="#contacts">
            Записаться на консультацию
          </a>
        </header>

        <ul ref={ref} className={`advantages__list${visible ? ' is-visible' : ''}`}>
          {advantages.map((item, i) => (
            <li key={item.title} className="adv-card" style={{ ['--i' as string]: i }}>
              <span className="adv-card__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="adv-card__icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  {item.icon}
                </svg>
              </span>
              <h3 className="adv-card__title">{item.title}</h3>
              <p className="adv-card__text">{item.text}</p>
            </li>
          ))}
        </ul>

        {/* TODO: убрать после согласования формулировок с клиникой */}
        <p className="advantages__note">
          Формулировки предварительные и будут согласованы с клиникой.
        </p>
      </div>
    </section>
  )
}