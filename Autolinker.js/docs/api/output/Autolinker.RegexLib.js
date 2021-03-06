Ext.data.JsonP.Autolinker_RegexLib({
	tagname: "class",
	name: "Autolinker.RegexLib",
	autodetected: {},
	files: [
		{ filename: "RegexLib.js", href: "RegexLib.html#Autolinker-RegexLib" },
	],
	singleton: true,
	members: [
		{
			name: "alphaCharsStr",
			tagname: "property",
			owner: "Autolinker.RegexLib",
			id: "property-alphaCharsStr",
			meta: {},
		},
		{
			name: "alphaNumericCharsStr",
			tagname: "property",
			owner: "Autolinker.RegexLib",
			id: "property-alphaNumericCharsStr",
			meta: {},
		},
		{
			name: "decimalNumbersStr",
			tagname: "property",
			owner: "Autolinker.RegexLib",
			id: "property-decimalNumbersStr",
			meta: { private: true },
		},
		{
			name: "domainNameRegex",
			tagname: "property",
			owner: "Autolinker.RegexLib",
			id: "property-domainNameRegex",
			meta: {},
		},
	],
	alternateClassNames: [],
	aliases: {},
	id: "class-Autolinker.RegexLib",
	short_doc:
		"Builds and stores a library of the common regular expressions used by the\nAutolinker utility. ...",
	component: false,
	superclasses: [],
	subclasses: [],
	mixedInto: [],
	mixins: [],
	parentMixins: [],
	requires: [],
	uses: [],
	html: "<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/RegexLib.html#Autolinker-RegexLib' target='_blank'>RegexLib.js</a></div></pre><div class='doc-contents'><p>Builds and stores a library of the common regular expressions used by the\nAutolinker utility.</p>\n\n<p>Other regular expressions may exist ad-hoc, but these are generally the\nregular expressions that are shared between source files.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-alphaCharsStr' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Autolinker.RegexLib'>Autolinker.RegexLib</span><br/><a href='source/RegexLib.html#Autolinker-RegexLib-property-alphaCharsStr' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Autolinker.RegexLib-property-alphaCharsStr' class='name expandable'>alphaCharsStr</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The string form of a regular expression that would match all of the\nletters and in the unicode character set when pla...</div><div class='long'><p>The string form of a regular expression that would match all of the\nletters and in the unicode character set when placed\nin a RegExp character class (<code>[]</code>).</p>\n\n<p>These would be the characters matched by unicode regex engines <code>[\\p{L}]</code>\nescape (\"all letters\")</p>\n</div></div></div><div id='property-alphaNumericCharsStr' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Autolinker.RegexLib'>Autolinker.RegexLib</span><br/><a href='source/RegexLib.html#Autolinker-RegexLib-property-alphaNumericCharsStr' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Autolinker.RegexLib-property-alphaNumericCharsStr' class='name expandable'>alphaNumericCharsStr</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The string form of a regular expression that would match all of the\nletters and decimal number chars in the unicode c...</div><div class='long'><p>The string form of a regular expression that would match all of the\nletters and decimal number chars in the unicode character set when placed\nin a RegExp character class (<code>[]</code>).</p>\n\n<p>These would be the characters matched by unicode regex engines <code>[\\p{L}\\p{Nd}]</code>\nescape (\"all letters and decimal numbers\")</p>\n</div></div></div><div id='property-decimalNumbersStr' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Autolinker.RegexLib'>Autolinker.RegexLib</span><br/><a href='source/RegexLib.html#Autolinker-RegexLib-property-decimalNumbersStr' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Autolinker.RegexLib-property-decimalNumbersStr' class='name expandable'>decimalNumbersStr</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>The string form of a regular expression that would match all of the\ndecimal number chars in the unicode character set...</div><div class='long'><p>The string form of a regular expression that would match all of the\ndecimal number chars in the unicode character set when placed in a RegExp\ncharacter class (<code>[]</code>).</p>\n\n<p>These would be the characters matched by unicode regex engines <code>\\p{Nd}</code>\nescape (\"all decimal numbers\")</p>\n\n<p>Taken from the XRegExp library: http://xregexp.com/\nSpecifically: http://xregexp.com/v/3.0.0/unicode-categories.js</p>\n<p>Defaults to: <code>&#39;0-9\\u0660-\\u0669\\u06F0-\\u06F9\\u07C0-\\u07C9\\u0966-\\u096F\\u09E6-\\u09EF\\u0A66-\\u0A6F\\u0AE6-\\u0AEF\\u0B66-\\u0B6F\\u0BE6-\\u0BEF\\u0C66-\\u0C6F\\u0CE6-\\u0CEF\\u0D66-\\u0D6F\\u0DE6-\\u0DEF\\u0E50-\\u0E59\\u0ED0-\\u0ED9\\u0F20-\\u0F29\\u1040-\\u1049\\u1090-\\u1099\\u17E0-\\u17E9\\u1810-\\u1819\\u1946-\\u194F\\u19D0-\\u19D9\\u1A80-\\u1A89\\u1A90-\\u1A99\\u1B50-\\u1B59\\u1BB0-\\u1BB9\\u1C40-\\u1C49\\u1C50-\\u1C59\\uA620-\\uA629\\uA8D0-\\uA8D9\\uA900-\\uA909\\uA9D0-\\uA9D9\\uA9F0-\\uA9F9\\uAA50-\\uAA59\\uABF0-\\uABF9\\uFF10-\\uFF19&#39;</code></p></div></div></div><div id='property-domainNameRegex' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Autolinker.RegexLib'>Autolinker.RegexLib</span><br/><a href='source/RegexLib.html#Autolinker-RegexLib-property-domainNameRegex' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Autolinker.RegexLib-property-domainNameRegex' class='name expandable'>domainNameRegex</a> : RegExp<span class=\"signature\"></span></div><div class='description'><div class='short'>A regular expression to match domain names of a URL or email address. ...</div><div class='long'><p>A regular expression to match domain names of a URL or email address.\nEx: 'google', 'yahoo', 'some-other-company', etc.</p>\n</div></div></div></div></div></div></div>",
	meta: {},
});
