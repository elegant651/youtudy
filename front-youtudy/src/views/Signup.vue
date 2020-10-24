<template>
<v-container fluid>
  <v-row>
    <v-col cols="12" sm="8" md="6">
      <h2 class="mb-3">Sign Up</h2>
      <SignupBox />      
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import SignupBox from '@/components/SignupBox'

export default {
  components: {
    SignupBox
  }
}

</script>

<style scoped>

</style>