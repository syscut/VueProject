<template>
  <v-app>
    <v-app-bar app color="#0068B0" hide-on-scroll dense style="color: white">
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
        <v-card class="ml-n5 mt-3" min-width="103%" dark flat height="60px">
          <v-toolbar min-width="103%" height="32px" flat dark
            ><v-btn height="30px" text>阿米巴</v-btn
            ><v-btn height="30px" text>公司表單</v-btn
            ><v-btn height="30px" text>其他網站</v-btn
            ><v-btn height="30px" text>出勤作業</v-btn
            ><v-btn height="30px" text>通訊錄建立</v-btn
            ><v-btn height="30px" text>資訊異動單</v-btn
            ><v-btn height="30px" text>合約同步管理</v-btn
            ><v-btn height="30px" text>製做我的網頁</v-btn
            ><v-btn height="30px" text>未簽文件</v-btn
            ><v-btn height="30px" text>密碼更改</v-btn
            ><v-btn height="30px" text>e-Mail登記</v-btn></v-toolbar
          ><span style="color: yellow">★★★ 提醒您 ★★★</span></v-card
        >
      </template>
    </v-app-bar>
    <v-main class="mt-3">
      <v-row>
        <Menu-item />
        <router-view name="main" />
      </v-row>
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
};
</script>
