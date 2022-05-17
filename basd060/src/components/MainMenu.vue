<template>
  <v-app-bar app color="#0068B0" hide-on-scroll dense style="color: white">
    <v-app-bar-nav-icon>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <a v-bind="attrs" v-on="on" href="http://gfcweb/gfc">
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
    <v-app-bar-title style="min-width: 700px">
      <v-row class="ma-0">
        <v-col> <v-img src="@/assets/log1.gif" max-width="52" /> </v-col
        ><v-col> <v-img src="@/assets/log2.gif" max-width="52" /> </v-col
        ><v-col> <v-img src="@/assets/log3.gif" max-width="52" /> </v-col
        ><v-col>
          <v-img src="@/assets/log4.gif" max-width="52" />
        </v-col>
      </v-row>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    系統日期：05/17/2022<br />使用人員：{{ userName }}
  </v-app-bar>
</template>
<script>
import Cookies from "js-cookie";
export default {
  name: "MainMenu",
  computed: {
    userName: {
      get: function () {
        return JSON.parse(Cookies.get("loginForm")).userName;
      },
    },
  },
  data() {
    return {};
  },
};
</script>
