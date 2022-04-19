<template>
  <v-container>
    <v-row class="mt-n7">
      <v-col cols="3">
        <v-text-field v-model="form.custNo">
          <template v-slot:prepend><nobr class="mt-1">客戶編號</nobr></template>
        </v-text-field>
      </v-col>
      <v-col cols="2"> </v-col>
      <v-col cols="4">
        <v-text-field v-model="form.mainCustno">
          <template v-slot:prepend
            ><nobr class="mt-1">隸屬之主客戶代號</nobr></template
          >
        </v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="form.unifyNo">
          <template v-slot:prepend
            ><nobr class="mt-1">統一編號</nobr></template
          ></v-text-field
        >
      </v-col>
    </v-row>
    <v-row class="mt-n13">
      <v-col cols="10">
        <v-text-field v-model="form.custName">
          <template v-slot:prepend><nobr class="mt-1">客戶名稱</nobr></template>
        </v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field v-model="form.pcsNo"
          ><template v-slot:prepend
            ><nobr class="mt-1">聯數別</nobr></template
          ></v-text-field
        >
      </v-col>
    </v-row>
    <v-row class="mt-n13">
      <v-col cols="5">
        <v-text-field v-model="form.custTel"
          ><template v-slot:prepend
            ><nobr class="mt-1">客戶電話</nobr></template
          ></v-text-field
        >
      </v-col>
      <v-col cols="5">
        <v-text-field v-model="form.custFax"
          ><template v-slot:prepend
            ><nobr class="mt-1">客戶傳真電話</nobr></template
          ></v-text-field
        >
      </v-col>
      <v-col cols="2">
        <v-text-field v-model="form.publicCode"
          ><template v-slot:prepend
            ><nobr class="mt-1">公民營</nobr></template
          ></v-text-field
        >
      </v-col>
    </v-row>
    <v-row class="mt-n13">
      <v-col cols="2">
        <v-text-field v-model="form.zipCode"
          ><template v-slot:prepend
            ><nobr class="mt-1">客戶郵遞區號</nobr></template
          ></v-text-field
        >
      </v-col>
      <v-col cols="3">
        <v-text-field></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn class="ml-n2 mt-3" color="primary">...</v-btn>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="form.respMan"
          ><template v-slot:prepend
            ><nobr class="mt-1">負責人</nobr></template
          ></v-text-field
        >
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="2">
        <v-text-field v-model="form.txCode"
          ><template v-slot:prepend
            ><nobr class="mt-1">異常碼</nobr></template
          ></v-text-field
        >
      </v-col>
    </v-row>
    <v-row class="mt-n13">
      <v-col cols="10">
        <v-text-field v-model="form.invAddr"
          ><template v-slot:prepend
            ><nobr class="mt-1">發票地址</nobr></template
          ></v-text-field
        >
      </v-col>
      <v-col cols="2">
        <v-text-field v-model="form.fileCode"
          ><template v-slot:prepend
            ><nobr class="mt-1">客戶歸檔碼</nobr></template
          ></v-text-field
        >
      </v-col>
    </v-row>
    <v-row class="mt-n13">
      <v-col cols="5">
        <v-text-field v-model="form.callTel"
          ><template v-slot:prepend
            ><nobr class="mt-1">聯絡人電話</nobr></template
          ></v-text-field
        >
      </v-col>
      <v-col cols="5">
        <v-text-field v-model="form.callMan"
          ><template v-slot:prepend
            ><nobr class="mt-1">聯絡人</nobr></template
          ></v-text-field
        >
      </v-col>
    </v-row>
    <v-row class="mt-n13">
      <v-col cols="3">
        <v-text-field v-model="form.oldCustno"
          ><template v-slot:prepend
            ><nobr class="mt-1">舊系統客戶代碼</nobr></template
          ></v-text-field
        >
      </v-col>
      <v-col cols="5" class="mt-6">
        (VNDR 表示經銷商;SALE 表示業務代表接單)
      </v-col>
    </v-row>
    <v-row class="mt-n13">
      <v-col cols="10">
        <v-text-field v-model="form.remk"
          ><template v-slot:prepend
            ><nobr class="mt-1">備註</nobr></template
          ></v-text-field
        >
      </v-col>
    </v-row>
    <v-row class="mt-n13">
      <v-col cols="3">
        <v-text-field v-model="form.createId"
          ><template v-slot:prepend
            ><nobr class="mt-1">建檔者</nobr></template
          ></v-text-field
        >
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="form.createDate"
          ><template v-slot:prepend
            ><nobr class="mt-1">建檔日期</nobr></template
          ></v-text-field
        >
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="form.updateId"
          ><template v-slot:prepend
            ><nobr class="mt-1">異動者</nobr></template
          ></v-text-field
        >
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="form.updateDate"
          ><template v-slot:prepend
            ><nobr class="mt-1">異動日期</nobr></template
          ></v-text-field
        >
      </v-col>
    </v-row>
    <v-row class="mt-n10">
      <v-col cols="12" align="center"
        ><v-card-text style="color: red">{{ errMsg }}</v-card-text></v-col
      ></v-row
    >
    <v-row class="mt-n1">
      <v-col cols="4">
        <v-btn>新增</v-btn>
        <v-btn>刪除</v-btn>
        <v-btn @click="get_cust">查詢</v-btn>
        <v-btn>讀取</v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn><v-icon>mdi-page-first</v-icon></v-btn>
        <v-btn><v-icon>mdi-less-than</v-icon></v-btn>
        <v-btn><v-icon>mdi-greater-than</v-icon></v-btn>
        <v-btn><v-icon>mdi-page-last</v-icon></v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn>設定初值</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Basd060Main",

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
      errMsg: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    get_cust() {
      console.log(this.form.custNo);
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
