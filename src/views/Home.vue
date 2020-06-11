<template>
  <div class="home" style="display: flex;">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <menu-nav></menu-nav>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import headerNav from '@/components/headerNav.vue'
import menuNav from '@/components/menuNav.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    headerNav,
    menuNav,
  }
}
</script>
