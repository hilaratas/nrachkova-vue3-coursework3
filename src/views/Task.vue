<template>
  <div class="card">
    <div v-if="!task">
      <h3 class="center">
        Задачи с id = <strong>{{ taskId }}</strong> нет.
      </h3>
    </div>
    <template v-else>
      <h2>Название задачи</h2>
      <div><strong>Статус</strong>: <app-status :type="task.status" /></div>
      <div><strong> Дата создания:</strong> <small>{{ task.createDate }}</small></div>
      <div><strong>Дэдлайн</strong>: {{ task.deadline}}</div>
      <div><strong>Описание задачи:</strong></div>
      <div>{{ task.description}}</div>
      <br>
      <div>
        <button class="btn" @click="changeStatus('in-progress')">Взять в работу</button>
        <button class="btn primary" @click="changeStatus('done')">Завершить</button>
        <button class="btn danger" @click="changeStatus('cancelled')">Отменить</button>
      </div>
    </template>

  </div>

</template>

<script>
import AppStatus from '../components/AppStatus'

export default {
  computed: {
    taskId() {
      return +this.$route.params.taskId
    },
    task() {
      let task = this.$store.getters.taskById(this.taskId)
      return task
    }
  },
  methods: {
    changeStatus(newStatus) {
      let task = { ...this.task, status: newStatus}
      this.$store.dispatch('taskChange', task)
    }
  },
  components: {AppStatus}
}
</script>

<style scoped>

</style>