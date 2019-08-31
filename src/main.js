import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./vee-validate"
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import CKEditor from '@ckeditor/ckeditor5-vue';
import '@/filters';

Vue.use(CKEditor);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
