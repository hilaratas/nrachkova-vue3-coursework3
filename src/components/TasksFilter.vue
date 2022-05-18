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

export default {
  name: "TasksFilter",
  data() {
    return {
      params: FILTER_DEFAULT
    }
  },
  beforeCreate() {
    this.allStatuses = Object.keys(TASK_STATUS)
  },
  methods: {
    onSubmit() {
      this.$emit('tasksFilter', this.params)
    }
  },
  components: {AppStatus}
}
</script>
