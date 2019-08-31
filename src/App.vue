<template>
  <div id="app">
    <Navbar />
    <main class="container">
      <router-view :key="$route.name"/>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>
