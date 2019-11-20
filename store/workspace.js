// initial state
import {Member} from "~/models/workspace";

const types = {
  pending: 'pending',
  completed: 'completed',
  resetList: 'resetList',
  updateList: 'updateList',
  resetMembers: 'resetMembers',
  resetLabels: 'resetLabels',
}

export const state = () => ({
    members: [],
    labels: [],
    projects: [],
});

export const getters  = {
  pending: state => state.pending,
  workspaceMembers: state => state.members,
  workspaceProjects: state => state.projects,

  findMemberByID: state => ID => {
    return state.members.find(u => Math.abs(ID) === u.userID)
  },
  findProjectByAssignedID: (state) => (ID) => {
    return state.projects.filter(p => p.members.find(u => u.pk === Math.abs(ID) && u.role === 1))
  },
  findProjectByManagedID: (state) => (ID) => state.projects.filter(p => p.members.find(u => u.pk === Math.abs(ID) && u.role !== 1)),
};

export const actions = {
  async loadMembers({commit, state}) { // eslint-disable-line
    // commit(types.pending)
    return new Promise((resolve) => {
      let members = [];
      this.$axios.get("/api/workspace/members/").then(rs => {
        console.log('members', rs.data)
        members = rs.data.map(m => new Member(m))
        commit(types.resetMembers, members)
        resolve(members)
      }).finally(() => {
        resolve('done')
      })
    })
  },
  loadLabels({commit}) {
    return new Promise((resolve) => {
      let labels = [];
      this.$axios.get("/api/workspace/members/").then(rs => {
        console.log('members', rs.data)
        labels = rs.data.results
        commit(types.resetLabels, labels)
        resolve(labels)
      }).finally(() => {
        resolve('done')
      })
    })
  }
};

export const mutations = {
  [types.resetMembers](state, members) {
    state.members = members;
  },
  [types.resetLabels](state, labels) {
    state.labels = labels;
  },


};

