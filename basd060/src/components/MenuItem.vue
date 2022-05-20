<template>
  <v-card>
    <v-sheet v-for="item in menuItem" :key="item.sys_no">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header
            style="min-height: 36px"
            class="pa-2 text-caption"
            @click="getPrg($event, item.sys_no)"
            >{{ item.sys_no + "&nbsp;" + item.sys_name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content style="text-transform: none">
            <v-sheet v-for="prg in programs" :key="prg.prg_no">
              <v-btn text>{{ prg.prg_no + prg.prg_name }}</v-btn>
            </v-sheet>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-sheet>
  </v-card>
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
        { sys_no: "ACC", sys_name: "會計總帳.財務分析" },
        { sys_no: "ADJ", sys_name: "安裝調整系統" },
        { sys_no: "AMB", sys_name: "阿米巴" },
        { sys_no: "BAS", sys_name: "基本資料" },
        { sys_no: "BGT", sys_name: "預算作業" },
        { sys_no: "ACS", sys_name: "會計總帳.財務分析" },
        { sys_no: "ADD", sys_name: "安裝調整系統" },
        { sys_no: "AMF", sys_name: "阿米巴" },
        { sys_no: "BAQ", sys_name: "基本資料" },
        { sys_no: "BGG", sys_name: "預算作業" },
        { sys_no: "ACJ", sys_name: "會計總帳.財務分析" },
        { sys_no: "ADW", sys_name: "安裝調整系統" },
        { sys_no: "AMU", sys_name: "阿米巴" },
        { sys_no: "BAL", sys_name: "基本資料" },
        { sys_no: "BGV", sys_name: "預算作業" },
        { sys_no: "ACQ", sys_name: "會計總帳.財務分析" },
        { sys_no: "ADP", sys_name: "安裝調整系統" },
        { sys_no: "AMM", sys_name: "阿米巴" },
        { sys_no: "BAD", sys_name: "基本資料" },
        { sys_no: "BGO", sys_name: "預算作業" },
      ],
      programs_tmp: [
        { prg_no: "accd000", prg_name: "績效評估損益比率資料維護" },
        { prg_no: "accd010", prg_name: "部門代碼檔維護" },
        { prg_no: "accd020", prg_name: "科子目檔維護" },
        { prg_no: "adjd010", prg_name: "安裝調整工程主檔維護 " },
        { prg_no: "adjd020", prg_name: "竣檢/消檢維護 " },
        { prg_no: "adjd021", prg_name: "合約實際貨抵日期維護 " },
      ],
      programs: [],
    };
  },
  methods: {
    getPrg(event, sys_no) {
      if (
        !event.currentTarget.classList.contains(
          "v-expansion-panel-header--active"
        )
      ) {
        console.log("open" + sys_no);
      }
    },
  },
};
</script>
