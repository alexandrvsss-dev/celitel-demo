import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import './Prices.css'

/*
  Услуги и категории взяты из брифа. Цен намеренно нет: в брифе они
  из сторонних источников и не подтверждены клиникой.
  TODO: после получения официального прайса добавить поле price
  и выводить его вместо PRICE_PLACEHOLDER.
*/
const PRICE_PLACEHOLDER = 'Стоимость уточняется'

type Category = { id: string; label: string; items: string[] }

const categories: Category[] = [
  {
    id: 'therapy',
    label: 'Терапия',
    items: ['Лечение кариеса', 'Лечение пульпита', 'Лечение периодонтита', 'Лечение кисты', 'Реставрация и наращивание зуба'],
  },
  {
    id: 'surgery',
    label: 'Хирургия и имплантация',
    items: ['Удаление зубов', 'Имплантация', 'Костная пластика', 'Пластика уздечки (френулопластика)'],
  },
  {
    id: 'orthopedics',
    label: 'Ортопедия',
    items: ['Коронки', 'Виниры', 'Люминиры'],
  },
  {
    id: 'hygiene',
    label: 'Гигиена',
    items: ['Комплексная гигиена', 'Air-Flow', 'Удаление зубного камня', 'Отбеливание Zoom', 'Отбеливание Opalescence', 'Скайсы'],
  },
  {
    id: 'kids',
    label: 'Детская стоматология',
    items: ['Фторирование', 'Герметизация', 'Серебрение', 'Лечение молочных зубов', 'Удаление молочных зубов', 'Детская чистка'],
  },
]

export default function Prices() {
  const [active, setActive] = useState(categories[0].id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const current = categories.find((c) => c.id === active) ?? categories[0]

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const last = categories.length - 1
    let next = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = index === last ? 0 : index + 1
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = index === 0 ? last : index - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next < 0) return
    e.preventDefault()
    setActive(categories[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="prices" id="prices" aria-labelledby="prices-title">
      <div className="container">
        <header className="prices__head">
          <div>
            <span className="prices__kicker">Цены</span>
            <h2 id="prices-title" className="prices__title">
              Стоимость <em>услуг</em>
            </h2>
          </div>
          <p className="prices__lead">
            Основные направления и популярные услуги клиники. Актуальную
            стоимость подскажет администратор.
          </p>
        </header>

        <div className="prices__layout">
          <div className="prices__tabs" role="tablist" aria-label="Категории услуг" aria-orientation="vertical">
            {categories.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={c.id === active}
                aria-controls={`panel-${c.id}`}
                tabIndex={c.id === active ? 0 : -1}
                className={`prices__tab${c.id === active ? ' is-active' : ''}`}
                onClick={() => setActive(c.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div
            key={current.id}
            className="prices__panel"
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
          >
            <h3 className="prices__panel-title">{current.label}</h3>
            <ul className="prices__list">
              {current.items.map((name) => (
                <li key={name} className="prices__row">
                  <span className="prices__name">{name}</span>
                  <span className="prices__dots" aria-hidden="true" />
                  <span className="prices__value">{PRICE_PLACEHOLDER}</span>
                </li>
              ))}
            </ul>
            <p className="prices__note">
              Цены не опубликованы до подтверждения клиникой. Консультацию и
              запись можно уточнить по телефону.
            </p>
          </div>
        </div>

        <div className="prices__actions">
          <a className="btn btn--ghost" href="/prices">
            Все цены
          </a>
          <a className="btn btn--primary" href="#contacts">
            Записаться на консультацию
          </a>
        </div>
      </div>
    </section>
  )
}