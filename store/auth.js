import {SESSION} from "../utils";
console.log('SESSION',this);
// initial state
export const state = {
  status: "",
  token: window.$nuxt.$cookies.set(SESSION.TOKEN) || "",
  user: {}
};

// getters
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  user: state => state.user
};

// actions
export const actions = {
  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("/api/users/me")
        .then(resp => {
          commit("updateUser", resp.data);
          commit("user/getCurrentUserSuccess", resp.data, { root: true });
          resolve(resp.data);
        })
        .catch(err => {
          commit("authError");
          reject(err);
        });
    });
  },
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("authRequest");
      this.$axios
        .post("/api/users/auth/get-code/", user)
        .then(resp => {
          if (resp.data["2fa"] === true) {
            resolve(resp);
          } else {
            setToken(resp, commit, resolve);
          }
        })
        .catch(err => {
          commit("authError");
          reject(err);
        });
    });
  },
  login2({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("authRequest");
      this.$axios
        .post("/api/users/auth/login/", data)
        .then(resp => {
          setToken(resp, commit, resolve);
        })
        .catch(err => {
          commit("authError");
          window.$nuxt.$cookies.remove(SESSION.TOKEN);
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit("logout");
      window.$nuxt.$cookies.remove(SESSION.TOKEN);
      resolve();
    });
  }
};

// mutations
export const mutations = {
  updateUser(state, user) {
    state.user = user;
  },
  authRequest(state) {
    state.status = "loading";
  },
  authSuccess(state, { token, user }) {
    state.status = "success";
    state.token = token;
    state.user = user;
    window.$nuxt.$cookies.set(SESSION.TOKEN, token);
  },
  authError(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
  }
};




