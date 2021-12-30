module.exports = {
  transpileDependencies: ['vuetify'], //vuetify 支援IE
  publicPath: process.env.NODE_ENV === "production" ? "" : "/", //build檔案路徑
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '維保題目維護(docd400w)'
        return args;
      })
  }
  //filenameHashing: false, //js、css檔名為雜湊值
  //indexPath: "vuetest.html",
  //configureWebpack: {  配置Webpack
  // pulgins: {},  放置 webpack plugin 相關設定
  // performance: {},  設定打包後檔案大小限制與提示
  // resolve: {},  模組的解析相關設定
  //  },  https://webpack.js.org/concepts/
};
