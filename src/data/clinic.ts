// TODO: все значения предварительные (из брифа), подтвердить у клиники.
export const clinic = {
  name: 'Целитель',
  city: 'Краснодар',
  address: 'ул. им. 40-летия Победы, 141',
  phone: '+7 (918) 424-45-63',
  phoneHref: 'tel:+79184244563',
  // TODO: график противоречив в источниках, обязательно подтвердить
  hours: 'Ежедневно, 09:00–20:00',
}

const fullAddress = `${clinic.city}, ${clinic.address}`

// Маршрут и поиск работают по тексту адреса, координаты не придумываются
export const routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`
export const yandexMapUrl = `https://yandex.ru/maps/?text=${encodeURIComponent(fullAddress)}`

// TODO: сюда вставить src официального embed-кода карты (Яндекс/Google).
// Пока пусто, показывается заглушка.
export const MAP_EMBED_URL = 'https://yandex.ru/map-widget/v1/?oid=220419020638&ol=biz'

// TODO: юридические сведения из брифа. Опубликовать только после
// проверки клиникой и юристом, затем поставить LEGAL_VERIFIED = true.
export const LEGAL_VERIFIED = false
export const legal = {
  entity: 'ООО «Целитель»',
  inn: '2311296499',
  ogrn: '1192375074330',
  address: '350072, Краснодарский край, г. Краснодар, ул. им. 40-летия Победы, д. 141, помещ. 1151',
}