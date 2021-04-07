import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'

import VueLocalStorage from 'vue-localstorage'
import AsyncComputed from 'vue-async-computed'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
Vue.use(AsyncComputed)

Vue.use(VueLocalStorage)


// Tell Vue to use the plugin
Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
