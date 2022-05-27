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
          checkbox-color="blue"
          item-key="maf_dept"
          loading-text="讀取中...請稍後"
          no-data-text="連線異常...查無資料"
          :items-per-page="5"
          @click:row="test"
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
// import axios from "axios";
// import { errorHandle } from "../../../lib/errorHandle";
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
  watch: {
    $_dialog(val) {
      if (val) {
        this.errMsg = "";
        // this.loadData = true;
        // axios
        //   .post("http://localhost:5000/mafm080")
        //   .then((res) => {
        //     //console.log(res.data);
        //     this.content = res.data;
        //   })
        //   .catch((e) => {
        //     this.errMsg = errorHandle.errMsg(e);
        //   })
        //   .finally(() => {
        //     this.loadData = false;
        //   });
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
  margin: 13px 0 13px 18px !important;
}
</style>
