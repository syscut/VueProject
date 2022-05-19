<template>
  <v-expansion-panels accordion>
    <v-expansion-panel v-for="item in 15" :key="item">
      <v-expansion-panel-header>{{ item }}</v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import Cookies from "js-cookie";
export default {
  name: "MenuItem",
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
    return {
      menuItem: [
        { ACC: "會計總帳.財務分析" },
        { ADJ: "安裝調整系統" },
        { AMB: "阿米巴" },
        { BAS: "基本資料" },
        { BGT: "預算作業" },
        { ACS: "會計總帳.財務分析" },
        { ADD: "安裝調整系統" },
        { AMF: "阿米巴" },
        { BAQ: "基本資料" },
        { BGG: "預算作業" },
        { ACJ: "會計總帳.財務分析" },
        { ADW: "安裝調整系統" },
        { AMU: "阿米巴" },
        { BAL: "基本資料" },
        { BGV: "預算作業" },
        { ACQ: "會計總帳.財務分析" },
        { ADP: "安裝調整系統" },
        { AMM: "阿米巴" },
        { BAD: "基本資料" },
        { BGO: "預算作業" },
      ],
    };
  },
};
</script>
