<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="(course, index) in items" :key="index" xs6 md4>
            <v-card @click="goToChannel(course)">
              <v-img :src="course.thumbnail" height="200px"></v-img>            
              <div>Title: {{course.title}}</div>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  data() {
    return {
      items: []
    }    
  },
  components: { 
  },

  mounted() {
    this.items = [{
      id: 1,  
      title: 'Item title1',
      thumbnail: 'https://i.ytimg.com/vi/xapksKzqIw4/mqdefault.jpg'
    }, {
      id: 2,
      title: 'Item title2',
      thumbnail: 'https://i.ytimg.com/vi/xapksKzqIw4/mqdefault.jpg'
    }, {
      id: 3,
      title: 'Item title2',
      thumbnail: 'https://i.ytimg.com/vi/xapksKzqIw4/mqdefault.jpg'
    }, {
      id: 4,
      title: 'Item title2',
      thumbnail: 'https://i.ytimg.com/vi/xapksKzqIw4/mqdefault.jpg'
    }, {
      id: 5,
      title: 'Item title2',
      thumbnail: 'https://i.ytimg.com/vi/xapksKzqIw4/mqdefault.jpg'
    }, {
      id: 6,
      title: 'Item title2',
      thumbnail: 'https://i.ytimg.com/vi/xapksKzqIw4/mqdefault.jpg'
    }]
  },

  methods: {
    goToChannel(course) {
      this.$emit('go-channel', course)
    }
  }
}
</script>