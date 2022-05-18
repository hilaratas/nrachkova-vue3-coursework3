<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" name="title" v-model.trim="task.title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" name="date" v-model="task.deadline">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" name="description" v-model="task.description"></textarea>
    </div>

    <button type="submit" class="btn primary" :disabled="!formIsValid">Создать</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      task: {
        title: '',
        deadline: '',
        description: ''
      }
    }
  },
  computed: {
    formIsValid() {
      return !!(this.task.title.length && this.task.deadline.length && this.task.description.length)
    }
  },
  methods: {
    onSubmit() {
      const createDate = new Date()
      const deadlineDate = new Date(this.task.deadline)
      deadlineDate.setHours(23, 59,59)
      const status = deadlineDate > createDate ? 'active' : 'expired'
      const newTask = { id: +createDate, ...this.task, createDate, status}
      this.$store.dispatch('taskAdd', newTask)
      this.$router.push('/')
    }
  }
}
</script>