<template lang="pug">
  .friends-possible(v-if="requestFriends.length > 0")
    h4.friends-possible__title {{ $t('title') }}
    ul.friends-possible__list
      li.friends-possible__item(v-for="user in requestFriends" :key="user.id")
        .friends-possible__pic
          img(:src="user.photo" :alt="user.first_name")
        router-link.friends-possible__name(:to="{name: 'ProfileId', params: {id: user.id}}" replace) {{user.first_name + ' ' + user.last_name}}
        .friends-possible__response
          a.friends-possible__link.friends-possible__link--add(href="#" @click.prevent="apiAddFriends(user.id)") {{ $t('add') }}
          a.friends-possible__link.friends-possible__link--refuse(href="#" @click.prevent="apiRefuseRequest(user.id)") {{ $t('refuse') }}
    router-link.friends-possible__btn(href="#" :to="{name: 'FriendsFind'}")
      simple-svg(:filepath="'/static/img/search.svg'")
      span.friends-possible__link {{ $t('find') }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FriendsRequest',
  computed: {
    ...mapGetters('profile/friends', ['getResultById']),
    requestFriends() {
      return this.getResultById('request')
    }
  },
  methods: {
    ...mapActions('profile/friends', ['apiAddFriends', 'apiRequest', 'apiRefuseRequest'])
  },
  mounted() {
    if (this.requestFriends.length === 0) this.apiRequest()
  },
  i18n: {
    messages: {
      "en": {
        "title": "Friend requests",
        "add": "Add",
        "refuse": "Refuse",
        "find": "Find friends"
      },
      "ru": {
        "title": "Заявки в друзья",
        "add": "Принять",
        "refuse": "Отказаться",
        "find": "Искать друзей"
      }
    }
  },
}
</script>
