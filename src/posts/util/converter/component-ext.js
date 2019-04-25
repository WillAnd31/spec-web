'use strict';

const ComponentRegex = /(<div)(.*)(\scomponent="(.+?)")(.+?\/?>)(.*\<\/div\>)?/g
const ComponentPathProperty = ' component-path="';

module.exports = {
	type: 'lang',
	filter: function(text, converter) {
		// let addDep = (compName, compPath) => {
		// 	let imp = compName + (compPath ? '=' + compPath : '');
		// 	if (!converter.dependencyMeta) converter.dependencyMeta = {};
		// 	if (!converter.dependencyMeta.detectedImports) converter.dependencyMeta.detectedImports = [];
		// 	if (!converter.dependencyMeta.detectedImports.includes(imp))
		// 		converter.dependencyMeta.detectedImports.push(imp);
		// };

		// for (let match; match = ComponentRegex.exec(text);) {
		// 	let componentName = match[4];
		// 	let componentPath = (() => {
		// 		let [ pos, ind ] = (() => {
		// 			let i = match[2].indexOf(ComponentPathProperty);
		// 			if (i > -1) return [2, i];
		// 			if (match.length > 4) i = match[5].indexOf(ComponentPathProperty);
		// 			if (i > -1) return [5, i];
		// 			return [-1, -1];
		// 		})();
		// 		if (pos < 0) return `../md-components/${componentName}.vue`;

		// 		let pathInd = ind + ComponentPathProperty.length;
		// 		let finInd = match[pos].indexOf('"', pathInd);
		// 		let cpath = match[pos].substring(pathInd, finInd);
		// 		match[pos] = match[pos].substring(0, ind) + match[pos].substring(finInd + 1);

		// 		return cpath;
		// 	})();

		// 	addDep(componentName, componentPath);
		// 	// text = text.substring(0, match.index)
		// 	// 	+ `<${componentName}${match[2]} `
		// 	// 	+ match.length > 4 ? match.slice(5).join('') : ''
		// 	// 	+ text.substring(match.index + match[0].length, text.length);
		// 	var f1 = text.substring(0, match.index)
		// 	var f2 = `<${componentName}${match[2]} `
		// 	var f3 = match.length > 4 ? match.slice(5).join('') : ''
		// 	var f4 = text.substring(match.index + match[0].length, text.length);
		// 	text = [f1,f2,f3,f4].join('')
		// }

		return text;
	}
};