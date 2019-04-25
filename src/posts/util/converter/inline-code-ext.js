'use strict';

const hljs = require('highlight.js');
const InlineCodeRegex = /(?<!\<pre\>)\<code\>(.*)\<\/code\>/gm;

module.exports = {
	type: 'output',
	filter: function (text) {
		for (let match; match = InlineCodeRegex.exec(text);) {
			text = text.substring(0, match.index)
				+ `<code class="hljs bash language-bash" style="display: inline;">`
				+ hljs.highlight('bash', match[1]).value
				+ `</code>`
				+ text.substring(match.index + match[0].length, text.length);
		}

		return text;
	}
};