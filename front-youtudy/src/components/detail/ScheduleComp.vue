<template>
  <div>
    <div>1주차</div>    
    <div v-for="video in videos1" :key="video.video_id">
      <v-card @click="selectVideo(video.video_id)">
        <v-img :src="video.thumbnail" width="150" />
        <div>{{video.title}}</div>
      </v-card>
    </div>

    <div>2주차</div> 
    <div v-for="video in videos2" :key="video.video_id">
      <v-card @click="selectVideo(video.video_id)">
        <v-img :src="video.thumbnail" width="150" />
        <div>{{video.title}}</div>
      </v-card>
    </div>

    <div>3주차</div> 
    <div v-for="video in videos3" :key="video.video_id">
      <v-card @click="selectVideo(video.video_id)">
        <v-img :src="video.thumbnail" width="150" />
        <div>{{video.title}}</div>
      </v-card>
    </div>

    <div>4주차</div>
    <div v-for="video in videos4" :key="video.video_id">
      <v-card @click="selectVideo(video.video_id)">
        <v-img :src="video.thumbnail" width="150" />
        <div>{{video.title}}</div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    schedule: Object,   
  },
  watch: {
    schedule: function (newItem) {
      if(newItem) {
        this.getList(newItem)
      }      
    }
  },
  data() {
    return {
      videos1: [],
      videos2: [],
      videos3: [],
      videos4: []
    }    
  },

  methods: {
    getList(schedule) {
      for(const [key, val] of Object.entries(schedule)) {
        // console.log(key, val)
        if (key==1) {
          this.videos1.push(...val)
        } else if (key==2) {
          this.videos2.push(...val)
        } else if (key==3) {
          this.videos3.push(...val)
        } else if (key==4) {
          this.videos4.push(...val)
        }
      } 
    },

    selectVideo(video_id) { 
      this.$emit('select-video', video_id)
    }
  }
};
</script>

<style scoped>
  
</style>
