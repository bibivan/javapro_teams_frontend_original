<template lang="pug">
  .user-info-form__block
    span.user-info-form__label Страна
    .user-info-form__wrap
      input.user-info-form__input(type="text" :value="value.country" placeholder="Введите страну" @input="$emit('input', $event.target.value.country)")
  .user-info-form__block
    span.user-info-form__label Город
    .user-info-form__wrap
      input.user-info-form__input(type="text" :value="value.city" placeholder="Введите город" @input="$emit('input', $event.target.value.city)")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'UserInfoFormBlock',
  props: {
    value: Object
  },
  data: () => ({
    country: '',
    city: '',
    countries: [],
    cities: [],
  }),
  methods: {
    ...mapActions('profile/country_city', ['apiCountries', 'apiCities']),
  },
  mounted() {
    this.apiCountries()
    this.apiCities()
  }
}
</script>