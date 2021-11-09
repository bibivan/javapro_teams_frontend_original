export function getRouteByNotification(notification) {
  switch (notification.type_id) {
      case 'MESSAGE':
        return { name: 'Im',  params: { id: notification.id } }
      default:
        return { name: 'ProfileId', params: { id: notification.author.author_id } }
  }
}

export function getNotificationType(notificationID) {
  const lang = localStorage.getItem('lang') || ru

  if (lang === 'ru') {
    switch (notificationID) {
      case 'POST':
        return 'опубликовал новую запись'
      case 'POST_COMMENT':
        return 'оставил комментарий'
      case 'COMMENT_COMMENT':
        return 'ответил на ваш комментарий'
      case 4:
        return 'день рождение'
      case 'MESSAGE':
        return 'прислал сообщение'
      case 6:
        return 'добавил в друзья нового пользователя'
      case 'FRIEND_REQUEST':
        return 'хочет дабавить вас в друзья'
    }
  }
  if (lang === 'en') {
    switch (notificationID) {
      case 'POST':
        return 'posted a new post'
      case 'POST_COMMENT':
        return 'left a comment'
      case 'COMMENT_COMMENT':
        return 'replied to your comment'
      case 4:
        return 'birthday'
      case 'MESSAGE':
        return 'sent a message'
      case 6:
        return 'added a new user as a friend'
      case 'FRIEND_REQUEST':
        return 'wants to add you as a friend'
    }
  }
}

