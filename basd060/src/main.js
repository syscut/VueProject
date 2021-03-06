import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Cookies from "js-cookie";

Vue.prototype.$bus = new Vue();
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
      {
        path: "",
        props: { main: true },
        components: { main: () => import("@/components/IFrame.vue") },
      },
      {
        path: "src/:src",
        props: { main: true },
        components: { main: () => import("@/components/IFrame.vue") },
      },
      {
        path: ":prg",
        props: { main: true },
        meta: { requireAuth: true },
        components: { main: () => import("@/components/BannerExample.vue") },
      },
      {
        path: "404",
        components: { main: () => import("@/components/Page404.vue") },
        hidden: true,
      },
      {
        path: "*",
        redirect: "404",
        hidden: true,
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/Page404.vue"),
    hidden: true,
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  mode:"history",
  base: process.env.BASE_URL, //ref: https://cli.vuejs.org/guide/mode-and-env.html#using-env-variables-in-client-side-code
  routes,
});

router.beforeEach(async (to, from, next) => {
  const loginForm = Cookies.get("loginForm");
  if (to.meta.requireAuth) {
    if (loginForm !== undefined && JSON.parse(loginForm).token == "rhs256") {
      document.title =
        "崇友系統-" +
        JSON.parse(loginForm).empNo +
        JSON.parse(loginForm).usrGroup;
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
      document.title =
        "崇友系統-" +
        JSON.parse(loginForm).empNo +
        JSON.parse(loginForm).usrGroup;
      next({ path: "menu" });
    }
    document.title = "崇友系統";
    next();
  }
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
