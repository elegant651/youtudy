<template>
<div>
  <v-card class="cardContent mx-auto pa-3 mb-2">
    <div class="title">{{item.title}}</div>    

    <div class="mx-auto d-flex justify-space-around">
      <div class="timeBox pa-2">
        <div class="tbTitle ma-1">Start Time</div>
        <div class="timestamp">12:00 AM, {{item.starttime}}</div>
      </div>
      <div class="timeBox">
        <div class="tbTitle ma-1">End Time</div>
        <div class="timestamp">12:00 AM, {{item.endtime}}</div>
      </div>
    </div>
  </v-card>

  <v-card class="cardContent mx-auto pa-3 mb-2">
    <h3>How to</h3>
    <div class="content">{{item.rule}}</div>
  </v-card>

  <v-card class="cardContent mx-auto pa-3 mb-2">
    <h3>Attendee</h3>
    <div class="numPeople">{{item.num_participants}} people</div>
  </v-card>  

  <img style="cursor: pointer;" src="/img/ic-fab-add.png" @click="join" />
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    item: {
      type: Object  
    },
    isView: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    
  }),

  computed: {
    ...mapState([      
      'profile'
    ])    
  },
  methods: {
    join () {
      this.$emit('add-todo', this.item)
    }
  }
}
</script>

<style scoped>

.cardContent .title {
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #17191d;
}

.cardContent h3 {
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #17191d;
  margin-top: 8px;
  margin-bottom: 8px;
}

.cardContent .content {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  color: #17191d;
  margin-top: 8px;
  margin-bottom: 8px;
}

.cardContent .numPeople {
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal; 
  color: #acb3be;
}

.timeBox .tbTitle {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #bec4cc;
}

.timeBox .timestamp {
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #17191d;
}

.imgContainer {
  max-width: 420px;  
}

</style>