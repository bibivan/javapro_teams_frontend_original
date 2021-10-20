// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import moment from 'moment';
import App from './App';
import router from './router';
import store from './store';
import VModal from 'vue-js-modal';
import Vuelidate from 'vuelidate';
import './settings';

Vue.use(VueI18n);
Vue.use(VModal);
Vue.use(Vuelidate);

if (!localStorage.getItem('lang')) {
  localStorage.setItem('lang', 'ru');
}

moment.locale(localStorage.getItem('lang'));

const i18n = new VueI18n({
  locale: localStorage.getItem('lang'),
  messages: {}
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
});
