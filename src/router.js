import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/notification",
      name: "Notification",
      component: () =>
        import(/* webpackChunkName: "notification" */ "./components/notification/Notification.vue")
    },
    {
      path: "/bookkeeping",
      name: "Bookkeeping",
      component: () =>
        import(/* webpackChunkName: "bookkeeping" */ "./components/bookkeeping/Index.vue")
    }
  ]
});
