<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <!-- <template v-if="isConnected"> -->
          <template v-for="item in items"> 
            <router-link :to="item.route" :key="item.text">
              <v-list-item>
                <!-- <v-list-item-action>
                  <img :src="item.icon" />
                </v-list-item-action> -->
                <v-list-item-content>
                  <v-list-item-title class="menu_title">
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </template>

          <v-divider class="mt-4"></v-divider>

          <v-subheader class="mt-4 grey--text text--darken-1">MY PROFILE</v-subheader>
          <router-link to="/profile">
            <v-list-item>
              <v-list-item-avatar>
                <!-- <img :src="getProfileImg" /> -->
              </v-list-item-avatar>
              <!-- <v-list-item-title v-text="nickname" style="text-align: left; color:#acb3be; font-size: 12px;"></v-list-item-title> -->
            </v-list-item>
          </router-link>
        <!-- </template> -->

        <v-divider class="mt-4"></v-divider>
        
        <template v-if="!isConnected">
          <router-link to="/signup">
            <v-list-item>
              <v-list-item-action>
                <img src="/img/ic-in.png" />
              </v-list-item-action>
              <v-list-item-title class="menu_title">Sign Up</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/login">
            <v-list-item>
              <v-list-item-action>
                <img src="/img/ic-in.png" />
              </v-list-item-action>
              <v-list-item-title class="menu_title">Log In</v-list-item-title>
            </v-list-item>
          </router-link>
        </template>
        <template v-else>
          <router-link to="#">
            <v-list-item>
              <v-list-item-action>
                <img src="/img/ic-logout.png" />
              </v-list-item-action>
              <v-list-item-title class="menu_title logout" @click="logout">Log Out</v-list-item-title>
            </v-list-item>
          </router-link>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="#FFF" app clipped-left dense>
      <v-app-bar-nav-icon @click="drawer = !drawer"><img src="/img/ic-menu.png" srcset="/img/ic-menu@2x.png 2x,/img/ic-menu@3x.png 3x"></v-app-bar-nav-icon>
      <v-toolbar-title><div class="logo"><router-link class="btnMenu" to="/">Youtudy</router-link></div></v-toolbar-title>
      <v-spacer></v-spacer>
      
      
      <v-btn outlined @click="goToProfile">학습 진행</v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid class="fill-height">
        <router-view/>
      </v-container>
    </v-content>

    <v-footer id="footerWrap" height="auto" color="#0f194a">
      <v-layout justify-center row wrap>
        <v-flex py-2 text-xs-center xs12>
          &copy;2020 — <strong>Youtudy</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>
<script>
  import firebase from "firebase"
  import "firebase/auth"
  import { mapState, mapMutations } from 'vuex'
  import {getIdenticon} from '@/util/identicon'

  export default {
    data: () => ({
      drawer: null,
      items: [
        { icon: '', text: 'Home', route: '/' },
        { icon: '', text: 'My course', route: '/my-course' },
        { icon: '', text: 'Register', route: '/register' },        
      ]      
    }),
    computed: {
      ...mapState('profile', [        
        'isConnected',        
        'profile'
      ]),

      // nickname () {
      //   return this.profile.name
      // },

      // getProfileImg () {
      //   return getIdenticon(this.profile.name)
      // }
    },    

    methods: {
      ...mapMutations('profile', [        
        'setIsConnected'        
      ]),
      
      logout () {
        firebase.auth().signOut().then(() => {
          // Sign-out successful.          
          this.setIsConnected(false)
        }).catch(function(error) {
          // An error happened.
          console.error(error)
        });

        location.reload()
      },

      goToProfile () {
        this.$router.push('/profile')
      }
    }
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  text-decoration: none;
}

.btnMenu {
  margin: 5px;
}

.logo {
  line-height: 10px;
}

.menu_title {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0062ff;
  text-align: left;
}

.menu_title.logout {
  color: #acb3be;
}

#footerWrap {
  color: #fff;
  border: 3px solid #000;
  font-size: 12px;
}
</style>
