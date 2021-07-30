export default {
  namespaced: true,
  state: {
    status: '',
    text: '',
    show: false,
    timeout: 7000
  },
  getters: {
    getState(state) {
      return state
    },
  },
  mutations: {
    setInfo(state, value) {
      state.status = value.status
      state.text = value.text
    },
    toggleShow(state) {
      state.show = !state.show
    },
  },
  actions: {
    setAlert({
      commit,
      state
    }, value) {      
      commit('setInfo', value)      
      commit('toggleShow')
      console.log('Старт сообщения', state)
      setTimeout(() => {
        commit('toggleShow')
      }, state.timeout)
      console.log('Окончание сообщения', state)
    }
  }
}
