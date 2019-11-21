import {Matter} from '../models/matter'

const types = {
  pending: 'pending',
  completed: 'completed',
  resetList: 'resetList',
  updateList: 'updateList',
  channelJoin: 'channelJoin',
  channelPart: 'channelPart',
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
  list: (state) => state.list.filter(c => !c.archive),

  // Return private & public Matters
  // byPriority: (state, getters) => (priority) => getters.list.filter(c => c.priority === priority),

  // Find matter by ID
  findMatterByID: (state, getters) => (ID) => {  // eslint-disable-line
    return getters.list.filter(c => c.matterID === ID)[0] || undefined
  },

  otherMembersOf: (state, getters) => (matterID, userID) => {  // eslint-disable-line
    const mt = getters.findMatterByID(matterID)
    if (!mt) {
      return []
    }
    if (mt.members.length === 1) {
      return mt.members
    }
    return mt.members.filter(memberID => memberID !== userID)
  },
};


export const actions = {
  // Loads & transforms all channels
  async load({commit, state}) { // eslint-disable-line
    commit(types.pending)
    return new Promise((resolve) => {
      let mt = [];
      this.$axios.get("/api/matters/").then(rs => {
        console.log('MATTERS', rs.data)
        mt = rs.data
        mt = mt.map(m => new Matter(m))
        commit(types.resetList, mt)
        resolve(mt)
      }).finally(() => {
        commit(types.completed)
        resolve('done')
      })
    })
  },
  async createMatter({commit, state}, data) {
    commit(types.pending)
    return new Promise((resolve) => {
      this.$axios.post("/api/matters/", data).then(rs => {
        let matter = new Matter(rs.data);
        commit(types.updateList, matter)
        resolve(true)
      }).finally(() => {
        commit(types.completed)
      }).catch(() => {
        resolve(false)
      })
    })
  },
  async updateMatter({commit, state}, {matterID, data}) {
    commit(types.pending)
    return new Promise((resolve) => {
      this.$axios.patch("/api/matters/"+matterID+"/", data).then(rs => {
        let matter = new Matter(rs.data);
        commit(types.updateList, matter)
      }).finally(() => {
        commit(types.completed)
      })
    })
  },
  setMembershipFlag({commit, state}, {matterID, flag}) {  // eslint-disable-line
    commit(types.pending)
    // action
    let mt = {};
    commit(types.updateList, new Matter(mt))
    commit(types.completed)
  },
  deleteMatter({commit, state}, {matterID}) {
    commit(types.pending)
    commit(types.removeFromList, {ID: matterID})
    commit(types.completed)
  }
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
    const i = l.findIndex(c => c.matterID === matter.matterID)

    if (i === -1) {
      l.unshift(matter)
    } else {
      l[i] = matter
    }

    state.list = [...l]
  },

  [types.removeFromList](state, {ID}) {
    state.list = [...state.list.filter(mt => ID !== mt.matterID)]
  },
}

