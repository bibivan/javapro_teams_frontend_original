import axios from 'axios'
import {getNotificationType} from "../../utils/notifications.utils";

export default {
  namespaced: true,
  state: {
    notifications: []
  },
  getters: {
    getNotifications: state => state.notifications,
    getNotificationsLength: state => state.notifications.length,
    getNotificationsTextType: state => typeId => {
      const lang = localStorage.getItem('lang') || 'ru'
      return getNotificationType(lang, typeId)
    }
  },
  mutations: {
    setNotifications: (s, value) => s.notifications = value
  },
  actions: {
    async apiNotifications(context) {
      let response

      try {
        response = await axios.get('notifications')
      } catch (e) {
        console.log('произошла ошибка при загрузке уведомлений')
        throw e
      }
        if (`${response.data.data.map(z => z.sent_time)}` !== `${context.state.notifications.map(z => z.sent_time)}`) {
          context.commit('setNotifications', response.data.data)
        }
    },

    async readNotifications(context, notificationId) {

      try {
        if (!notificationId) await axios.put('notifications?all=true')
        else await axios.put('notifications?id=' + notificationId)
      } catch (e) {
        console.log('произошла ошибка при удалении уведомлений')
        throw e
      }
    }
  }
}
