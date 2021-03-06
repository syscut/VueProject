<template>
  <v-sheet max-width="214px">
    <v-text-field
      v-model="searchText"
      dense
      prepend-inner-icon="mdi-magnify"
      placeholder="搜尋"
      class="px-5 elevation-1"
    ></v-text-field>
    <template v-if="errMsg.length != 0">
      <v-sheet color="red">{{ errMsg }}</v-sheet>
    </template>
    <template v-if="menuLoading">
      <v-row style="min-height: 300px" align-content="center" justify="center">
        <v-progress-circular
          :indeterminate="menuLoading"
          color="primary"
        ></v-progress-circular>
      </v-row>
    </template>
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
            <v-expansion-panel-content v-if="loadingSys == item.sys_no">
              <v-row
                style="min-height: 80px"
                align-content="center"
                justify="center"
              >
                <v-progress-circular
                  :indeterminate="prgLoading"
                  color="primary"
                ></v-progress-circular>
              </v-row>
            </v-expansion-panel-content>
            <v-expansion-panel-content v-else>
              <v-sheet v-for="prg in programsOnMenu" :key="prg.prg_no">
                <v-btn
                  v-if="prg.prg_no.slice(0, 3) == item.sys_no"
                  width="214px"
                  class="text-lowercase justify-start flex-def"
                  :to="'/menu/' + prg.prg_no.toLowerCase()"
                  @click="sendPrgList('click')"
                  outlined
                  text
                  >{{ prg.prg_name + "(" + prg.prg_no + ")" }}
                </v-btn>
              </v-sheet>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-sheet>
    </template>
    <template v-else>
      <v-sheet v-for="sPrg in searchPrograms" :key="sPrg.prg_no">
        <v-btn
          width="214px"
          class="text-lowercase justify-start flex-def"
          :to="'/menu/' + sPrg.prg_no.toLowerCase()"
          @click="sendPrgList('click')"
          outlined
          text
          >{{ sPrg.prg_name + "(" + sPrg.prg_no + ")" }}
        </v-btn>
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
  data() {
    return {
      menuItem: [],
      programs: [],
      programsOnMenu: [],
      searchPrograms: [],
      usrGroup: "",
      empNo: "",
      searchText: "",
      errMsg: "",
      loadingSys: "",
      waitingBanner: false,
      bannerLoadded: false,
      menuLoading: false,
      prgLoading: false,
    };
  },
  watch: {
    searchText: function (val) {
      this.searchPrograms = [];
      if (val.length > 0) {
        this.programs.forEach((v) => {
          if (
            v.prg_no.includes(val.toUpperCase()) ||
            v.prg_name.includes(val)
          ) {
            this.searchPrograms.push(v);
          }
        });
      }
    },
    bannerLoadded: function (val) {
      //有在等待banner更新
      if (this.waitingBanner && val) {
        this.waitingBanner = false;
        this.$bus.$emit("postPrgList", this.programs);
      }
    },
  },
  computed: {},
  methods: {
    getPrg(event, sys_no) {
      //如果是打開狀態更新程式
      if (
        !event.currentTarget.classList.contains(
          "v-expansion-panel-header--active"
        )
      ) {
        this.loadingSys = sys_no;
        this.prgLoading = true;
        axios
          .post("http://localhost:5000/menuPrg", {
            usrGroup: this.usrGroup,
            empNo: this.empNo,
            sysNo: sys_no,
          })
          .then((res) => {
            res.data.forEach((prg) => {
              if (!this.programsOnMenu.some((p) => p.prg_no == prg.prg_no)) {
                this.programsOnMenu.push(prg);
              }
            });
          })
          .catch((e) => {
            this.errMsg = errorHandle.errMsg(e);
          })
          .finally(() => {
            this.prgLoading = false;
            this.loadingSys = "";
          });
      }else{
        //如果關起來移除programsOnMenu
        let otherPrg = this.programsOnMenu.filter(v=>v.prg_no.slice(0,3)!=sys_no)
        this.programsOnMenu = otherPrg;
      }
    },
    sendPrgList(from = "") {
      //有可能按了 但 banner 還未 mount 所以要等待
      if (from == "click" && !this.bannerLoadded) {
        this.waitingBanner = true;
        // from axios 會比 banner 慢 所以不等待 或是from click 但 banner 已經 mount 也不須等待 banner
      } else {
        this.$bus.$emit("postPrgList", this.programs);
      }
    },
  },
  mounted() {
    this.menuLoading = true;
    this.usrGroup = JSON.parse(Cookies.get("loginForm")).usrGroup;
    this.empNo = JSON.parse(Cookies.get("loginForm")).empNo;
    axios
      .post("http://localhost:5000/menu", {
        usrGroup: this.usrGroup,
        empNo: this.empNo,
      })
      .then((res) => {
        this.menuItem = res.data.menuItem;
        this.programs = res.data.programs;
        this.sendPrgList("axios");
      })
      .catch((e) => {
        this.errMsg = errorHandle.errMsg(e);
      })
      .finally(() => {
        this.menuLoading = false;
      });
    //取得 banner 是否已 mount
    this.$bus.$on("loadBannerFinish", (status) => {
      this.bannerLoadded = status;
    });
  },
  beforeDestroy: function () {
    this.$bus.$off("loadBannerFinish");
  },
};
</script>
<style scoped>
.v-expansion-panel-content >>> .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
.flex-def >>> .v-btn__content {
  white-space: initial !important;
  flex: auto !important;
  font-size: 0.85em;
}
</style>
