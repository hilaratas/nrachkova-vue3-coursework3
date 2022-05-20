<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
import {mapMutations} from 'vuex'

export default {
  methods: {
    ...mapMutations(['tasksFetch'])
  },
  mounted() {
    this.tasksFetch()
  },
  components: {
    TheNavbar
  }
}
</script>

<style>

</style>
