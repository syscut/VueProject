<template>
  <v-dialog v-model="$_dialog" max-width="650px">
    <v-card>
      <v-app-bar color="primary" dark dense>
        <v-app-bar-nav-icon>
          <v-img
            class="elevation-4"
            src="./gfc.gif"
            max-height="37"
            max-width="37"
          />
        </v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title> 郵遞區號檔查詢(basn021) </v-toolbar-title>
        <v-spacer></v-spacer>
        使用者：{{ userName }}
      </v-app-bar>
      <v-container>
        <v-row class="mx-1">
          <v-col cols="3">
            <v-text-field v-model="zipCode"
              ><template v-slot:prepend
                ><nobr class="mt-1">郵遞區號</nobr></template
              ></v-text-field
            >
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="zipArea"
              ><template v-slot:prepend
                ><nobr class="mt-1">郵遞區域</nobr></template
              ></v-text-field
            ></v-col
          >
          <v-col class="mt-2" cols="4">
            <v-btn @click="search()">查詢</v-btn>
            <v-btn>確認</v-btn>
          </v-col>
        </v-row>

        <v-data-table
          class="mx-5"
          v-model="selected"
          :headers="headers"
          :items="content"
          item-key="zipCode"
          loading-text="搜尋中...請稍後"
          no-data-text="尚無資料"
          no-results-text="查無資料"
        ></v-data-table>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "Basn021",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      default: "胡國棟",
    },
  },
  data() {
    return {
      zipCode: "100",
      zipArea: "台北市中山區",
      selected: [],
      content: [],
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
          text: "選擇",
          width: "40px",
          sortable: false,
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
        {
          text: "郵遞區號",
          value: "zipCode",
          width: "60px",
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
        {
          text: "郵寄郵遞區號",
          value: "mailZipcode",
          width: "60px",
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
        {
          text: "郵遞區域",
          value: "zipArea",
          width: "80px",
          class: "px-0",
          cellClass: "px-0",
          align: "center",
        },
      ];
    },
  },
  methods: {
    search() {},
  },
};
</script>
