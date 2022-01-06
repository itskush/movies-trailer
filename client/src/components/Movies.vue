<template>
  <div class="movie-container">
    <div class="movie-block">
      <div class="list-container">
      <div v-for="(video,id) in movies" :key="id">
        <div class="movie-card" :class="{'selected' : selectedMovie.id === video.id}" @click="setSelectedMovie(video)">
          <div class="movie-card__cover" :style="{'background-image': 'url('+setThumbnail(video)+')'}"></div>
          <div class="pacss-wrapper">
              <span class="pacss-foreground">
                  <span class="pacss-number">{{ video.vote_average }}</span>
              </span>
          </div>
<!--          <favorite name="favorite" value></favorite>-->
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import movieService from '../services/MovieService';
// import favorite from '../components/Favourites';

export default {
  name: "Movies",
  data() {
    return {
      moviesPerRow:5,
      movies: {},
      selectedMovie: { id: 0 },
      loading: false,
      isActive: false,
      limit: 20
    }
  },
  components:{
    // favorite
  },
  created(){
    this.getMovies();
  },
  methods: {
    async getMovies() {
      movieService.getPopular()
          .then(
              (videos => {
                this.movies = videos.data;
              })
          );
    },
    async getSearchedMovies(query){
        movieService.getSearchedMovie(query)
        .then(
            (videos => {
              this.movies = videos.data;
            })
        );
    },
    setThumbnail(video){
      if (video.poster_path) {
        return "https://image.tmdb.org/t/p/w500/"+video.poster_path
      }else{
        return null
      }
    },
    setSelectedMovie(movie){
      this.selectedMovie = movie;
      this.$eventBus.emit('selectedVideo', this.selectedMovie);
    }
  },
  computed:{
  },
  mounted(){
    this.$eventBus.on('search',  (data) => {
      this.getSearchedMovies(data);
    })

    this.$eventBus.on('getUpcoming', () => {
      movieService.getUpcoming()
          .then(
              (videos => {
                this.movies = videos.data;
              })
          );
    })

    this.$eventBus.on('getTopRated', () => {
      movieService.getTopRated()
          .then(
              (videos => {
                this.movies = videos.data;
              })
          );
    })

    this.$eventBus.on('getPopular', () => {
      this.getMovies()
    })
  },
  beforeMount(){
    this.getMovies()
  },
}
</script>

<style lang="scss" scoped>

$c_0: #000000;
$c_1: #353540;

$font-stack-content: 'Montserrat', helvetica, arial, sans-serif;
$font-stack-header: 'Montserrat', helvetica, arial, sans-serif;
$secondary-color: #2a9fff;

.caption {
  transform: translate( -50%, -50% );
  text-align: left;
  color: white;
  font-weight: bold;
  p{
    color: red !important;
  }
}

.slide-in-right {
  -webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

.movie-container{
  display: flex;
  width: 100%;
  height: 100%;
  margin-left: 1rem;
  margin-top: 1rem;
  @media (max-width:980px) {
    position: absolute;
    padding-top: 500px;
  }
}

.movie-block{
  width: 100%;
  min-height: 100%;
}

.is-ancestor{
  height: 440px;
}

.tile{
  overflow: hidden;
}

figure{
  background-repeat:no-repeat;
  background-size: cover;
  background-position: center;
}

@keyframes anim-glow {
  0% {
    box-shadow: 0 0 RGBA(104,84,111,1);
  }
  100% {
    box-shadow: 0 0 10px 8px transparent;
    border-width: 2px;
  }
}

.selected{
  animation: anim-glow 1.9s ease infinite;
}


h1,h2,h3 {
  font-family: $font-stack-header;
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 1;
  font-weight: 400;
}

.list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 30px;
  width: 100%;
  padding: 10px;
}

.movie-card {
  position: relative;
  z-index: 1;
  width: 100%;
  padding-bottom: 150%;
  perspective: 1000px;

  &__cover {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
    background-size: cover;
    perspective-origin: 50% 50%;
    transform-style: preserve-3d;
    transform-origin: top center;
    will-change: transform;
    transform: skewX(.001deg);
    transition: transform .35s ease-in-out;

    // Gloss

    &::after {
      display: block;
      content: '';
      position: absolute;
      z-index: 100;
      top: 0;
      left: 0;
      width: 100%;
      height: 120%;
      background: linear-gradient(226deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 35%, rgba(255, 255, 255, 0.2) 42%, rgba(255, 255, 255, 0) 60%);
      transform: translateY(-20%);
      will-change: transform;
      transition: transform .65s cubic-bezier(0.18, 0.9, 0.58, 1);
    }

  }

  &:hover &__cover {
    transform: rotateX(7deg) translateY(-6px);

    &::after {
      transform: translateY(0%);
    }

  }

  // Shadows

  &::before {
    display: block;
    content: '';
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    background: rgba($c_0, 0.5);
    box-shadow: 0 6px 12px 12px rgba($c_0, 0.4);
    will-change: opacity;
    transform-origin: top center;
    transform: skewX(.001deg);
    transition: transform .35s ease-in-out, opacity .5s ease-in-out;
  }

  &:hover::before {
    opacity: 0.6;
    transform: rotateX(7deg) translateY(-6px) scale(1.05);
  }
}


$rating-inactive-color: #E6E7E8;
$rating-active-color: #23BDF0;

.pacss-wrapper {
  font-size: 300%;
  width:1em;
  height:1em;
  border-radius: 1em;
  background: $rating-inactive-color;
  margin: 0;
  padding: 0;
  float: left;
  margin: .3em;
  position:relative;
  box-sizing: border-box;
}

.pacss-foreground {
  position: absolute;
  margin:.15em;
  width:.7em;
  height:.7em;
  background: yellow;
  border-radius:1em;
  z-index:2;
  box-sizing:border-box;
  display:block;
  .pacss-number{
    font-size:.36em;
    font-weight:bold;
    font-family:arial;
    text-align: center;
    vertical-align: middle;
    line-height: 2em;
    display:block;
    height:100%;
  }
}

/* 1em */
.pacss {
  display:block;
  position:relative;
  width:.5em;
  height:1em;
  overflow:hidden;
  margin-left:.5em;
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
</style>
