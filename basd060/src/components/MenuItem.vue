<template>
  <v-sheet max-width="214px">
    <v-text-field
      v-model="searchText"
      dense
      prepend-inner-icon="mdi-magnify"
      placeholder="搜尋"
      class="px-5 elevation-1"
    ></v-text-field>
    <template v-if="searchPrograms.length == 0">
      <v-sheet v-for="item in menuItem" :key="item.sys_no">
        <v-expansion-panels hover tile>
          <v-expansion-panel>
            <v-expansion-panel-header
              style="min-height: 36px; font-size: 0.75em"
              class="pa-2"
              @click="getPrg($event, item.sys_no)"
              >{{ item.sys_no + "&nbsp;" + item.sys_name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-sheet v-for="prg in programs" :key="prg.prg_no">
                <v-btn
                  min-width="220px"
                  style="text-transform: none; font-size: 0.75em"
                  v-if="prg.prg_no.slice(0, 3).toUpperCase() == item.sys_no"
                  text
                  ><span class="text-wrap text-left" style="width: 180px">{{
                    prg.prg_name + "(" + prg.prg_no + ")"
                  }}</span></v-btn
                >
              </v-sheet>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-sheet>
    </template>
    <template v-else>
      <v-sheet v-for="sPrg in searchPrograms" :key="sPrg.prg_no">
        <v-btn
          min-width="250px"
          style="text-transform: none; font-size: 0.75em; justify-content: left"
          text
          >{{ sPrg.prg_no + sPrg.prg_name }}</v-btn
        >
      </v-sheet>
    </template>
  </v-sheet>
</template>
<script>
import Cookies from "js-cookie";
import axios from "axios";
import { errorHandle } from "../../../lib/errorHandle";
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
      // { sys_no: "ACC", sys_name: "會計總帳.財務分析" },
      // { sys_no: "ADJ", sys_name: "安裝調整系統" },
      // { sys_no: "AMB", sys_name: "阿米巴" },
      // { sys_no: "BAS", sys_name: "基本資料" },
      // { sys_no: "BGT", sys_name: "預算作業" },
      // { sys_no: "ACS", sys_name: "會計總帳.財務分析" },
      // { sys_no: "ADD", sys_name: "安裝調整系統" },
      // { sys_no: "AMF", sys_name: "阿米巴" },
      // { sys_no: "BAQ", sys_name: "基本資料" },
      // { sys_no: "BGG", sys_name: "預算作業" },
      // { sys_no: "ACJ", sys_name: "會計總帳.財務分析" },
      // { sys_no: "ADW", sys_name: "安裝調整系統" },
      // { sys_no: "AMU", sys_name: "阿米巴" },
      // { sys_no: "BAL", sys_name: "基本資料" },
      // { sys_no: "BGV", sys_name: "預算作業" },
      // { sys_no: "ACQ", sys_name: "會計總帳.財務分析" },
      // { sys_no: "ADP", sys_name: "安裝調整系統" },
      // { sys_no: "AMM", sys_name: "阿米巴" },
      // { sys_no: "BAD", sys_name: "基本資料" },
      // { sys_no: "BGO", sys_name: "預算作業" },

      //  {
      //   prg_no: "accd000",
      //   prg_name: "績效評估損益比率資料維護績效評估損益比率",
      // },
      // { prg_no: "accd010", prg_name: "部門代碼檔維護" },
      // { prg_no: "accd020", prg_name: "科子目檔維護" },
      // { prg_no: "adjd010", prg_name: "安裝調整工程主檔維護 " },
      // { prg_no: "adjd020", prg_name: "竣檢/消檢維護 " },
      // { prg_no: "adjd021", prg_name: "合約實際貨抵日期維護 " },
      menuItem: [],
      programs_tmp: [],
      programs: [],
      searchPrograms: [],
      searchText: "",
    };
  },
  watch: {
    searchText: function (val) {
      this.searchPrograms = [];
      if (val.length > 0) {
        this.programs.forEach((v) => {
          if (
            (v.prg_no.includes(val) || v.prg_name.includes(val)) &&
            !this.searchPrograms.includes(v)
          ) {
            this.searchPrograms.push(v);
          }
        });
      }
    },
  },
  methods: {
    getPrg(event, sys_no) {
      //如果是打開狀態更新程式
      if (
        !event.currentTarget.classList.contains(
          "v-expansion-panel-header--active"
        )
      ) {
        this.programs_tmp.forEach((v) => {
          if (
            v.prg_no.slice(0, 3).toUpperCase() == sys_no &&
            !this.programs.includes(v)
          ) {
            //this.programs.push(v);
          }
        });
      }
    },
  },
  mounted() {
    axios
      .post("http://localhost:5000/menu")
      .then((res) => {
        console.log(res.data);
        this.menuItem = res.data.menuItem;
        this.programs = res.data.programs;
      })
      .catch((e) => {
        this.errMsg = errorHandle.errMsg(e);
      })
      .finally(() => {
        //this.loadData = false;
      });
  },
};
</script>
<style scoped>
.v-expansion-panel-content >>> .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
