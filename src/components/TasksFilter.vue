<template>
  <div class="card">
    <form action="" class="form-control" @submit.prevent="onSubmit">
      <h2>Фильтр задач</h2>
      <h3>Сортировка по статусу</h3>
      <div v-for="st in allStatuses" :key="st">
        <input type="checkbox" name="status" v-model="params.statuses" :value="st" :id="'status-'+st" style="display: inline; width: auto">
        <label :for="'status-'+st" style="display: inline-block"><app-status :type="st"></app-status></label>
      </div>
      <h3>Сортировка по названию</h3>
      <input type="text" name="title" v-model="params.title">

      <h3>Сортировка по описанию</h3>
      <input type="text" name="description" v-model="params.description">
      <div>
        <br>
        <button type="submit" class="btn primary">Отфильтровать</button>
      </div>
    </form>


  </div>
</template>

<script>
import {TASK_STATUS}  from '@/settings'
import AppStatus from "@/components/AppStatus";
import {FILTER_DEFAULT} from '@/settings'
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'

export default {
  name: "TasksFilter",
  emits: ['updateFilter'],
  data() {
    return {
      params: {...FILTER_DEFAULT},
    }
  },
  mounted() {
    this.params = this.$store.getters['filter/filter']
  },
  beforeCreate() {
    this.allStatuses = Object.keys(TASK_STATUS)
  },
  methods: {
    ...mapActions('filter', ['filterChange']),
    onSubmit() {
      this.filterChange({...this.params})
      this.$emit('updateFilter')
    }
  },
  components: {AppStatus}
}
</script>
