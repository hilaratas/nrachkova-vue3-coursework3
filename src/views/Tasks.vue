<template>
  <tasks-filter
      @tasks-filter="onUpdateFilter($event)"
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


export default {
  data() {
    return {
      showConfirm: false,
      removableTaskId: null,
      filter: FILTER_DEFAULT,
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
    this.filteredTasks = this.filterTasks(this.tasks, this.filter)
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
    onUpdateFilter(filter) {
      this.filter = filter
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
    filter: {
      deep: true,
      handler(newFilter) {
        this.filteredTasks = this.filterTasks(this.tasks, this.filter)
      }
    },
    tasks() {
      this.filteredTasks = this.filterTasks(this.tasks, this.filter)
    }
  },
  components: {AppModal, TasksFilter, TaskItem}
}
</script>
