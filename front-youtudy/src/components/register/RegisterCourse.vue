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

    <v-text-field
      v-model="link"      
      label="Link"
      disabled
      solo
      required
    ></v-text-field>

    <v-btn @click="addVideo">Add video</v-btn>

    <div>
      <v-btn outlined class="btnSubmit mr-4" @click="validate">등록완료</v-btn>
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
    
    ttitle: '',
    category: '',
    link: ''
  }),

  components: {
    RegisterVideo
  },

  created() {    
    
  },

  methods: {
    addVideo () {
      this.dlogRegisterVideo = true
    },
    onRegisterVideo (link) {
      this.dlogRegisterVideo = false
      this.link = link
    },

    validate () {
      if (!this.$refs.form.validate()) {
      	this.errorTxt = 'Please confirm again'
        this.snackbar = true
        return false
      }

      this.submit()
    },

    submit () {
      
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