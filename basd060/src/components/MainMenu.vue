<template>
  <v-app>
    <v-app-bar
      app
      color="#0068B0"
      absolute
      hide-on-scroll
      dense
      class="white--text"
      scroll-target="#view"
    >
      <v-app-bar-nav-icon>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <a v-bind="attrs" v-on="on" href="http://localhost:8080/menu">
              <v-img
                class="elevation-4"
                src="@/assets/gfc.gif"
                max-height="37"
                max-width="37"
              />
            </a>
          </template>
          <span>回首頁</span>
        </v-tooltip>
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-app-bar-title style="font-size: 14px">
        系統日期：{{ systemDate }} <br />使用人員：{{ userName }}
      </v-app-bar-title>

      <template v-slot:img>
        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="1">
            <v-img
              src="@/assets/log1.gif"
              max-width="58"
              min-width="58"
            /> </v-col
          ><v-col cols="1">
            <v-img
              src="@/assets/log2.gif"
              max-width="58"
              min-width="58"
            /> </v-col
          ><v-col cols="1">
            <v-img
              src="@/assets/log3.gif"
              max-width="58"
              min-width="58"
            /> </v-col
          ><v-col cols="1">
            <v-img src="@/assets/log4.gif" max-width="58" min-width="58" />
          </v-col>
          <v-col cols="5"></v-col>
        </v-row>
      </template>
      <template v-slot:extension>
        <v-btn
          @click="hideMenu"
          class="ml-n5 rounded-0 elevation-0"
          min-width="35px"
          min-height="47px"
          dark
          ><v-icon>mdi-menu</v-icon></v-btn
        >
        <v-card class="rounded-0" min-width="100%" max-height="48px" flat dark>
          <v-btn-toggle
            ><v-menu offset-x open-on-hover
              ><template v-slot:activator="{ on, attrs }"
                ><v-btn v-bind="attrs" v-on="on"
                  ><router-link style="color: white" to="/menu/basd060"
                    >客戶資料檔維護</router-link
                  ></v-btn
                ></template
              ><v-btn-toggle background-color="blue darken-1"
                ><v-btn
                  ><router-link style="color: black" to="/menu/invd140"
                    >一般領料單開立維護</router-link
                  ></v-btn
                ><v-btn>測試2</v-btn><v-btn>測試3</v-btn></v-btn-toggle
              ></v-menu
            ><v-btn
              ><router-link style="color: white" to="/menu/src/metq010_list"
                >公司表單</router-link
              ></v-btn
            ><v-btn
              ><router-link style="color: white" to="/menu/src/psnd900w_proc"
                >其他網站</router-link
              ></v-btn
            ><v-btn>出勤作業</v-btn><v-btn>通訊錄建立</v-btn
            ><v-btn>資訊異動單</v-btn><v-btn>合約同步管理</v-btn
            ><v-btn>製做我的網頁</v-btn><v-btn>未簽文件</v-btn
            ><v-btn>密碼更改</v-btn><v-btn>e-Mail登記</v-btn></v-btn-toggle
          ><v-card-text class="pa-0 yellow--text"
            >★★★ 提醒您 ★★★</v-card-text
          ></v-card
        >
      </template>
    </v-app-bar>
    <v-main id="view">
      <v-sheet class="show-scroll-bar">
        <div :class="menu">
          <Menu-item />
        </div>
      </v-sheet>
      <div :class="main">
        <router-view name="main" />
      </div>
    </v-main>
  </v-app>
</template>
<script>
import Cookies from "js-cookie";
import MenuItem from "@/components/MenuItem.vue";
export default {
  components: { MenuItem },
  name: "MainMenu",
  computed: {
    userName: {
      get: function () {
        console.log(Cookies.get("loginForm") === undefined);

        if (Cookies.get("loginForm") === undefined) {
          console.log("undefined");

          return "";
        }
        return JSON.parse(Cookies.get("loginForm")).userName;
      },
      set() {
        return JSON.parse(Cookies.get("loginForm")).userName;
      },
    },
  },
  data() {
    return {
      systemDate: "05/24/2022",
      menu: "menu-show",
      main: "main",
    };
  },
  methods: {
    hideMenu() {
      this.menu = this.menu == "menu-show" ? "menu-hide" : "menu-show";
      this.main = this.main == "main" ? "main-fill" : "main";
    },
  },
};
</script>
<style scoped>
.v-btn {
  height: 24px !important;
}
.menu-show {
  overflow-y: scroll;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 220px;
  transition: 1s;
}
.menu-hide {
  overflow-y: scroll;
  position: absolute;
  top: 0;
  left: -220px;
  bottom: 0;
  width: 220px;
  transition: 1s;
}
.main {
  padding-left: 220px;
  transition: 1s;
}
.main-fill {
  padding-left: 0;
  transition: 1s;
}
.menu-show::-webkit-scrollbar {
  display: none;
}
.show-scroll-bar:hover .menu-show::-webkit-scrollbar {
  display: block;
}
</style>
