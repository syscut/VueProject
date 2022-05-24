<template>
  <v-dialog v-model="$_dialog" max-width="650px">
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
        <v-toolbar-title> 製造單位檔查詢(mafm080) </v-toolbar-title>
        <v-spacer></v-spacer>
        使用者：{{ user_name }}
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
              @click="$emit('maf-inf', selected[0])"
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
import axios from "axios";
import { errorHandle } from "../../../lib/errorHandle";
export default {
  name: "Mafm080",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    user_name: {
      type: String,
      default: "胡國棟",
    },
  },
  data() {
    return {
      selected: [],
      content: [],
      errMsg: "",
      loadData: false,
    };
  },
  //ref:https://forum.quasar-framework.org/topic/4899/solve-open-close-children-s-dialog-from-parent-avoid-mutating-a-prop-directly-since-the-value-will-be/4
  computed: {
    $_dialog: {
      get: function () {
        return this.dialog;
      },
      set: function (val) {
        this.$emit("update:dialog", val);
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
  margin: 13px 0 13px 18px !important;
}
</style>
