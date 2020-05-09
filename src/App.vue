<template>
  <div id="app">
    <noteBook/>
  </div>
</template>

<script>
import noteBook from './components/noteBook.vue'
// import  add from './vue-material-design-icons/add.vue'


export default {
  name: 'App',

  components: {
   noteBook
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;

}
</style>
