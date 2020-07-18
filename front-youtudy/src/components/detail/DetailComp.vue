<template>
  <div>
    <div class="video-wrapper">
      <youtube :video-id="selVideo.id"></youtube>
    </div>
    <p class="subtitle">{{ selVideo.title }}</p>

    <!-- <p>{{ selVideo.publishedAt }}</p> -->
    <div class="channelTitle">{{selVideo.channelTitle}}</div>
  </div>
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
.subtitle {
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
}

.channelTitle {
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #c4c4c4;
}
</style>
