<template>
  <div class="home">
    <PublicList v-on:go-channel="onGoChannel" />
  </div>
</template>

<script>

import PublicList from '@/components/home/PublicList'
export default {
  name: 'Home',
  components: {
    PublicList
  },

  methods: {
    onGoChannel (course) {
      this.$router.push(`/detail-course/${course.id}`)
    }
  }
}
</script>
