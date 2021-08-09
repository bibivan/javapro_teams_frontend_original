<template lang="pug">
  .registration
    form.registration__form(@submit.prevent="submitHandler")
      .form__block
        h4.form__subtitle Аккаунт
        email-field(id="register-email" v-model="email" :v="$v.email" :class="{checked: $v.email.required && $v.email.email}")
        password-field(id="register-password" v-model="passwd1" :v="$v.passwd1" info registration :class="{checked: $v.passwd1.required && $v.passwd2.sameAsPassword && $v.passwd1.minLength}" autocomplete="new-password")
        password-repeat-field(id="register-repeat-password" v-model="passwd2" :v="$v.passwd2" :class="{checked: $v.passwd1.required && $v.passwd2.sameAsPassword && $v.passwd2.minLength}" autocomplete="new-password")
      .form__block
        h4.form__subtitle Личные данные
        name-field(id="register-firstName" v-model="firstName" :v="$v.firstName")
        name-field(id="register-lastName" v-model="lastName" :v="$v.lastName" label="Фамилия")
      .form__block.captcha
        vue-hcaptcha(sitekey="6cb436a2-4748-4d38-8404-113bf4e2069f" @verify="onVerify")
      .registration__action
        button-hover(tag="button" type="submit" variant="white") Зарегистрироваться
</template>

<script>
import { mapActions } from 'vuex'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import PasswordField from '@/components/FormElements/PasswordField'
import PasswordRepeatField from '@/components/FormElements/PasswordRepeatField'
import EmailField from '@/components/FormElements/EmailField'
import NameField from '@/components/FormElements/NameField'
import VueHcaptcha from '@hcaptcha/vue-hcaptcha';

export default {
  name: 'Registration',
  components: {
    PasswordField,
    EmailField,
    NameField,
    PasswordRepeatField,
    VueHcaptcha,
  },
  data: () => ({
    email: '',
    passwd1: '',
    passwd2: '',
    firstName: '',
    lastName: '',
    // hcaptcha
    verified: false,
    token: null,
    eKey: null,
  }),
  methods: {
    onVerify(token) {
      this.verified = true
      this.token = token
    },
    ...mapActions('auth/api', ['register']),
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      // проверка прохождения hCaptcha
      if (!this.verified) {
        document.querySelector('.captcha').classList.add('error')
        return
      }

      const { email, passwd1, passwd2, firstName, lastName, token } = this
      this.register({ email, passwd1, passwd2, firstName, lastName, token }).then(() => {
        this.$router.push({ name: 'RegisterSuccess' })
      })
    }
  },
  validations: {
    email: { required, email },
    passwd1: { required, minLength: minLength(8) },
    passwd2: { required, minLength: minLength(8), sameAsPassword: sameAs('passwd1') },
    firstName: { required, minLength: minLength(3) },
    lastName: { required, minLength: minLength(3) }
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.registration {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.registration__action {
  margin-top: 40px;

  @media (max-width: breakpoint-xxl) {
    margin-top: 20px;
  }
}

.captcha.error {
  display: inline-block;
  outline: 1px #ff5573 solid;
}
</style>
