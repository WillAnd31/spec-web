'use strict';

const BodyMetaRegex = /\<\=(.+)\=\>\n?(.+)\n?\<\=(.+)\=\>/gm;
const ComponentBody = /<script component>([\s\S]*)<\/script>/gm;
module.exports = {
	type: 'lang',
	filter: function(text, conv) {
		conv.textMeta = {};
		conv.componentBody = '';

		for (let match; match = BodyMetaRegex.exec(text);) {
			conv.textMeta[match[1]] = match[2];
			text = text.substring(0, match.index)
					+ match[2]
					+ text.substring(match.index + match[0].length, text.length);
		}

		for (let match; match = ComponentBody.exec(text);) {
			conv.componentBody = match[1];
			text = text.substring(0, match.index)
				+ text.substring(match.index + match[0].length, text.length);
		}

		return text;
	}
};