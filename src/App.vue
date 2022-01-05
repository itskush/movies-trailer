<template>
  <div class="app">
    <div class="box">
      <div class="head">
        <Login v-if="!showProfilePic"/>
        <ProfilePic v-if="showProfilePic"/>
        <Search/>
        <NavBar/>
      </div>
      <Home/>
<!--      <router-view></router-view>-->
<!--        <keep-alive>-->
<!--          <component :is="component"/>-->
<!--        </keep-alive>-->
    </div>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import NavBar from './components/NavBar.vue'
import Search from './components/Search.vue'
import Login from './components/Login.vue'
import ProfilePic from './components/ProfilePic.vue'

import AuthService from './services/AuthService';


export default {
  name: 'App',
  components: {
    NavBar,
    Search,
    Login,
    ProfilePic,
    Home
  },
  data(){
    return{
      showProfilePic: false,
      username: ''
    }
  },
  mounted() {
    this.$eventBus.on('logRequest', () => {
      if (this.$store.getters.isLoggedIn) {
        this.username = this.$store.getters.getUser ? this.$store.getters.getUser.username : ' ';
        this.showProfilePic = true;
      } else {
        this.showProfilePic = false;
      }
    })
  },
  async created(){
    if (this.$store.getters.isLoggedIn) {
      const status = await AuthService.checkToken(this.$store.getters.isLoggedIn)
      if(status === 403){
        this.$buefy.toast.open({
          message: 'Session Expired! Please log in again',
          type: 'is-danger'
        })
        this.$eventBus.emit('tokeninvalid')
      }
      if(status === 200){
        this.showProfilePic = true;
        this.$eventBus.emit('tokenvalid')
      }
    } else {
      this.showProfilePic = false;
    }
  }
}
</script>

<style lang="scss" scoped>

@font-face {
  font-family: "Marlett";
  src: local("Marlett"),
  url(./fonts/Marlett.ttf) format("truetype");
}

.home{
  display: flex;
}
.container{
  display: contents;
}

.box{
  background-color: #fffbff;
  width: 1600px;
  min-height: 950px;
  margin: auto;
}

.notification.is-primary{
  background-color: #1a0f1a;
  min-width: 1800px;
  height: 800px;
  margin: auto;
}

.head{
  display: flex;
  height: 100px;
  clear:both;
  align-items: center;
  justify-content: space-between;
}

.main {
  display: flex;
  width: 100%;
}

html {
  overflow-y: hidden !important;
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.app {
  margin: auto;
  padding: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  background: #000000;
}

::-webkit-scrollbar {
  height: 7px;              /* height of horizontal scrollbar ← You're missing this */
  width: 7px;               /* width of vertical scrollbar */
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #393237;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #72666d;
}

</style>
