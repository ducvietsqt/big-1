import Vue from 'vue'
const localStorage = this.$cookies;


Vue.prototype.$setSESSION = (session_name, data) => {
  return this.$cookies.set(session_name, data);
};

Vue.prototype.$getSESSION = (session_name) => {
  let value = this.$cookies.get(session_name);
  try {
    return JSON.parse(this.$cookies.get(session_name));
  } catch (error) {
    return value;
  }
};

Vue.prototype.$removeSESSION = (session_name, remove_all = false) => {
  let removeAll = () => {
    this.$cookies.removeAll();
  };
  let removeItems = () => {
    for (let i = 0; i < session_name.length; i++) {
      this.$cookies.remove(session_name[i]);
    }
  };
  // todo: remove all session
  if (remove_all) return removeAll();
  // todo: remove items session
  if (Array.isArray(session_name)) return removeItems();
  // todo: remove string name
  return this.$cookies.remove(session_name);
};

// Vue.prototype.$myInjectedFunction = string => console.log('This is an example', string)
