import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'
import { clinic, routeUrl, yandexMapUrl, MAP_EMBED_URL } from '../data/clinic'
import './Contacts.css'

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {children}
    </svg>
  )
}

const PinPath = () => (
  <>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </>
)

export default function Contacts() {
  const [ref, visible] = useInView<HTMLDivElement>()

  return (
    <section className="contacts" id="contacts" aria-labelledby="contacts-title">
      <div className="container">
        <header className="contacts__head">
          <span className="contacts__kicker">Контакты</span>
          <h2 id="contacts-title" className="contacts__title">
            Как нас <em>найти</em>
          </h2>
          <p className="contacts__lead">
            Позвоните, и администратор поможет записаться на консультацию.
          </p>
        </header>

        <div ref={ref} className={`contacts__layout${visible ? ' is-visible' : ''}`}>
          <div className="contacts__card">
            <ul className="contacts__list">
              <li className="contacts__item">
                <span className="contacts__icon"><Icon><PinPath /></Icon></span>
                <span>
                  <span className="contacts__label">Адрес</span>
                  <span className="contacts__value">{clinic.city}, {clinic.address}</span>
                </span>
              </li>
              <li className="contacts__item">
                <span className="contacts__icon">
                  <Icon>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </Icon>
                </span>
                <span>
                  <span className="contacts__label">Телефон</span>
                  <a className="contacts__value contacts__value--link" href={clinic.phoneHref}>
                    {clinic.phone}
                  </a>
                </span>
              </li>
              <li className="contacts__item">
                <span className="contacts__icon">
                  <Icon><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Icon>
                </span>
                <span>
                  <span className="contacts__label">График работы</span>
                  <span className="contacts__value">{clinic.hours}</span>
                  {/* TODO: убрать после подтверждения графика клиникой */}
                  <span className="contacts__badge">Предварительно, требует подтверждения</span>
                </span>
              </li>
            </ul>

            <div className="contacts__actions">
              <a className="btn btn--primary" href={clinic.phoneHref}>Позвонить</a>
              <a className="btn btn--ghost" href={routeUrl} target="_blank" rel="noopener noreferrer">
                Построить маршрут
              </a>
            </div>
          </div>

          <div className="contacts__map">
            {MAP_EMBED_URL ? (
              <iframe title="Карта: расположение клиники «Целитель»" src={MAP_EMBED_URL}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            ) : (
              <div className="contacts__stub">
                <span className="contacts__stub-pin"><Icon><PinPath /></Icon></span>
                <p className="contacts__stub-title">Здесь будет карта</p>
                <p className="contacts__stub-text">
                  Карта подключится после добавления официального embed-кода.
                </p>
                <a className="contacts__stub-link" href={yandexMapUrl} target="_blank" rel="noopener noreferrer">
                  Открыть на Яндекс Картах
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}