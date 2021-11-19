<template lang="pug">
.login
  h2.login__title.form__title {{ $t("title") }}
  form.login__form(@submit.prevent='submitHandler')
    email-field#login-email(v-model='email', :v='$v.email')
    password-field#login-password(
      v-model='password',
      :v='$v.password',
      autocomplete='current-password')
    .login__action
      button-hover(tag='button', type='submit', variant='white') {{ $t("login") }}
      router-link.login__link(:to='{ name: "Forgot" }') {{ $t("forgot") }}
    .login__message-error(v-if="incorrectData")
      span.login__caption-error {{ $t("incorrectData1") }}
      | {{ $t("incorrectData2") }}


</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
import PasswordField from '@/components/FormElements/PasswordField'
import EmailField from '@/components/FormElements/EmailField'
export default {
  name: 'Login',
  components: {
    PasswordField,
    EmailField
  },
  data: () => ({
    email: '',
    password: '',
    incorrectData: false,
  }),
  computed: {
    ...mapGetters('auth/api', ['authStatus']),
    redirectUrl() {
      return this.$route.query.redirect
    },
    authErrorMessage() {
      return this.authErr
    }
  },
  methods: {
    ...mapActions('auth/api', ['login']),
    ...mapActions('profile/info', ['apiInfo']),
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.login({ email: this.email, password: this.password })
        .then(() => {
          this.incorrectData = false
          this.apiInfo().then(() => {
            if (this.authStatus === 'error') {
              return
            }
            this.$router.push({ name: this.redirectUrl || 'News' })
          })
        })
        .catch(error => {
          if (error.response.status === 403) {
            console.log('da')
            this.incorrectData = true
          }
        })
    },
    hideModal() {
      this.$modal.show('privacy')
    }
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8), passwordRule: true }
  },
  i18n: {
    messages: {
      en: {
        title: 'Log in',
        login: 'Sign in',
        forgot: 'Forgot your password?',
        incorrectData1: 'Unable to login',
        incorrectData2: 'Please check the spelling of your login and password.',
        unknownError: 'Unknown error'
      },
      ru: {
        title: 'Войдите в аккаунт',
        login: 'Войти',
        forgot: 'Забыли пароль?',
        incorrectData1: 'Не удаётся войти.',
        incorrectData2: 'Пожалуйста, проверьте правильность написания логина и пароля.',
        unknownError: 'Что-то пошло не так'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/base/vars.styl';

.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login__form {
  position: relative;
}

.login__title {
  margin-bottom: 50px;
}

.login__action {
  display: flex;
  align-items: center;
  margin-top: 50px;
}

.login__message-error {
  position: absolute;
  display block;
  top: -110%;
  padding: 10px;
  width: 100%;
  border: 1px solid white;
  line-height: 24px;
}

.login__caption-error {
  display: block;
  margin-bottom: 15px;
  font-weight: 600;
}

.login__link {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 30px;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    color: #fff;
  }
}
</style>
