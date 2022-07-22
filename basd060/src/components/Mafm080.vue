<template>
  <v-dialog v-model="$_dialog" max-width="600px">
    <v-card>
      <v-app-bar color="primary" dark dense>
        <v-app-bar-nav-icon>
          <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
              <a href="#">
                <v-img
                  class="elevation-4"
                  src="@/assets/gfc.gif"
                  max-height="37"
                  max-width="37"
                />
              </a>
              </v-btn>
            </template>
            <span>程式說明</span>
          </v-tooltip>
        </v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title> 製造單位檔查詢(mafm080) </v-toolbar-title>
        <v-spacer></v-spacer>
        使用者：{{ emp_name }}
      </v-app-bar>
      <v-container>
        <v-row>
          <v-col style="color: red" align="center">
            {{ errMsg }}
          </v-col>
        </v-row>
        <v-data-table
          show-select
          single-select
          class="mx-5"
          v-model="selected"
          :loading="loadData"
          :headers="headers"
          :items="content"
          :footer-props="footerProps"
          :search="search"
          checkbox-color="blue"
          item-key="maf_dept"
          loading-text="讀取中...請稍後"
          no-data-text="查無資料"
          no-results-text="查無資料"
          :items-per-page="5"
          @click:row="test"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title> 搜尋： </v-toolbar-title>
              <v-text-field
                v-model="search"
                class="mx-4 mb-n5"
                append-icon="mdi-magnify"
              >
              </v-text-field>
              <v-btn
                color="green"
                class="white--text"
                :disabled="selected.length == 0"
                @click="$emit('maf-inf', selected[0])"
                >確認
                <v-icon right> mdi-check </v-icon>
              </v-btn>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import Cookies from "js-cookie";
import axios from "axios";
import { errorHandle } from "../../../lib/errorHandle";
export default {
  name: "mafm080",
  props: {
    dialogMafm080: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: [],
      content: [],
      emp_name: JSON.parse(Cookies.get("loginForm"))?.empName || "",
      errMsg: "",
      search: "",
      loadData: false,
    };
  },
  //ref:https://forum.quasar-framework.org/topic/4899/solve-open-close-children-s-dialog-from-parent-avoid-mutating-a-prop-directly-since-the-value-will-be/4
  computed: {
    $_dialog: {
      get: function () {
        return this.dialogMafm080;
      },
      set: function (val) {
        this.$emit("update:dialogMafm080", val);
      },
    },
    headers() {
      return [
        {
          text: "製造單位",
          value: "maf_dept",
          width: "100px",
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
        {
          text: "製造單位名稱",
          value: "maf_name",
          width: "200px",
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
      ];
    },
    footerProps() {
      return {
        showFirstLastPage: true,
        itemsPerPageAllText: "全部",
        itemsPerPageText: "每頁顯示",
        pageText: "第 {0} 至第 {1} 項 (共 {2} 筆)",
      };
    },
  },
  watch: {
    $_dialog(val) {
      if (val) {
        this.errMsg = "";
        this.loadData = true;
        axios
          .post("http://localhost:5000/mafm080")
          .then((res) => {
            //console.log(res.data);
            this.content = res.data;
          })
          .catch((e) => {
            this.errMsg = errorHandle.errMsg(e);
          })
          .finally(() => {
            this.loadData = false;
          });
      }
    },
  },
  methods: {
    test(e, i) {
      i.select((v) => v);
    },
  },
};
</script>
<style scoped>
.v-data-footer__select {
  margin: 5px 0 5px 18px !important;
}
.v-data-footer__pagination {
  margin: 0 5px 0 5px;
}
</style>
