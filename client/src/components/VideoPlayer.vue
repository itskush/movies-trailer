<template>
  <div class="right-side is-mobile" v-if="!isHidden">
      <div class="card slide-in-top poster-image"  :style="{  'background': 'linear-gradient(#000,#000),url(' +setBackdrop(video.backdrop_path)+')'}">
        <div class="card-image">
          <!--      <vue-plyr ref="plyr" @timeupdate="videoTimeUpdated" :emit="['timeupdate']" :options="playerOptions">-->
          <!--        <div data-plyr-provider="youtube" id="player" :data-plyr-embed-id="video" allow="autoplay"></div>-->
          <!--      </vue-plyr>-->

          <lite-youtube v-if="videoId !== 0" :videoid="videoId" autoload></lite-youtube>
        </div>
        <div class="card-content">
          <div v-if="videoId !== 0" style="display: inline-flex">
            <h2>Share on:</h2> <ShareLinks :videoId="videoId" :title="video.title" :description="video.overview"/>
          </div>
          <br/>
          <br/>
          <div class="media">
            <div class="media-content">
              <h2 class="title is-4 font-color"> {{ video.title }} </h2>
              &nbsp;
              <p v-if="video.description !== null" class="subtitle is-5 font-color">{{ video.overview }}</p>
            </div>
          </div>
          <div class="content">
            <h3 class="sub-title"> Cast </h3>
            <hooper :itemsToShow="4">
              <slide v-for="(people,id) in cast" :key="id" >
                <figure class="image is-128x128" >
                  <img v-title="people.name" class="image--cover" :src="people.profile_path ? 'https://image.tmdb.org/t/p/w500/'+people.profile_path : ''">
                </figure>
              </slide>
            </hooper>
            <div>
              <h3 class="sub-title">Socials</h3>
              <ExternalLinks :links="externals"/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
import movieService from '../services/MovieService';
import ExternalLinks from './ExternalLinks'
import ShareLinks from './ShareLinks'

export default {
  name: "VideoPlayer",
  components:{
    Hooper,
    Slide,
    ExternalLinks,
    ShareLinks
  },
  data() {
    return {
      videoId: 0,
      video: {},
      cast: {},
      externals: {},
      isHidden: true,
    }
  },
  methods: {
    videoTimeUpdated(){
      // console.log("test");
      // console.log(this.$refs.plyr.player.currentTime)
    },
    updateVideo: function() {
      // this.player will have the reference to your Plyr instance
      // this.player.play();
      // this.player.volume = 0.5;
    },
    setBackdrop(url){
      return 'https://image.tmdb.org/t/p/w1280/'+ url ;
    }
  },
  mounted(){
    this.$eventBus.on('selectedVideo', (data) => {
      this.isHidden = false;
      movieService.getMovie(data.id)
      .then(
          (videos => {
            this.video = videos.data;
            this.cast = videos.cast;
            this.externals = videos.externals;
            this.videoId = videos.trailer[0].src
          })
      );
    })
  }
}

</script>

<style lang="scss" scoped>

.slick-slide.slick-active.slick-current{
  margin-left: 1rem !important;
  margin-right: 1rem !important;
}

.slide-in-top {
  -webkit-animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

.card{
  background: #000;
  color: #fff;
  border-radius: 6px;
  width: 41%;
  padding: 2rem;
  position: fixed;
  overflow-y: scroll;
  max-height: 85%;
  @media (max-width:980px) {
    max-height: 500px;
    width: 100%;
    position: relative;
  }
}

.font-color{
  color: #fff !important;
}

.card-image{
  height: 50%;
}
.card-content{
  min-height: 50%;
  .content{
    min-height: 500px;
  }
}

.right-side{
  width:100%;
  margin-right: 1rem;
  margin-top: 1.5rem;
  @media (max-width:980px) {
    position: absolute;
    z-index: 1;
    width: 100%;
    padding-bottom: 100%;
  }
}
.hooper{
  ul{
    margin-left: 0 !important;
  }
}
.content figure {
  margin-left: 0;
}

.image--cover {
  width: 150px;
  height: 150px;
  object-fit: cover;
  object-position: center right;
}


::-webkit-scrollbar {
  height: 7px;              /* height of horizontal scrollbar ← You're missing this */
  width: 7px;               /* width of vertical scrollbar */
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #393237;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #72666d;
}

.poster-image{
  background-position: center;
  background-size: cover;
  background-repeat: repeat;
}

.sub-title{
  color: #fff;
}
</style>
