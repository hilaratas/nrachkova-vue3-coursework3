<template>
  <template v-if="tasks.length === 0">
    <h1 class="text-white center">Задач пока нет</h1>
  </template>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{activeCounter}}</h3>
    <div class="card">
      <div v-for="(task, idx) in tasks" :key="task.id">
        <h2>{{ idx+1 }}</h2>
        <h2 class="card-title">
          {{ task.title }}
          <AppStatus :type="task.status" />
        </h2>
        <div>
          <strong> Дата создания:</strong> <small>{{ dateFilter(task.createDate) }}</small>
        </div>
        <div>
          <strong> Дата deadline:</strong> <small>{{ dateFilter(task.deadline) }}</small>
        </div>
        <div><strong>Описание задачи:</strong></div>
        <div>
          {{ task.description}}
        </div>
        <br>
        <button class="btn primary" @click="$router.push('/task/' + task.id)">Посмотреть</button>
        <button class="btn danger" @click="showConfirm=true; removableTaskId=task.id">Удалить</button>
      </div>
    </div>
  </template>
  <teleport to="#modals">
    <app-modal
        v-if="showConfirm"
        @close="showConfirm=false; removableTaskId=null"
        @send-confirm="onConfirm($event, removableTaskId)">
    </app-modal>
  </teleport>
</template>

<script>
import AppStatus from '../components/AppStatus'
import AppModal from '../components/AppModal'

export default {
  data() {
    return {
      showConfirm: false,
      removableTaskId: null
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks
    },
    activeCounter() {
      return this.$store.getters.activeCounter;
    }
  },
  methods: {
    onRemoveTask(taskId) {
      this.$store.dispatch('taskRemove', taskId);
    },
    onConfirm(response, taskId) {
      if ( response )
        this.onRemoveTask(taskId)

      this.showConfirm = false
    },
    dateFilter ( dateString ) {
      return new Intl.DateTimeFormat().format(new Date(dateString))
    }
  },
  components: {AppStatus, AppModal}
}
</script>
