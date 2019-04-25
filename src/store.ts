import Vue from 'vue';
import Vuex from 'vuex';

import { SpecStorage } from './utils/specstorage';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		analyticsOptIn: SpecStorage.analyticsOptIn
	},
	mutations: {
		optIntoAnalytics(state) {
			state.analyticsOptIn = true;
			SpecStorage.analyticsOptIn = true;
			Vue.prototype.$matomo.rememberConsentGiven();
		},
		optOutOfAnalytics(state) {
			state.analyticsOptIn = false;
			SpecStorage.analyticsOptIn = false;
			Vue.prototype.$matomo.forgetConsentGiven();
		}
	},
	actions: {
		optIntoAnalytics(context) {
			context.commit('optIntoAnalytics');
		},
		optOutOfAnalytics(context) {
			context.commit('optOutOfAnalytics');
		}
	},
});
