<template id="test">
  <v-form v-model="valid" lazy-validation>
    <v-container>
      <v-row class="mt-n7">
        <v-col cols="2">
          <v-text-field :rules="dec6" counter="6" v-model="form.cust_no">
            <template v-slot:prepend
              ><nobr class="mt-1">客戶編號</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="custCount(form.cust_no)">
              </v-counter>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field :rules="dec6" counter="6" v-model="form.main_custno">
            <template v-slot:prepend
              ><nobr class="mt-1">隸屬之主客戶代號</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="custCount(form.main_custno)">
              </v-counter>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            :rules="[unifyNoCheck(form.unify_no)]"
            :counter="uniCounterVal"
            v-model="form.unify_no"
          >
            <template v-slot:prepend
              ><nobr class="mt-1">統一編號</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="2">
          <v-text-field
            @blur="showInf()"
            @focus="showInf('pcs_no')"
            :rules="char1"
            :counter="1"
            v-model="form.pcs_no"
            ><template v-slot:prepend
              ><nobr class="mt-1">聯數別</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="2">
          <v-text-field
            @blur="showInf()"
            @focus="showInf('public_code')"
            :rules="char1"
            :counter="1"
            v-model="form.public_code"
            ><template v-slot:prepend
              ><nobr class="mt-1">公民營</nobr></template
            ></v-text-field
          >
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="8">
          <v-text-field :rules="char70" counter="70" v-model="form.cust_name">
            <template v-slot:prepend
              ><nobr class="mt-1">客戶名稱</nobr></template
            >
            <template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="counterVal('cust_name')">
              </v-counter>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            @blur="showInf()"
            @focus="showInf('tx_code')"
            :rules="char1"
            :counter="1"
            v-model="form.tx_code"
            ><template v-slot:prepend
              ><nobr class="mt-1">異常碼</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="2">
          <v-text-field
            @blur="showInf()"
            @focus="showInf('file_code')"
            :rules="char1"
            :counter="1"
            v-model="form.file_code"
            ><template v-slot:prepend
              ><nobr class="mt-1">客戶歸檔碼</nobr></template
            ></v-text-field
          >
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="3">
          <v-text-field :rules="char15" :counter="15" v-model="form.cust_tel"
            ><template v-slot:prepend
              ><nobr class="mt-1">客戶電話</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="3">
          <v-text-field :rules="char15" :counter="15" v-model="form.cust_fax"
            ><template v-slot:prepend
              ><nobr class="mt-1">客戶傳真電話</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="3">
          <v-text-field :rules="char10" counter="10" v-model="form.call_man"
            ><template v-slot:prepend><nobr class="mt-1">聯絡人</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="counterVal('call_man')">
              </v-counter> </template
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field :rules="char15" :counter="15" v-model="form.call_tel"
            ><template v-slot:prepend
              ><nobr class="mt-1">聯絡人電話</nobr></template
            ></v-text-field
          >
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="2">
          <v-text-field disabled :counter="3" v-model="form.zip_code"
            ><template v-slot:prepend
              ><nobr class="mt-1">客戶郵遞區號</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="3">
          <v-text-field disabled v-model="form.zip_area"></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                class="ml-n2 mt-3 elevation-3"
                color="grey"
                dark
                fab
                small
                v-on="on"
                @click="dialog = true"
                ><v-icon dark> mdi-dots-horizontal </v-icon></v-btn
              ></template
            >
            <span>搜尋郵遞區號</span>
          </v-tooltip>
        </v-col>
        <v-col cols="3">
          <v-text-field :rules="char10" counter="10" v-model="form.resp_man"
            ><template v-slot:prepend><nobr class="mt-1">負責人</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="counterVal('resp_man')">
              </v-counter> </template
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="6">
          <v-text-field :rules="char60" counter="60" v-model="form.inv_addr"
            ><template v-slot:prepend
              ><nobr class="mt-1">發票地址</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="counterVal('inv_addr')">
              </v-counter> </template
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            :rules="[(v) => v.length <= 4]"
            :counter="4"
            v-model="form.old_custno"
            ><template v-slot:prepend
              ><nobr class="mt-1">舊系統客戶代碼</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="4" class="mt-6">
          (VNDR 表示經銷商;SALE 表示業務代表接單)
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="10">
          <v-text-field :rules="char70" counter="70" v-model="form.remk"
            ><template v-slot:prepend><nobr class="mt-1">備註</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="counterVal('remk')">
              </v-counter> </template
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="3">
          <v-text-field :rules="char10" counter="10" v-model="form.create_id"
            ><template v-slot:prepend><nobr class="mt-1">建檔者</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="counterVal('create_id')">
              </v-counter> </template
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="form.create_date"
            ><template v-slot:prepend
              ><nobr class="mt-1">建檔日期</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="3">
          <v-text-field :rules="char10" counter="10" v-model="form.update_id"
            ><template v-slot:prepend><nobr class="mt-1">異動者</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="counterVal('update_id')">
              </v-counter> </template
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="form.update_date"
            ><template v-slot:prepend
              ><nobr class="mt-1">異動日期</nobr></template
            ></v-text-field
          >
        </v-col>
      </v-row>
      <v-row class="mt-n6">
        <v-col style="color: red" align="center">
          {{ errMsg }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" align="center">
          <v-btn :disabled="!valid" @click="add">新增</v-btn>
          <v-btn :disabled="!valid">刪除此筆</v-btn>
          <v-btn :disabled="!valid" @click="get_cust">查詢</v-btn>
          <v-btn :disabled="!valid" @click="update">確認修改</v-btn>
          <v-btn class="mt-2" @click="clear">清除</v-btn>
        </v-col>
        <v-col cols="4" align="center">
          <v-btn :disabled="current <= 1" @click="firstPage()"
            ><v-icon>mdi-page-first</v-icon></v-btn
          >
          <v-btn :disabled="current <= 1" @click="prePage()"
            ><v-icon>mdi-less-than</v-icon></v-btn
          >
          <v-btn :disabled="current == total" @click="nextPage()"
            ><v-icon>mdi-greater-than</v-icon></v-btn
          >
          <v-btn :disabled="current == total" @click="lastPage()"
            ><v-icon>mdi-page-last</v-icon></v-btn
          >
          <v-card-text>{{ current }} OF {{ total }}</v-card-text>
        </v-col>
        <v-col cols="4" align="center">
          <v-btn :disabled="!valid">設定初值</v-btn>
          <v-btn :disabled="!valid">客戶資料補充檔</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <Basn021 :dialog.sync="dialog" @zip-inf="getZipInf($event)" />
  </v-form>
</template>

<script>
import Basn021 from "./Basn021.vue";
import axios from "axios";
import { big5Utis } from "../../../lib/big5Utis";
import { valid } from "../../../lib/valid";

export default {
  name: "Basd060Main",
  components: {
    Basn021,
  },
  data() {
    return {
      form: {
        cust_no: "", //客戶編號 DECIMAL    6
        cust_name: "", //客戶名稱 VARCHAR  70
        cust_tel: "", //客戶電話 CHAR      15
        cust_fax: "", //客戶傳真 CHAR      15
        inv_addr: "", //發票地址 VARCHAR   60
        zip_code: "", //客戶郵遞區號 CHAR   3
        zip_area: "", //郵遞區域 CHAR      12
        resp_man: "", //負責人 CHAR        10
        call_man: "", //聯絡人 CHAR        10
        call_tel: "", //聯絡人電話 CHAR     15
        unify_no: "", //統一編號 CHAR       10
        pcs_no: "", //聯數別"2".二聯式  "3".三聯式  "1".收銀機 CHAR  1
        public_code: "", //公民營"1".民營  "2".公營  "3".公民營 CHAR  1
        file_code: "", //客戶歸檔碼"Y".已歸檔  "N".未歸檔 CHAR  1
        tx_code: "", //異常碼"Y".表示須於發票循環開立檔建立相對之發票客戶代號"N".正常 CHAR  1
        main_custno: "", //隸屬之主客戶代號 DECIMAL    6
        remk: "", //備註 VARCHAR   60
        old_custno: "", //舊系統客戶代號 CHAR       4
        create_id: "", // CHAR      10
        create_date: "", // DATE
        update_id: "", // CHAR      10
        update_date: "", // DATE
      },
      defaultForm: {
        cust_no: "", //客戶編號 DECIMAL    6
        cust_name: "", //客戶名稱 VARCHAR  70
        cust_tel: "", //客戶電話 CHAR      15
        cust_fax: "", //客戶傳真 CHAR      15
        inv_addr: "", //發票地址 VARCHAR   60
        zip_code: "", //客戶郵遞區號 CHAR   3
        zip_area: "", //郵遞區域 CHAR      12
        resp_man: "", //負責人 CHAR        10
        call_man: "", //聯絡人 CHAR        10
        call_tel: "", //聯絡人電話 CHAR     15
        unify_no: "", //統一編號 CHAR       10
        pcs_no: "", //聯數別"2".二聯式  "3".三聯式  "1".收銀機 CHAR  1
        public_code: "", //公民營"1".民營  "2".公營  "3".公民營 CHAR  1
        file_code: "", //客戶歸檔碼"Y".已歸檔  "N".未歸檔 CHAR  1
        tx_code: "", //異常碼"Y".表示須於發票循環開立檔建立相對之發票客戶代號"N".正常 CHAR  1
        main_custno: "", //隸屬之主客戶代號 DECIMAL    6
        remk: "", //備註 VARCHAR   60
        old_custno: "", //舊系統客戶代號 CHAR       4
        create_id: "", // CHAR      10
        create_date: "", // DATE
        update_id: "", // CHAR      10
        update_date: "", // DATE
      },
      list: {},
      dec6: [
        (v) =>
          ("" + v).replace(/^<=|>=|[<>=]/, "").length == 0 ||
          !isNaN(parseFloat(("" + v).replace(/^<=|>=|[<>=]/, ""))) ||
          "請輸入數字",
        (v) => ("" + v).replace(/^<=|>=|[<>=]/, "").length <= 6 || "超過6位數",
      ],
      char1: [(v) => v.length <= 1 || "超過1個字元"],
      char15: [(v) => v.length <= 15 || "超過15個字元"],
      char10: [(v) => big5Utis.countBig5Text(v) <= 10 || "超過10個字元"],
      char60: [(v) => big5Utis.countBig5Text(v) <= 60 || "超過60個字元"],
      char70: [(v) => big5Utis.countBig5Text(v) <= 70 || "超過70個字元"],
      errMsg: "",
      user_name: "",
      current: 0,
      total: 0,
      uniCounterVal: 8,
      dialog: false,
      valid: false,
      showToolTip: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    clear() {
      Object.assign(this.form, this.defaultForm);
    },
    counterVal(s) {
      //console.log(s);
      return big5Utis.countBig5Text(this.form[s]);
    },
    custCount(c) {
      return ("" + c).replace(/^<=|>=|[<>=]/, "").length;
    },
    unifyNoCheck(num) {
      if (num.length == 0) {
        return true;
      }
      if (/^[A-Za-z]/.test(num)) {
        this.uniCounterVal = 10;
        if (num.length !== 10) {
          return "長度錯誤";
        }
        return valid.checkId(num);
      }

      if (/^\d/.test(num)) {
        this.uniCounterVal = 8;
        if (num.length !== 8) {
          return "長度錯誤";
        }
        return valid.checkUnify(num);
      }
      return "輸入錯誤";
    },
    showInf(s) {
      switch (s) {
        case "pcs_no":
          this.errMsg = '"2".二聯式  "3".三聯式  "1".收銀機';
          break;
        case "public_code":
          this.errMsg =
            '"1".民營  "2".公營  "3".公民營  "A".零售商  "B".一般  "C".委賣';
          break;
        case "file_code":
          this.errMsg = '"Y".已歸檔  "N".未歸檔';
          break;
        case "tx_code":
          this.errMsg =
            '"Y".表示須於發票循環開立檔建立相對之發票客戶代號  "N".正常';
          break;
        default:
          this.errMsg = "";
          break;
      }
    },
    get_cust() {
      axios
        .post("http://localhost:5000/search", this.form)
        .then((res) => {
          //console.log(res.data[0]);
          if (res.data.length == 300) {
            this.errMsg = "資料超過300筆!";
          }
          if (res.data.length == 0) {
            this.errMsg = "查無資料!";
            this.current = 0;
          } else {
            this.current = 1;
          }
          this.total = res.data.length;
          Object.assign(this.form, res.data[0]);
          //Object.assign(this.defaultForm, res.data[0]);
          Object.assign(this.list, res.data);
        })
        .catch((e) => {
          this.errMsg = e;
        });
    },
    update() {
      let hasUpdate = false;

      Object.keys(this.form).forEach((colName) => {
        if (this.form[colName] != this.list[this.current - 1][colName]) {
          this.defaultForm[colName] = this.form[colName];
          hasUpdate = true;
        }
      });

      if (hasUpdate) {
        this.defaultForm.cust_no = this.form.cust_no;
        this.defaultForm.update_id = "胡國棟";
        axios
          .post("http://localhost:5000/update", this.defaultForm)
          .then((res) => {
            if (res.data.status) {
              this.errMsg = res.data.message;
            } else {
              this.errMsg = "更新失敗";
            }
          })
          .catch((e) => {
            this.errMsg = e;
          });
        //Object.values(this.defaultForm).map(String);
        return;
      } else {
        this.errMsg = "沒有修改任何資料";
        return;
      }
    },
    add() {
      Object.values(this.defaultForm).map(String);
    },
    getZipInf(e) {
      this.form.zip_code = e.zip_code;
      this.form.zip_area = e.zip_area;
      this.dialog = false;
    },
    firstPage() {
      this.current = 1;
      this.assignObj();
    },
    prePage() {
      this.current = this.current - 1;
      this.assignObj();
    },
    nextPage() {
      this.current = this.current + 1;
      this.assignObj();
    },
    lastPage() {
      this.current = this.total;
      this.assignObj();
    },
    assignObj() {
      Object.assign(this.form, this.list[this.current - 1]);
      //Object.assign(this.defaultForm, this.list[this.current - 1]);
    },
  },
  mounted() {
    window.addEventListener("keyup", (e) => {
      if (e.target == document.body) {
        if (
          e.code == "ArrowRight" &&
          e.ctrlKey == false &&
          this.current !== this.total
        ) {
          this.nextPage();
        }
        if (e.code == "ArrowLeft" && e.ctrlKey == false && this.current > 1) {
          this.prePage();
        }
        if (
          e.code == "ArrowRight" &&
          e.ctrlKey == true &&
          this.current !== this.total
        ) {
          this.lastPage();
        }
        if (e.code == "ArrowLeft" && e.ctrlKey == true && this.current > 1) {
          this.firstPage();
        }
      }
    });
  },
};
</script>
