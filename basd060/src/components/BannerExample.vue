<template>
  <div>
    <v-app-bar
      v-if="$_prg !== pageNotFound && execProgram !== undefined"
      color="primary"
      dark
      dense
    >
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
        {{ execProgram.prg_name }}({{ execProgram.prg_no.toLowerCase() }})
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <keep-alive>
      <component :is="$_prg"></component>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "BannerExample",
  props: {
    prg: {
      default: "",
    },
  },
  data() {
    return {
      // p: this.prg.charAt(0).toUpperCase() + this.prg.slice(1),
      execProgram: {},
      pageNotFound: () => import("@/components/Page404.vue"),
    };
  },
  computed: {
    $_prg: {
      get: function () {
        const component = this.programs.find((c) => c.default.name == this.prg);
        return component === undefined ? this.pageNotFound : component.default;
      },
    },
    programs() {
      const components = require.context("@/components", false, /^\D.+[\dw]$/);
      return components.keys().map((x) => components(x));
    },
  },
  beforeCreate() {
    this.$bus.$on("postPrgList", (prgList) => {
      this.execProgram = prgList.find(
        (p) => p.prg_no == this.prg.toUpperCase()
      );
    });
  },
  mounted() {
    this.$bus.$emit("loadPrgFinish", true);
  },
  beforeDestroy: function () {
    this.$bus.$off("postPrgName");
  },
};
</script>
