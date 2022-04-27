<template>
  <div id="app">
   <!-- <img alt="Vue logo" src="./assets/logo.png">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>  -->

    <GNB/>    
    <router-view></router-view>
  </div>
</template>

<script>
import GNB from './components/GNB';

export default {
  name: 'App',
  components: {
    GNB, 
  }, 
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>


