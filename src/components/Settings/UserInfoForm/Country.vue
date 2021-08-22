<template lang="pug">
  .user-info-form__block
    span.user-info-form__label Страна
    input.user-info-form__input(
      type="text"
      :value="value.country"
      @input="$emit('input', $event.target.value)"
      placeholder="Введите город"
    )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'UserInfoFormCountry',
  props: {
    value: Object,
  },
  data: () => ({
    country: this.value.country,
    city: this.value.city,
    countries: [],
    cities: [],
    isCountriesShow: false,
    isCitiesShow: false,
    isCountryShow: false,
  }),
  computed: {
    ...mapGetters('profile/country_city', ['getCountries', 'getCities']),
    countries() {
      return this.getCountries.filter(c => c.title.toUpperCase().includes(this.country.toUpperCase()))
    },
    cities() {
      return this.getCities.filter(c => c.country.toUpperCase().includes(this.city.toUpperCase()))
    },
  },
  methods: {
    ...mapActions('profile/country_city', ['apiCountries', 'apiAllCities']),
    countriesOpen() {
      this.isCountriesShow = true
    },
    countriesClose() {
      this.isCountriesShow = false
    },
    setCountry(value) {
      this.country = value
      this.countriesClose()
    },
    citiesOpen() {
      this.isCitiesShow = true
    },
    citiesClose() {
      this.isCitiesShow = false
    },
    setCity(value) {
      if (value === '') {
        this.country = ''
        this.isCountryShow = false
        return
      }
      if (this.cities.length === 0) {
        console.log(value)
        this.country = ''
        this.isCountryShow = true
        return
      }
      this.city = value.country
      if (this.country !== value.city) this.country = value.city
      this.citiesClose()
    }
  },
  mounted() {
    this.apiCountries()
    this.apiAllCities()
  }
}
</script>
