<template>
  <tasks-filter
      @update-filter="onUpdateFilter"
  ></tasks-filter>
  <template v-if="tasks.length === 0">
    <h1 class="text-white center">Задач пока нет</h1>
  </template>
  <template v-else>
    <h3 class="text-white">Всего задач: {{ tasksCounter }}</h3>
    <h3 class="text-white">Задач, соответсвующих фильтру: {{ filteredTasksCounter }}</h3>

    <div class="card" v-if="filteredTasks.length">
      <div v-for="(task, idx) in filteredTasks" :key="task.id">
        <task-item
            :task="task"
            :index="idx"
            @click-delete="onClickDelete"
        ></task-item>
      </div>
    </div>

  </template>
  <teleport to="#modals">
    <app-modal
        v-if="showConfirm"
        @close="showConfirm=false; removableTaskId=null"
        @send-confirm="onConfirm($event, removableTaskId)">
      <h3>Подтвердить удаление задачи <small>ID={{removableTaskId}}</small>?</h3>
      <template #confirm>да, удалить</template>
      <template #reject>нет, не удалять</template>
    </app-modal>
  </teleport>
</template>

<script>
import AppModal from '../components/AppModal'
import TasksFilter from "@/components/TasksFilter";
import TaskItem from '@/components/TasksItem';
import {FILTER_DEFAULT} from '@/settings';
import {mapActions} from 'vuex';


export default {
  data() {
    return {
      showConfirm: false,
      removableTaskId: null,
      params: FILTER_DEFAULT,
      filteredTasks: []
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks
    },
    tasksCounter() {
      return this.$store.getters.tasksCounter;
    },
    filteredTasksCounter() {
      return this.filteredTasks.length
    }
  },
  mounted() {
    this.filterFetch().then(res => this.params = res)
    this.filteredTasks = this.filterTasks(this.tasks, this.params)
  },
  methods: {
    ...mapActions('filter', ['filterFetch']),
    onRemoveTask(taskId) {
      this.$store.dispatch('taskRemove', taskId);
    },
    onConfirm(response, taskId) {
      if ( response )
        this.onRemoveTask(taskId)

      this.showConfirm = false
    },
    onUpdateFilter() {
      this.filterFetch().then(res => this.params = res)
    },
    onClickDelete($event) {
      this.showConfirm = true;
      this.removableTaskId = $event;
    },
    filterTasks(tasks, filter) {
      let newTasks = tasks;
      let params = Object.keys(filter);
      params.forEach((p) => {
        switch (p) {
          case 'statuses':
            if ( !filter.statuses.length)
              break;

            newTasks = newTasks.filter(nT => filter.statuses.includes(nT['status']))
            break;
          case 'description':
          case 'title':
            newTasks = newTasks.filter(nT => nT[p].includes(filter[p]))
            break;
        }
      })
      return newTasks
    }
  },
  watch: {
    params: {
      deep: true,
      handler() {
        this.filteredTasks = this.filterTasks(this.tasks, this.params)
      }
    },
    tasks() {
      this.filteredTasks = this.filterTasks(this.tasks, this.params)
    }
  },
  components: {AppModal, TasksFilter, TaskItem}
}
</script>
