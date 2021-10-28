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
    async apiCountries(context, params) {
      let response
      try {
        response = await axios.get('platform/countries', {params})
        context.commit('setCountries', response.data.data)
      } catch (e) {
        console.log('Произощла ошибка при загрузке списк стран')
        throw e
      }
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
