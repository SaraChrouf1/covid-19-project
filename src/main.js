import Vue from 'vue'
import App from './App.vue'

import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import Select2 from 'v-select2-component';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

Vue.component('Select2', Select2);

Vue.use(VueTabs)
Vue.use(VueApexCharts)
Vue.use(VueAxios, axios)

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
