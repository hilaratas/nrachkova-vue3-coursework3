import {parseLocalStorage, setLocalStorage} from '@/utility/localStorage-utility'
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
      state.filter = parseLocalStorage('filter') || FILTER_DEFAULT;
    },
    filterChange(state, newParams) {
      setLocalStorage('filter', JSON.stringify(newParams))
      state.filter = newParams
    }
  },
  actions: {
    filterChange({commit}, newParams) {
      commit('filterChange', newParams)
    }
  }
}