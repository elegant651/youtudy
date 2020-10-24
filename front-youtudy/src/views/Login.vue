<template>
<v-container fluid>
  <v-row>
    <v-col cols="12" sm="8" md="6">
      <h2 class="mb-3">Sign In</h2>
      <LoginBox />
    </v-col>
  </v-row>
</v-container>
</template>

<script>

import LoginBox from '@/components/LoginBox'

export default {
  components: { LoginBox }
}

</script>

<style scoped>
.loginbox {
  margin: 0 auto;
}
</style>