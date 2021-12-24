import axios from 'axios'

export default {
  namespaced: true,
  state: {
    notifications: []
  },
  getters: {
    getNotifications: state => state.notifications,
    getNotificationsLength: state => state.notifications.length
  },
  mutations: {
    setNotifications: (state, value) => {
      value.forEach(n => {
        if (!n.author.photo) n.author.photo = '../static/img/user/default_avatar.svg'
      })
      state.notifications = value
    }
  },
  actions: {
    async apiNotifications(context) {
      let response
      try {
        response = await axios.get('notifications')
      } catch (e) {
        console.log('произошла ошибка при загрузке уведомлений');
        throw e
      }
        if (`${response.data.data.map(n => n.sent_time)}` !== `${context.state.notifications.map(n => n.sent_time)}`) {
          context.commit('setNotifications', response.data.data)
        }
    },

    async readNotifications(context, notificationId) {

      try {
        if (!notificationId) {
          context.commit('setNotifications', [])
          await axios.put('notifications?all=true')
        }
        else {
          context.commit('setNotifications', context.state.notifications.filter(n => n.id !== notificationId))
          await axios.put('notifications?id=' + notificationId)
        }
      } catch (e) {
        console.log('произошла ошибка при удалении уведомлений')
        throw e
      }
    }
  }
}
