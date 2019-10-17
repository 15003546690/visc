// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/base.css';
import echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import animated from 'animate.css';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import Base64 from 'js-base64';
import './assets/js/axios.js';
import './assets/js/common.js';
import store from './assets/js/store.js';
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.use(animated);
Vue.use(VueQuillEditor);
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
