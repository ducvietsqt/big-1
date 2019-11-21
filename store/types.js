import { MatterType } from '../models/workspace'

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
  list: (state) => state.list,

  // Return private & public Matters
  // byPriority: (state, getters) => (priority) => getters.list.filter(c => c.priority === priority),

  // Find client by ID
  findMatterTypeByID: (state, getters) => (ID) => {  // eslint-disable-line
    return getters.list.filter(cl => cl.typeID === ID)[0] || undefined
  },

};
const base = '/api/matter-types/'

export const actions = {
  // Loads & transforms all channels
  async load({commit}) { // eslint-disable-line
    commit(types.pending)
    return new Promise((resolve) => {
      let list = [];
      this.$axios.get(base).then(rs => {
        list = rs.data
        list = list.map(i => new MatterType(i))
        commit(types.resetList, list)
        resolve(list)
      }).finally(() => {
        commit(types.completed)
        resolve('done')
      })
    })
  },
  async createType({commit}, data) { // eslint-disable-line
    commit(types.pending)
    return new Promise((resolve) => {
      this.$axios.post(base, data).then(rs => {
        let client = new MatterType(rs.data)
        commit(types.updateList, client)
        resolve(client)
      }).finally(() => {
        commit(types.completed)
        resolve('done')
      })
    })
  },
  async updateType({commit}, {data, clientID}) { // eslint-disable-line
    commit(types.pending)
    return new Promise((resolve) => {
      this.$axios.patch(base + clientID + "/", data).then(rs => {
        let client = new MatterType(rs.data)
        commit(types.updateList, client)
        resolve(client)
      }).finally(() => {
        commit(types.completed)
        resolve('done')
      })
    })
  },
  async removeType({commit}, {typeID}) { // eslint-disable-line
    commit(types.pending)
    return new Promise((resolve) => {
      this.$axios.delete(base + typeID + "/").then(rs => {
        commit(types.removeFromList, {ID: typeID})
        resolve(typeID)
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
    const i = l.findIndex(c => c.clientID === matter.clientID)

    if (i === -1) {
      l.unshift(matter)
    } else {
      l[i] = matter
    }

    state.list = [...l]
  },

  [types.removeFromList](state, {ID}) {
    state.list = [...state.list.filter(mt => ID !== mt.clientID)]
  },
}

