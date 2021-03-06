import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import vueAxios from 'vue-axios'

Vue.use(vueAxios, axios)
Vue.use(ElementUI);

Vue.config.productionTip = false

import './mock'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
