import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { store } from '../store/store';
import lsWatcher from 'vue-storage-watcher'

Vue.use(lsWatcher, { prefix : 'groupomania_'});

//Vuevalidate - Validation des formulaires
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
