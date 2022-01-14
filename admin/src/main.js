import Vue from 'vue';
import App from './App.vue';
import './plugins/element';
import router from './router';
import './style.css';

Vue.config.productionTip = false;

import http from './http';
Vue.prototype.$http = http;

import TableFilter from './components/TableFilter';
Vue.component('table-filter', TableFilter);

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
