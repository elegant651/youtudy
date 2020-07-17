<template>
  <div class="about">
    <h1>This is an detail-course page</h1>
    <DetailComp :selVideo="selVideo"  />
    <v-card>
      <div>{{channelTitle}}</div>
      <div>{{channelCategory}}</div>
      <div>{{register_name}}</div>
      <div>{{registered_at}}</div>
    </v-card>
    <ScheduleComp :schedule="channelSchedule" v-on:select-video="onSelectVideo" />
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
      selVideo: null
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
    }
  }  
}
</script>

