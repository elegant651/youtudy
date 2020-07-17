<template>
<div>  
  <v-form
    ref="form"
    class="mt-2"
    >
    <v-text-field
      v-model="ttitle"      
      label="Title"
      solo
      required
    ></v-text-field>
    <v-text-field
      v-model="category"      
      label="Category"      
      solo
      required
    ></v-text-field>

    <div>1주차</div>
    <v-btn @click="addVideo(1)">Add video</v-btn>
    <div v-for="video in videos1" :key="video.id">
      <v-card>
        <v-img :src="video.thumbnails.medium.url" width="150" />
        <div>{{video.title}}</div>
      </v-card>
    </div>

    <div>2주차</div>
    <v-btn @click="addVideo(2)">Add video</v-btn>
    <div v-for="video in videos2" :key="video.id">
      <v-card>
        <v-img :src="video.thumbnails.medium.url" width="150" />
        <div>{{video.title}}</div>
      </v-card>
    </div>

    <div>3주차</div>
    <v-btn @click="addVideo(3)">Add video</v-btn>
    <div v-for="video in videos3" :key="video.id">
      <v-card>
        <v-img :src="video.thumbnails.medium.url" width="150" />
        <div>{{video.title}}</div>
      </v-card>
    </div>

    <div>4주차</div>
    <v-btn @click="addVideo(4)">Add video</v-btn>
    <div v-for="video in videos4" :key="video.id">
      <v-card>
        <v-img :src="video.thumbnails.medium.url" width="150" />
        <div>{{video.title}}</div>
      </v-card>
    </div>

    <div>
      <v-btn v-if="!isLoading" outlined class="btnSubmit mr-4" @click="validate">등록완료</v-btn>
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
        this.errorTxt = '필드를 확인해주세요.'
        this.snackbar = true
        return false
      }

      if(this.videos1.length==0) {
        this.errorTxt = '영상을 1주차에 한 개 이상 세팅해주세요.'
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
    }    
  }
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