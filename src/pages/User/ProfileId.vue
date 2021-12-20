<template lang="pug">
.profile.inner-page(v-if='getUsersInfo')
  .inner-page__main
    .profile__info(v-if='!getUsersInfo.is_blocked')
      profile-info(
        :info='getUsersInfo',
        :blocked='getUsersInfo.is_blocked',
        :friend='getUsersInfo.is_friend',
        :online='getUsersInfo.is_onlined'
      )
    .profile__info(v-else)
      profile-deleted(:info='getUsersInfo', :online='getUsersInfo.is_onlined')
    .profile__news(v-if='!getUsersInfo.is_blocked')
      .profile__tabs
        span.profile__tab.active {{ $t("posted") }} {{ getUsersInfo.first_name }} ({{ getWall.length }})
      .profile__news-list
        news-block(v-for='news in getWall', :key='news.id', :info='news')
  .inner-page__aside
    friends-request
    br
    friends-possible
</template>

<script>
import FriendsPossible from '@/components/Friends/Possible'
import ProfileInfo from '@/components/Profile/Info'
import ProfileDeleted from '@/components/Profile/SoftDeleted'
import FriendsRequest from '@/components/Friends/Request'
import NewsBlock from '@/components/News/Block'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ProfileId',
  components: { FriendsPossible, FriendsRequest, ProfileInfo, NewsBlock, ProfileDeleted },
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapGetters('users/info', ['getUsersInfo', 'getWall'])
  },
  methods: {
    ...mapActions('users/info', ['userInfoId']),
    ...mapActions('profile/friends', ['apiFriends'])
  },
  created() {
    this.userInfoId(this.$route.params.id)
    this.apiFriends()
  },
  i18n: {
    messages: {
      en: {
        posted: 'Publications'
      },
      ru: {
        posted: 'Публикации'
      }
    }
  }
}
</script>
