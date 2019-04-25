'use strict';

const classMap = {
	h1: 'display-2',
	h2: 'display-1',
	h3: 'headline',
	h4: 'headline',
	h5: 'headline',
	p: [/<p(?!re)(.*)>/g, 'body-1 post-text']
};
module.exports = Object.keys(classMap).map(key => {
	let val = classMap[key];
	let [ regex, className ] = Array.isArray(val) ? val : [new RegExp(`<${key}(.*)>`, 'g'), val];
	return {
		type: 'output',
		regex,
		replace: `<${key} class="${className}" $1>`
	};
});