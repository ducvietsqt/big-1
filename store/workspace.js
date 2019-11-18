
// initial state
export const state = () => {
  return {
    members: [],
    projects: []
  }
};

const getters = {
  workspaceMembers: state => state.members,
  workspaceProjects: state => state.projects,
  findProjectByID: (state) => (ID) => state.projects.find(p => Math.abs(ID) === p.pk),
  findMemberByID: (state) => (ID) => state.members.find(u => Math.abs(ID) === u.user.pk),
  findTaskByID: (state) => (ID) => state.members.find(u => Math.abs(ID) === u.user.pk),
  findProjectByAssignedID: (state) => (ID) => {
    return state.projects.filter(p => p.members.find(u => u.pk === Math.abs(ID) && u.role === 1))
  },
  findProjectByManagedID: (state) => (ID) => state.projects.filter(p => p.members.find(u => u.pk === Math.abs(ID) && u.role !== 1)),
};

export const actions = {
  async nuxtServerInit({commit}, {req}) {
    // todo: load members workspace
    // todo: load matter workspace
  }
};

export const mutations = {
  setMembers(state, members) {
    state.members = members;
    state.gettingMembers = false;
    state.loaded = true;
  },
  setProjects(state, projects) {
    state.projects = projects;
  },
  appendNewMember(state, member) {
    state.members.push(member);
  }
};

