import {SESSION} from "../utils";
// initial state
import Cookies from 'js-cookie';

export const state = () => {
  let token = ''
  return {
    status: "",
    token: token,
    authenticated: !!token,
    user: null
  }
}
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  user: state => state.user
};
// actions
export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({commit, dispatch}, {req}) {
    return new Promise((resolve) => {
      let token = Cookies.get(SESSION.TOKEN)
      if (token) {
        commit('authToken', {token})
        this.$axios.setToken("JWT " + token);
        let user;
        this.$axios.get("/api/users/me").then(rs => {
          user = rs.data
          commit('authSuccess', {user: rs.data, token})
        }).finally(() => {
          resolve(1)
        })
        // console.log('USER', user.data)
      }
    })

  },
  getUser({commit}) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("/api/users/me")
        .then(resp => {
          commit("updateUser", resp.data);
          resolve(resp.data);
        })
        .catch(err => {
          commit("authError");
          reject(err);

        });
    });
  },
  login({commit}, user) {
    return new Promise((resolve, reject) => {
      commit("authRequest");
      this.$axios
        .post("/api/users/auth/get-code/", user)
        .then(resp => {
          if (resp.data["2fa"] === true) {
            resolve(resp);
          } else {
            // setToken(resp, commit, resolve);
          }
        })
        .catch(err => {
          commit("authError");
          reject(err);
        });
    });
  },
  login2({commit}, data) {
    return new Promise((resolve, reject) => {
      commit("authRequest");
      this.$axios
        .post("/api/users/auth/login/", data)
        .then(resp => {
          // setToken(resp, commit, resolve);
        })
        .catch(err => {
          commit("authError");
          Cookies.remove(SESSION.TOKEN);
          reject(err);
        });
    });
  },
  logout({commit}) {

    return new Promise(resolve => {
      commit("logout");
      Cookies.remove(SESSION.TOKEN);
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
  authSuccess(state, {token, user}) {
    state.status = "success";
    state.token = token;
    state.user = user;
    Cookies.set(SESSION.TOKEN, token);
  },
  authToken(state, {token}) {
    state.token = token;
    state.authenticated = !!token;
    Cookies.set(SESSION.TOKEN, token);
  },
  authError(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
  }
};




