<template>
  <v-card>
    <div class="video-wrapper">
      <youtube :video-id="selVideo.id"></youtube>
    </div>
    <p class="subtitle">{{ selVideo.title }}</p>
    <p>{{ selVideo.publishedAt }}</p>
    <div>{{selVideo.channelTitle}}</div>
  </v-card>
</template>

<script>
export default {
  props: {
    selVideo: Object
  },
  data() {
    return {
      
    }    
  },
};
</script>

<style scoped>
  
</style>
