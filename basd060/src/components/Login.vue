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
          v-model="loginForm.userName"
          prepend-icon="mdi-account"
          label="工號"
          :autofocus="true"
        ></v-text-field>
        <v-text-field
          v-model="loginForm.passWord"
          counter="6"
          maxlength="6"
          prepend-icon="mdi-lock"
          label="密碼"
          :append-icon="showPassWord ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassWord ? 'text' : 'password'"
          @click:append="showPassWord = !showPassWord"
        ></v-text-field
      ></v-card-text>
      <v-card-text
        ><v-btn
          :disabled="
            loginForm.userName.length == 0 || loginForm.passWord.length == 0
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
export default {
  name: "Login",
  data() {
    return {
      loginForm: { userName: "", passWord: "", token: "" },
      showPassWord: false,
      loading: false,
    };
  },
  methods: {
    logIn() {
      const token = "rhs256";
      this.loginForm.token = token;
      Cookies.set("loginForm", JSON.stringify(this.loginForm), {
        expires: 1 / 96,
        sameSite: "lax",
      });
      this.$router.push("menu");
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
