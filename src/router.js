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
      path: "/error/login",
      name: "ErrorLogin",
      component: () =>
        import("./components/error/Login.vue")
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
      component: () => import("@/components/bookkeeping/BookkeepingLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("@/components/bookkeeping/Index.vue")
        },
        {
          path: "create",
          component: () => import("@/components/bookkeeping/Create.vue")
        },
        {
          path: "/bookkeeping/:bookkeepingId/List",
          component: () => import("./components/bookkeeping/List.vue")
        }
      ]
    }
    
  ]
});
