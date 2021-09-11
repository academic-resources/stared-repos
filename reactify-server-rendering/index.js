var React = require('react-tools/build/modules/React');
var ReactMount = require('react-tools/build/modules/ReactMount');

ReactMount.allowFullPageRender = true;

var index = {
  serverRender: function(moduleName, props, bundlePath) {
    var module = require(moduleName);
    var component = module(props);
    var markup = null;
    React.renderComponentToString(component, function(m) {
      markup = m;
    });
    if (markup.indexOf('</body>') === -1) {
      throw new Error('Must have </body> in the generated page to insert JS');
    }
    markup = markup.replace(
      '</body>',
      '<script src="' + bundlePath + '"></script>' +
        '<script>' +
        'require("reactify-server-rendering").clientRender(' + JSON.stringify(moduleName) +
        ', ' + JSON.stringify(props) + ');' +
        '</script></body>'
    );
    // Get staticify CSS if it's there
    var g = eval('global'); // bypass Browserify's auto-global
    if (g.__staticify_css) {
      var code = '';
      g.__staticify_css.forEach(function(item) {
        code += '<style id="' + item.nodeID + '">\n' + item.code + '\n</style>\n';
      });
      if (markup.indexOf('</head>') === -1) {
        throw new Error('Must have </head> in the generated page to insert CSS');
      }
      markup = markup.replace('</head>', code + '\n</head>');
    }

    return markup;
  },
  clientRender: function(moduleName, props) {
    var module = require(moduleName);
    var component = module(props);
    React.renderComponent(component, document);
  }
};

module.exports = index;