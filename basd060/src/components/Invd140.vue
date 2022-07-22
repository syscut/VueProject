<template>
  <v-form v-model="valid" lazy-validation>
    <v-container>
      <v-row dense class="mt-n4">
        <v-col cols="2" align-self="end">
          <v-text-field disabled v-model="defaultForm.wrhs_no">
            <template v-slot:prepend
              ><nobr class="mt-1 ml-4">倉庫別</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="3">
          <v-text-field disabled v-model="defaultForm.wrhs_desc"></v-text-field>
        </v-col>
        <v-col cols="2" class="offset-1">
          <v-text-field v-model="defaultForm.rqst_emp_no">
            <template v-slot:prepend
              ><nobr class="mt-1">申請人員</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="2"
          ><v-text-field disabled v-model="defaultForm.emp_name"></v-text-field
        ></v-col>
      </v-row>
      <v-row dense class="mt-n6">
        <v-col cols="2">
          <v-text-field disabled v-model="defaultForm.wrhs_no">
            <template v-slot:prepend
              ><nobr class="mt-1">申請單號</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="1">
          <v-text-field disabled v-model="defaultForm.tx_code">
            <template v-slot:prepend
              ><nobr class="mt-1">-</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="1">
          <v-menu
            ref="menu"
            v-model="yyyymmMenu"
            :close-on-content-click="false"
            :return-value.sync="defaultForm.rqst_yyyymm"
            transition="scale-transition"
            offset-y
            max-width="200px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                readonly
                v-bind="attrs"
                v-on="on"
                v-model="yyyymmFormatted"
                ><template v-slot:prepend
                  ><nobr class="mt-1">-</nobr></template
                ></v-text-field
              ></template
            ><v-date-picker
              v-model="defaultForm.rqst_yyyymm"
              type="month"
              no-title
              scrollable
              locale="zh-TW"
              width="200px"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="yyyymmMenu = false">
                取消
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(defaultForm.rqst_yyyymm)"
              >
                確認
              </v-btn>
            </v-date-picker>
          </v-menu></v-col
        >
        <v-col cols="1"
          ><v-text-field v-model="defaultForm.rqst_no"></v-text-field
        ></v-col>
        <v-col cols="2" class="offset-1"
          ><v-text-field v-model="defaultForm.tx_code">
            <template v-slot:prepend
              ><nobr class="mt-1">單據名稱</nobr></template
            ></v-text-field
          ></v-col
        >
        <v-col cols="2"
          ><v-text-field disabled v-model="defaultForm.tx_desc"> </v-text-field>
        </v-col>
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
        <v-spacer></v-spacer>
        <v-col cols="3" class="mt-8" style="color: red"
          >注意：一張單據最多能有12筆明細</v-col
        >
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="mt-n2 mx-1">
        <v-col cols="12" class="elevation-2">
          <v-data-table
            hide-default-footer
            calculate-widths
            show-select
            fixed-header
            :height="tableHeight"
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
                <v-col cols="12">
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
            :disabled="flag == 'createMode' || prgInf.allow_add != 'Y'"
            color="green"
            >新增模式<v-icon right> mdi-text-box-plus-outline </v-icon></v-btn
          >
          <v-btn
            color="primary"
            :disabled="flag == 'searchMode' || prgInf.allow_query != 'Y'"
            @click="flag = 'searchMode'"
            >查詢模式<v-icon right> mdi-magnify </v-icon></v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            class="mt-2 mx-2"
            color="primary"
            :disabled="!valid || prgInf.allow_update != 'Y'"
            @click="
              flag = 'updateMode';
              openCheckDialog();
            "
            >修改<v-icon right> mdi-pencil </v-icon></v-btn
          >
          <v-btn
            class="mt-2 mr-2"
            color="error"
            :disabled="prgInf.allow_delete != 'Y'"
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
        <v-col cols="4"> </v-col>
        <v-col cols="4" align="center">
          <v-btn>新增明細</v-btn>
          <v-btn>查詢明細</v-btn>
          <v-btn>讀取明細</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mt-2">領料單維護(二)</v-btn>
          <v-btn class="mt-2">異動單據查詢</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="queryDialogOpen" width="800px">
      <v-card>
        <v-card-title>查詢結果</v-card-title>
        <v-container>
          <v-data-table></v-data-table>
        </v-container>
      </v-card>
    </v-dialog>
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
  props: {
    prgInf: {
      type: Object,
      default: () => {},
    },
  },
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
        emp_name: "",
        rqst_yyyymm: new Date().toISOString().substr(0, 7),
        rqst_no: "",
        tx_code: "JC",
        tx_desc: "出廠放行單",
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
      defaultContent: {
        rqst_item: "",
        item_no: "",
        proc_code: "",
        schr_code: "",
        est_qty: "",
        est_date: "",
        act_qty: "",
        act_date: "",
        res_no: "",
        res_desc: "",
        item: "",
        ct_no: "",
        elev_no: "",
        remark: "",
        bach_no: "",
        prt_cnt: "",
        end_mark: "",
        create_id: "",
        create_date: "",
        update_id: "",
        update_date: "",
        item_desc: "",
        item_spec: "",
        draw_no: "",
        unit_measure: "",
        sbl_no: "",
      },
      valid: false,
      yyyymmMenu: false,
      queryDialogOpen: false,
      insertDialogOpen: false,
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
    tableHeight: {
      get: function () {
        let contentLength = this.content.length;
        if (contentLength > 4) {
          return "320px";
        } else {
          return `${(contentLength + 1) * 64}px`;
        }
      },
    },
    yyyymmFormatted() {
      return this.removeDash(this.defaultForm.rqst_yyyymm);
    },
  },
  methods: {
    getMafInf(e) {
      this.defaultForm.maf_dept = e.maf_dept;
      this.defaultForm.maf_name = e.maf_name;
      this.dialogMafm080 = false;
    },
    getInvInf(e) {
      this.invInf = `料號:${e.item_no},作業別:${e.proc_code},製成別:${e.schr_code},副番號:${e.sbl_no},品名:${e.item_desc},規格:${e.item_spec},圖號:${e.draw_no},單位:${e.unit_measure}`;
      this.dialogInvm010 = false;
    },
    removeDash(ym) {
      if (!ym) {
        return;
      }
      return ym.split("-").join("");
    },
  },
  mounted() {
    this.emp_no = JSON.parse(Cookies.get("loginForm")).empNo;
    this.defaultForm.rqst_emp_no = this.emp_no;
    this.emp_name = JSON.parse(Cookies.get("loginForm")).empName;
    this.defaultForm.emp_name = this.emp_name;
  },
};
</script>
<style scoped>
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
div[class="v-data-table__wrapper"] > table > tr:hover td {
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
