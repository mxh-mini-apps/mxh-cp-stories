import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { store } from './store.js'

Vue.config.productionTip = false;
Vue.use(Vuex);


new Vue({
  render: h => h(App),
  store
}).$mount('#app');
