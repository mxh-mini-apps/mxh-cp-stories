import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueAnalytics from 'vue-analytics'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueAnalytics, {
  id: 'UA-150354610-1',
  autoTracking: {
    screenview: true
  },
  trackEvent: true
});

new Vue({
  render: h => h(App)
}).$mount('#app');
