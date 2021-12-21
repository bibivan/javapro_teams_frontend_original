<template>
  <div class="profile-info">
    <div class="profile-info__pic">
      <div class="profile-info__img" :class="{ offline: !online && !me }">
        <img :src="info.photo" :alt="info.fullName" />
      </div>
    </div>

    <div class="profile-info__main">
      <div class="profile-info__header">
        <h1 class="profile-info__name">{{ info.fullName }}</h1>
      </div>
      <p class="profile-info__deleted-desc">{{ $t('deletedInfo') }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProfileDeleted',
  props: {
    me: Boolean,
    info: Object,
    online: Boolean
  },
  computed: {
    ...mapGetters('profile/dialogs', ['dialogs'])
  },
  methods: {},
  i18n: {
    messages: {
      en: {
        deletedInfo: 'User deleted their page'
      },
      ru: {
        deletedInfo: 'Пользователь удалил свою страницу'
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.profile-info {
  display: flex;
  padding: 25px 30px 25px 50px;
  background: #FFFFFF;
  box-shadow: standart-boxshadow;
  position: relative;

  @media (max-width: breakpoint-xxl) {
    padding: 25px;
  }
}

.profile-info__pic {
  border-right: 1px solid #E6E6E6;
  padding-right: 55px;
  margin-right: 60px;

  @media (max-width: breakpoint-xxl) {
    margin-right: 20px;
    padding-right: 20px;
  }
}

.profile-info__img {
  width: 215px;
  height: 215px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid crimson;

  @media (max-width: breakpoint-xxl) {
    width: 150px;
    height: 150px;
    margin: 0 auto;
  }

  img {
    width: 100%;
  }

  &.offline {
    border-color: crimson;
  }
}

.profile-info__main {
  padding: 20px 0;
}

.profile-info__header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.profile-info__name {
  font-family: font-exo;
  font-weight: 200;
  font-size: 30px;
  line-height: 24px;
  color: #000000;
  margin-right: 15px;
}
</style>

