<template lang="pug">
.push-block
  .push__img
    img(:src='info.author.photo', :alt='info.author.first_name')
  p.push__content
    router-link.push__content-name(:to='getRouteByNotification(info)')
      | {{ info.author.first_name + " " + info.author.last_name }}
      |
      | {{ getNotificationType(info.type_id) }}
  span.push__time {{ info.sent_time | moment("from") }}
  .push__del(@click='readNotifications(info.id)')
    simple-svg(:filepath='"/static/img/delete.svg"')
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getRouteByNotification, getNotificationType } from '@/utils/notifications.utils'
export default {
  name: 'PushBlock',
  props: {
    info: Object
  },
  computed: {
    ...mapGetters('profile/notifications', ['getNotificationsTextType'])
  },
  methods: {
    ...mapActions('profile/notifications', ['readNotifications']),
    getRouteByNotification,
    getNotificationType
  }
}
</script>

<style lang="stylus">
.push-block {
  background: #fff;
  padding: 25px 30px;
  box-shadow: 0px 2px 60px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &+& {
    margin-top: 20px;
  }

  .push__img {
    flex: none;
  }

  .push__content {
    max-width: 650px;
  }

  .push__time {
    flex: none;
  }

  .push__del {
    width: 40px;
    height: 40px;
    margin-left: 40px;
    padding: 10px;
    transition: transform 0.4s;
    cursor: pointer;
  }

  .push__del:hover {
    transform: rotate(360deg);
  }
}
</style>
