
import { RouteConfig } from 'vue-router';

export const PostRoutes: RouteConfig[] = [
	{
		name: 'hello-world',
		path: '/hello-world',
		component: () => import(/* webpackChunkName: "hello-world" */ './components/2019-04-20-Hello-World.vue')
	},
	{
		name: 'terms-of-service',
		path: '/terms-of-service',
		component: () => import(/* webpackChunkName: "terms-of-service" */ './components/00-terms-of-service.vue')
	}
];
