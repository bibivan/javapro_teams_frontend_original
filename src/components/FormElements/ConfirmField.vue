<template lang="pug">
  .form__group
    input.form__checkbox(type="checkbox" name="confirm" v-model="confirm" :id="id" :class="{invalid: (v.$dirty && !v.sameAs)}")
    label.form__checkbox-label(:for="id") Я согласен с
      a(@click="modalOn({ header: 'Политика конфиденциальности', link: 'http://31.40.251.201:8086/policy.html' })") политикой конфиденциальности
      | и передачей
      a(@click="modalOn({ header:'Персональные данные', link: 'http://31.40.251.201:8086/personal-data.html' })") персональных данных.
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ConfirmField',
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
      "en": {
        "policy": "Я согласен с",
        "policy2": "политикой конфиденциальности",
        "policy3": "и передачей",
        "policy4": "персональных данных."
      },
      "ru": {
        "policy": "Я согласен с",
        "policy2": "политикой конфиденциальности",
        "policy3": "и передачей",
        "policy4": "персональных данных."
      }
    }
  },
}
</script>
