import { clinic, legal, LEGAL_VERIFIED } from '../data/clinic'
import './Footer.css'

// Только существующие разделы страницы, чтобы все ссылки работали
const links = [
  { label: 'Услуги', href: '#services' },
  { label: 'Врачи', href: '#doctors' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Цены', href: '#prices' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <a href="#top" className="footer__logo">Стоматология «{clinic.name}»</a>
          <p className="footer__about">
            Терапия, хирургия, имплантация, протезирование и детская стоматология в {clinic.city === 'Краснодар' ? 'Краснодаре' : clinic.city}.
          </p>
        </div>

        <nav className="footer__col" aria-label="Навигация в подвале">
          <h2 className="footer__heading">Разделы</h2>
          <ul>
            {links.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__heading">Контакты</h2>
          <ul>
            <li>{clinic.city}, {clinic.address}</li>
            <li><a href={clinic.phoneHref}>{clinic.phone}</a></li>
            {/* TODO: график предварительный */}
            <li>{clinic.hours} <span className="footer__muted">(уточняется)</span></li>
          </ul>
        </div>

        <div className="footer__col footer__legal">
          <h2 className="footer__heading">Юридическая информация</h2>
          {LEGAL_VERIFIED ? (
            <ul>
              <li>{legal.entity}</li>
              <li>ИНН {legal.inn}</li>
              <li>ОГРН {legal.ogrn}</li>
              <li>{legal.address}</li>
            </ul>
          ) : (
            <p>
              Реквизиты, сведения о лицензии и документы будут размещены после
              подтверждения клиникой.
            </p>
          )}
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Стоматология «{clinic.name}»</span>
        <a href="#top">Наверх ↑</a>
      </div>
    </footer>
  )
}