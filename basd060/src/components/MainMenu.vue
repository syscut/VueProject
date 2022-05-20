<template>
  <v-app>
    <v-app-bar
      app
      color="#0068B0"
      absolute
      hide-on-scroll
      dense
      class="white--text"
      scroll-target="#view"
    >
      <v-app-bar-nav-icon>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <a v-bind="attrs" v-on="on" href="http://localhost:8080/menu">
              <v-img
                class="elevation-4"
                src="@/assets/gfc.gif"
                max-height="37"
                max-width="37"
              />
            </a>
          </template>
          <span>回首頁</span>
        </v-tooltip>
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-app-bar-title style="font-size: 14px">
        系統日期：05/17/2022 <br />使用人員：{{ userName }}
      </v-app-bar-title>

      <template v-slot:img>
        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="1">
            <v-img
              src="@/assets/log1.gif"
              max-width="58"
              min-width="58"
            /> </v-col
          ><v-col cols="1">
            <v-img
              src="@/assets/log2.gif"
              max-width="58"
              min-width="58"
            /> </v-col
          ><v-col cols="1">
            <v-img
              src="@/assets/log3.gif"
              max-width="58"
              min-width="58"
            /> </v-col
          ><v-col cols="1">
            <v-img src="@/assets/log4.gif" max-width="58" min-width="58" />
          </v-col>
          <v-col cols="5"></v-col>
        </v-row>
      </template>
      <template v-slot:extension>
        <v-card min-width="103%" max-height="48px" class="ml-n5" flat dark>
          <v-btn-toggle
            ><v-menu offset-x open-on-hover
              ><template v-slot:activator="{ on, attrs }"
                ><v-btn v-bind="attrs" v-on="on"
                  ><router-link to="/menu/basd060">測試</router-link></v-btn
                ></template
              ><v-btn-toggle dark
                ><v-btn>測試1</v-btn><v-btn>測試2</v-btn
                ><v-btn>測試3</v-btn></v-btn-toggle
              ></v-menu
            ><v-btn
              ><router-link to="/menu/src/metq010_list"
                >公司表單</router-link
              ></v-btn
            ><v-btn
              ><router-link to="/menu/src/psnd900w_proc"
                >其他網站</router-link
              ></v-btn
            ><v-btn>出勤作業</v-btn><v-btn>通訊錄建立</v-btn
            ><v-btn>資訊異動單</v-btn><v-btn>合約同步管理</v-btn
            ><v-btn>製做我的網頁</v-btn><v-btn>未簽文件</v-btn
            ><v-btn>密碼更改</v-btn><v-btn>e-Mail登記</v-btn></v-btn-toggle
          ><v-card-text class="pa-0 yellow--text"
            >★★★ 提醒您 ★★★</v-card-text
          ></v-card
        >
      </template>
    </v-app-bar>
    <v-main id="view">
      <div class="box">
        <div class="menu">
          <Menu-item />
        </div>
        <div class="main">
          <router-view name="main" />
        </div>
      </div>
    </v-main>
  </v-app>
</template>
<script>
import Cookies from "js-cookie";
import MenuItem from "@/components/MenuItem.vue";
export default {
  components: { MenuItem },
  name: "MainMenu",
  computed: {
    userName: {
      get: function () {
        console.log(Cookies.get("loginForm") === undefined);

        if (Cookies.get("loginForm") === undefined) {
          console.log("undefined");

          return "";
        }
        return JSON.parse(Cookies.get("loginForm")).userName;
      },
      set() {
        return JSON.parse(Cookies.get("loginForm")).userName;
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.v-btn {
  height: 24px !important;
}
.box {
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-areas: "m main";
}
.menu {
  overflow-y: scroll;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
}
.main {
  grid-area: main;
}
</style>
