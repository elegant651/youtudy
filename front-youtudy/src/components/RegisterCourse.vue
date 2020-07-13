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

    <v-btn outlined class="btnSubmit mr-4" @click="validate">등록완료</v-btn>
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

export default {
  data: () => ({
    snackbar: false,
    errorTxt: '',
    
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