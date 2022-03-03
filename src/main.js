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
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import {faGithub,faLinkedin} from '@fortawesome/free-brands-svg-icons' 
import {faEnvelope} from '@fortawesome/free-solid-svg-icons' 

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* add icons to the library */
library.add(faGithub,faLinkedin,faEnvelope)
/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('Select2', Select2);

Vue.use(VueTabs)
Vue.use(VueApexCharts)
Vue.use(VueAxios, axios)

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
