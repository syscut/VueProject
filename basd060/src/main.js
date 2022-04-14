import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import tooltip from "./directives/tooltip.js";
import "@/assets/tooltip.css";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();
createApp(App).directive("tooltip", tooltip);
createApp(App).use(vuetify).mount("#app");
