const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  //publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "崇友資訊";
      return args;
    });
  },
});
