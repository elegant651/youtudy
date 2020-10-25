<template>
  <div class="about"> 
    <DetailComp :selVideo="selVideo"  />

    <v-divider class="mt-3"/>

    <v-progress-linear
      color="blue-grey"
      height="10"
      value="100"
      striped
    ></v-progress-linear>
    <div class="progressVal">100%</div>
    <v-btn v-if="!isLoading" outlined class="btnSubmit mr-4" @click="getBadge()">Get Badge</v-btn>

    <div class="mt-3 mb-6">
      <div class="ttitle">{{channelTitle}}</div>
      <div class="category">{{channelCategory}}</div>
      <div class="registerName">{{register_name}} • {{registered_at}}</div>      
    </div>

    <ScheduleComp :schedule="channelSchedule" v-on:select-video="onSelectVideo" />

    <v-btn class="btnAction mt-3" rounded outlined @click="actionRegister">Join Course</v-btn>    

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
      channelId: null,
      channelData: null,
      selVideo: null,
      snackbar: false,
      msgTxt: '',
      isLoading: false,
      ciBadge: null,
      address: null
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
    this.channelId = id
    this.address = await this.$getDefaultAccount()
    this.ciBadge = new this.$web3.eth.Contract(this.$config.BADGE_ABI, this.$config.BADGE_CA)
    
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
    },

    async getBadge() {
      const badgeName = `${this.channelId}_${this.channelTitle.substring(0, 8).replace(/\s+/g, '')}`
      console.log(badgeName)
      
      try {
        this.isLoading = true

        await this.ciBadge.methods.createBadge(badgeName)
        .send({from: this.address, gas: this.$config.GAS_AMOUNT})
        .on('transactionHash', (transactionHash) => {
          this.isLoading = false        
          alert("Creation completed...! tx:"+transactionHash)
        })
        .on('error', (error, receipt) => {
          this.isLoading = false
          alert(error)
        });
      } catch (e) {
        this.isLoading = false
      }
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
