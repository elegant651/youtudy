<template>
  <div> 
    <div style="width: 800px;"></div>
    <MyList v-on:go-channel="onGoChannel" />
  </div>
</template>

<script>

import MyList from '@/components/mycourse/MyList'
export default {  
  components: {
    MyList
  },

  methods: {
    onGoChannel (course) {
      this.$router.push(`/detail-course/${course.id}`)
    }
  }
}
</script>
