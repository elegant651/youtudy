<template>
<div>  
  <v-form
    ref="form"    
    class="mt-2"
    >
    <v-text-field
      class="tfInput"
      v-model="ttitle"      
      label="Title"
      solo
      required
    ></v-text-field>
    <v-text-field
      class="tfInput"
      v-model="category"      
      label="Category"      
      solo
      required
    ></v-text-field>

    <h3>Curriculum</h3>
    <h4 class="mt-2">1 week <span class="strSize">{{getStrSize(1)}}</span></h4>
    <div class="btnAdd" @click="addVideo(1)"><img src="/img/ic-plus-circle.png"
     srcset="/img/ic-plus-circle@2x.png 2x,
             /img/ic-plus-circle@3x.png 3x"
     class="ic-plus-circle"></div>
    <div grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="video in videos1" :key="video.id" xs6 md4>
          <v-card class="cardVideo">
            <v-img :src="video.thumbnails.medium.url" width="150" />
            <div>{{video.title}}</div>
          </v-card> 
        </v-flex>
      </v-layout>
    </div>

    <h4 class="mt-3">2 week <span class="strSize">{{getStrSize(2)}}</span></h4>
    <div class="btnAdd"  @click="addVideo(2)"><img src="/img/ic-plus-circle.png"
     srcset="/img/ic-plus-circle@2x.png 2x,
             /img/ic-plus-circle@3x.png 3x"
     class="ic-plus-circle"></div>
    <div grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="video in videos2" :key="video.id" xs6 md4>
          <v-card class="cardVideo">
            <v-img :src="video.thumbnails.medium.url" width="150" />
            <div>{{video.title}}</div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>

    <h4 class="mt-3">3 week <span class="strSize">{{getStrSize(3)}}</span></h4>
    <div class="btnAdd"  @click="addVideo(3)"><img src="/img/ic-plus-circle.png"
     srcset="/img/ic-plus-circle@2x.png 2x,
             /img/ic-plus-circle@3x.png 3x"
     class="ic-plus-circle"></div>
    <div grid-list-md text-xs-center>
      <v-layout row wrap> 
        <v-flex v-for="video in videos3" :key="video.id" xs6 md4>
          <v-card class="cardVideo">
            <v-img :src="video.thumbnails.medium.url" width="150" />
            <div>{{video.title}}</div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>

    <h4 class="mt-3">4 week <span class="strSize">{{getStrSize(4)}}</span></h4>
    <div class="btnAdd" @click="addVideo(4)"><img src="/img/ic-plus-circle.png"
     srcset="/img/ic-plus-circle@2x.png 2x,
             /img/ic-plus-circle@3x.png 3x"
     class="ic-plus-circle"></div>
    <div grid-list-md text-xs-center>
      <v-layout row wrap> 
        <v-flex v-for="video in videos4" :key="video.id" xs6 md4>
          <v-card class="cardVideo">
            <v-img :src="video.thumbnails.medium.url" width="150" />
            <div>{{video.title}}</div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>

    <div class="mt-3">
      <v-btn v-if="!isLoading" outlined class="btnSubmit mr-4" @click="validate">Register</v-btn>
      <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
    </div>
  </v-form>

  <v-dialog v-model="dlogRegisterVideo" persistent max-width="450">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="btnClose"
              color="#000"
              text
              @click="dlogRegisterVideo = false">
            X
          </v-btn>
        </v-card-actions>
        <RegisterVideo v-on:register-video="onRegisterVideo" />
      </v-card>
    </v-dialog>

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
import RegisterVideo from '@/components/register/RegisterVideo'

export default {
  data: () => ({
    snackbar: false,
    errorTxt: '',
    dlogRegisterVideo: false,
    isLoading: false,
    
    ttitle: '',
    category: '',
    link: '',

    curIdx: 1,
    videos1: [],
    videos2: [],
    videos3: [],
    videos4: []
  }),

  components: {
    RegisterVideo
  },

  created() {    
    
  },

  methods: {
    addVideo (index) {
      this.curIdx = index
      this.dlogRegisterVideo = true
    },

    onRegisterVideo (video) {
      this.dlogRegisterVideo = false      
      
      if (this.curIdx==1) {
        this.videos1.push(video)
      } else if (this.curIdx==2) {
        this.videos2.push(video)
      } else if (this.curIdx==3) {
        this.videos3.push(video)
      } else if (this.curIdx==4) {
        this.videos4.push(video)
      }
    },

    validate () {
      if (!this.$refs.form.validate()) {
      	this.errorTxt = 'Please confirm again'
        this.snackbar = true
        return false
      }

      if(this.category.length==0 || this.ttitle.length==0) {
        this.errorTxt = 'Please confirm the field'
        this.snackbar = true
        return false
      }

      if(this.videos1.length==0) {
        this.errorTxt = 'You should set the one video per week at least.'
        this.snackbar = true
        return false
      }

      this.submit()
    },

    async submit () {
      const db = firebase.firestore()
      this.isLoading = true
      
      const vd1 = this.videos1.map(video => {
        const obj = new Object()
        obj.video_id = video.id
        obj.title = video.title
        obj.thumbnail = video.thumbnails.medium.url
        return obj
      })

      const vd2 = this.videos2.map(video => {
        const obj = new Object()
        obj.video_id = video.id
        obj.title = video.title
        obj.thumbnail = video.thumbnails.medium.url
        return obj
      })

      const vd3 = this.videos3.map(video => {
        const obj = new Object()
        obj.video_id = video.id
        obj.title = video.title
        obj.thumbnail = video.thumbnails.medium.url
        return obj
      })

      const vd4 = this.videos4.map(video => {
        const obj = new Object()
        obj.video_id = video.id
        obj.title = video.title
        obj.thumbnail = video.thumbnails.medium.url
        return obj
      })

      let schedule = {
        "1": vd1,
        "2": vd2,
        "3": vd3,
        "4": vd4
      }

      console.log(schedule)       

      await db.collection("public_courses").add({
        title: this.ttitle,
        category: this.category,
        register_id: 'register_id',
        register_name: 'cherryboy',
        registered_at: new Date(),
        thumbnail: this.videos1[0].thumbnails.medium.url,
        firstVideoId: this.videos1[0].id,
        schedule
      })

      this.isLoading = false

      this.$router.push('/')
    },

    getStrSize (index) {
      let size = ""
      if (index==1) {
        size = this.videos1.length
      } else if (index==2) {
        size = this.videos2.length
      } else if (index==3) {
        size = this.videos3.length
      } else if (index==4) {
        size = this.videos4.length
      }
      return size
    }    
  }
}

</script>

<style scoped>
.cardVideo {
  width: 156px;
  height: 156px;
  border-radius: 16px;
  background-color: #c4c4c4;
}

.btnSubmit {
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

.tfInput {
  width: 328px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #979797;
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

.btnAdd {
  width: 141px;
  height: 116px;
  border-radius: 16px;
  border: solid 1px #e5e5e5;
  background-color: #f8f8f8;
  cursor: pointer;
  margin: 0 auto;
  padding-top: 36px;
}
</style>