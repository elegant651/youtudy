<template>
  <div class="field">
    <div>
      <v-text-field type="text" v-model="searchTerm" @input="searchTermChange" />
      <!-- <v-btn outlined class="btnSubmit mr-4" @click="search">검색</v-btn> -->
      <div>
        <div v-for="video in videos" :key="video.etag">
          <v-card @click="onSelectCard(video)">  
            <v-img :src="video.thumbnails.medium.url" width="150" />
            <div>{{video.title}}</div>
          </v-card>            
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import _ from 'lodash';
const ysearch = require('youtube-search')

export default {
  data() {
    return { 
      searchTerm: '', 
      videos: []
    }
  },
  methods: {
    searchTermChange: _.debounce( function () { 
      this.videoSearch()
    }, 1000),

    videoSearch() {
      console.log(this.searchTerm)
      
      const opts = {
        maxResults: 5,
        eventType: 'completed',
        type: 'video',
        key: process.env.VUE_APP_YOUTUBE_DATA_API_KEY
      }

      ysearch(this.searchTerm, opts, (err, results) => {
        if (err) {
          return console.error(err)
        }

        console.dir(results)
        this.videos = results
      })
    },

    onSelectCard(video) {
      console.log(video)
      this.$emit('select-link', video.link)
    }
  }
};
</script>

<style>
</style>
