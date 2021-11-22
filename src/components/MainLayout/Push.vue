<template lang="pug">
.push(:class='{ open: opened }')
  .push__overlay(@click='closePush')
  .push__wrap(:class='{ open: opened }', ref='wrap')
    .push__list(ref='list')
      .push__item(v-for='info in getNotifications.slice(0, 10)', :key='info.id')
        .push__img
          img(:src='info.author.photo', :alt='info.author.first_name')
        p.push__content(@click='closePush')
          router-link.push__content-name(:to='getRouteByNotification(info)')
            | {{ info.author.first_name + " " + info.author.last_name }}
            |
            | {{ getNotificationType(info.type_id) }}
        span.push__time {{ info.sent_time | moment("from") }}
        .push__del(@click.stop='readNotifications(info.id)')
          simple-svg(:filepath='"/static/img/delete.svg"')
    .push__link-wrap(@click="closePush" v-if='getNotificationsLength > 1')
      router-link.push__btn(:to='{ name: "Push" }') {{ $t("show") }} ({{ getNotificationsLength }})
    a.push__btn(href='#', v-if='getNotificationsLength > 1', @click.prevent='readAllNotifications()') {{ $t("delete") }} ({{ getNotificationsLength }})
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getRouteByNotification, getNotificationType } from '@/utils/notifications.utils'

export default {
  name: 'Push',
  props: {
    opened: Boolean
  },
  computed: {
    ...mapGetters('profile/notifications', ['getNotifications', 'getNotificationsLength', 'getNotificationsTextType'])
  },
  watch: {
    opened(val) {
      if (!val) {
        this.$refs.list.scrollTop = 0
      }
    }
  },
  methods: {
    ...mapActions('profile/notifications', ['apiNotifications', 'readNotifications']),
    getRouteByNotification,
    getNotificationType,
    closePush() {
      if (!this.opened) return
      this.$emit('update:opened', false)
    },
    readAllNotifications() {
      this.closePush()
      this.readNotifications()
    }
  },
  mounted() {
    if (this.getNotificationsLength === 0) this.apiNotifications()
    if (window.innerHeight - this.$refs.wrap.getBoundingClientRect().top - this.$refs.wrap.offsetHeight < 0) {
      this.$refs.wrap.style.maxHeight = `${window.innerHeight - this.$refs.wrap.getBoundingClientRect().top}px`
    }
    window.onscroll = () => {
      this.closePush()
    }
  },
  i18n: {
    messages: {
      en: {
        show: 'Show all',
        delete: 'Delete all'
      },
      ru: {
        show: 'Показать все',
        delete: 'Удалить все'
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.push {
  .push__overlay {
    display: none;
  }

  &.open {
    .push__overlay {
      display: block;
    }
  }
}

.push__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  cursor: default;
}

.push__wrap {
  position: fixed;
  background: #FFf;
  box-shadow: 0px 2px 60px rgba(0, 0, 0, 0.1);
  right: 50px;
  top: header-height;
  width: 100%;
  max-width: 710px;
  max-height: 675px;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: all 0.2s;
  overflow-y: auto;

  &.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  &:before, &:after {
    content: '';
    display: block;
    width: 19px;
    height: 38px;
    position: absolute;
    top: -16px;
  }

  &:before {
    background-image: linear-gradient(115deg, transparent 50%, #fff 50%);
    right: 223px;
  }

  &:after {
    background-image: linear-gradient(245deg, transparent 50%, #fff 50%);
    right: 205px;
  }
}

.push__list {
  overflow-y: auto;
  max-height: 543px;
}

.push__item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin: 0 20px;

  &+& {
    border-top: 1px solid #E7E7E7;
  }
}

.push__content-name:hover {
  text-decoration: underline #000000;
}

.push__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 15px;
  letter-spacing: 0.01em;
  color: eucalypt;
  border-top: 1px solid #E7E7E7;
  height: 50px;
}

.push__btn:hover {
  text-decoration: underline eucalypt;
}

.push__del {
  width: 40px;
  height: 40px;
  margin-left: 20px;
  padding: 10px;
  transition: transform 0.4s;
}

.push__del:hover {
  transform: rotate(360deg);
}
</style>
