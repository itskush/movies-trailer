<template>
  <div class="image-holder">
    <img src="https://picsum.photos/600/600" alt="Avatar">
  </div>
</template>

<script>
export default {
  name: "ProfilePic",
}
</script>

<style lang="scss" scoped>
.image-holder {
  display: flex;
  width: 5%;
  align-items: center;
  img{
    width: 100%;
    border-radius: 50%;
    cursor: pointer;
  }
  //
  ////#contain:hover div.logout{
  ////  display: block;
  ////}
  ////
  ////.logout{
  ////  background-color: yellow;
  ////  float: right;
  ////  display: none;
  ////}
  //
  //.logout {
  //  font-size: 1em;
  //  font-family: 'Oswald', sans-serif;
  //  position: relative;
  //  right: -18px;
  //  bottom: -4px;
  //  overflow: hidden;
  //  letter-spacing: 3px;
  //  opacity: 0;
  //  transition: opacity .45s;
  //  -webkit-transition: opacity .35s;
  //
  //}
  //
  //.custom-button {
  //  text-decoration: none;
  //  float: right;
  //  color: white;
  //  width: 50%;
  //  transition: width .35s;
  //  -webkit-transition: width .35s;
  //  overflow: hidden
  //}
  //
  //a:hover {
  //  width: 100%;
  //}
  //
  //a:hover .logout{
  //  opacity: .9;
  //}
  //
  //a {
  //  text-decoration: none;
  //}
}
</style>
