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
    ...mapMutations(['tasksFetch']),
    ...mapMutations('filter', ['filterFetch'])
  },
  mounted() {
    this.tasksFetch()
    this.filterFetch()
  },
  components: {
    TheNavbar
  }
}
</script>

<style>

</style>
