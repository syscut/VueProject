<template>
  <v-form v-model="valid" lazy-validation>
    <v-app-bar color="primary" dark dense>
      <v-app-bar-nav-icon>
        <v-tooltip bottom color="primary">
          <template v-slot:activator="{ on, attrs }">
            <a v-bind="attrs" v-on="on" href="http://gfcweb/gfc">
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
          <v-text-field>
            <template v-slot:prepend
              ><nobr class="mt-1">部門編號</nobr></template
            ></v-text-field
          >
        </v-col>
        <v-btn class="elevation-3 mx-2 mt-3" color="grey" icon outlined
          ><v-icon> mdi-dots-horizontal </v-icon></v-btn
        >
        <v-col cols="3"><v-text-field></v-text-field></v-col>
      </v-row>
      <v-row class="mt-n4">
        <v-col cols="10">
          <v-data-table
            show-select
            :headers="headers"
            loading-text="搜尋中...請稍後"
            no-data-text="尚無資料"
            no-results-text="查無資料"
            hide-default-footer
          ></v-data-table>
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
  </v-form>
</template>
<script>
export default {
  name: "invd140",
  data() {
    return {
      errMsg: "",
      flag: "",
      valid: false,
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
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "材料編號",
          value: "qt_no",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "作業別",
          value: "qt_type",
          width: "70px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "製程別",
          value: "",
          width: "70px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "預定數量",
          value: "",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "預定日期",
          value: "",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "實際數量",
          value: "",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "實際日期",
          value: "",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "原因",
          value: "",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "原因說明",
          value: "",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "營業項目",
          value: "",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "合約編號",
          value: "",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "機號",
          value: "",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "備註",
          value: "",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "批次",
          value: "",
          width: "45px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "列印次數",
          value: "",
          width: "90px",
          class: "px-0",
          cellClass: "px-0",
        },
        {
          text: "結案碼",
          value: "",
          width: "70px",
          class: "px-0",
          cellClass: "px-0",
        },
      ];
    },
  },
};
</script>
