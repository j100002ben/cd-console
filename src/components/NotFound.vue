<template>
  <div class="notfound">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      name: 'NotFound',
      msg: 'Page not found.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notfound {
  text-align: center;
  color: #2c3e50;
  margin-left: auto;
  margin-right: auto;
}
</style>
