<template>
  <v-virtual-scroll max-width="180px" :items="menuItem" :item-height="30">
    <template v-slot:default="{ item }">
      <v-list-item-content>
        <v-list-item-title>{{ item }}</v-list-item-title>
      </v-list-item-content>
    </template>
  </v-virtual-scroll>
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
        { ACC: "會計總帳.財務分析" },
        { ADJ: "安裝調整系統" },
        { AMB: "阿米巴" },
        { BAS: "基本資料" },
        { BGT: "預算作業" },
        { ACC: "會計總帳.財務分析" },
        { ADJ: "安裝調整系統" },
        { AMB: "阿米巴" },
        { BAS: "基本資料" },
        { BGT: "預算作業" },
        { ACC: "會計總帳.財務分析" },
        { ADJ: "安裝調整系統" },
        { AMB: "阿米巴" },
        { BAS: "基本資料" },
        { BGT: "預算作業" },
      ],
    };
  },
};
</script>
