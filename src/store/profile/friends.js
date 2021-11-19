import axios from 'axios'
import { mapPayload } from "@/utils/payload.util";

export default {
  namespaced: true,
  state: {
    result: {
      friends: [],
      request: [],
      recommendations: []
    }
  },
  getters: {
    getResult: s => s.result,
    getResultById: s => id => s.result[id]
  },
  mutations: {
    setResult: (s, payload) => {
      payload.value.forEach(el => el.photo = el.photo || '../static/img/user/default_avatar.svg')
      return s.result[payload.id] = payload.value
    },
    delRequest: (s, id) => {
      const index = s.result.request.findIndex(el => el.id === id)
      if (index === -1) return
      return s.result.request.splice(index, 1)
    }
  },
  actions: {
    async apiFriends(context, payload) {
      let response
      const query = mapPayload(payload)

      try {
        response = await axios.get('friends?' + query.join('&'))
      } catch (e) {
        console.log('Произошла ошибка при добавлении друзей')
        throw e
      }
      context.commit('setResult', {
        id: 'friends',
        value: response.data.data
      })
    },
    apiDeleteFriends(context, id) {
      let response

      context.state.result.friends.filter(f => f.id !== +id)
      try {
        response = axios.delete('friends/' + id)
      } catch (e) {
        console.log('Произошла ошибка при удалении друга')
        throw e
      }
      context.dispatch('global/alert/setAlert', {
        status: 'success',
        text: 'Пользователь удален из друзей'
      }, {
        root: true
      })
      context.dispatch('apiFriends')
    },
    apiAddFriends(context, id) {
      let response

      try {
        context.commit('delRequest', id)
        response = axios.post('friends/' + id)
        context.dispatch('apiFriends')
        context.dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Заявка отправлена'
        }, {
          root: true
        })
      } catch (e) {
        context.dispatch('global/alert/setAlert', {
          status: 'error',
          text: 'Произошла ошибка при отправлении заявки'
        }, {
          root: true
        })

        throw e
      }
    },
    async apiRequest(context, payload) {
      let response
      const query = mapPayload(payload)
      try {
        response = await axios.get('friends/request?' + query.join('&'))
        context.commit('setResult', {
          id: 'request',
          value: response.data.data
        })
      } catch (e) {
        console.log("TCL: request", response)
        throw e
      }
    },
    async apiRefuseRequest(context, id) {
      let response
      try {
        response = await axios.delete('friends/delete/' + id)
        context.commit('setResult', {
          id: 'request',
          value: response.data.data
        })
      } catch (e) {
        console.log("TCL: request", response)
        throw e
      }
    },
    async apiRecommendations(context, payload) {
      let response
      const query = mapPayload(payload)
      console.log(payload, 'payload')

      try {
        response = await axios.get('friends/recommendations?' + query.join('&'))
        context.commit('setResult', {
          id: 'recommendations',
          value: response.data.data
        })
      } catch (e) {
        console.log("TCL: recommendations", response)
        throw e
      }
    }
  }
}
