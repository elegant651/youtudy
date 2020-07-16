<template>
  <div class="about">
    <h1>This is an detail-course page</h1>
    <DetailComp :selVideo="selVideo"  />
    <ScheduleComp :channelData="channelData" />
  </div>
</template>

<script>

import DetailComp from '@/components/detail/DetailComp'
import ScheduleComp from '@/components/detail/ScheduleComp'
export default {
  name: 'Home',
  components: {
    DetailComp,
    ScheduleComp
  },

  data() {
    return {
      channelData: null,
      selVideo: {
        id: 's-YsO84qYak',
        title: 'A State Of Trance Episode 830 (#ASOT830)',
        publishedAt: '2017-09-07T20:08:50Z',
        link: 'https://www.youtube.com/watch?v=s-YsO84qYak',
        thumbnail: 'https://i.ytimg.com/vi/xapksKzqIw4/mqdefault.jpg',
        channelId: 'UCu5jfQcpRLm9xhmlSd5S8xw',
        channelTitle: 'Armin van Buuren'
      }
    }
  },

  async mounted() {
    const id = this.$route.params.id 
    
    this.getData(id)
  },

  async getData(id) {
    //FB
  }
}
</script>

