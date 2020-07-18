<template>
  <div class="field">
    <div class="ma-3">
      <v-text-field type="text" label="키워드 검색 또는 유튜브 링크" v-model="searchTerm" @input="searchTermChange" />      
      <div>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex v-for="video in videos" :key="video.etag" xs6 md4>
              <v-card class="cardVideo" @click="onSelectCard(video)">  
                <v-img :src="video.thumbnails.medium.url" width="150" />
                <div class="ttitle">{{video.title}}</div>
              </v-card>            
            </v-flex>
          </v-layout>
        </v-container>        
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
        maxResults: 10,        
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
      this.$emit('select-link', video.link, video)
    }
  }
};
</script>

<style scoped>
.cardVideo {
  width: 156px;
  height: 156px;
  border-radius: 16px;
  background-color: #c4c4c4;
}

.ttitle {
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
}
</style>
