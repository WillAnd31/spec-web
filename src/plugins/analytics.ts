import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMatomo from 'vue-matomo';
import { EnvVars } from './../utils/envvars';

export default function(router: VueRouter) {
	Vue.use(VueMatomo, {
		host: EnvVars.analyticsHost,
		siteId: EnvVars.analyticsSiteID,
		trackerFileName: 'matomo',
		router,
		enableLinkTracking: true,
		requireConsent: true,
		trackInitialView: true,
		debug: !EnvVars.isProduction
	});
}