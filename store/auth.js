import {SESSION} from "../utils";
// initial state
import Cookies from 'js-cookie';
const tk = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJ2aWV0QG1haWxpbmF0b3IuY29tIiwiZXhwIjoxNTgxOTAwNTY4LCJlbWFpbCI6InZpZXRAbWFpbGluYXRvci5jb20iLCJzZXNzaW9uX2lkIjoiYmUxYTkzZmQtZmUxMC00NmYzLWJkYzYtOTEwODM3NzFjNjE4Iiwid29ya3NwYWNlIjoic2F0bGVnYWwxIiwid29ya3NwYWNlX3JvbGUiOjF9.EJslvJ9xjYgjAfHkVE_JnWpCxYbcxXsMWY3Q5KF-n7c'
// const tk = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InVzZXIxQGVtYWlsLmNvbSIsImV4cCI6MTU3OTc1MTExNCwiZW1haWwiOiJ1c2VyMUBlbWFpbC5jb20iLCJzZXNzaW9uX2lkIjoiZmQ1YTZlMjQtZGE3NS00MzUxLTliOTEtZDdjYjBmNTY2ODYyIiwid29ya3NwYWNlIjoiZG9uZ2EiLCJ3b3Jrc3BhY2Vfcm9sZSI6MX0.yim_XcCd3YU-Usd-Cl1YZayxboz8xlGSMkEiyrCjgds'
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
    let token = tk
    // let token = Cookies.get(SESSION.TOKEN)

    if (token) {
      commit('authToken', {token})
      this.$axios.setToken("JWT " + token);
      let rs = await this.$axios.get("/api/users/me")
       await this.$axios.get("/api/app-configs/")
      commit('authSuccess', {user: rs.data, token})
      // console.log('USER', user.data)
      return rs
    }
    return false

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
  },

  // load court /api/courts/
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




