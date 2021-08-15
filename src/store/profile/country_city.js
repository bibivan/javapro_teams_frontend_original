import axios from 'axios'

export default {
  namespaced: true,
  state: {
    countries: [],
    cities: [],
    // active: {
    //   id: 1,
    //   title: 'Русский'
    // },
    // isOpenBlock: false
  },
  getters: {
    getCountries: s => s.countries,
    getCities: s => s.cities,
    // getLanguages: s => s.languages,
    // getActiveLanguage: s => s.active.title,
    // getStatusOpenBlock: s => s.isOpenBlock
  },
  mutations: {
    setCountries: (s, value) => s.countries = value,
    setCities: (s, value) => s.cities = value,
    // setLanguages: (s, value) => s.languages = value,
    // setActiveLanguage: (state, lang) => state.active = lang,
    // toggleLanguageBlock: s => s.isOpenBlock = !s.isOpenBlock
  },
  actions: {
    async apiCountries({
      commit
    }) {
      await axios({
        url: 'platform/countries',
        method: 'GET',
        params: {}
      }).then(response => {
        commit('setCountries', response.data.data)
      }).catch(() => {})
    },
    async apiCities({
      commit
    }) {
      await axios({
        url: 'platform/cities',
        method: 'GET',
        params: {'countryId':'1'}
      }).then(response => {
        commit('setCities', response.data.data)
      }).catch(() => {})
    }
    // async apiLanguages({
    //   commit
    // }) {
    //   await axios({
    //     url: 'platform/languages',
    //     method: 'GET'
    //   }).then(response => {
    //     commit('setLanguages', response.data.data)
    //   }).catch(() => {})
    // },
  }
}
