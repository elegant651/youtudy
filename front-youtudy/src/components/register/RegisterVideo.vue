<template>
<div>  
  <SearchList v-on:select-link="onSelectLink" />

  <!-- <v-text-field
    v-model="link"
    label="선택 링크 주소"
    disabled
    solo
    required
  ></v-text-field> -->

  <!-- <v-btn v-if="!isLoading" outlined class="btnSubmit mr-4" @click="validate">등록하기</v-btn>
  <v-progress-circular v-else indeterminate color="primary"></v-progress-circular> -->

  <v-snackbar
      v-model="snackbar" top>
      {{ errorTxt }}
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
import firebase from "firebase"
import SearchList from '@/components/register/SearchList'

export default {
  data: () => ({
    snackbar: false,
    errorTxt: '',
    isLoading: false,
    
    link: '',
    video: null
  }),

  components: {
    SearchList
  },  

  methods: {
    onSelectLink (link, video) {
      this.link = link
      this.video = video

      this.submit()
    },

    async validate () {
      if (this.link.length < 10) {
      	this.errorTxt = '링크를 적어주세요'
        this.snackbar = true
        return false
      }      

      this.submit()
    },

    async submit () {
      this.isLoading = true

      const curVideo = this.video
      const video_id = this.video.id
      
      const db = firebase.firestore()
      const docRef = db.collection("video_infos").doc(video_id)
      
      docRef.get().then((doc) => {
        if(doc.exists) {
          console.log('the video is already set')

          this.completeRegistered()
        } else {
          docRef.set(
            curVideo
          ).then(() => {
            this.completeRegistered()
          })
        }
      }).catch(error => {
        console.error(error)
      })      
    },
    
    completeRegistered() {
      this.isLoading = false

      this.link = ""

      console.log(this.video)
      this.$emit('register-video', this.video)
    }

  },  
}

</script>

<style scoped>
.btnSubmit {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0062ff;
  text-transform: none;
}
</style>