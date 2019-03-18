import Vue from "vue";
import Vuex from "vuex";
import loginInfo from "./modules/loginInfo";
import bookkeeping from "./modules/bookkeeping";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loginInfo,
    bookkeeping
  }
});
