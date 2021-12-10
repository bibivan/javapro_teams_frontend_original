<template lang="pug">
  .search-filter
    .search-filter__block.name
      label.search__label(for="search-people-name") Имя:
      input.search__input(type="text" id="search-people-name" v-model="first_name")
    .search-filter__block.lastname
      label.search__label(for="search-people-lastname") Фамилия:
      input.search__input(type="text" id="search-people-lastname" v-model="last_name")
    .search-filter__block.age
      label.search__label Возраст:
      .search__row
        select.select.search-filter__select(v-model.number="age_from")
          option(value="null" disabled) От
          option(value="item"  v-for="item in maxAge" :key="'ageFrom' + item") От {{ item }}
        span.search__age-defis —
        select.select.search-filter__select(v-model.number="age_to")
          option(value="null" disabled) До
          option(value="item"  v-for="item in maxAge" :key="'ageTo' + item") От {{ item }}
    .search-filter__block.region
      label.search__label Регион:
      .search__row
        select.select.search-filter__select(v-model="country")
          option(value="null") Страна
          option(v-for="country in getCountries" :key="country.id" :value="country.id") {{ country.title }}

        select.select.search-filter__select(v-model="city" :disabled="citiesDisabled")
          option(value="null") Город
          option(v-for="city in getCities" :key="city.id") {{ city.title }}
    .search-filter__block.btn-news(@click.prevent="onSearchUsers")
      button-hover Применить
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SearchFilterUsers',
  data: () => ({
    first_name: null,
    last_name: null,
    age_from: null,
    age_to: null,
    maxAge: 100,
    country: null,
    city: null,
    offset: 0,
    itemPerPage: 20,
    disabled: true
  }),
  computed: {
    ...mapGetters('profile/country_city', ['getCountries', 'getCities']),
    citiesDisabled () {
      console.log(this.getCities)
      if (this.getCities) return false
    },
  },
  methods: {
    ...mapActions('global/search', ['searchUsers']),
    ...mapActions('profile/country_city', ['apiCountries', 'apiCities']),
    onSearchUsers() {
      let { first_name, last_name, age_from, age_to, country, city } = this
      this.searchUsers({ first_name, last_name, age_from, age_to, country, city })
    },
  },
  created() {
    this.apiCountries()
  },
  watch: {
    country(value) {
      console.log(value)
      if (!value || value === "null") return
      this.apiCities({ countryId: value })
    }
  },
}
</script>
