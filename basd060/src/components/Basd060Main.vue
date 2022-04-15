<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-text-field
          class="mt-4"
          label="客戶編號"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="2"> </v-col>
      <v-col cols="4">
        <v-text-field
          class="mt-4"
          label="隸屬之主客戶代號"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          class="mt-4"
          label="統一編號"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-n6">
      <v-col cols="10">
        <v-text-field label="客戶名稱" outlined dense></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field class="" label="聯數別" outlined dense></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Basd060Main",

  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader",
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify",
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify",
      },
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com",
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com",
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify",
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs",
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify",
      },
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer",
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/getting-started/pre-made-layouts",
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
    ],
  }),
};
</script>
