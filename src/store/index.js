import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      tasks: JSON.parse(localStorage.getItem('tasks')) || []
    }
  },
  mutations: {
    tasksFetch(state) {
      state.tasks =  JSON.parse(localStorage.getItem('tasks')) || []
    },
    taskAdd(state, newTask) {
      state.tasks.push(newTask)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
      //state.tasks = JSON.parse(localStorage.getItem('tasks')) || []
    },
    taskChange(state, task) {
      let index = state.tasks.findIndex( t => t.id === +task.id)
      if ( index === -1 )
        return

      state.tasks[index] = task
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
      //state.tasks = JSON.parse(localStorage.getItem('tasks')) || []
    },
    taskRemove(state, taskId) {
      let index = state.tasks.findIndex( t => +t.id === +taskId)
      if ( index === -1 )
        return

      state.tasks.splice(index, 1)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
      //state.tasks = JSON.parse(localStorage.getItem('tasks')) || []
    }
  },
  actions: {
    taskAdd({commit}, newTask) {
      commit('taskAdd', newTask)
    },
    taskChange({commit}, task) {
      commit('taskChange', task)
    },
    taskRemove({commit}, taskId) {
      commit('taskRemove', taskId)
    }
  },
  getters: {
    activeCounter(state) {
      return state.tasks.filter( e => { return e.status === 'active' }).length
    },
    tasks(state) {
      return state.tasks
    },
    taskById(state) {
      return id => {
        return state.tasks.find(t => t.id === +id);
      }
    }
  }
})
