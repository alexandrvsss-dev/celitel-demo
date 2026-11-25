import { useInView } from '../hooks/useInView'
import './Reviews.css'

/*
  TODO: после подтверждения клиникой и юристом:
  1) RATING: актуальные значения (в источниках они расходятся);
  2) reviews: только проверенные отзывы с разрешением на публикацию.
*/
const YANDEX_ORG_ID = '220419020638'
const RATING: { value: string; count: number; source: string } | null = null

type Review = { author: string; date: string; text: string; source: string }
const reviews: Review[] = []

const PLACEHOLDERS = 3

export default function Reviews() {
  const [ref, visible] = useInView<HTMLDivElement>()
  const hasReviews = reviews.length > 0

  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <header className="reviews__head">
          <div>
            <span className="reviews__kicker">Отзывы</span>
            <h2 id="reviews-title" className="reviews__title">
              Отзывы <em>пациентов</em>
            </h2>
          </div>
          <p className="reviews__lead">
            Мнение пациентов помогает выбрать клинику. Ознакомиться с отзывами
            можно на независимых площадках.
          </p>
        </header>

        {YANDEX_ORG_ID ? (
          <div className="reviews__widget">
            <iframe
              title="Отзывы о клинике на Яндекс Картах"
              src={`https://yandex.ru/maps-reviews-widget/${YANDEX_ORG_ID}?comments`}
              loading="lazy"
            />
          </div>
        ) : (
          <div
            ref={ref}
            className={`reviews__grid${visible ? ' is-visible' : ''}`}
          >
            {RATING && (
              <div className="reviews__rating" style={{ ['--i' as string]: 0 }}>
                <span className="reviews__score">{RATING.value}</span>
                <span className="reviews__meta">
                  {RATING.count} отзывов · {RATING.source}
                </span>
              </div>
            )}

            {hasReviews
              ? reviews.map((r, i) => (
                  <figure
                    key={`${r.author}-${r.date}`}
                    className="review-card"
                    style={{ ['--i' as string]: i + 1 }}
                  >
                    <QuoteIcon />
                    <blockquote className="review-card__text">{r.text}</blockquote>
                    <figcaption className="review-card__author">
                      <strong>{r.author}</strong>
                      <span>
                        {r.date} · {r.source}
                      </span>
                    </figcaption>
                  </figure>
                ))
              : Array.from({ length: PLACEHOLDERS }, (_, i) => (
                  <div
                    key={i}
                    className="review-card review-card--stub"
                    style={{ ['--i' as string]: i }}
                  >
                    <QuoteIcon />
                    <span className="review-card__badge">Демонстрационная заглушка</span>
                    <p className="review-card__text">
                      Здесь появится отзыв пациента после подтверждения
                      клиникой.
                    </p>
                    <div className="review-card__lines" aria-hidden="true">
                      <span />
                      <span />
                    </div>
                  </div>
                ))}
          </div>
        )}

        <div className="reviews__actions">
          <a className="btn btn--ghost" href="/reviews">
            Все отзывы
          </a>
          <a className="btn btn--primary" href="#contacts">
            Записаться на консультацию
          </a>
        </div>
      </div>
    </section>
  )
}

function QuoteIcon() {
  return (
    <svg
      className="review-card__quote"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7.2 6C4.9 6 3 8 3 10.6 3 13 4.6 14.8 6.7 14.8c.3 0 .6 0 .8-.1-.2 1.4-1.2 2.6-2.8 3.3l.7 1.5C8.9 18.4 11 15.7 11 11.6 11 8.4 9.5 6 7.2 6zm9.8 0c-2.3 0-4.2 2-4.2 4.6 0 2.4 1.6 4.2 3.7 4.2.3 0 .6 0 .8-.1-.2 1.4-1.2 2.6-2.8 3.3l.7 1.5c3.5-1.1 5.6-3.8 5.6-7.9C20.8 8.4 19.300 6 17 6z" />
    </svg>
  )
}