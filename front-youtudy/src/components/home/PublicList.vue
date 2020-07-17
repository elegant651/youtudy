<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="(course, index) in items" :key="index" xs6 md4>
            <v-card @click="goToChannel(course)">
              <v-img :src="course.thumbnail" height="200px"></v-img>            
              <div>{{course.title}}</div>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      items: []
    }    
  },
  components: { 
  },

  async mounted() {
    await this.getCourses()
  },

  methods: {
    async getCourses() {
      const db = firebase.firestore()

      this.items = []
      await db.collection('public_courses').orderBy('registered_at', 'desc').limit(20).onSnapshot(async (snapshot) => {
          snapshot.forEach((doc) => {
            const courseInfo = {...doc.data(), id: doc.id}
            this.items.push(courseInfo)
          })
        })      
    },

    goToChannel(course) {
      this.$emit('go-channel', course)
    }
  }
}
</script>