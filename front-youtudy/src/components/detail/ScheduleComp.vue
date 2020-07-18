<template>
  <div>
    <h4>1주차 <span class="strSize">{{getStrSize(1)}}</span></h4>    
    <div grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="video in videos1" :key="video.video_id" xs6 md4>
          <v-card class="cardVideo" @click="selectVideo(video.video_id)">
            <v-img :src="video.thumbnail" width="150" />
            <div>{{video.title}}</div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>

    <h4>2주차 <span class="strSize">{{getStrSize(2)}}</span></h4> 
    <div grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="video in videos2" :key="video.video_id" xs6 md4>
          <v-card class="cardVideo" @click="selectVideo(video.video_id)">
            <v-img :src="video.thumbnail" width="150" />
            <div>{{video.title}}</div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>

    <h4>3주차 <span class="strSize">{{getStrSize(3)}}</span></h4> 
    <div grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="video in videos3" :key="video.video_id" xs6 md4>
          <v-card class="cardVideo" @click="selectVideo(video.video_id)">
            <v-img :src="video.thumbnail" width="150" />
            <div>{{video.title}}</div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>

    <h4>4주차 <span class="strSize">{{getStrSize(4)}}</span></h4>
    <div grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="video in videos4" :key="video.video_id" xs6 md4>
          <v-card class="cardVideo" @click="selectVideo(video.video_id)">
            <v-img :src="video.thumbnail" width="150" />
            <div>{{video.title}}</div>
          </v-card>
        </v-flex>
      </v-layout>
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
    },

    getStrSize (index) {
      let size = ""
      if (index==1) {
        size = this.videos1.length + "개"
      } else if (index==2) {
        size = this.videos2.length + "개"
      } else if (index==3) {
        size = this.videos3.length + "개"
      } else if (index==4) {
        size = this.videos4.length + "개"
      }
      return size
    }    
  }
};
</script>

<style scoped>

.cardVideo {
  width: 156px;
  height: 156px;
  border-radius: 16px;
  background-color: #c4c4c4;
  margin: 10px;
}

.strSize {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #979797;
}
  
</style>
