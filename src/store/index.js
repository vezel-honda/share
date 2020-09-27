import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    auth: "",
    user: "",
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    user(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      let responseLogin = await axios.post(
        "https://infinite-shelf-65904.herokuapp.com/api/login",
        {
          email: email,
          password: password,
        }
      );
      let responseUser = await axios.get(
        "https://infinite-shelf-65904.herokuapp.com/api/user",
        {
          params: {
            email: email,
          },
        }
      );
      commit("auth", responseLogin.data.auth);
      commit("user", responseUser.data.data[0]);
      router.replace("/home");
    },
  },
});
