<script>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/despre-noi">Despre Noi</router-link>
  </nav>
  <router-view></router-view>
  <footer>
    <p>Welcome to the new app</p>
  </footer>
</template>

<style>
  #app { width: 1400px; }
</style>
