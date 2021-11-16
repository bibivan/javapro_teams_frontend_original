import axios from 'axios';
import router from '@/router';

export default {
  namespaced: true,
  actions: {
    async commentsById({ commit }, post_id) {
      try {
        const response = await axios({ url: `post/${post_id}/comments`, method: 'GET' });
        let dataComments = {
          post_id,
          value: response.data.data
        }

          (router.history.current.name === 'News') ?
          commit('profile/feeds/setCommentsById', dataComments, { root: true }) : commit('users/info/setCommentsById', dataComments, { root: true });
      }
      catch (error) { }
    },
    async newComment({ dispatch }, payload) {
      try {
        await axios({
          url: `post/${payload.post_id}/comments`, method: 'POST',
          data: {
            parent_id: payload.parent_id,
            comment_text: payload.text,
            author: payload.author
          }
        });
        dispatch('commentsById', payload.post_id);
      }
      catch (error) { }
    },
    async editComment({ dispatch }, payload) {
      try {
        await axios({
          url: `post/${payload.post_id}/comments/${payload.id}`,
          method: 'PUT',
          data: {
            comment_text: payload.text
          }
        });
        dispatch('commentsById', payload.post_id);
      }
      catch (err) { }
    },
    async deleteComment({ dispatch }, payload) {
      try {

        await axios({
          url: `post/${payload.post_id}/comments/${payload.id}`,
          method: 'DELETE'
        });
        dispatch('commentsById', payload.post_id);
      } catch (err) { }
    },
    async recoverComment({ dispatch }, payload) {
      try {

        await axios({
          url: `post/${payload.post_id}/comments/${payload.id}/recover`,
          method: 'PUT'
        });
        dispatch('commentsById', payload.post_id);
      } catch (err) { }

    },
    async commentActions({ dispatch }, payload) {
      console.log(payload);
      payload.edit ? await dispatch('editComment', payload) : await dispatch('newComment', payload);
    }
  }
};
