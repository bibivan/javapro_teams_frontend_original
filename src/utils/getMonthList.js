export function getMonthList(lang) {
  if (lang === 'en') {
    return [
      { val: 0, text: 'January' },
      { val: 1, text: 'February' },
      { val: 2, text: 'March' },
      { val: 3, text: 'April' },
      { val: 4, text: 'May' },
      { val: 5, text: 'June' },
      { val: 6, text: 'July' },
      { val: 7, text: 'August' },
      { val: 8, text: 'September' },
      { val: 9, text: 'October' },
      { val: 10, text: 'November' },
      { val: 11, text: 'December' }
    ]
  }

  if (lang === 'ru') {
    return [
      { val: 0, text: 'Января' },
      { val: 1, text: 'Февраля' },
      { val: 2, text: 'Марта' },
      { val: 3, text: 'Апреля' },
      { val: 4, text: 'Мая' },
      { val: 5, text: 'Июня' },
      { val: 6, text: 'Июля' },
      { val: 7, text: 'Августа' },
      { val: 8, text: 'Сентября' },
      { val: 9, text: 'Октября' },
      { val: 10, text: 'Ноября' },
      { val: 11, text: 'Декабря' }
    ]
  }
}
