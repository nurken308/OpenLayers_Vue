<template>
  <div id="app">
    <OpenLayersMap />
  </div>
</template>

<script>
import OpenLayersMap from './components/OpenLayersMap.vue';

export default {
  name: 'App',
  components: {
    OpenLayersMap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
