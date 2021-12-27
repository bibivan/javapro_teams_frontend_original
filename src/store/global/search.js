import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    searchText: '',
    tabs: [
      {
        id: 'all',
        text: 'Всё'
      },
      {
        id: 'users',
        text: 'Люди'
      },
      {
        id: 'news',
        text: 'Новости'
      }
    ],
    tabSelect: 'all',
    result: {
      users: [],
      news: []
    },
    status: '',
    foundTotal: null,
  },
  getters: {
    searchText: s => s.searchText,
    tabs: s => s.tabs,
    tabSelect: s => s.tabSelect,
    getResult: s => s.result,
    getResultById: s => id => s.result[id],
    getStatus: s => s.status,
    getFoundTotal: s => s.foundTotal,
  },
  mutations: {
    setSearchText: (s, value) => s.searchText = value,
    setTabSelect: (s, id) => s.tabSelect = id,
    routePushWithQuery(state, id) {
      let query = {}
      if (id !== 'all') query.tab = id
      if (state.searchText.length > 0) query.text = state.searchText
      router.push({
        name: 'Search',
        query
      })
    },
    setResult: (s, result) => s.result[result.id] = result.value,
    setFoundTotal: (s, total) => s.foundTotal = total,
  },
  actions: {
    clearSearch({
      commit
    }) {
      commit('setSearchText', '')
      commit('setResult', {
        id: 'users',
        value: []
      })
      commit('setResult', {
        id: 'news',
        value: []
      })
    },
    changeTab({
      commit
    }, id) {
      commit('setTabSelect', id)
      commit('routePushWithQuery', id)
    },
    async searchUsers({
      commit
    }, payload) {
      let query = []
      payload && Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      await axios({
        url: `users/search?${query.join('&')}`,
        method: 'GET'
      }).then(response => {
        console.log(response.data)
        const result = [
          ...response.data.data
        ]
        result.forEach(el => el.photo = el.photo || '../static/img/user/default_avatar.svg')
        commit('setResult', {
          id: 'users',
          value: result
        })
        commit('setFoundTotal', response.data.total)
      }).catch(error => {})
    },
    async searchNews({
      commit
    }, payload) {
      // if (!payload || !payload.text) {
      //   alert('введите текст в поиск')
      //   return false
      // }
      let query = []
      payload && Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      await axios({
        url: `post?${query.join('&')}`,
        method: 'GET'
      }).then(response => {
        console.log("TCL: searchNews -> response", response.data.data)
        commit('setResult', {
          id: 'news',
          value: response.data.data
        })
      }).catch(error => {})
    },
    async searchAll({
      dispatch,
      commit
    }, text) {
      commit('setSearchText', text)
      await dispatch('searchUsers', {
        first_name: text
      })
      await dispatch('searchNews', {
        text
      })
    }
  }
}
