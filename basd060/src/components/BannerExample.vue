<template>
  <div>
    <v-sheet v-show="loadStatus == 'loadded'">
      <v-app-bar color="primary" dark dense>
        <v-app-bar-nav-icon>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <a
                  target="_blank"
                  :href="'http://gfcweb/gfchelp/' + prg + '.htm'"
                >
                  <v-img
                    class="elevation-4"
                    src="@/assets/gfc.gif"
                    max-height="37"
                    max-width="37"
                  />
                </a>
              </v-btn>
            </template>
            <span>程式說明</span>
          </v-tooltip>
        </v-app-bar-nav-icon>

        <v-spacer></v-spacer>
        <v-toolbar-title>
          {{ barTitle }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <keep-alive>
        <component :is="execProgram"></component>
      </keep-alive>
    </v-sheet>
    <v-sheet v-show="loadStatus == 'notFound'">
      <v-sheet class="ma-10"
        >找不到程式...<v-btn @click="$router.go(-1)">回上頁</v-btn></v-sheet
      >
    </v-sheet>
    <v-sheet v-show="loadStatus == 'permissionDenied'">
      <v-sheet class="ma-10"
        >權限不足,或網址輸入錯誤<v-btn @click="$router.go(-1)"
          >回上頁</v-btn
        ></v-sheet
      >
    </v-sheet>
    <v-sheet v-show="loadStatus == 'loading'">
      <v-sheet min-height="470px" class="d-flex align-center justify-center">
        <v-card color="primary" class="mx-auto my-auto" min-width="344" dark>
          <v-card-text>
            讀取中...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-sheet>
  </div>
</template>
<script>
export default {
  name: "BannerExample",
  props: {
    prg: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      // p: this.prg.charAt(0).toUpperCase() + this.prg.slice(1),
      onLoadComponent: {},
      loadStatus: "loading",
      programList: [],
      isMounted: false,
      // programs: [],
      onLoadPrgInf: {
        exec_file: "",
        prg_name: "",
        prg_no: "",
        remark: "",
      },
      defaultOnLoadPrgInf: {
        exec_file: "",
        prg_name: "",
        prg_no: "",
        remark: "",
      },
      // pageNotFound: () => import("@/components/Page404.vue"),
    };
  },
  computed: {
    execProgram: {
      get: function () {
        return this.onLoadComponent.default;
      },
    },
    barTitle: {
      get: function () {
        return `${
          this.onLoadPrgInf.prg_name
        }(${this.onLoadPrgInf.prg_no?.toLowerCase()})`;
      },
    },
    prgNoArr: {
      get: function () {
        return this.programList.map((prg) => prg.prg_no);
      },
    },
    urlPath: {
      get: function () {
        if (this.prg.endsWith(".exe")) {
          return this.prg.slice(0, this.prg.length - 4);
        } else {
          return this.prg;
        }
      },
    },
    allComponents: {
      get: function () {
        // 只能require 全部 無法自定義regExp
        // ref:https://stackoverflow.com/questions/38365550/require-context-inline-regexp-works-var-regexp-does-not
        return require.context("@/components", false, /^\D.+[\dw]$/);
      },
    },
    // allMountComponents: {
    //   get: function () {
    //     let allComs = [];

    //     this.allComponents.keys().forEach((filePath) => {
    //       if (this.prgNoArr.includes(filePath.slice(2).toUpperCase())) {
    //         allComs.push(this.allComponents(filePath));
    //       }
    //     });
    //     return allComs;
    //   },
    // },
    // programs() {
    //   const components = require.context("@/components", false, /^\D.+[\dw]$/);
    //   return components.keys().map((x) => components(x));
    // },
  },
  methods: {
    mountCompontent() {
      this.loadStatus = "loading";
      //判斷 menulist 有沒有包含路徑
      console.log("執行");
      if (this.prgNoArr.includes(this.urlPath.toUpperCase())) {
        this.allComponents.keys().forEach((filePath) => {
          //判斷是 menulist 裡的 component 且該 component 等於路徑
          if (
            this.prgNoArr.includes(filePath.slice(2).toUpperCase()) &&
            filePath.slice(2).toLowerCase() == this.urlPath
          ) {
            this.onLoadComponent = this.allComponents(filePath);
            this.onLoadPrgInf = this.programList.find(
              (p) => p.prg_no == this.urlPath.toUpperCase()
            );
            this.loadStatus = "loadded";
          }
          if (this.loadStatus == "loading") {
            this.loadStatus = "notFound";
          }
        });
      } else {
        this.loadStatus = "permissionDenied";
      }
      if (this.loadStatus != "loadded") {
        this.onLoadComponent = {};
        this.onLoadPrgInf = this.defaultOnLoadPrgInf;
      }
    },
  },
  beforeCreate() {
    this.$bus.$on("postPrgList", (prgList) => {
      this.programList = prgList;
      this.mountCompontent();
    });
  },
  mounted() {
    //第一次Mount會比Menu慢,所以要告訴Menu Mount完成
    this.$bus.$emit("loadBannerFinish", true);
  },
  beforeDestroy() {
    this.$bus.$emit("loadBannerFinish", false);
    this.$bus.$off("postPrgList");
  },
};
</script>
