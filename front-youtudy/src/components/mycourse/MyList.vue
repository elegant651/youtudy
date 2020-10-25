<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="(course, index) in items" :key="index" xs6 md4>
            <v-card class="cardVideo" @click="goToChannel(course)">
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

      const docRef =  db.collection('my_courses').doc("JVqj3TSL73ZndXFpOsDMOsk9WQ03")
      docRef.get().then((doc) => {
        if (doc.exists) {          
          console.log('cc', doc.data())
          const courses = doc.data().courses
          for(const [key, val] of Object.entries(courses)) {            
            const courseInfo = {...val, id: key}            
            this.items.push(courseInfo)
          }          
        }
      })    
    },

    goToChannel(course) {
      this.$emit('go-channel', course)
    },    
  }
}
</script>
<style scoped>
.cardVideo {
  width: 156px;
  height: 156px;
  border-radius: 16px;
  background-color: #c4c4c4;
}
</style>
