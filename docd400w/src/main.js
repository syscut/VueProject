import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  el:'#app',
  vuetify,
  render: h => h(App)
  //https://github.com/vuejs-templates/webpack-simple/issues/29#issuecomment-312902539
  // render: function (createElement) {
  //   return createElement(App);
  // }
})
