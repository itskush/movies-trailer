<template>
  <div class="main">
    <Movies/>
    <VPlayer/>
  </div>
</template>

<script>
import VPlayer from './VideoPlayer.vue'
import Movies from './Movies.vue'

export default {
  components: {
    Movies,
    VPlayer
  },
  name: "Home"
}
</script>

<style scoped>

</style>
