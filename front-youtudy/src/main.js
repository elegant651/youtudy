import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueYouTubeEmbed from 'vue-youtube-embed'
import firebase from "firebase"
import "firebase/firestore";

Vue.use(VueYouTubeEmbed)

const config = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
  storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
  projectId: process.env.VUE_APP_FB_PROJECT_ID
};
firebase.initializeApp(config);

const db = firebase.firestore()
firebase.auth().onAuthStateChanged((user) => {
  if (user) {    
    // User is signed in.    
    const email = user.email
    const uid = user.uid
    
    const userRef = db.collection('users').doc(uid)
    userRef.get().then((doc) => {
      if(doc.exists) {
        const data = doc.data()        
        
        const userObj = {
          uid,
          name: data.name,
          email: data.email,
          state: data.state
        }      
        store.commit('setMyProfile', userObj)
        store.commit('setIsConnected', true)
      }
    })
    // ...
  } else {
    // User is signed out.
    // ...
    console.log('not logged in')
  }
})

Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
