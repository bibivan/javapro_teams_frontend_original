import axios from 'axios'
import moment from 'moment'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    info: null,
    wall: [],
    users: null
  },
  getters: {
    getInfo: s => s.info,
    getUsersInfo: s => s.users,
    getWall: s => s.wall,
    getWallPostedLength: s => s.wall.filter(el => el.type === 'POSTED').length,
    getWallQueuedLength: s => s.wall.filter(el => el.type === 'QUEUED').length,
    getWallDeletedLength: s => s.wall.filter(el => el.type === 'DELETED').length,
  },
  mutations: {
    setInfo: (s, info) => {
      s.info = info;
      // если понадобиться то добавить склонение (для публикаций, но нужен или пол или отчество)
      // библиотека - petrovich
      s.info.fullName = result.first_name + ' ' + result.last_name
      s.info.ages = moment().diff(result.birth_date * 1000, 'years')
      s.info.is_onlined = moment().diff(moment(result.last_online_time), 'seconds') <= 60
      s.info.photo = result.photo || '../static/img/user/default_avatar.svg'
      return s.info
    },
    setWall: (s, wall) => {
      s.wall = wall
      s.wall.forEach(el => {
        if(el.comments && el.comments.length) {
          el.comments.forEach(comment => {
            comment.photo = el.photo || comment.author.photo || '../static/img/user/default_avatar.svg'
            comment.my_like =  comment.my_like || false
            comment.is_deleted = comment.is_deleted || false
            comment.sub_comments =  comment.sub_comments || []
            comment.fullName = comment.author.fullName

            if (comment.parent_id && comment.parent_id !== 0) {
              el.comments.find(res => res.id === comment.parent_id).sub_comments.push(comment)
            }
          })

          el.my_like =  el.my_like || false
          el.comments = el.comments.filter(comment => !comment.parent_id)
          // el.tags = el.tags || ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Tag6']
        }
      })
      console.log(result);
      return s.wall

    },
    setWallById: (s, payload) => s.wall[s.wall.indexOf(s.wall.find(el => el.id === payload.id))] = payload.value,
    setCommentsById: (s, payload) => {

      s.wall.filter(el => el.id === payload,post_id).comments = payload.value

      //s.wall[s.wall.indexOf(s.wall.find(el => el.id === payload.post_id))].comments = payload.value

      // ???
      s.wall.push('dog-nail')
      s.wall.splice(-1,1)
    },
    setUsersInfo: (s,info) => {
      s.users = info

      // если понадобиться то добавить склонение (для публикаций, но нужен или пол или отчество)
      // библиотека - petrovich
      s.users.fullName = result.first_name + ' ' + result.last_name
      s.users.ages = moment().diff(result.birth_date * 1000, 'years')
      s.users.is_onlined = moment().diff(moment(result.last_online_time), 'seconds') <= 60
      s.users.photo = result.photo || '../static/img/user/default_avatar.svg'
      return s.users
    },
    setUsersFriendship: (s, friendship) => s.users.is_friend = friendship,
  },
  actions: {
    async apiInfo({ commit }, id) {
      try {
        const response = await axios.get(`users/${id}`);
        commit('setInfo', response.data.data)
      }
      catch (error) {
        console.log(error);
      }
    },
    async apiWall({ commit }, {id, offset, itemPerPage}) {
      console.log('fetch wall', id)
      try {
        const response =  await axios.get(`users/${id}/wall${offset ? '?offset='+offset : ''}${itemPerPage ? '&itemPerPage='+itemPerPage : ''}`)
      commit('setWall', response.data.data)
      } catch (error) {
        console.log(error);
      }
    },
    async apiWallById({ commit }, id) {
      try {
        const response = await axios.get(`post/${id}`)
        commit('setWallById', {
          id,
          value: response.data.data
        })
      } catch (error) {
        console.log(error);
      }
    },
    async apiCommentsById({ commit }, id) {
      try {
        const response = await axios.get(`post/${id}/comments`)
        commit('setCommentsById', response.data.data)
      } catch (error) {
        console.log(error);
      }
    },
    async userInfoId(context, id) {
      try {
        const response = await axios.get(`users/${id}`)
        await context.dispatch('apiWall', {id})
        context.commit('setUsersInfo', response.data.fata)

        context.commit('setUsersFriendship', !!context.rootGetters.getResultFriends.find(el => el.id === id))
      } catch (error) {
        console.log(error);
      }
    }
  }
}
