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
}
</style>
