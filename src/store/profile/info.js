import axios from 'axios'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    info: null
  },
  getters: {
    getInfo(state) {
      return state.info
    }
  },
  mutations: {
    setInfo: (state, info) => {
      if (!info.photo) info.photo = '../static/img/user/default_avatar.svg'
      info.fullName = info.first_name + ' ' + info.last_name
      info.ages = moment().diff(info.birth_date * 1000, 'years')
      state.info = info
    }
  },
  actions: {
    async apiInfo(context) {
      try {
        const response = await axios.get('users/me')
        context.commit('setInfo', response.data.data)
      } catch (e) {
        console.log('Произошла ошибка при загрузке данных пользователя')
        // throw e
      }
    },
    async apiChangeInfo(context, user) {
      try {
        const response = await axios.put('users/me', { data: user })
        console.log(response);
        context.dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Информация обновлена'
        }, {
          root: true
        })
        context.commit('setInfo', response.data)
      } catch (e) {
        console.log('Произошла ошибка при загрузке данных пользователя')
        throw e
      }
    },
    async deleteInfo({}, confirm) {
      console.log(confirm);
      try {
        await axios('users/me', {
          method: 'DELETE',
          params: { isHardDelete: confirm}
        })
      } catch (e) {
        console.log('Произошла ошибка при загрузке данных пользователя')
        throw e
      }

    }
  }
}
