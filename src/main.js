import Vue from "vue";
import router from "./router";
import store from "./store";
import "es6-promise/auto";

Vue.config.productionTip = false;

import axios from "axios";
Vue.prototype.$http = axios;

import VueSSE from "vue-sse";
Vue.use(VueSSE);

import VueI18n from "vue-i18n";
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: "ko",
  messages: require("./message/message.json")
});
export default i18n;

import VueMoment from "vue-moment";
const moment = require("moment");
require("moment/locale/ko");
Vue.use(VueMoment, { moment });

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas, fab);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import DefaultLayout from "./layout/DefaultLayout.vue";

new Vue({
  router,
  store,
  i18n: i18n,
  components: { DefaultLayout },
  template: "<DefaultLayout/>",
  render: h => h(DefaultLayout)
}).$mount("#app");
