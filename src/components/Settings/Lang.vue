<template lang="pug">
  ul.language-list
    li.language-item(
      v-for="lang in filterLanguages"
      :key="lang.id"
      @click="setActiveHandler(lang)"
    ) {{lang.title}}
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'Lang',
  data: () => ({
    language: '',
  }),
  computed: {
    ...mapGetters('auth/languages', ['getLanguages', 'getLang']),
    filterLanguages() {
      return this.language.length > 0
        ? this.getLanguages.filter(el => el.title.toLowerCase().indexOf(this.language.toLowerCase()) >= 0)
        : this.getLanguages
    },
  },
  methods: {
    ...mapMutations('auth/languages', ['toggleLanguageBlock']),
    ...mapActions('auth/languages', ['apiLanguages']),
    setActiveHandler(lang) {
      switch (lang.title) {
        case 'Русский':
          localStorage.setItem('lang', 'ru')
          break
        case 'English':
          localStorage.setItem('lang', 'en')
          break
        default:
          localStorage.setItem('lang', 'ru')
      }

      this.toggleLanguageBlock()
      window.location.reload()
    }
  },
  mounted() {
    if (this.getLanguages.length === 0) this.apiLanguages()
  },
  i18n: {
    messages: {
      "en": {
        "title": "Choose language",
        "placeholder": "Start typing the name of the language"
      },
      "ru": {
        "title": "Выберите язык",
        "placeholder": "Начните вводить название языка"
      }
    }
  },
}
</script>

<style lang="stylus">

.language-list {
  display: inline-flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: auto;
  max-height: 350px;
}

.language-item {
  margin-bottom: 15px;
  font-weight: 300;
  font-size: 20px;
  line-height: 25px;
  color: charade;
  width: 190px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    color: eucalypt;
  }
}
</style>
