var fs = require('fs');
var mimer = require('mimer');
var sha1 = require('sha1');
var through = require('through');

function insertRequiresIntoCSS(data) {
  var re = /require\(["'](.*?)["']\)/;
  var pieces = data.split(re);
  return pieces.map(function(piece, index) {
    var isRequire = index % 2 === 1;
    if (!isRequire) {
      return JSON.stringify(piece);
    } else {
      return '"url(" + require(' + JSON.stringify(piece) + ') + ")"';
    }
  }).join(' + ');
}

function transformCSS(data) {
  var code = '';
  var nodeID = '__staticify_style__' + sha1(data);
  code += 'var nodeID = ' + JSON.stringify(nodeID) + ';\n';
  code += 'var code = ' + insertRequiresIntoCSS(data) + ';\n';
  code += 'if (typeof window === \'undefined\') {\n';
  code += '  var g = eval(\'global\');\n'; // bypass browserify global insertion
  code += '  if (!g.__staticify_css) {\n';
  code += '    g.__staticify_css = [];\n';
  code += '  }\n';
  code += '  g.__staticify_css.push({nodeID: nodeID, code: code});\n';
  code += '} else if (!document.getElementById(nodeID)) {\n';
  code += '  var node = document.createElement(\'style\');\n';
  code += '  node.setAttribute(\'id\', nodeID);\n';
  code += '  node.innerHTML = code;\n';
  code += '  document.head.appendChild(node);\n';
  code += '}\n';
  return code;
}

function transformImage(data, filename) {
  var uri = 'data:' + mimer(filename) + ';base64,' + data;
  return 'module.exports = ' + JSON.stringify(uri) + ';\n';
}

function hasExt(filename, exts) {
  for (var i = 0; i < exts.length; i++) {
    if (filename.indexOf(exts[i]) === filename.length - exts[i].length) {
      return true;
    }
  }
  return false;
}

function isImage(filename) {
  return hasExt(filename, ['.png', '.jpg', '.gif']);
}

function isCSS(filename) {
  return hasExt(filename, ['.css', '.sass', '.scss', '.less']);
}

function transformer(func, args) {
  var buf = '';
  return through(
    function(data) {
      buf += data;
    },
    function() {
      this.queue(func.apply(this, [buf].concat(args)));
      this.queue(null);
    }
  );
}

function noop() {
}

function guardWrites(stream) {
  var sink = through();
  // store sink's write and end method so we can override original references
  // and make sink non-writable by anyone except the source
  sinkWrite = sink.write;
  sinkEnd = sink.end;
  sink.write = noop;
  sink.end = noop;
  // pass data from source to sink
  var source = through(sinkWrite.bind(sink), sinkEnd.bind(sink, null));
  stream.pipe(source);
  return sink;
}

module.exports = function(filename) {
  if (isImage(filename)) {
    // Unfortunately the data we get in is already character decoded, so
    // we need to read the raw data in instead.
    // For this we use guardWrites which turns external writes into noops.
    return guardWrites(
      fs.createReadStream(filename, {encoding: 'base64'})
        .pipe(transformer(transformImage, [filename])))
  } else if (isCSS(filename)) {
    return transformer(transformCSS, [filename]);
  } else {
    return through();
  }
};
