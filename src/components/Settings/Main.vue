<template lang="pug">
  .settings-main
    user-info-form-block(label="Имя:" placeholder="Введите имя" v-model="name" )
    user-info-form-block(label="Фамилия:" placeholder="Введите фамилию" v-model="lastName" )
    user-info-form-block(label="Телефон:" placeholder="Введите телефон" v-model="phone" phone)

    .user-info-form__block(v-if="country || isCountryShow")
      span.user-info-form__label Страна
      .user-info-form__wrap.countries(v-click-outside="countriesClose")
        input.user-info-form__input(
          type="text"
          v-model="country"
          placeholder="Введите страну"
          @input="countriesOpen"
        )

        ul.countries__list(v-if="countries.length !== 0 && isCountriesShow")
          li.countries__item(
            v-for="item in countries"
            :key="item.id"
            tabindex=0
            @click="setCountry(item.title)"
            @keyup.enter="setCountry(item.title)"
          ) {{item.title}}

    .user-info-form__block
      span.user-info-form__label Город
      .user-info-form__wrap.countries(v-click-outside="citiesClose")
        input.user-info-form__input(
          type="text"
          v-model="city"
          placeholder="Введите город"
          @input="citiesOpen"
          @keyup.enter="setCity(city)"
        )

        ul.countries__list(v-if="cities.length !== 0 && isCitiesShow")
          li.countries__item(
            v-for="item in cities"
            :key="item.countryId"
            @click="setCity(item)"
            @keyup.enter="setCity(item)"
            tabindex=0
          ) {{item.country}}

    //- UserInfoFormCountry(v-model="country_city.country")
    //- user-info-form-block(label="Страна:" placeholder="Введите страну" v-model="country")
    //- user-info-form-block(label="Город:" placeholder="Введите город" v-model="city")

    .user-info-form__block
      span.user-info-form__label Дата рождения:
      .user-info-form__wrap
        select.select.user-info-form__select.day(v-model="day")
          option(v-for="d in days" :key="d") {{d}}
        select.select.user-info-form__select.month(v-model="month")
          option(v-for="month in months" :key="month.val" :value="month") {{month.text}}
        select.select.user-info-form__select.year(v-model="year")
          option(v-for="i in years" :key="i") {{i}}
    .user-info-form__block.user-info-form__block--photo
      span.user-info-form__label Фотография:
      .user-info-form__wrap
        .user-info-form__photo-wrap
          input.user-info-form__input-photo(type="file" ref="photo" id="photo"  @change="processFile($event)" accept="image/*")
          label.user-info-form__input.user-info-form__input--photo(for="photo")
            span.setting-main__photo-delete(v-if="photo") {{photo.name}}
              simple-svg(:filepath="'/static/img/delete.svg'" @click.native.prevent="deletePhoto")
          button-hover(variant="fill" bordered @click.native="loadPhoto") Загрузить
        .user-info-form__photo-pic(v-if="src")
          img(:src="src" :alt="name +' ' + lastName")
    user-info-form-block(label="О себе:" v-model="about" about)
    .user-info-form__block.user-info-form__block--actions
      span.user-info-form__label
      .user-info-form__wrap
        button-hover(@click.native.prevent="submitHandler") Сохранить
        router-link.settings-main__back(:to="{name: 'Profile'}")
          button-hover(variant="red" bordered) Отменить
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import ClickOutside from 'vue-click-outside'
import UserInfoFormBlock from '@/components/Settings/UserInfoForm/Block.vue'
import UserInfoFormCountry from '@/components/Settings/UserInfoForm/Country.vue'
export default {
  name: 'SettingsMain',
  components: { UserInfoFormBlock,  UserInfoFormCountry },
  data: () => ({
    name: '',
    lastName: '',
    phone: '',
    about: '',
    day: 1,
    month: { val: 1, text: 'Января' },
    year: 2000,
    months: [
      { val: 1, text: 'Января' },
      { val: 2, text: 'Февраля' },
      { val: 3, text: 'Марта' },
      { val: 4, text: 'Апреля' },
      { val: 5, text: 'Мая' },
      { val: 6, text: 'Июня' },
      { val: 7, text: 'Июля' },
      { val: 8, text: 'Августа' },
      { val: 9, text: 'Сентября' },
      { val: 10, text: 'Октября' },
      { val: 11, text: 'Ноября' },
      { val: 12, text: 'Декабря' }
    ],
    photo: null,
    src: '',
    country: '',
    city: '',
    isCountriesShow: false,
    isCitiesShow: false,
    isCountryShow: false,
    country_city: {
      country: '',
      city: ''
    },
  }),
  computed: {
    ...mapGetters('global/storage', ['getStorage']),
    ...mapGetters('profile/info', ['getInfo']),
    ...mapGetters('profile/country_city', ['getCountries', 'getCities']),
    countries() {
      return this.getCountries.filter(c => c.title.toUpperCase().includes(this.country.toUpperCase()))
    },
    cities() {
      return this.getCities.filter(c => c.country.toUpperCase().includes(this.city.toUpperCase()))
    },
    phoneNumber() {
      return this.phone.replace(/\D+/g, '')
    },
    years() {
      return Array.from({ length: 60 }, (value, index) => 1970 + index)
    },
    days() {
      return this.month.val === 2
        ? this.year & 3 || (!(this.year % 25) && this.year & 15)
          ? 28
          : 29
        : 30 + ((this.month.val + (this.month.val >> 3)) & 1)
    }
  },
  methods: {
    ...mapActions('global/storage', ['apiStorage']),
    ...mapActions('profile/info', ['apiChangeInfo']),
    ...mapActions('profile/country_city', ['apiCountries', 'apiAllCities']),
    submitHandler() {
      if (this.src !== this.getInfo.photo && this.src !== '') {
        this.apiStorage(this.photo).then(() => {
          this.apiChangeInfo({
            photo_id: this.getStorage && this.getStorage.id,
            first_name: this.name,
            last_name: this.lastName,
            birth_date: moment([this.year, this.month.val - 1, this.day]).format(),
            phone: this.phoneNumber,
            about: this.about,
            country: this.country,
            city: this.city
          })
        })
      } else {
        this.apiChangeInfo({
          first_name: this.name,
          last_name: this.lastName,
          birth_date: moment([this.year, this.month.val - 1, this.day]).format(),
          phone: this.phoneNumber,
          about: this.about,
          country: this.country,
          city: this.city
        })
      }
    },
    processFile(event) {
      this.photo = event.target.files[0]
      const reader = new window.FileReader()
      reader.onload = e => (this.src = e.target.result)
      reader.readAsDataURL(this.photo)
    },
    loadPhoto() {
      this.$refs.photo.click()
    },
    deletePhoto() {
      this.photo = null
      this.src = ''
    },
    setInfo() {
      this.name = this.getInfo.first_name
      this.lastName = this.getInfo.last_name
      this.src = this.getInfo.photo
      this.phone = this.getInfo.phone ? this.getInfo.phone.replace(/^[+]?[78]/, "") : "";
      if (this.getInfo.birth_date) {
        this.day = moment(this.getInfo.birth_date * 1000).date()
        this.month = this.months[moment(this.getInfo.birth_date * 1000).month()]
        this.year = moment(this.getInfo.birth_date * 1000).year()
      }
      this.about = this.getInfo.about
      this.country = this.getInfo.country
      this.city = this.getInfo.city
    },
    countriesOpen() {
      this.isCountriesShow = true
    },
    countriesClose() {
      if (this.city === '') {
        this.country = ''
        this.isCountryShow = false
      }
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
        this.country = ''
        this.isCountryShow = true
        return
      }
      this.city = value.country
      if (this.country !== value.city) this.country = value.city
      this.citiesClose()
    }
  },
  watch: {
    getInfo(value) {
      if (!value) return
      this.setInfo()
    }
  },
  mounted() {
    if (this.getInfo) this.setInfo()
    this.apiCountries()
    this.apiAllCities()
  },
  directives: {
    ClickOutside
  },
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.settings-main {
  background: #fff;
  box-shadow: standart-boxshadow;
  padding: 40px 10px 50px;

  .user-info-form__label {
    white-space: pre-wrap;
  }

  @media (max-width: breakpoint-xl) {
    padding: 40px 20px;
  }
}

.settings-main__back {
  margin-left: 20px;
}

.countries {
  position: relative;
  &__list {
    position: absolute;
    top: 50px;
    width: 100%;
    max-height: 150px;
    z-index: 10;

    overflow-y: scroll;

    background-color: #FFFFFF;
    border: 1px solid #c4c4c4;
  }
  &__item {
    padding: 5px 20px;

    &:hover, &:focus {
      background-color: rgba(0,0,0,0.3);
      cursor: pointer;
    }

  }
}
</style>
