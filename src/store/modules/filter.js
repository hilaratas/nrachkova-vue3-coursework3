import {parseLocalStorage} from '@/utility/filter-mixin'
import {FILTER_DEFAULT} from '@/settings'

export default {
  namespaced: true,
  state() {
    return {
       filter: FILTER_DEFAULT
    }
  },
  getters: {
    filter(state) {
      return state.filter
    }
  },
  mutations: {
    filterFetch(state) {
      const filter = parseLocalStorage() || FILTER_DEFAULT;
    },
    statusesFetch(state) {
      const filter = parseLocalStorage();
      return filter && filter.statuses ? filters.statuses : []
    },
    titleFetch(state) {
      const filter = parseLocalStorage();
      return filter && filter.title ? filter.title : []
    },
    descriptionFetch(state) {
      const filter = parseLocalStorage();
      return filter && filter.description ? filter.description : []
    },
    statusesChange(state, newStatuses) {
      state.statuses = newStatuses
    },
    titleChange(state, newTitle) {
      state.statuses = newTitle
    },
    descriptionChange(state, newDescription) {
      state.statuses = newDescription
    }
  },
  actions: {
    statusesChange({commit}, newStatuses) {
      commit('statusesChange', newStatuses)
    },
    titleChange({commit}, newTitle) {
      commit('titleChange', newTitle)
    },
    descriptionChange({commit}, newDescription) {
      commit('titleChange', newDescription)
    }
  }
}