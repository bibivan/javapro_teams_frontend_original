import axios from 'axios'
import store from '@/store'

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

axios.defaults.headers['content-type'] = 'application/json';
axios.defaults.withCredentials = true;
switch (NODE_ENV) {
  case 'development':
    axios.defaults.baseURL =  'http://127.0.0.1:8086/api/v1/';
    break;
  case 'production':
    axios.defaults.baseURL =  'http://localhost:8086/api/v1/';
    break;
  default:
    axios.defaults.baseURL =  'https://virtserver.swaggerhub.com/andrewleykin/social/1.0.4/api/v1/';
}

const token = localStorage.getItem('user-token')
console.log('TOKEN: ', token)
if (token) axios.defaults.headers.common['Authorization'] = token

axios.interceptors.response.use(null, error => {
  // добавить проверку на законченный токен и сделать выход из приложения
  // store.dispatch('auth/api/logout')
  if (error.response.status === 401) {
    store.dispatch('auth/api/logout')
    window.location.reload()
  }

  const snack = document.querySelector('.v-snack')
  const timeout = snack ? 3000 : 0
  const message = error.response.data.error_description || error.response.data.path + ' - ' + error.response.data.error
  
  
  setTimeout(() => {
    store.dispatch('global/alert/setAlert', {
      status: 'error',
      text: message
    })
  }, timeout) 

  return Promise.reject(error)
});
