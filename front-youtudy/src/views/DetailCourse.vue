<template>
  <div class="about"> 
    <DetailComp :selVideo="selVideo"  />

    <v-divider class="mt-3"/>

    <v-progress-linear
      color="blue-grey"
      height="10"
      value="20"
      striped
    ></v-progress-linear>
    <div class="progressVal">25% 완료</div>

    <div class="mt-3 mb-6">
      <div class="ttitle">{{channelTitle}}</div>
      <div class="category">{{channelCategory}}</div>
      <div class="registerName">{{register_name}} • {{registered_at}}</div>      
    </div>

    <ScheduleComp :schedule="channelSchedule" v-on:select-video="onSelectVideo" />

    <v-btn class="btnAction mt-3" rounded outlined @click="actionRegister">스터디 참여</v-btn>

    <v-snackbar
      v-model="snackbar" top>
      {{ msgTxt }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import {format as tformat} from 'timeago.js'
import firebase from "firebase"
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
      selVideo: null,
      snackbar: false,
      msgTxt: ''
      // {
      //   id: 's-YsO84qYak',
      //   title: 'A State Of Trance Episode 830 (#ASOT830)',
      //   publishedAt: '2017-09-07T20:08:50Z',
      //   link: 'https://www.youtube.com/watch?v=s-YsO84qYak',
      //   thumbnail: 'https://i.ytimg.com/vi/xapksKzqIw4/mqdefault.jpg',
      //   channelId: 'UCu5jfQcpRLm9xhmlSd5S8xw',
      //   channelTitle: 'Armin van Buuren'
      // }
    }
  },

  computed: {
    channelTitle () {
      return this.channelData ? this.channelData.title : ""
    },

    channelCategory () {
      return this.channelData ? this.channelData.category : ""
    },

    register_name () {
      return this.channelData ? this.channelData.register_name : ""
    },

    registered_at () {
      return this.channelData ? tformat(new Date(this.channelData.registered_at.seconds*1000)) : ""
    },

    channelSchedule () {
      return this.channelData ? this.channelData.schedule : {}
    }
  },

  async mounted() {
    const id = this.$route.params.id 
    
    await this.getData(id)
  },

  methods: {
    async getData(id) {
      const db = firebase.firestore()
      const docRef = db.collection("public_courses").doc(id)

      docRef.get().then((doc) => {
        if (doc.exists) {          
          this.channelData = doc.data()
          
          console.log('channelData', this.channelData)          
          this.getVideo(this.channelData.firstVideoId)
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    },

    async getVideo(video_id) { 
      const db = firebase.firestore()
      const docRef = db.collection("video_infos").doc(video_id)

      docRef.get().then((doc) => {
        if (doc.exists) {
          this.selVideo = doc.data()

          console.log('selVideo', this.selVideo)
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    },

    onSelectVideo(video_id) {      
      this.getVideo(video_id)
    },

    actionRegister() {
      this.snackbar = true
      this.msgTxt = '참여가 완료되었습니다.'

      this.$router.push('/my-course')
    }
  }  
}
</script>

<style scoped>
.ttitle {
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
}

.category {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
}

.registerName {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #979797;
}

.progressVal {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
}

.btnAction {
  width: 328px;
  height: 48px;
  border-radius: 8px;
  background-color: #000000;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
}
</style>
