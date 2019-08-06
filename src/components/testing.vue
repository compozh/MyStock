<template lang="pug">
  div
    ul
      li(v-for="(item, key) in list") {{ key + ' - ' + item }}
</template>

<script>
  export default {
    name: "testing",
    data() {
      return {
        str: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, quis! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, quis!'
      }
    },
    computed: {
      list() {
        return this.str.split(' ');
      }
    }
  }
</script>

<style scoped>
  div {
    height: 100px;
    border: 1px solid grey;
    margin: 10px;
    overflow: auto;
  }

  ul {
    column-count: 2;

  }

  li {
    list-style: none;
  }

</style>
