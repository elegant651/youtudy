<template>
<div>  
  <SearchList v-on:select-link="onSelectLink" />

  <v-text-field
    v-model="link"
    label="유튜브 링크 주소"
    solo
    required
  ></v-text-field>

  <v-btn outlined class="btnSubmit mr-4" @click="validate">등록하기</v-btn>

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
import SearchList from '@/components/register/SearchList'

export default {
  data: () => ({
    snackbar: false,
    errorTxt: '',
    
    link: ''
  }),

  components: {
    SearchList
  },  

  methods: {
    onSelectLink (link) {
      this.link = link
    },

    validate () {
      if (this.link.length < 10) {
      	this.errorTxt = '링크를 적어주세요'
        this.snackbar = true
        return false
      }

      //verify youtube url

      this.submit()
    },

    submit () {
      this.$emit('register-video', this.link)
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