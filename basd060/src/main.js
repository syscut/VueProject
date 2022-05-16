import Vue from "vue";
import Login from "./Login.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Basd060 from "@/components/Basd060.vue";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/basd060",
    name: "basd060",
    component: Basd060,
    meta: { requireAuth: true },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

new Vue({
  vuetify,
  router,
  render: (h) => h(Login),
}).$mount("#app");
