import Vue from 'vue'
import App from './App.vue'
import VueEventBus from "vue-plugin-event-bus";
import store from './store';
import axios from 'axios'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import Carousel3d from 'vue-carousel-3d';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faUserCog, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VTitle from 'v-title';
import 'v-title/lib/element-ui';


import VueRouter from 'vue-router'
import router from './router'

import VueSocialSharing from 'vue-social-sharing'

library.add(faHome, faUserCog, faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueSocialSharing);
Vue.use(Carousel3d);
Vue.use(VueEventBus);
Vue.use(Buefy)
Vue.use(VTitle);

Vue.use(VueRouter)

axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ion-/]

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
