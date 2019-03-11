import Vue from "vue";
import Vuex from "vuex";
import loginInfo from "./modules/loginInfo";

//import plugins from "./plugins";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loginInfo
  }
});
