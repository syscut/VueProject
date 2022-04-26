<template>
  <v-dialog v-model="$_dialog" max-width="650px">
    <v-card>
      <v-app-bar color="primary" dark dense>
        <v-app-bar-nav-icon>
          <v-img
            class="elevation-4"
            src="../assets/gfc.gif"
            max-height="37"
            max-width="37"
          />
        </v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title> 郵遞區號檔查詢(basn021) </v-toolbar-title>
        <v-spacer></v-spacer>
        使用者：{{ user_name }}
      </v-app-bar>
      <v-container>
        <v-row class="mx-1">
          <v-col cols="3">
            <v-text-field v-model="form.zip_code"
              ><template v-slot:prepend
                ><nobr class="mt-1">郵遞區號</nobr></template
              ></v-text-field
            >
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="form.zip_area"
              ><template v-slot:prepend
                ><nobr class="mt-1">郵遞區域</nobr></template
              ></v-text-field
            ></v-col
          >
          <v-col class="mt-2" cols="4">
            <v-btn class="mr-3" @click="search()"
              >查詢
              <v-icon right> mdi-magnify </v-icon>
            </v-btn>
            <v-btn
              class="mr-n1"
              :disabled="selected.length == 0"
              @click="$emit('zip-inf', selected[0])"
              >確認
              <v-icon right> mdi-check </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mt-n9">
          <v-col style="color: red" align="center">
            {{ errMsg }}
          </v-col>
        </v-row>
        <v-data-table
          show-select
          single-select
          class="mx-5"
          v-model="selected"
          :headers="headers"
          :items="content"
          :footer-props="footerProps"
          item-key="zip_code"
          loading-text="搜尋中...請稍後"
          no-data-text="請輸入並查詢"
          no-results-text="查無資料"
          :items-per-page="5"
        >
        </v-data-table>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "axios";
export default {
  name: "Basn021",
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
      form: {
        zip_code: "",
        zip_area: "",
      },
      selected: [],
      content: [],
      errMsg: "",
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
          text: "郵遞區號",
          value: "zip_code",
          width: "60px",
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
        {
          text: "郵寄郵遞區號",
          value: "mail_zipcode",
          width: "60px",
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
        {
          text: "郵遞區域",
          value: "zip_area",
          width: "80px",
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
  methods: {
    search() {
      axios
        .post("http://localhost:5000/basn021", this.form)
        .then((res) => {
          console.log(res.data);
          if (res.data.length == 300) {
            this.errMsg = "資料超過300筆!";
          }
          this.content = res.data;
        })
        .catch((e) => {
          this.errMsg = e;
        });
    },
  },
};
</script>
