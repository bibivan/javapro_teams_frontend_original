import axios from 'axios';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    commentLoading: false,
  },
  getters: {
    getCommentLoading: state => state.commentLoading
  },
  mutation: {
    setLoadingStatus: (state, status) => state.commentLoading = status
  },
  actions: {
    async commentsById({ commit }, post_id) {
      let dataComments
      try {
        const response = await axios.get(`post/${post_id}/comments`);
        dataComments = {
          post_id,
          value: response.data.data
        }

          (router.history.current.name === 'News') ?
          commit('profile/feeds/setCommentsById', dataComments, { root: true }) : commit('users/info/setCommentsById', dataComments, { root: true });
      }
      catch (error) { }
    },
    async newComment(context, payload) {
      try {
        await axios.post(
          `post/${payload.post_id}/comments`, {
            data: {
              parent_id: payload.parent_id,
              comment_text: payload.text,
              author: payload.author
            }
          });
        context.dispatch('commentsById', payload.post_id);
      }
      catch (error) { }

    },
    async editComment(context, payload) {
      try {
        await axios({
          url: `post/${payload.post_id}/comments/${payload.id}`,
          method: 'PUT',
          data: {
            comment_text: payload.text
          }
        });
        context.dispatch('commentsById', payload.post_id);
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
    async recoverComment(context, payload) {
      try {
        await axios({
          url: `post/${payload.post_id}/comments/${payload.id}/recover`,
          method: 'PUT'
        });
        context.dispatch('commentsById', payload.post_id);
      } catch (err) { }

    },
    async commentActions(context, payload) {
      console.log(payload);
      payload.edit ? await context.dispatch('editComment', payload) : await context.dispatch('newComment', payload);

    }
  }
};
