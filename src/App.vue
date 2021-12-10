<template lang="pug">
  #app
    component(:is="layout" v-if="$route.meta.layout")
      router-view
      //s2_t2-t5
    //v-snackbar(:value="getState.show" :timeout="getState.timeout" :color="getState.status" right bottom) {{getState.text}}
</template>

<script>
import { VSnackbar } from 'vuetify/lib'
import { mapGetters, mapMutations } from 'vuex'
import FormLayout from '@/layouts/FormLayout'
import MainLayout from '@/layouts/MainLayout'
import EmptyLayout from '@/layouts/EmptyLayout'

export default {
  name: 'App',
  components: {
    FormLayout,
    MainLayout,
    EmptyLayout
    // s2_t2-t5
    // VSnackbar
  },
  computed: {
    ...mapGetters('global/alert', ['getState']),
    ...mapGetters('auth/api', ['apiToken']),
    ...mapMutations('auth/api', ['setToken']),
    layout() {
      return this.$route.meta.layout + '-layout'
    }
  },
}
</script>

<style lang="stylus">
@import './assets/stylus/main.styl';
@import 'vue-select/dist/vue-select.css';

.v-snack__wrapper {
  &.success {
    background-color: eucalypt;
  }

  &.error {
    background-color: wild-watermelon;
  }
}
</style>
