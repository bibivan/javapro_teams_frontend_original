<template>
  <div class="profile-info">
    <div class="profile-info__pic">

      <div
        class="profile-info__img"
        :class='{ offline: !online && !me }'
      >
        <img
          :src='info.photo'
          :alt='info.fullName'
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ProfileDeleted',
  props: {
    me: Boolean,
    info: Object,
    online: Boolean
  },
  computed: {
    ...mapGetters('profile/dialogs', ['dialogs'])
  }
}
</script>
