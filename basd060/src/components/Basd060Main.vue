<template id="test">
  <v-form v-model="valid" lazy-validation>
    <v-container>
      <v-row class="mt-n7">
        <v-col cols="2">
          <v-text-field :rules="dec6" counter="6" v-model="form.custNo">
            <template v-slot:prepend
              ><nobr class="mt-1">客戶編號</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="custCount(form.custNo)">
              </v-counter>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field :rules="dec6" counter="6" v-model="form.mainCustno">
            <template v-slot:prepend
              ><nobr class="mt-1">隸屬之主客戶代號</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="custCount(form.mainCustno)">
              </v-counter>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            :rules="[unifyNoCheck(form.unifyNo)]"
            :counter="8"
            v-model="form.unifyNo"
          >
            <template v-slot:prepend
              ><nobr class="mt-1">統一編號</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="2">
          <v-text-field
            @blur="showInf()"
            @focus="showInf('pcsNo')"
            :rules="char1"
            :counter="1"
            v-model="form.pcsNo"
            ><template v-slot:prepend
              ><nobr class="mt-1">聯數別</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="2">
          <v-text-field
            @blur="showInf()"
            @focus="showInf('publicCode')"
            :rules="char1"
            :counter="1"
            v-model="form.publicCode"
            ><template v-slot:prepend
              ><nobr class="mt-1">公民營</nobr></template
            ></v-text-field
          >
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="8">
          <v-text-field :rules="char70" counter="70" v-model="form.custName">
            <template v-slot:prepend
              ><nobr class="mt-1">客戶名稱</nobr></template
            >
            <template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="counterVal('custName')">
              </v-counter>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            @blur="showInf()"
            @focus="showInf('txCode')"
            :rules="char1"
            :counter="1"
            v-model="form.txCode"
            ><template v-slot:prepend
              ><nobr class="mt-1">異常碼</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="2">
          <v-text-field
            @blur="showInf()"
            @focus="showInf('fileCode')"
            :rules="char1"
            :counter="1"
            v-model="form.fileCode"
            ><template v-slot:prepend
              ><nobr class="mt-1">客戶歸檔碼</nobr></template
            ></v-text-field
          >
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="3">
          <v-text-field :rules="char15" :counter="15" v-model="form.custTel"
            ><template v-slot:prepend
              ><nobr class="mt-1">客戶電話</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="3">
          <v-text-field :rules="char15" :counter="15" v-model="form.custFax"
            ><template v-slot:prepend
              ><nobr class="mt-1">客戶傳真電話</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="3">
          <v-text-field :rules="char10" counter="10" v-model="form.callMan"
            ><template v-slot:prepend><nobr class="mt-1">聯絡人</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="counterVal('callMan')">
              </v-counter> </template
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field :rules="char15" :counter="15" v-model="form.callTel"
            ><template v-slot:prepend
              ><nobr class="mt-1">聯絡人電話</nobr></template
            ></v-text-field
          >
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="2">
          <v-text-field disabled :counter="3" v-model="form.zipCode"
            ><template v-slot:prepend
              ><nobr class="mt-1">客戶郵遞區號</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="3">
          <v-text-field disabled v-model="zipArea"></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                class="ml-n2 mt-3 elevation-3"
                color="grey"
                dark
                fab
                small
                @click="searchZip()"
                ><v-icon dark> mdi-dots-horizontal </v-icon></v-btn
              ></template
            >
            <span>搜尋郵遞區號</span>
          </v-tooltip>
        </v-col>
        <v-col cols="3">
          <v-text-field :rules="char10" counter="10" v-model="form.respMan"
            ><template v-slot:prepend><nobr class="mt-1">負責人</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="counterVal('respMan')">
              </v-counter> </template
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col cols="6">
          <v-text-field :rules="char60" counter="60" v-model="form.invAddr"
            ><template v-slot:prepend
              ><nobr class="mt-1">發票地址</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="counterVal('invAddr')">
              </v-counter> </template
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            :rules="[(v) => v.length <= 4]"
            :counter="4"
            v-model="form.oldCustno"
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
          <v-text-field :rules="char10" counter="10" v-model="form.createId"
            ><template v-slot:prepend><nobr class="mt-1">建檔者</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="counterVal('createId')">
              </v-counter> </template
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="form.createDate"
            ><template v-slot:prepend
              ><nobr class="mt-1">建檔日期</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-col cols="3">
          <v-text-field :rules="char10" counter="10" v-model="form.updateId"
            ><template v-slot:prepend><nobr class="mt-1">異動者</nobr></template
            ><template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="counterVal('updateId')">
              </v-counter> </template
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="form.updateDate"
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
          <v-btn :disabled="!valid">新增</v-btn>
          <v-btn :disabled="!valid">刪除此筆</v-btn>
          <v-btn :disabled="!valid" @click="get_cust">查詢</v-btn>
          <v-btn :disabled="!valid">確認修改</v-btn>
        </v-col>
        <v-col cols="4" align="center">
          <v-btn><v-icon>mdi-page-first</v-icon></v-btn>
          <v-btn><v-icon>mdi-less-than</v-icon></v-btn>
          <v-btn><v-icon>mdi-greater-than</v-icon></v-btn>
          <v-btn><v-icon>mdi-page-last</v-icon></v-btn>
          <v-card-text>1 OF 300</v-card-text>
        </v-col>
        <v-col cols="4" align="center">
          <v-btn :disabled="!valid">設定初值</v-btn>
          <v-btn :disabled="!valid">客戶資料補充檔</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <Basn021 :dialog.sync="dialog" />
  </v-form>
</template>

<script>
import Basn021 from "../../../lib/Basn021";
import axios from "axios";
import { big5Utis } from "../../../lib/big5Utis";

export default {
  name: "Basd060Main",
  components: {
    Basn021,
  },
  data() {
    return {
      form: {
        custNo: "", //客戶編號 DECIMAL    6
        custName: "", //客戶名稱 VARCHAR  70
        custTel: "", //客戶電話 CHAR      15
        custFax: "", //客戶傳真 CHAR      15
        invAddr: "", //發票地址 VARCHAR   60
        zipCode: "", //客戶郵遞區號 CHAR   3
        respMan: "", //負責人 CHAR        10
        callMan: "", //聯絡人 CHAR        10
        callTel: "", //聯絡人電話 CHAR     15
        unifyNo: "", //統一編號 CHAR       10
        pcsNo: "", //聯數別"2".二聯式  "3".三聯式  "1".收銀機 CHAR  1
        publicCode: "", //公民營"1".民營  "2".公營  "3".公民營 CHAR  1
        fileCode: "", //客戶歸檔碼"Y".已歸檔  "N".未歸檔 CHAR  1
        txCode: "", //異常碼"Y".表示須於發票循環開立檔建立相對之發票客戶代號"N".正常 CHAR  1
        mainCustno: "", //隸屬之主客戶代號 DECIMAL    6
        remk: "", //備註 VARCHAR   60
        oldCustno: "", //舊系統客戶代號 CHAR       4
        createId: "", // CHAR      10
        createDate: "", // DATE
        updateId: "", // CHAR      10
        updateDate: "", // DATE
      },
      dec6: [
        (v) =>
          v.replace(/^<=|>=|[<>=]/, "").length == 0 ||
          !isNaN(parseFloat(v.replace(/^<=|>=|[<>=]/, ""))) ||
          "請輸入數字",
        (v) => v.replace(/^<=|>=|[<>=]/, "").length <= 6 || "超過6位數",
      ],
      char1: [(v) => v.length <= 1 || "超過1個字元"],
      char15: [(v) => v.length <= 15 || "超過15個字元"],
      char10: [(v) => big5Utis.countBig5Text(v) <= 10 || "超過10個字元"],
      char60: [(v) => big5Utis.countBig5Text(v) <= 60 || "超過60個字元"],
      char70: [(v) => big5Utis.countBig5Text(v) <= 70 || "超過70個字元"],
      zipArea: "",
      errMsg: "",
      userName: "",
      dialog: false,
      valid: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    counterVal(s) {
      //console.log(s);
      return big5Utis.countBig5Text(this.form[s]);
    },
    custCount(c) {
      return c.replace(/^<=|>=|[<>=]/, "").length;
    },
    unifyNoCheck(num) {
      let numArr = Array.from("" + num, Number);
      if (numArr.length !== 8) {
        if (numArr.length == 0) {
          return true;
        }
        return "長度錯誤";
      }
      let mul = [1, 2, 1, 2, 1, 2, 4, 1];
      const plus = (arr) => {
        return arr
          .map((v, i) => Math.floor((v * mul[i]) / 10) + ((v * mul[i]) % 10))
          .reduce((p, c) => p + c);
      };
      if (numArr[6] !== 7) {
        return plus(numArr) % 10 == 0 || "統編錯誤";
      } else {
        numArr[6] == 0;
        let ans = plus(numArr);
        return ans % 10 == 0 || (ans + 1) % 10 == 0 || "統編錯誤";
      }
    },
    showInf(s) {
      switch (s) {
        case "pcsNo":
          this.errMsg = '"2".二聯式  "3".三聯式  "1".收銀機';
          break;
        case "publicCode":
          this.errMsg =
            '"1".民營  "2".公營  "3".公民營  "A".零售商  "B".一般  "C".委賣';
          break;
        case "fileCode":
          this.errMsg = '"Y".已歸檔  "N".未歸檔';
          break;
        case "txCode":
          this.errMsg =
            '"Y".表示須於發票循環開立檔建立相對之發票客戶代號  "N".正常';
          break;
        default:
          this.errMsg = "";
          break;
      }
    },
    searchZip() {
      this.dialog = true;
    },
    get_cust() {
      console.log(this.form.custNo);
      big5Utis.encodeBig5("測試");
      axios
        .post("http://localhost:5000/search", this.form)
        .then((res) => {
          console.log(res.data);
          Object.assign(this.form, res.data[0]);
        })
        .catch((e) => {
          this.errMsg = e;
        });
    },
  },
};
</script>
