<template>
  <div>
    <v-card class="cardContent mx-auto mb-4" max-width="400" max-height="400"
      v-for="item in items" :key="item.index">
      <v-list-item>      
        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
          <v-list-item-subtitle>{{item.username}}</v-list-item-subtitle>
        </v-list-item-content>
        <div class="flex-grow-1"></div>
      </v-list-item>

      <p class="ma-4">{{item.content}}</p>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    channelData: Object
  },
  data() {
    return {
      items: []
    }    
  },
};
</script>

<style scoped>
  
</style>
