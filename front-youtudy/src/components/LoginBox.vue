<template>
<div>  
  <v-btn class="btnGoogle" color="#fff" rounded @click="googleLogin">Sign in with Google</v-btn>  

  <v-divider class="mt-4 mb-4" />

  <v-form
    ref="form"
    class="mt-2"
    >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      solo
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      type="password"
      solo
      required
    ></v-text-field>

    <v-btn outlined class="btnSubmit mr-4" @click="validate">LOG IN</v-btn>
  </v-form>

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
import "firebase/auth"  

export default {
  data: () => ({
    snackbar: false,
    errorTxt: '',
    email: null,
    password: null,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required'
    ]
  }),

  methods: {
    validate () {
      if (!this.$refs.form.validate()) {
      	this.errorTxt = 'Please confirm again'
        this.snackbar = true
        return false
      }

      this.submit()
    },

    submit () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(userRecord => {
        console.log('Signed in...!')

        // this.$router.push('/')
        location.href="/"
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        this.errorTxt = 'ID or password doesn\'t match'
        this.snackbar = true
      });
    },


    facebookLogin () {
      const provider = new firebase.auth.FacebookAuthProvider()

      firebase.auth().signInWithPopup(provider).then(result => {
        const token = result.credential.accessToken
        const user = result.user

        // this.$router.push('/')
        location.href="/"
      }).catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;        
        this.errorTxt = errorMessage
        this.snackbar = true
      })
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

.btnFacebook {  
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #0773f6;
  margin: 5px;
  text-transform: none;
}

.btnKakao {  
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #442d34;
  margin: 5px;
  text-transform: none;
}
</style>