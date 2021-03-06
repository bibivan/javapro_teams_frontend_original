import axios from 'axios';
import router from '../../router';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    modalOpen: false,
    modalTitle: '',
    modalLink: ''
  },
  getters: {
    apiToken: s => s.token,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  mutations: {
    setToken: (s, token) => s.token = token,
    setStatus: (s, status) => s.status = status,
    setModal: (s, modalStatus) => s.modalOpen = modalStatus,
    setModalTitle: (s, modalTitle) => s.modalTitle = modalTitle,
    setModalLink: (s, modalLink) => s.modalLink = modalLink,
  },
  actions: {
    async register({
      dispatch
    }, user) {
      await axios({
        url: 'account/register',
        data: user,
        method: 'POST'
      }).then(async response => {
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Выслано письмо с подтверждением'
        }, {
          root: true
        });
        router.push({
          name: 'RegisterLetter'
        });
      }).catch(error => {
        dispatch('global/alert/setAlert', {
          status: 'error',
          text: 'Не удалось зарегистрироваться'
        }, {
          root: true
        });
        router.push({
          name: 'RegisterFailed'
        });
      });
    },
    async confirmRegistration({
      dispatch
    }, user) {
      await axios({
        url: 'account/register/confirm',
        data: user,
        method: 'POST'
      }).then(async response => {
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Регистрация успешно подтверждена'
        }, {
          root: true
        });
        router.push({
          name: 'RegisterSuccess'
        });
      }).catch(async error => {
        dispatch('global/alert/setAlert', {
          status: 'error',
          text: 'Не удалось подтвердить регистрацию'
        }, {
          root: true
        });
        router.push({
          name: 'RegisterConfirmationFailed'
        });
      });
    },
    async login({
      commit
    }, user) {
      commit('setStatus', 'loading');
      await axios({
        url: 'auth/login',
        data: user,
        method: 'POST'
      }).then(response => {
        const token = response.data.data.token;
        localStorage.setItem('user-token', token);
        axios.defaults.headers.common['Authorization'] = token;
        commit('setToken', token);
        commit('setStatus', 'success');
        commit('profile/info/setInfo', response.data.data, {
          root: true
        });
      }).catch(error => {
        commit('setStatus', 'error');
        localStorage.removeItem('user-token');
        throw error;
      });
    },
    async logout({
      commit,
      dispatch
    }) {
      await axios({
        url: 'auth/logout',
        method: 'POST'
      }).then(() => {
        commit('setToken', '');
        commit('setStatus', 'logout');
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Вы вышли из системы'
        }, {
          root: true
        });
        localStorage.removeItem('user-token');
        delete axios.defaults.headers.common['Authorization'];
        window.location.reload();
      }).catch(error => { });
    },
    async sendToSupport(context, supportData) {
      await axios({
        url: 'support',
        data: supportData,
        method: 'POST'
      });
    },
    async modalOff({ commit }) {
      commit('setModal', false);
    },
    async modalOn({ commit }, { header, link }) {
      console.log(1);
      commit('setModal', true);
      commit('setModalTitle', header);
      commit('setModalLink', link);
    },
    async logoutAfterDelete({ commit }) {
      commit('setToken', '');
      commit('setStatus', 'logout');

      localStorage.removeItem('user-token');
      delete axios.defaults.headers.common['Authorization'];
      window.location.reload();
    }
  },
};
