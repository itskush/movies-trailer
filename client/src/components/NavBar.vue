<template>
  <nav class="navbar ">
    <div class="navbar-brand">
      <div class="navbar-burger burger" data-target="navMenubd">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navMenubd" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable is-mega">
          <div class="navbar-link flex">
            Find <span class="tag is-info ml-2">Movies</span>
          </div>
          <div class="navbar-dropdown ">
            <a class="navbar-item" @click="getTopRated" href="#">
              Top Rated
            </a>
            <a class="navbar-item" @click="getUpcoming" href="#">
              Upcoming
            </a>
<!--            <hr class="navbar-divider">-->
          </div>
        </div>
        <a class="navbar-item is-active is-hoverable" @click="getPopular" href="#">
          <span class="bd-emoji">🏠</span> &nbsp;Home
        </a>
<!--        <a class="navbar-item is-hoverable" href="#">-->
<!--          <span class="bd-emoji">❤</span> &nbsp;Favorites-->
<!--        </a>-->
        <a v-if="showLogOut" class="navbar-item is-hoverable" href="#" @click="logmeout">
          <span class="bd-emoji">🚪</span> &nbsp;Logout
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      showLogOut: false
    };
  },
  methods:{
    getUpcoming(){
      this.$eventBus.emit('getUpcoming');
    },
    getTopRated(){
      this.$eventBus.emit('getTopRated');
    },
    getPopular(){
      this.$eventBus.emit('getPopular');
    },
    logmeout(){
      this.$store.dispatch('logout');
      this.$eventBus.emit('logRequest');
    },
  },
  mounted() {
    this.$eventBus.on('tokenvalid', ()=>{
      this.showLogOut = true;
    });
    this.$eventBus.on('tokeninvalid', ()=>{
      this.showLogOut = false;
    });
    document.getElementById('navMenubd')
        .querySelectorAll('.has-dropdown')
        .forEach(el => {
          el.addEventListener('click', () => {
            let menu = el.querySelector('.navbar-dropdown')
            menu.style.display = 'none'
            setTimeout(() => {
              el.blur()
              // Reset the display property to its original state, so the menu can appear again next time
              menu.style.display = ''
            }, 200)
          })
        })
  }

};
</script>

<style lang="scss" scoped>

$bg-default: #222327;
$primary-white: #ffffff;
$primary-red: #ff3c41;
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

:root {
  --clr: #222327;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--clr);
}

.navigation {
  float:right;
  position: relative;
  width: 300px;
  height: 70px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navigation ul {
  display: flex;
  width: 350px;
}

.navigation ul li {
  position: relative;
  list-style: none;
  width: 70px;
  height: 70px;
  z-index: 1;
}

.navigation ul li a {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  font-weight: 500;
  text-align: center;
}

.navigation ul li a .icons {
  position: relative;
  display: block;
  line-height: 75px;
  font-size: 1.5em;
  text-align: center;
  transition: 0.5s;
  color: var(--clr);
}

.navigation ul li.active a .icons {
  transform: translateY(-32px);
}

.navigation ul li a .text {
  position: absolute;
  color: var(--clr);
  font-weight: 400;
  font-size: 0.75em;
  letter-spacing: 0.05em;
  transition: 0.5s;
  opacity: 0;
  transform: translateY(20px);
}

.navigation ul li.active a .text {
  opacity: 1;
  transform: translateY(10px);
}

.indicator {
  position: absolute;
  top: -50%;
  width: 70px;
  height: 70px;
  background: #ffcc00;
  border-radius: 50%;
  border: 6px solid var(--clr);
  transition: 0.5s;
}

.indicator::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -22px;
  width: 20px;
  height: 20px;
  background: transparent;
  border-top-right-radius: 20px;
  box-shadow: 1px -10px 0 0 var(--clr);
}

.indicator::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -22px;
  width: 20px;
  height: 20px;
  background: transparent;
  border-top-left-radius: 20px;
  box-shadow: 0px -10px 0 0 var(--clr);
}

.navigation ul li:nth-child(1).active ~ .indicator {
  transform: translateX(calc(70px * 0));
}

.navigation ul li:nth-child(2).active ~ .indicator {
  transform: translateX(calc(70px * 1));
}

.navigation ul li:nth-child(3).active ~ .indicator {
  transform: translateX(calc(70px * 2));
}

.navigation ul li:nth-child(4).active ~ .indicator {
  transform: translateX(calc(70px * 3));
}

.navigation ul li:nth-child(5).active ~ .indicator {
  transform: translateX(calc(70px * 4));
}

</style>
