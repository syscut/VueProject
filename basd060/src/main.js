import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Cookies from "js-cookie";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/components/Login.vue"),
  },
  {
    path: "/menu",
    name: "menu",
    meta: { requireAuth: true },
    component: () => import("@/components/MainMenu.vue"),
  },
  {
    path: "/basd060",
    name: "basd060",
    meta: { requireAuth: true },
    component: () => import("@/components/Basd060.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const loginForm = Cookies.get("loginForm");
  if (to.meta.requireAuth) {
    if (loginForm !== undefined && JSON.parse(loginForm).token == "rhs256") {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    if (loginForm !== undefined && JSON.parse(loginForm).token == "rhs256") {
      next({ name: "menu" });
    }
    next();
  }
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
