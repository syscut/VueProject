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
    meta: { requireAuth: true },
    component: () => import("@/components/MainMenu.vue"),
    children: [
      // {
      //   path: "",
      //   props: { main: true },
      //   components: { main: () => import("@/components/IFrame.vue") },
      // },
      {
        path: "src/:src",
        props: { main: true },
        components: { main: () => import("@/components/IFrame.vue") },
      },
      {
        path: "basd060",
        meta: { requireAuth: true },
        components: { main: () => import("@/components/Basd060Main.vue") },
      },
    ],
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
    if (
      to.name == "login" &&
      loginForm !== undefined &&
      JSON.parse(loginForm).token == "rhs256"
    ) {
      next({ path: "menu" });
    }
    next();
  }
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
