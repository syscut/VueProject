<template>
  <v-app>
    <v-app-bar app color="primary" dark hide-on-scroll dense>
      <v-app-bar-nav-icon>
        <v-tooltip bottom>
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
          <span>回首頁</span>
        </v-tooltip>
      </v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-toolbar-title> 客戶資料檔維護(basd060) </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            href="https://github.com/vuetifyjs/vuetify/releases/latest"
            target="_blank"
            v-bind="attrs"
            v-on="on"
            text
          >
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>
        <span>程式說明</span>
      </v-tooltip>
    </v-app-bar>

    <v-main> </v-main>
  </v-app>
</template>

<script>
export default {
  name: "BannerExample",

  components: {},

  data: () => ({
    //
  }),
};
</script>
