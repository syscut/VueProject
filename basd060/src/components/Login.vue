<template>
  <v-row class="ma-0">
    <v-img src="@/assets/signin-bg.jpg" class="LoginBg"></v-img>
    <v-card class="ma-auto elevation-8 rounded-lg" width="350px">
      <v-card-title
        style="
          color: white;
          background-color: #226498;
          background-image: linear-gradient(to bottom, #297ab9, #1b4e77);
        "
        ><v-img
          src="@/assets/gfc-logo.png"
          max-width="128px"
          max-height="27px"
          contain
        ></v-img
        ><v-spacer></v-spacer> 崇友系統登入 <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text
        ><v-text-field
          v-model="loginForm.empNo"
          prepend-icon="mdi-account"
          label="工號"
          :autofocus="true"
        ></v-text-field>
        <v-text-field
          v-model="loginForm.usrPaswd"
          counter="6"
          maxlength="6"
          prepend-icon="mdi-lock"
          label="密碼"
          :append-icon="showPassWord ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassWord ? 'text' : 'password'"
          @click:append="showPassWord = !showPassWord"
        ></v-text-field
      ></v-card-text>
      <v-sheet class="mt-n3" style="text-align: center; color: red">{{
        msg
      }}</v-sheet>
      <v-card-text
        ><v-btn
          :disabled="
            loginForm.empNo.length == 0 || loginForm.usrPaswd.length == 0
          "
          @click="logIn()"
          color="primary"
          :loading="loading"
          block
          >登入<v-icon right>mdi-login</v-icon></v-btn
        ></v-card-text
      >
    </v-card>
  </v-row>
</template>
<script>
import Cookies from "js-cookie";
import axios from "axios";
import { errorHandle } from "../../../lib/errorHandle";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        empNo: "",
        usrPaswd: "",
        empName: "",
        usrGroup: "",
        token: "",
      },
      msg: "",
      showPassWord: false,
      loading: false,
    };
  },
  methods: {
    logIn() {
      // const token = "rhs256";
      // this.loginForm.token = token;
      // this.loginForm.empName = "胡國棟";
      // this.loginForm.usrGroup = "mis";
      // Cookies.set("loginForm", JSON.stringify(this.loginForm), {
      //   expires: 1 / 4,
      //   sameSite: "lax",
      // });
      // this.$router.push({ path: "menu" });
      //test-----------------------------------------------------------
      // https://ithelp.ithome.com.tw/users/20129187/ironman/3137

      this.msg = "";
      this.loading = true;
      axios
        .post("http://localhost:5000/login", this.loginForm)
        .then((res) => {
          if (res.data.status == "ok") {
            const token = "rhs256";
            this.loginForm.token = token;
            this.loginForm.empName = res.data.empName;
            this.loginForm.usrGroup = res.data.usrGroup;

            Cookies.set("loginForm", JSON.stringify(this.loginForm), {
              sameSite: "lax",
            });
            this.$router.push({ path: "menu" });
          }
          if (res.data.status == "invaildUserId") {
            this.msg = "無效的工號";
            this.loginForm.empNo = "";
          }
          if (res.data.status == "invaildPassWord") {
            this.msg = "密碼錯誤";
            this.loginForm.usrPaswd = "";
          }
        })
        .catch((err) => {
          this.msg = errorHandle.errMsg(err);
        })
        .finally(() => {
          this.loading = false;
        });
      // -----------------------------------------------------------------
    },
  },
};
</script>
<style scoped>
.LoginBg {
  min-width: 100%;
  min-height: 100%;
  max-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
