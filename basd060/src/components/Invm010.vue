<template>
  <v-dialog v-model="$_dialog" max-width="800px">
    <v-card>
      <v-app-bar color="primary" dark dense>
        <v-app-bar-nav-icon>
          <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <a v-bind="attrs" v-on="on" href="#">
                <v-img
                  class="elevation-4"
                  src="@/assets/gfc.gif"
                  max-height="37"
                  max-width="37"
                />
              </a>
            </template>
            <span>程式說明</span>
          </v-tooltip>
        </v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title> 料號細項檢索(invm010) </v-toolbar-title>
        <v-spacer></v-spacer>
        使用者：{{ emp_name }}
      </v-app-bar>
      <v-container>
        <v-row class="ml-3 my-n5" align-content="center" justify="center">
          <v-col cols="2">
            <v-text-field v-model="invForm.item_no" label="料號"> </v-text-field
          ></v-col>
          <v-col cols="2">
            <v-text-field v-model="invForm.proc_code" label="作業別">
            </v-text-field
          ></v-col>
          <v-col cols="1">
            <v-text-field v-model="invForm.schr_code" label="製程別">
            </v-text-field
          ></v-col>
          <v-col cols="1">
            <v-text-field v-model="invForm.sbl_no" label="副番號">
            </v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field v-model="invForm.item_desc" label="品名">
            </v-text-field
          ></v-col>
          <v-col cols="2" align-self="center">
            <v-btn color="primary" class="white--text" @click="search()"
              >查詢
              <v-icon right> mdi-magnify </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="red--text mt-n5" align="center">
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
          checkbox-color="blue"
          item-key="rowid"
          loading-text="讀取中...請稍後"
          no-data-text="查無資料"
          no-results-text="查無資料"
          :items-per-page="5"
          @click:row="selectRow"
        >
          <!-- 'v-slot' directive doesn't support any modifier 參考資料： https://stackoverflow.com/questions/61344980/v-slot-directive-doesnt-support-any-modifier -->
          <template v-slot:[`footer.prepend`]>
            <v-btn
              color="green"
              class="white--text"
              :disabled="selected.length == 0"
              @click="$emit('inv-inf', selected[0])"
              >確認
              <v-icon right> mdi-check </v-icon>
            </v-btn>
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
import { glib } from "../../../lib/gfclib";
export default {
  name: "Invm010",
  props: {
    dialogInvm010: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: [],
      content: [],
      errMsg: "",
      invForm: {
        item_no: "",
        proc_code: "",
        schr_code: "",
        sbl_no: "",
        item_desc: "",
        item_spec: "",
        draw_no: "",
        unit_measure: "",
      },
      emp_name: JSON.parse(Cookies.get("loginForm"))?.empName || "",
      loadData: false,
    };
  },
  computed: {
    $_dialog: {
      get: function () {
        return this.dialogInvm010;
      },
      set: function (val) {
        this.$emit("update:dialogInvm010", val);
      },
    },
    headers() {
      return [
        {
          text: "料號",
          value: "item_no",
          width: "30px",
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
        {
          text: "作業別",
          value: "proc_code",
          width: "35px",
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
        {
          text: "製程別",
          value: "schr_code",
          width: "35px",
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
        {
          text: "副番號",
          value: "sbl_no",
          width: "35px",
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
        {
          text: "品名",
          value: "item_desc",
          width: "100px",
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
        {
          text: "規格",
          value: "item_spec",
          width: "100px",
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
        {
          text: "圖號",
          value: "draw_no",
          width: "60px",
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
        {
          text: "計量單位",
          value: "unit_measure",
          width: "20px",
          class: "px-0",
          cellClass: "px-0",
          sortable: false,
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
  methods: {
    selectRow(e, i) {
      i.select((v) => v);
    },
    search() {
      let sql = `select item_no,proc_code,schr_code,sbl_no,item_desc,item_spec,draw_no,unit_measure from invm010 where 1 = 1 ${glib.sqlAndBuilder(
        this.invForm
      )}`;
      axios
        .post("http://localhost:5000/search", [sql])
        .then((res) => {
          console.log(res.data.result0);
          this.content = res.data;
        })
        .catch((e) => {
          this.errMsg = errorHandle.errMsg(e);
        });
    },
  },
};
</script>
<style scoped>
.v-data-footer__select {
  margin: 13px 0 13px 18px !important;
}
</style>
