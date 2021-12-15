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
          option(:value="item" v-for="item in maxAge" :key="'ageFrom' + item") От {{ item }}
        span.search__age-defis —
        select.select.search-filter__select(v-model.number="age_to")
          option(value="null" disabled) До
          option(:value="item" v-for="item in maxAge" :key="'ageTo' + item") До {{ item }}
    .search-filter__block.region
      label.search__label Регион:
      .search__row
        select.select.search-filter__select(v-model="country")
          option(value="null") Страна
          option(v-for="country in getCountries" :key="country.id" :value="country.id") {{ country.title }}

        //vSelect.search-filter__select(v-model="country" :options="getCountries" label="title" placeholder="Страна")
        //
        //vSelect.search-filter__select(v-model="city" :options="getCities" :disabled="citiesDisabled" placeholder="Город")
        //  option(value="null") Город
        //  option(v-for="city in getCities" :key="city.id") {{ city.title }}

        select.select.search-filter__select(v-model="city" :disabled="citiesDisabled")
          option(value="null") Город
          option(v-for="city in getCities" :key="city.id") {{ city.title }}
    .search-filter__block.btn-news(@click.prevent="onSearchUsers")
      button-hover Применить

    //paginate(
    //  v-if="!!getFoundTotal"
    //  :page-count="20"
    //  :prev-text="'Назад'"
    //  :next-text="'Вперед'"
    //  :container-class="'className'")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  name: 'SearchFilterUsers',
  components: {
    vSelect
  },
  data: () => ({
    first_name: null,
    last_name: null,
    age_from: null,
    age_to: null,
    maxAge: 100,
    country: null,
    city: null,
    offset: 2,
    itemPerPage: 20,
    disabled: true,
    searchComplete: false
  }),
  computed: {
    ...mapGetters('profile/country_city', ['getCountries', 'getCities']),
    ...mapGetters('global/search', ['getFoundTotal']),
    citiesDisabled () {
      if (this.getCities) return false
    },
  },
  methods: {
    ...mapActions('global/search', ['searchUsers']),
    ...mapActions('profile/country_city', ['apiCountries', 'apiCities']),
    async onSearchUsers() {
      let { first_name, last_name, age_from, age_to, country, city, offset } = this
      await this.searchUsers({ first_name, last_name, age_from, age_to, country, city, offset })
      // this.searchComplete = true;
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

<style  lang="stylus">

.search-filter {


  .vs__dropdown-toggle {
    font-size: 15px;
    color: #000;
    padding: 0 15px;
    height: 45px;
    border: 1px solid #E3E3E3;
    border-radius: 0;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    white-space: nowrap;
    background: #fff url('/static/img/arrow-bottom.png') no-repeat calc(100% - 10px) 16px;


    .vs__actions {
      display none
    }
  }
}

</style>
