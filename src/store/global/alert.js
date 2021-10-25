export default {
  namespaced: true,
  state: {
    status: '',
    text: '',
    show: false,
    timeout: 3000
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
    setAlert(context, value) {
      context.commit('setInfo', value)
      context.commit('toggleShow')
      setTimeout(() => {
        context.commit('toggleShow')
      }, context.state.timeout)
    }
  }
}
