
<template lang="pug">
  .form__group
    textarea.form__input--textarea(:id="id" v-model="message" name="message" :class="{invalid: (v.$dirty && !v.required)}")
    label.form__label(:for="id") {{$t('enterMessage')}}
    span.form__error(v-if="v.$dirty && !v.required") {{ $t('enterMessage') }}
</template>

<script>


export default {
  name: "SupportMessageField",
  props: {
    value: {
      type: String,
      default: ''
    },
    v: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Введите сообщение'
    }
  },
  computed: {
    message: {
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
        "enterMessage": "Enter message",
      },
      "ru": {
        "enterMessage": "Введите сообщение",
      }
    }
  },
}
</script>


<style lang="stylus" scoped>
@import '../../assets/stylus/base/vars.styl';

.form__input--textarea {
  padding: 10px;
  width: 100%;
  min-height: 200px;
}
</style>
