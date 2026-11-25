import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import './App.css'
import Services from './components/Services'
import Doctors from './components/Doctors'
import Advantages from './components/Advantages'
import Prices from './components/Prices'
import About from './components/About'
import Reviews from './components/Reviews'
import Contacts from './components/Contacts'
import Footer from './components/Footer'

/* ==========================================================
   Данные клиники (из брифа)
   TODO: все значения предварительные — подтвердить у клиники
   перед публикацией (адрес, телефон, график работы).
   ========================================================== */

const clinic = {
  name: 'Целитель',
  city: 'Краснодар',
  address: 'ул. им. 40-летия Победы, 141',
  phone: '+7 (918) 424-45-63',
  phoneHref: 'tel:+79184244563',
  // TODO: график требует подтверждения (в исходных данных есть противоречия)
  hours: 'Ежедневно, 09:00–20:00',
}

/*
  Якоря ведут на разделы, которых пока нет. Разделы появятся
  на следующих шагах; до этого клик просто ничего не прокрутит.
*/
const navItems = [
  { label: 'Услуги', href: '#services' },
  { label: 'Врачи', href: '#doctors' },
  { label: 'Цены', href: '#prices' },
  { label: 'О клинике', href: '#about' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
]

const HERO_IMAGE_SRC = '/images/clinic/reception.webp'

/* ==========================================================
   Иконки (inline SVG, без внешних зависимостей)
   ========================================================== */

type IconProps = { size?: number }

function IconBase({ size = 20, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

function PhoneIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </IconBase>
  )
}

function PinIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </IconBase>
  )
}

function ClockIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </IconBase>
  )
}

function ArrowIcon({ size }: IconProps) {
  return (
    <svg
      className="btn__arrow"
      width={size ?? 18}
      height={size ?? 18}
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

function ToothIcon({ size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7.5 3C5.2 3 3.5 4.9 3.5 7.4c0 2 .7 3.3 1.2 5.1.6 2.1.5 4.5 1.3 6.6.4 1.1 1.2 1.9 2.1 1.9 1.6 0 1.5-3.2 2.2-4.6.3-.6.7-.9 1.2-.9s.9.3 1.2.9c.7 1.4.6 4.6 2.2 4.6.9 0 1.7-.8 2.1-1.9.8-2.1.7-4.5 1.3-6.6.5-1.8 1.2-3.1 1.2-5.1C20.5 4.9 18.8 3 16.5 3c-1.7 0-2.6.9-4.5.9S9.2 3 7.5 3z" />
    </svg>
  )
}

/* ==========================================================
   Header
   ========================================================== */

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Стоматология «Целитель» — на главную">
      <span className="logo__mark">
        <ToothIcon size={24} />
      </span>
      <span className="logo__text">
        <span className="logo__title">Целитель</span>
        <span className="logo__subtitle">Стоматология</span>
      </span>
    </a>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Тень и фон шапки после прокрутки
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Закрытие меню по Escape и при переходе на широкий экран
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  // Блокировка прокрутки страницы при открытом меню
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`header${scrolled || menuOpen ? ' header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Logo />

        <nav className="nav" aria-label="Основная навигация">
          <ul className="nav__list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="nav__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={clinic.phoneHref}>
            <PhoneIcon size={18} />
            {clinic.phone}
          </a>
          <a className="btn btn--primary btn--small" href="#contacts">
            Записаться
          </a>
        </div>

        <button
          type="button"
          className="burger"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="burger__lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Мобильная навигация">
          <ul className="mobile-menu__list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className="mobile-menu__link"
                  href={item.href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__footer">
          <a
            className="btn btn--ghost"
            href={clinic.phoneHref}
            tabIndex={menuOpen ? 0 : -1}
          >
            <PhoneIcon size={18} />
            {clinic.phone}
          </a>
          <a
            className="btn btn--primary"
            href="#contacts"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            Записаться на консультацию
          </a>
        </div>
      </div>
    </header>
  )
}

/* ==========================================================
   Hero
   ========================================================== */

/*
  Честная заглушка: стилизованная иллюстрация, а не фото.
  Показывается, пока в public/images/clinic-hero.jpg нет реального снимка.
*/
function PlaceholderArt() {
  return (
    <svg
      className="placeholder-art"
      viewBox="0 0 640 704"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Иллюстрация-заглушка вместо фотографии клиники"
    >
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b2545" />
          <stop offset="1" stopColor="#1b4a73" />
        </linearGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fd3d0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#19a7a8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="toothFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d9f1f0" />
        </linearGradient>
      </defs>

      <rect width="640" height="704" fill="url(#bg)" />
      <circle cx="500" cy="130" r="230" fill="url(#glow)" />
      <circle cx="120" cy="620" r="200" fill="#19a7a8" opacity="0.14" />

      <g fill="none" stroke="#7fd3d0" strokeOpacity="0.35" strokeWidth="1.5">
        <circle cx="320" cy="330" r="190" />
        <circle cx="320" cy="330" r="250" strokeDasharray="6 10" />
        <circle cx="320" cy="330" r="310" strokeOpacity="0.15" />
      </g>

      <g transform="translate(320 330)">
        <path
          transform="translate(-150 -165) scale(12.5)"
          d="M7.5 3C5.2 3 3.5 4.9 3.5 7.4c0 2 .7 3.3 1.2 5.1.6 2.1.5 4.5 1.3 6.6.4 1.1 1.2 1.9 2.1 1.9 1.6 0 1.5-3.2 2.2-4.6.3-.6.7-.9 1.2-.9s.9.3 1.2.9c.7 1.4.6 4.6 2.2 4.6.9 0 1.7-.8 2.1-1.9.8-2.1.7-4.5 1.3-6.6.5-1.8 1.2-3.1 1.2-5.1C20.5 4.9 18.8 3 16.5 3c-1.7 0-2.6.9-4.5.9S9.2 3 7.5 3z"
          fill="url(#toothFill)"
          stroke="#ffffff"
          strokeWidth="0.35"
          strokeLinejoin="round"
        />
      </g>

      <g fill="#ffffff" opacity="0.9">
        <path d="M118 150l6 16 16 6-16 6-6 16-6-16-16-6 16-6z" />
        <path d="M540 470l4 11 11 4-11 4-4 11-4-11-11-4 11-4z" opacity="0.7" />
        <path d="M80 420l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" opacity="0.5" />
      </g>
    </svg>
  )
}

function HeroVisual() {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className="hero__visual">
      <div className="hero__frame">
        {imageFailed ? (
          <>
            <PlaceholderArt />
            <p className="hero__caption">
              Иллюстрация-заглушка. Здесь будет реальное фото клиники.
            </p>
          </>
        ) : (
          <img
            className="hero__image"
            src={HERO_IMAGE_SRC}
            alt="Ресепшен клиники «Целитель»"
            width={960}
            height={1200}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      <div className="hero__badge">
        <span className="hero__badge-icon">
          <PinIcon size={22} />
        </span>
        <span>
          <span className="hero__badge-label">Мы находимся</span>
          <span className="hero__badge-value">
            {clinic.city}, {clinic.address}
          </span>
        </span>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__ring" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__content">
          <span className="eyebrow reveal">
            <span className="eyebrow__dot" aria-hidden="true" />
            Стоматология «Целитель» · {clinic.city}
          </span>

          <h1 id="hero-title" className="hero__title reveal reveal--d1">
            Современная стоматология и <em>забота</em> о здоровье вашей улыбки
          </h1>

          <p className="hero__text reveal reveal--d2">
            Терапия, хирургия, имплантация, протезирование и детская стоматология
            в одной клинике. Мы поможем разобраться в состоянии зубов и
            подобрать понятный путь лечения.
          </p>

          <div className="hero__buttons reveal reveal--d3">
            <a className="btn btn--primary" href="#contacts">
              Записаться на консультацию
              <ArrowIcon />
            </a>
            <a className="btn btn--ghost" href="#services">
              Наши услуги
            </a>
          </div>

          <ul className="hero__facts reveal reveal--d4">
            <li className="fact">
              <span className="fact__icon">
                <PhoneIcon size={18} />
              </span>
              <span>
                <span className="fact__label">Телефон</span>
                <a className="fact__value" href={clinic.phoneHref}>
                  {clinic.phone}
                </a>
              </span>
            </li>
            <li className="fact">
              <span className="fact__icon">
                <ClockIcon size={18} />
              </span>
              <span>
                <span className="fact__label">График</span>
                <span className="fact__value">{clinic.hours}</span>
              </span>
            </li>
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}

/* ==========================================================
   App
   ========================================================== */

function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Services />
        <Doctors />
        <Advantages />
        <Prices />
        <About />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
    </div>
  )
}

export default App