import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import registerAnalytics from './plugins/analytics';

import './styles/index.scss';
import 'highlight.js/styles/solarized-light.css';

Vue.config.productionTip = false;
registerAnalytics(router);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
