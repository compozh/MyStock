import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/';

// Event Bus
export const eventEmitter = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
});
