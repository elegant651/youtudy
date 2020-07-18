import Vue from 'vue'
import Vuex from 'vuex'

import profile from '@/store/modules/profile'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	isConnected: false, 
    profile: {
      uid: 'nZI2ivtTWSAenDEpADkQ',
      name: 'willpark',
      email: '',      
      photo_url: '',
      state: 0      
    },
  },
  mutations: {
  	setIsConnected(state, isConnected) {
      state.isConnected = isConnected
    },    
    setMyProfile(state, profile) {      
      state.profile = profile
    }
  },
  actions: {
  },
  modules: {
    profile
  }
})
