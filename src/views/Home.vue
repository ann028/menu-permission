<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <header-nav></header-nav>
    <section style="display: flex;">
      <menu-nav></menu-nav>
      <router-view></router-view>
    </section>
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
