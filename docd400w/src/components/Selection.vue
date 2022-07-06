<template>
  <v-container>
    <v-row class="text-center mx-1">
      <v-col cols="3" cols-md="2">
        <v-select
          v-model="selectedS110"
          label="機種"
          prepend-icon="mdi-cogs"
          no-data-text="讀取失敗..請稍後在試"
          :items="s110Content"
          :error-messages="s110ErrorMsg"
          :loading="s110Loading"
          :messages="loadingMsg"
          @input="getQtType"
        ></v-select>
      </v-col>
      <v-col cols="3" cols-md="2">
        <v-select
          v-model="selectedQtType"
          label="題型"
          prepend-icon="mdi-file-question-outline"
          :items="qtType"
          no-data-text="請先選擇機種"
          clearable
          @change="
            selectedQtType == null ? (selectedQtType = '') : selectedQtType
          "
        ></v-select>
      </v-col>
      <v-col class="mt-3" cols-md="3">
        <v-btn
          elevation="3"
          color="primary"
          :disabled="searchBtnDisable"
          @click="getDesc"
        >
          查詢
          <v-icon right> mdi-magnify </v-icon>
        </v-btn>
      </v-col>
      <v-col class="mt-3" cols-md="3"> </v-col>
      <v-col class="mt-3"> </v-col>
      <v-col class="mt-3"> </v-col>
    </v-row>
    <HelloWorld
      :content="content"
      :load-table="loadTable"
      :selected-s110="selectedS110"
      @reload="getDesc"
    />
  </v-container>
</template>

<script>
import axios from "axios";
import HelloWorld from "./HelloWorld.vue";
import { big5Utis } from "../../../lib/big5Utis";
export default {
  components: { HelloWorld },
  data() {
    return {
      s110ErrorMsg: "",
      s110Loading: false,
      loadingMsg: "",
      loadTable: "",
      searchBtnDisable: true,
      returnData: "",
      s110Content: [],
      qtType: [],
      selectedS110: "",
      selectedQtType: "",
      content: [],
    };
  },
  computed: {},
  methods: {
    getQtType() {
      let type = this.returnData[this.selectedS110];
      let item = "";
      let obj = {};
      this.qtType = [];
      for (item of type) {
        obj = {};
        type =
          item == "F"
            ? "填充題"
            : item == "Q"
            ? "問答題"
            : item == "O"
            ? "是非題"
            : "選擇題";
        obj["text"] = type;
        obj["value"] = item;
        this.qtType.push(obj);
      }

      this.searchBtnDisable = false;
    },
    getDesc() {
      this.searchBtnDisable = true;
      this.loadTable = "loading";

      axios
        .get(
          "http://gfcweb/xml/xml/kim_test_api.html?t=desc&s110=" +
            big5Utis.encodeBig5(this.selectedS110) +
            "&qt_type=" +
            this.selectedQtType
        )
        .then((data) => {
          this.searchBtnDisable = false;
          this.loadTable = "";

          this.content = data.data;
        })
        .catch((err) => {
          this.searchBtnDisable = false;
          this.loadTable = "";
        });
    },
  },
  mounted() {
    this.s110Loading = true;
    this.loadingMsg = "讀取中...";
    axios
      .get("http://gfcweb/xml/xml/kim_test_api.html", {
        params: {
          t: "get_s110",
        },
      })
      .then((data) => {
        this.s110Loading = false;
        this.loadingMsg = "";
        this.returnData = data.data;

        for (let key in this.returnData) {
          this.s110Content.push(key);
        }
      })
      .catch((err) => {
        this.s110ErrorMsg = "讀取失敗..請稍後再試";
        this.s110Loading = false;
      });
  },
};
</script>

<style></style>
