<template>
  <v-app>
    <v-app-bar color="#1976d2" theme="dark" density="compact">
      <v-btn icon href="http://gfcweb/gfc">
        <img src="./assets/gfc.png" width="37" class="elevation-4" />
      </v-btn>
      <v-spacer></v-spacer>
      <v-app-bar-title> 客戶資料檔維護(basd060) </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon href="https://next.vuetifyjs.com/en/components/buttons/">
        <v-icon>mdi-help-circle-outline</v-icon>
        <v-tooltip activator="parent" anchor="bottom">程式說明</v-tooltip>
      </v-btn>
    </v-app-bar>
    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
