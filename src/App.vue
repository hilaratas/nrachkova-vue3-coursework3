<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'

export default {
  onMounted() {
    this.$store.commit('tasksFetch')
  },
  components: {
    TheNavbar
  }
}
</script>

<style>

</style>
