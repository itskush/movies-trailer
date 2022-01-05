<template>
  <div class="favoriting">
    <label
        class="favorite__heart"
        v-bind:class="{'favorite__heart__selected': value, 'is-disabled': disabled}"
        v-on:click="favorite">
      <input
          class="favorite__checkbox"
          type="checkbox"
          v-bind:name="movieid"
          v-bind:disabled="disabled"
          v-model="value">
      ❤
    </label>
  </div>
</template>

<script>
export default {
  name: "Favourites",
  data: function() {
    return { };
  },
  props: {
    'movieid': {
      type: String,
      default: ''
    },
    'disabled': {
      type: Boolean,
      default: false
    }
  },
  methods: {
    favorite: function() {
      if (this.disabled) {
        return;
      }
      this.value = !this.value;
    }
  }
}
</script>

<style scoped>
.favoriting{
  display: inline-block;
  position: absolute;
  z-index: 1;
  width: 20px;
  bottom: 0;
  right: 0;
}
.favorite__heart {
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
  line-height: 1;
  font-size: 16px;
  color: #ABABAB;
  cursor: pointer;
  -webkit-transition: color .2s ease-out;
  transition: color .2s ease-out;
}
.favorite__heart.is-disabled:hover {
  cursor: default;
}
.favorite__checkbox {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}
.favorite__heart__selected{
  color: #df470b;
}
</style>
