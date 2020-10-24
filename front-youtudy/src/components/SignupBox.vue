<template>
<div>
  <v-btn class="btnGoogle" color="#fff" rounded @click="googleSignup">Google Sign Up</v-btn>

  <v-divider class="mt-4 mb-4" />
  
  <v-form
    ref="form"
    class="mt-2"
    v-model="valid"
    lazy-validation
    >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      solo
      required
    ></v-text-field>
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
    <v-text-field
      v-model="passwordConfirm"
      :rules="passwordRules"
      label="Password Confirmation"
      type="password"
      solo
      required
    ></v-text-field>
    <v-btn outlined class="btnSubmit mr-4" @click="validate">SIGN UP</v-btn>
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
import "firebase/firestore";
import "firebase/auth"

export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [
      v => !!v || 'Password is required'
    ],
    password: null,
    passwordConfirm: null,
    cbAgree: false,
    snackbar: false,
    errorTxt: ''
  }),

  methods: {
    validate () {
      if (!this.$refs.form.validate() || this.password!=this.passwordConfirm) {
      	this.errorTxt = 'form data are incorrect. please check again'
        this.snackbar = true
        return false
      }

      this.submit()
    },

    async saveUserData (email, name, uid) {
      const db = firebase.firestore()
      const userData = {
        email: email,
        name: name,
        state: 0,        
        created_at: new Date()
      }

      await db.collection('users').doc(uid).set(userData)
    },

    submit () {      
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(async userRecord => {
        await this.saveUserData(this.email, this.password, userRecord.user.uid)

        this.$router.push('/login')

      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        this.errorTxt = errorMessage
        this.snackbar = true
      });
    },

    googleSignup () {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider).then(async result => {
        const token = result.credential.accessToken
        const user = result.user        
        const email = result.user.email
        const name = result.user.displayName
        const uid = result.user.uid

        await this.saveUserData(email, name, uid)

        this.$router.push('/login')
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