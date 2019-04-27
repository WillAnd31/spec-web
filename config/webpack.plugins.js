
'use strict';

const _ = require('lodash');
const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer;

const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const DefaultTitle = 'The Spec';
const DefaultDesc = 'A spec for ethical software';
const BaseURL = 'https://spec.willand.co';

const PostRoutes = _.map(require('../src/posts/posts.json'));

const prerenderer = new PrerenderSPAPlugin({
	staticDir: DIST_DIR,
	outputDir: DIST_DIR,
	indexPath: path.resolve(DIST_DIR, 'index.html'),
	routes: [
		'/',
		_.map(PostRoutes, (val) => val.routePath)
	],
	minify: {
		minifyCSS: true
	},
	renderer: new PuppeteerRenderer(),
	postProcess(context) {
		let title = DefaultTitle;
		let desc = DefaultDesc;
		let url = BaseURL;

		const postRoute = PostRoutes.find(r => r.routePath === context.route);
		if (!!postRoute) {
			title += ' - ' + postRoute.title;
			url += postRoute.routePath;
			desc = postRoute.desc || desc;
		}

		let replacements = [
			[/<title>[^<]*<\/title>/i,
			`<title>${title}</title>`],
			[/<meta property="og:url" content="[^"]*">/i,
			`<meta property="og:url" content="${url}">`],
			[/<meta property="og:title" content="[^"]*">/i,
			`<meta property="og:title" content="${title}">`],
			[/<meta name="description" content="[^"]*">/i,
			`<meta name="description" content="${desc}">`],
			[/<meta name="twitter:title" content="[^"]*">/i,
			`<meta name="twitter:title" content="${title}">`],
			[/<meta name="twitter:description" content="[^"]*">/i,
			`<meta name="twitter:description" content="${desc}">`],
			[/<meta property="og:description" content="[^"]*">/i,
			`<meta property="og:description" content="${desc}">`],
		];
		if (postRoute && postRoute.image) {
			replacements.push([/<meta name="twitter:image" content="[^"]*">/i,
			`<meta name="twitter:image" content="${postRoute.image}">`]);
			replacements.push([/<meta property="og:image" content="[^"]*">/i,
			`<meta property="og:image" content="${postRoute.image}">`]);
		}

		replacements.forEach(r => context.html = context.html.replace(...r));

		return context;
	}
});

module.exports = [ prerenderer ];