'use strict';

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const _ = require('lodash');
const converter = require('./converter');

const srcPath = path.resolve(__dirname, '..');
const rawPath = path.resolve(srcPath, 'raw');
const templatePath = path.resolve(__dirname, 'post.template.vue');
const postsPath = path.resolve(srcPath, 'posts.json');
const postRoutesPath = path.resolve(srcPath, 'routes.ts');

const REQUIRED_META = ['id', 'author', 'date', 'title', 'desc'];
const posts = require('../posts.json');

const updatePosts = (posts) => {
	updateRoutes(posts);

	_.forEach(posts, (post, key) => {
		if (post.componentOnly) delete posts[key];
		else delete posts[key]['componentOnly'];
	});
	fs.writeFile(postsPath, JSON.stringify(posts, null, 2), (err) => {});
};

const updateRoutes = (posts) => {
	let template = `
import { RouteConfig } from 'vue-router';

export const PostRoutes: RouteConfig[] = [
${_.map(posts, post => `	{
		name: '${post.name}',
		path: '${post.routePath}',
		component: () => import(/* webpackChunkName: "${post.name}" */ '${post.pathFromSrc}')
	}`).join(',\n')}
];
`;

	fs.writeFile(postRoutesPath, template, (err) => {});
};

const saveUsingTemplate = (filePath, html, post, meta, cb) => {
	fs.readFile(templatePath, 'utf-8', (err, template) => {
		if (err) return cb(err);

		let importsStr = '';
		let componentImportsStr = '';
		let componentsStr = '';
		let metaImpArr = (meta.imports || '').split(/,\s?/);
		_.compact(metaImpArr).forEach(imp => {
			let [ compName, compPath ] = imp.split('=');
			importsStr += `import ${compName} from '${compPath}';\n`;
		});
		let metaCompImpArr = (meta.componentImports || '').split(/,\s?/);
		_.compact(_.concat(metaCompImpArr, meta.detectedImports)).forEach(imp => {
			let [ compName, compPath ] = imp.split('=');
			compPath = compPath || `../md-components/${compName}.vue`;
			componentImportsStr += `import ${compName} from '${compPath}';\n`;
			componentsStr += `\t\t${compName},\n`;
		});

		let signature = `${moment(post.date).format('MMMM D, YYYY')} - ${post.author}`;
		template = template
			.replace('{{SIGNATURE}}', meta.hideSignature ? '' : signature)
			.replace('{{CLASS_NAME}}', _.upperFirst(_.camelCase(post.name)))
			.replace('{{HTML}}', html)
			.replace('{{COMPONENT_BODY}}', meta.componentBody)
			.replace('{{IMPORTS}}', importsStr)
			.replace('{{COMPONENT_IMPORTS}}', componentImportsStr)
			.replace('{{COMPONENT_NAMES}}', componentsStr);

		fs.writeFile(filePath, template, cb);
	});
};

const convertMarkdown = (fileName, md, cb) => {
	let html = converter.makeHtml(md);
	let meta = _.assign({
			componentBody: converter.componentBody
		},
		converter.getMetadata(),
		converter.textMeta,
		converter.dependencyMeta);
	if (!_.every(REQUIRED_META, m => _.has(meta, m)))
		return cb(new Error('Missing meta'));
	if (meta.draft) return;

	let filePath = path.resolve(__dirname, '..', 'components', fileName + '.vue');
	let postName = meta.name || _.kebabCase(meta.title);
	posts[postName] = {
		identifier: meta.id,
		author: meta.author,
		date: moment(meta.date, 'MMMM D YYYY').toDate(),
		title: meta.title,
		name: postName,
		desc: meta.desc || converter.textMeta.desc,
		componentOnly: meta.componentOnly || false,
		tags: meta.tags ? meta.tags.split(/,\s?/) : [],
		routePath: `/${postName}`,
		pathFromSrc: './' + path.relative(srcPath, filePath),
		image: meta.image
	};

	saveUsingTemplate(filePath, html, posts[postName], meta, cb);
};

fs.readdir(rawPath, (derr, files) => {
	let total = 0;
	let remaining = 0;
	let finish = (err) => {
		if (err) console.log('Encountered error:', err);

		remaining--;
		total++;
		if (remaining > 0) return;
		updatePosts(posts);
		console.log(total + ' posts converted');
	};

	files.forEach(file => {
		if (!file.includes('.md')) return;
		remaining++;
		let fileName = file.split('.md')[0];
		fs.readFile(path.resolve(rawPath, file), 'utf-8', (ferr, md) => convertMarkdown(fileName, md, finish));
	});
});
