const loaderUtils = require('loader-utils')

/**
 * h			[0-9a-f]
 * nonascii		[\240 -\377]
 * unicode		\\{h}{1,6}(\r\n|[\t\r\n\f])?
 * escape		{unicode}|\\[^\r\n\f0-9a-f]
 * nmstart		[_a-z]|{nonascii}|{escape}
 * nmchar		[_a-z0-9-]|{nonascii}|{escape}
 * ident		-?{nmstart}{nmchar}*
 * 
 * https://www.w3.org/TR/CSS21/grammar.html
 */

let ident = "-?[_a-zA-Z]+[_a-zA-Z0-9-]*"
let quote = "['\"]"
let backtick = "`"

function transformClassName(source, options) {
	let styleMap = options.styleMap || 'styles';

	let matchCases = [
		{
			test: new RegExp(`className=(${quote})\\s*(${ident}\\s*)\\1`, 'gui'),
			replace: `className={${styleMap}["$2"]}`
		},
		{
			test: new RegExp(`className=(${quote})\\s*((?:${ident}|\\s+)+)\\1`, 'gui'),
			replace: `className={"$2".split(/s+/).map(cls => ${styleMap}["cls"] || cls).join(" ")}`
		}
	]

	return matchCases.reduce((pre, cur) => {
		return pre.replace(cur.test, cur.replace) 
	}, source)
}

module.exports = function (source) {
	let callback = this.async()

	let options = Object.assign({}, loaderUtils.getOptions(this));

	callback(null, transformClassName(source, options));
}
