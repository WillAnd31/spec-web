'use strict';

const ImageRegex = /\<img/g
module.exports = {
	type: 'output',
	filter: function(text, converter) {
		let added = false;
		let addDep = () => {
			if (added) return;
			if (!converter.dependencyMeta) converter.dependencyMeta = {};
			if (!converter.dependencyMeta.detectedImports) converter.dependencyMeta.detectedImports = [];
			if (!converter.dependencyMeta.detectedImports.includes('MDImg'))
				converter.dependencyMeta.detectedImports.push('MDImg');
		};

		if (text.includes('MDImg')) addDep();
		if (!text.match(ImageRegex)) return text;
		addDep();
		return text.replace(ImageRegex, '<MDImg');
	}
};