<template lang="pug">
.form__group(:class='{ fill: password.length > 0 }')
  label.form__label(:for='id') {{ $t("password") }}
    span.required-field *
  input.form__input(
    name='password',
    :id='id',
    :type='passwordFieldType',
    :autocomplete='autocomplete',
    v-model.trim='password',
    :class='{ invalid: (v.$dirty && !v.required) || (v.$dirty && !v.minLength) || !v.passwordRule }'
  )
    //- @change='passwordBlur',
    //- @focus='passwordFocus',
  span.form__error(v-if='v.$dirty && !v.required') {{ $t("enterPassword") }}
  .form__error-block
    template(v-if='registration')
      span.form__password-helper(:class='levelInfo.class')
      span.form__error(v-if='password.length >= 1') {{ levelInfo.text }}
    template(v-else)
      span.form__error(v-if='v.$dirty && !v.minLength') {{ $t("errorPassword1") }} {{ v.$params.minLength.min }} {{ $t("errorPassword2") }} {{ password.length }}
  template(v-if='info')
    .form__password-icon.active
      simple-svg(:filepath='"/static/img/password-info.svg"')
    p.form__password-info {{ $t("infoPassword") }}
  .form__password-icon(:class='{ active: password.length > 0 }', @click='switchVisibility', v-if='!registration')
    simple-svg(:filepath='"/static/img/password-eye.svg"')
</template>

<script>
export default {
  name: 'PasswordField',
  props: {
    value: {
      type: String,
      default: ''
    },
    v: {
      type: Object,
      required: true
    },
    info: Boolean,
    registration: Boolean,
    id: {
      type: String,
      required: true
    },
    autocomplete: {
      type: String,
      required: true
    }
  },
  data: () => ({
    passwordFieldType: 'password',
    passwordHelperShow: true
  }),
  computed: {
    password: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    levelInfo() {
      if (!this.passwordHelperShow) return { text: null, class: null }

      if (this.password.length === 0) {
        return { text: null, class: null }
      }

      if (!this.v.passwordRule || this.password.length < 8) {
        return { text: this.$t('notValid'), class: 'easy' }
      } else if (this.password.length >= 8 && this.password.length < 11) {
        return { text: this.$t('middle'), class: 'middle' }
      } else {
        return { text: this.$t('hard'), class: 'hard' }
      }
    }
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
    // passwordBlur() {
    //   this.passwordHelperShow = false
    //   this.v.$touch()
    // },
    // passwordFocus() {
    //   this.passwordHelperShow = true
    //   this.v.$touch()
    // }
  },
  i18n: {
    messages: {
      en: {
        password: 'Password',
        enterPassword: 'Enter password',
        errorPassword1: 'Password must be at least',
        errorPassword2: 'characters. He is now',
        infoPassword:
          'The password must consist of Latin letters, numbers and symbols. Must contain one capital letter, one number and 8 characters.',
        easy: 'Easy',
        middle: 'Middle',
        hard: 'Hard',
        notValid: 'Does not meet safety requirements'
      },
      ru: {
        password: 'Пароль',
        enterPassword: 'Введите пароль',
        errorPassword1: 'Пароль должен быть не менее',
        errorPassword2: 'символов. Сейчас он',
        infoPassword:
          'Пароль должен состоять из латинских букв, цифр и знаков. Обязательно содержать одну заглавную букву, одну цифру и состоять из 8 символов.',
        easy: 'Слабый',
        middle: 'Средний',
        hard: 'Надёжный',
        notValid: 'Не соответствует требованиям безопасности'
      }
    }
  }
}
</script>

