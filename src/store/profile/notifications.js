import axios from 'axios'

export default {
  namespaced: true,
  state: {
    notifications: []
  },
  getters: {
    getNotifications: s => s.notifications,
    getNotificationsLength: s => s.notifications.length,
    getNotificationsTextType: s => type => {
      const lang = localStorage.getItem('lang') || 'ru'
      if (lang === 'ru') {
        switch (type) {
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
        switch (type) {
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
  },
  mutations: {
    setNotifications: (s, value) => s.notifications = value
  },
  actions: {
    async apiNotifications({
      state,
      commit,
      dispatch
    }) {
      await axios({
        url: 'notifications',
        method: 'GET'
      }).then(response => {
        if (`${response.data.data.map(z => z.sent_time)}` !== `${state.notifications.map(z => z.sent_time)}`) {
          const result = response.data.data.map(el => {
            if (!el.author) el.author = {}
            if (!el.author.photo) el.author.photo = '../static/img/user/default_avatar.svg'
            if (!el.author.first_name) el.author.first_name = `Имя автора с ID: ${el.id}`
            if (!el.author.last_name) el.author.last_name = `Фамилия автора с ID: ${el.id}`
            if (!el.type_id) el.type_id = 1
            return el;
          });
          commit('setNotifications', result)
        }
        // добавить когда будет прод
        // setTimeout(() => {
        //   dispatch('apiNotifications')
        // }, 5000)
      }).catch(() => {})
    },
    async readNotifications({
      state,
      commit,
      dispatch
    }, notificationId) {
      if (!notificationId) {
        await axios({
          url: 'notifications?all=true',
          method: 'PUT'
        }).then(response => {}).catch(() => {})
      } else {
        await axios({
          url: `notifications?id=${notificationId}`,
          method: 'PUT'
        }).then(response => {}).catch(() => {})
      }
    }
  }
}
