<template>
  <v-form v-model="valid" lazy-validation>
    <v-container>
      <v-row no-gutters class="mt-n4">
        <v-col cols="2">
          <v-text-field disabled v-model="defaultForm.wrhs_no">
            <template v-slot:prepend
              ><nobr class="mt-1 ml-4">倉庫別</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col class="ml-3" cols="3">
          <v-text-field disabled v-model="defaultForm.wrhs_desc"></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="2">
          <v-text-field v-model="defaultForm.rqst_emp_no">
            <template v-slot:prepend
              ><nobr class="mt-1">申請人員</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col class="ml-3" cols="2"
          ><v-text-field v-model="defaultForm.rqst_emp_name"></v-text-field
        ></v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row no-gutters class="mt-n4">
        <v-col cols="2">
          <v-text-field v-model="defaultForm.tx_wrhs">
            <template v-slot:prepend
              ><nobr class="mt-1">申請單號</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col class="ml-3" cols="2"
          ><v-text-field v-model="defaultForm.tx_yyyymm"></v-text-field
        ></v-col>
        <v-col class="ml-3" cols="2"
          ><v-text-field v-model="defaultForm.tx_no_item"></v-text-field
        ></v-col>
        <v-col class="ml-5" cols="4"
          ><v-text-field v-model="defaultForm.tx_desc">
            <template v-slot:prepend
              ><nobr class="mt-1">單據名稱</nobr></template
            ></v-text-field
          ></v-col
        >
      </v-row>
      <v-row no-gutters class="mt-n4">
        <v-col cols="2">
          <v-text-field disabled v-model="defaultForm.maf_dept">
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
          ><v-text-field disabled v-model="defaultForm.maf_name"></v-text-field
        ></v-col>
      </v-row>
      <v-row class="mt-n2 mx-1">
        <v-col cols="12" class="elevation-2">
          <v-data-table
            hide-default-footer
            calculate-widths
            show-select
            fixed-header
            height="55vh"
            :items-per-page="12"
            v-model="selected"
            :items="content"
            :headers="headers"
            item-key="rqst_item"
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
import Cookies from "js-cookie";
export default {
  name: "invd140",
  components: {
    Mafm080,
    Invm010,
  },
  data() {
    return {
      invInf: "",
      errMsg: "",
      flag: "",
      emp_no: JSON.parse(Cookies.get("loginForm")).empNo,
      emp_name: JSON.parse(Cookies.get("loginForm")).empName,
      defaultForm: {
        wrhs_no: 9,
        wrhs_desc: "楊梅廠",
        rqst_emp_no: "",
        rqst_emp_name: "",
        tx_wrhs: "9-JC",
        tx_yyyymm: "",
        tx_no_item: "",
        tx_desc: "JC-出廠放行單",
        maf_dept: "",
        maf_name: "",
      },
      selected: [],
      content: [
        {
          rqst_item: 1,
          item_no: 311881,
          proc_code: "G0008",
          schr_code: "",
          est_qty: 2.0,
          est_date: "2022-07-04",
          act_qty: 0.0,
          act_date: "",
          res_no: "",
          res_desc: "",
          item: "RL",
          ct_no: "2301",
          elev_no: 0,
          remark: "不良補出工地 ",
          bach_no: 0,
          prt_cnt: 1,
          end_mark: "*",
          create_id: "賴美妹",
          create_date: "2022-07-04",
          update_id: "賴美妹",
          update_date: "2022-07-05",
          item_desc: "主機座與繫吊組立",
          item_spec: "C/WRG800-<1>-C/W8K-CAR-13K*3V",
          draw_no: "4DGF0753",
          unit_measure: "ST",
          sbl_no: "103A",
        },
      ],
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
          value: "rqst_item",
          align: "center",
          width: "45px",
          class: "px-0 freeze-56", //從width +11
          cellClass: "px-0 freeze-56",
        },
        {
          text: "材料編號",
          value: "item_no",
          align: "center",
          width: "90px",
          class: "px-0 freeze-101", //前一個45 + 56 = 101
          cellClass: "px-0 freeze-101",
        },
        {
          text: "作業別",
          value: "proc_code",
          align: "center",
          width: "70px",
          class: "px-0 freeze-191",
          cellClass: "px-0 freeze-191",
        },
        {
          text: "製程別",
          value: "schr_code",
          align: "center",
          width: "70px",
          class: "px-0 freeze-261",
          cellClass: "px-0 freeze-261",
        },
        {
          text: "預定數量",
          value: "est_qty",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "預定日期",
          value: "est_date",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "實際數量",
          value: "act_qty",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "實際日期",
          value: "act_date",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "原因",
          value: "rsn_no",
          align: "center",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "原因說明",
          value: "rsn_desc",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "營業項目",
          value: "item",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "合約編號",
          value: "ct_no",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "機號",
          value: "elev_no",
          align: "center",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "備註",
          value: "remark",
          align: "center",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "批次",
          value: "batch_no",
          align: "center",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "列印次數",
          value: "prt_cnt",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "結案碼",
          value: "end_mark",
          align: "center",
          width: "70px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "建檔者",
          value: "create_id",
          align: "center",
          width: "70px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "建檔日期",
          value: "create_date",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "異動者",
          value: "update_id",
          align: "center",
          width: "70px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "異動日期",
          value: "update_date",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "品名",
          value: "item_desc",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "規格",
          value: "item_spec",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "圖號",
          value: "draw_no",
          align: "center",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "單位",
          value: "unit_measure",
          align: "center",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "副番號",
          value: "sbl_no",
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
      this.defaultForm.maf_dept = e.maf_dept;
      this.defaultForm.maf_name = e.maf_name;
      this.dialogMafm080 = false;
    },
    getInvInf(e) {
      this.invInf = "料號" + e.item_no;
      this.dialogInvm010 = false;
    },
  },
};
</script>
<style>
th[class*="freeze"],
th.text-start {
  position: sticky !important;
  position: -webkit-sticky !important;
  z-index: 3 !important;
}
td[class*="freeze"],
td.text-start {
  position: sticky !important;
  position: -webkit-sticky !important;
  z-index: inherit !important;
  background-color: white;
}
tr:hover td {
  background-color: #eeeeee;
}
th.text-start,
td.text-start {
  left: 0px;
}
.freeze-56 {
  left: 56px;
}
.freeze-101 {
  left: 101px;
}
.freeze-191 {
  left: 191px;
}
.freeze-261 {
  left: 261px;
}
</style>
