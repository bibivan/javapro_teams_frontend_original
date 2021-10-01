<template lang="pug">
  .support
    form.support__form.form(@submit.prevent="submitHandler")
      .form__block
        h4.form__subtitle {{ $t('feedback') }}
        email-field(id="support-feedback" v-model="email" name="email" :v="$v.email" :class="{checked: $v.email.required && $v.email.email}")
      .form__block
        h4.form__subtitle {{ $t('aboutProblem') }}
        SupportMessageField.form__group--message(id="support-message" v-model="message" name="message" :v="$v.textarea" :label="$t('aboutProblem')")
      button-hover.login__action(tag="button" type="submit" variant="white") {{ $t('sendMessage') }}
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import SupportMessageField from "@/components/FormElements/SupportMessageField";
import EmailField from "@/components/FormElements/EmailField";
import {mapActions} from "vuex";

export default {
  name: "Support",
  components: {
    EmailField,
    SupportMessageField,
  },
  data: () => ({
    email: '',
    message: '',
  }),
  computed: {
    getLang() {
      return localStorage.getItem('lang')
    }
  },
  methods: {
    ...mapActions('auth/api', ['sendToSupport']),
    submitHandler() {
      console.log(this.email)
      console.log(this.message)
      // проверка прохождения hCaptcha
      this.sendToSupport({ email: this.email, password: this.message })
        .catch(error => {})
    }
  },
  validations: {
    email: { required, email },
    textarea: { required}
  },
  i18n: {
    messages: {
      "en": {
        "aboutProblem": "Describe your problem",
        "feedback": "Enter your email for back communication",
        "sendMessage": "Send"
      },
      "ru": {
        "aboutProblem": "Опишите свою проблему",
        "feedback": "Введите почту для обратной связи",
        "sendMessage": "Отправить"
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/base/vars.styl';

.support {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login__action {
  display: flex;
  align-items: center;
  margin-top: 50px;
}
</style>
