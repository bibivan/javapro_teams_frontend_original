<template lang="pug">
  .shift-password
    form.shift-password__form(@submit.prevent="submitHandler")
      .form__block
        h4.form__subtitle {{ $t('password') }}
        password-field(id="shift-password"
          v-model="password",
          :v="$v.password",
          autocomplete='new-password',
          :class="{checked: $v.password.required && $v.passwordTwo.sameAsPassword}",
          info,
          registration)
        password-repeat-field(id="shift-repeat-password",
          v-model="passwordTwo",
          :v="$v.passwordTwo",
          autocomplete='new-password',
          :class="{checked: $v.password.required && $v.passwordTwo.sameAsPassword}")
      .shift-password__action
        button-hover(tag="button" type="submit" variant="white") {{ $t('change') }}
</template>

<script>
import {mapActions } from 'vuex'
import {required, sameAs, minLength, helpers} from 'vuelidate/lib/validators'
import PasswordField from '@/components/FormElements/PasswordField'
import PasswordRepeatField from '@/components/FormElements/PasswordRepeatField'

const passwordRule = helpers.regex('passwordRule', /^(?=.*[A-Z])(?=.*[0-9]){8,}/)

export default {
  name: 'ShiftPassword',
  components: {
    PasswordField,
    PasswordRepeatField,
  },
  data: () => ({
    password: '',
    passwordTwo: '',
  }),
  methods: {
    ...mapActions('profile/account', ['passwordSet']),
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.passwordSet(this.password).then(() => {
        // this.$router.push({ name: 'Login' })
      })
    }
  },
  validations: {
    password: { required, minLength: minLength(8), passwordRule },
    passwordTwo: { required, minLength: minLength(8), sameAsPassword: sameAs('password'), passwordRule }
  },
  i18n: {
    messages: {
      "en": {
        "password": "Change password",
        "change": "Change"
      },
      "ru": {
        "password": "Смена пароля",
        "change": "Сменить"
      }
    }
  },
}
</script>

<style lang="stylus">
.shift-password {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}

.shift-password__title {
  margin-bottom: 20px;
}

.shift-password__action {
  margin-top: 40px;
}
</style>
