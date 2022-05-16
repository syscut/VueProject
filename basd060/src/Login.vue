<template>
  <v-app>
    <v-row>
      <v-img src="@/assets/signin-bg.jpg" class="LoginBg"></v-img>
      <v-dialog v-model="open" width="350px" persistent overlay-color="none">
        <v-card style="font-family: '微軟正黑體'">
          <v-card-title style="color: white; background-color: #226498"
            ><v-img
              src="@/assets/gfc-logo.png"
              max-width="128px"
              max-height="27px"
              contain
            ></v-img
            ><v-spacer></v-spacer>崇友實業 WEB登入</v-card-title
          >
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
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
            ></v-text-field
          ></v-card-text>
          <v-card-text
            ><v-btn
              :disabled="
                loginForm.userName.length == 0 || loginForm.passWord.length == 0
              "
              @click="logIn()"
              color="primary"
              block
              :loading="loading"
              >登入<v-icon right>mdi-login</v-icon></v-btn
            ></v-card-text
          >
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>
<script>
// import Cookies from "js-cookie";
export default {
  name: "Login",
  data() {
    return {
      loginForm: { userName: "", passWord: "", token: "" },
      open: true,
      show: false,
      loading: false,
    };
  },
  methods: {
    logIn() {
      //const token = "rhs256";
      console.log("login");
    },
  },
};
</script>
<style scoped>
.LoginBg {
  min-width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
