<template lang="pug">
.form__group
  input.form__checkbox(
    type='checkbox',
    name='confirm',
    v-model='confirm',
    :id='id',
    :class='{ invalid: v.$dirty && !v.sameAs }'
  )
  label.form__checkbox-label(:for='id') {{ $t("policy") }} &nbsp;
    a(@click='modalShow({ header: $t("header"), link: "http://31.40.251.201:8086/policy.html" })') {{ $t("policy2") }} &nbsp;
    | {{ $t("policy3") }} &nbsp;
    a(@click='modalOn({ header: $t("header2"), link: "http://31.40.251.201:8086/personal-data.html" })') {{ $t("policy4") }}.

  modal.custom-modal(
    name='privacy',
    slot='top-right',
    scrollable,
    height='auto',
    width='90%',
    :styles='{ top: "20px", padding: "20px" }',
    @click='hideModal'
  )
    button.custom-modal-close(@click='$modal.hide("privacy")') &#10006;
    PrivacyPolicy
</template>

<script>
import { mapActions } from 'vuex'
import PrivacyPolicy from './PrivacyPolicy.vue'

export default {
  name: 'ConfirmField',
  components: {
    PrivacyPolicy
  },
  props: {
    value: {
      type: Boolean,
      default: ''
    },
    v: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions('auth/api', ['modalOn']),
    modalShow() {
      this.$modal.show('privacy')
    },
    hideModal() {
      this.$modal.show('privacy')
    }
  },
  computed: {
    confirm: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  i18n: {
    messages: {
      en: {
        policy: 'I agree with',
        policy2: 'the privacy policy',
        policy3: 'and the transfer',
        policy4: 'of personal data',
        header: 'Privacy Policy',
        header2: 'Personal Information'
      },
      ru: {
        policy: 'Я согласен с',
        policy2: 'политикой конфиденциальности',
        policy3: 'и передачей',
        policy4: 'персональных данных',
        header: 'Политика конфиденциальности',
        header2: 'Персональные данные'
      }
    }
  }
}
</script>

<style scoped>
.custom-modal {
  color: #000;
}

.custom-modal-top {
  top: 20px;
}

.custom-modal-close {
  position: absolute;
  right: 20px;
  border: none;
  background: #fff;
  font-size: 18px;
  cursor: pointer;
}
</style>
