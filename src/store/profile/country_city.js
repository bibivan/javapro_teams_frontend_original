import axios from 'axios'

export default {
  namespaced: true,
  state: {
    countries: [],
    cities: [],
  },
  getters: {
    getCountries: state => state.countries,
    getCities: state => state.cities,
  },
  mutations: {
    setCountries: (state, value) => state.countries = value,
    setCities: (state, value) => state.cities = value,
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
        params: {'countryId': '1'}
      }).then(response => {
        commit('setCities', response.data.data)
      }).catch(() => {})
    },
    async apiAllCities({
      commit
    }) {
      await axios({
        url: 'platform/getAllCountriesWithTowns',
        method: 'GET'
      }).then(response => {
        commit('setCities', response.data.data)
      }).catch(() => {})
    },
    async apiCities(context, params) {
      let response
      try {
        response = await axios('platform/cities', {params})
        context.commit('setCities', response.data.data)
      } catch (e) {
        console.log('Произощла ошибка при загрузке списка городов')
        throw e
      }
    }
  }
}
