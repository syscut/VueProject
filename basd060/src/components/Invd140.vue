<template>
  <v-form v-model="valid" lazy-validation>
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
      <v-toolbar-title> 一般領料單開立維護(invd140) </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-container>
      <v-row no-gutters class="mt-n4">
        <v-col cols="2">
          <v-text-field>
            <template v-slot:prepend
              ><nobr class="mt-1 ml-4">倉庫別</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col class="ml-3" cols="3">
          <v-text-field></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="2">
          <v-text-field>
            <template v-slot:prepend
              ><nobr class="mt-1">申請人員</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col class="ml-3" cols="2"><v-text-field></v-text-field></v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row no-gutters class="mt-n4">
        <v-col cols="2">
          <v-text-field>
            <template v-slot:prepend
              ><nobr class="mt-1">申請單號</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col class="ml-3" cols="2"><v-text-field></v-text-field></v-col>
        <v-col class="ml-3" cols="2"><v-text-field></v-text-field></v-col>
        <v-col class="ml-5" cols="4"
          ><v-text-field>
            <template v-slot:prepend
              ><nobr class="mt-1">單據名稱</nobr></template
            ></v-text-field
          ></v-col
        >
      </v-row>
      <v-row no-gutters class="mt-n4">
        <v-col cols="2">
          <v-text-field disabled v-model="maf_dept">
            <template v-slot:prepend
              ><nobr class="mt-1">部門編號</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-btn
          @click="dialogMafm080 = true"
          class="elevation-3 mx-2 mt-4"
          color="grey"
          icon
          small
          outlined
          ><v-icon> mdi-dots-horizontal </v-icon></v-btn
        >
        <v-col cols="3"
          ><v-text-field disabled v-model="maf_name"></v-text-field
        ></v-col>
      </v-row>
      <v-row class="mt-n2 mx-1">
        <v-col cols="12" class="elevation-2">
          <v-data-table
            hide-default-footer
            calculate-widths
            show-select
            :headers="headers"
            loading-text="搜尋中...請稍後"
            no-data-text="尚無資料"
            no-results-text="查無資料"
          >
            <template v-slot:top>
              <!-- top:插入表頭 -->
              <v-row>
                <v-col cols="8">
                  <v-text-field dense v-model="invInf">
                    <template v-slot:prepend>
                      <v-btn
                        @click="dialogInvm010 = true"
                        class="elevation-3 mx-2"
                        color="grey"
                        x-small
                        icon
                        outlined
                        ><v-icon> mdi-dots-horizontal </v-icon></v-btn
                      >
                      <nobr>材料編號細項檢索</nobr>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col style="color: red">注意：一張單據最多能有12筆明細</v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col style="color: red" align="center">
          {{ errMsg }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" align="center">
          <v-btn
            class="mr-2 white--text"
            :disabled="flag == 'createMode'"
            color="green"
            >新增模式<v-icon right> mdi-text-box-plus-outline </v-icon></v-btn
          >
          <v-btn color="primary" :disabled="flag == 'searchMode'"
            >查詢模式<v-icon right> mdi-magnify </v-icon></v-btn
          ><v-spacer></v-spacer>
          <v-btn
            class="mt-2 mx-2"
            color="primary"
            :disabled="!valid || current == 0"
            @click="
              flag = 'updateMode';
              openCheckDialog();
            "
            >修改<v-icon right> mdi-pencil </v-icon></v-btn
          >
          <v-btn
            class="mt-2 mr-2"
            color="error"
            :disabled="current == 0"
            @click="
              flag = 'removeMode';
              openCheckDialog();
            "
            >刪除<v-icon right> mdi-delete </v-icon></v-btn
          >

          <v-btn
            class="mt-2 mr-2 white--text"
            v-show="flag == 'createMode' || flag == 'searchMode'"
            :color="flag == 'searchMode' ? 'primary' : 'green'"
            @click="confirm()"
            >{{ flag == "searchMode" ? "搜尋" : "新增"
            }}<v-icon right>
              {{
                flag == "searchMode"
                  ? "mdi-magnify"
                  : "mdi-text-box-plus-outline"
              }}
            </v-icon></v-btn
          >
        </v-col>
        <v-col cols="4" align="center">
          <v-btn class="mr-1" :disabled="current <= 1" @click="firstPage()"
            ><v-icon>mdi-page-first</v-icon></v-btn
          >
          <v-btn class="mr-1" :disabled="current <= 1" @click="prePage()"
            ><v-icon>mdi-less-than</v-icon></v-btn
          >
          <v-btn class="mr-1" :disabled="current == total" @click="nextPage()"
            ><v-icon>mdi-greater-than</v-icon></v-btn
          >
          <v-btn :disabled="current == total" @click="lastPage()"
            ><v-icon>mdi-page-last</v-icon></v-btn
          >
          <v-card-text>{{ current }} OF {{ total }}</v-card-text>
        </v-col>
        <v-col cols="4" align="center">
          <v-btn>新增明細</v-btn>
          <v-btn>查詢明細</v-btn>
          <v-btn>讀取明細</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <Mafm080 :dialogMafm080.sync="dialogMafm080" @maf-inf="getMafInf($event)" />
    <Invm010 :dialogInvm010.sync="dialogInvm010" @inv-inf="getInvInf($event)" />
  </v-form>
</template>
<script>
import Mafm080 from "@/components/Mafm080.vue";
import Invm010 from "@/components/Invm010.vue";
export default {
  name: "invd140",
  components: {
    Mafm080,
    Invm010,
  },
  data() {
    return {
      maf_dept: "",
      maf_name: "",
      invInf: "",
      errMsg: "",
      flag: "",
      valid: false,
      dialogMafm080: false,
      dialogInvm010: false,
      current: 0,
      total: 0,
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "項次",
          value: "s110",
          align: "center",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "材料編號",
          value: "qt_no",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "作業別",
          value: "qt_type",
          align: "center",
          width: "70px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "製程別",
          value: "",
          align: "center",
          width: "70px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "預定數量",
          value: "",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "預定日期",
          value: "",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "實際數量",
          value: "",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "實際日期",
          value: "",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "原因",
          value: "",
          align: "center",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "原因說明",
          value: "",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "營業項目",
          value: "",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "合約編號",
          value: "",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "機號",
          value: "",
          align: "center",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "備註",
          value: "",
          align: "center",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "批次",
          value: "",
          align: "center",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "列印次數",
          value: "",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "結案碼",
          value: "",
          align: "center",
          width: "70px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "建檔者",
          value: "",
          align: "center",
          width: "70px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "建檔日期",
          value: "",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "異動者",
          value: "",
          align: "center",
          width: "70px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "異動日期",
          value: "",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "品名",
          value: "",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "規格",
          value: "",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "圖號",
          value: "",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "單位",
          value: "",
          align: "center",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "副番號",
          value: "",
          align: "center",
          width: "70px",
          class: "px-0",
          cellClass: "px-0",
        },
      ];
    },
  },
  methods: {
    getMafInf(e) {
      this.maf_dept = e.maf_dept;
      this.maf_name = e.maf_name;
      this.dialogMafm080 = false;
    },
    getInvInf(e) {
      this.invInf = "料號" + e.item_no;
      this.dialogInvm010 = false;
    },
  },
};
</script>
