import {Court} from '../models/court'

const types = {
  pending: 'pending',
  completed: 'completed',
  resetList: 'resetList',
  updateList: 'updateList',
  removeFromList: 'removeFromList',
}
// state
export const state = () => {
  return {
    pending: false,
    list: [],
  }
}
export const getters = {
  pending: (state) => state.pending,

  // Return all but deleted
  list: (state) => state.list.filter(cr => !cr.archive),

  // Return private & public Matters
  // byPriority: (state, getters) => (priority) => getters.list.filter(c => c.priority === priority),

  // Find matter by ID
  findCourtByID: (state, getters) => (ID) => {  // eslint-disable-line
    return getters.list.filter(c => c.courtID === ID)[0] || undefined
  },

};

const base = "/api/courts/";
export const actions = {
  // Loads & transforms all channels
  async load({commit}) { // eslint-disable-line
    commit(types.pending)
    return new Promise((resolve) => {
      let courts = [];
      this.$axios.get(base).then(rs => {
        courts = rs.data
        courts = courts.map(m => new Court(m))
        commit(types.resetList, courts)
        resolve(courts)
      }).finally(() => {
        commit(types.completed)
        resolve('done')
      })
    })
  },

};

export const mutations = {
  [types.pending](state) {
    state.pending = true
  },
  [types.completed](state) {
    state.pending = false
  },

  [types.resetList](state, matters) {
    state.list = matters
  },

  [types.updateList](state, matter) {
    const l = state.list
    const i = l.findIndex(c => c.courtID === matter.courtID)

    if (i === -1) {
      l.unshift(matter)
    } else {
      l[i] = matter
    }

    state.list = [...l]
  },

  [types.removeFromList](state, {ID}) {
    state.list = [...state.list.filter(mt => ID !== mt.courtID)]
  },
}

