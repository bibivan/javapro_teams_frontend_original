export function getRouteByNotification(notification) {
  switch (notification.type_id) {
      case 5:
        return { name: 'Im' }
      default:
        return { name: 'ProfileId', params: { id: notification.author.id } }
  }
}

export function getNotificationType(notificationID) {
  const lang = localStorage.getItem('lang') || ru

  if (lang === 'ru') {
    switch (notificationID) {
      case 1:
        return 'опубликовал новую запись'
      case 2:
        return 'оставил комментарий'
      case 3:
        return 'ответил на ваш комментарий'
      case 4:
        return 'добавил в друзья нового пользователя'
      case 5:
        return 'прислал сообщение'
      case 6:
        return 'день рождение'
    }
  }
  if (lang === 'en') {
    switch (notificationID) {
      case 1:
        return 'posted a new post'
      case 2:
        return 'left a comment'
      case 3:
        return 'replied to your comment'
      case 4:
        return 'added a new user as a friend'
      case 5:
        return 'sent a message'
      case 6:
        return 'birthday'
    }
  }
}

