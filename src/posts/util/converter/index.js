'use strict';

const Converter = require('showdown').Converter;

const SyntaxHighlightingExt = require('showdown-highlight');
const ComponentExt = require('./component-ext');
const InlineSyntaxHighlightingExt = require('./inline-code-ext');
const BodyMetaExt = require('./body-meta-ext');
const ImageCardExt = require('./img-card-ext');
const ElementClassBindingExts = require('./element-class-ext');

module.exports = new Converter({
	emoji: true,
	metadata: true,
	ghCodeBlocks: true,
	simpleLineBreaks: true,
	openLinksInNewWindow: true,
	parseImgDimensions: true,
	backslashEscapesHTMLTags: true,
	extensions: [
		SyntaxHighlightingExt,
		// ComponentExt, -- There has to be an easier way to do this...
		InlineSyntaxHighlightingExt,
		BodyMetaExt,
		ImageCardExt,
		...ElementClassBindingExts
	]
});