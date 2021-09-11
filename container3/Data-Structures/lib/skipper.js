// Load js src depending upon query string.
// 
// Foists an ugly dependency upon the tests
// to inspect a global variable and determine
// which variant is running.

(function(){
  var variant = document.location.search.replace(/\?variant=/,'');

  window.skipper = {};
  window.skipper.variant = variant;

  var variations = {
    'pseudoclassical': 'Pseudoclassical',
    'prototypal': 'Prototypal',
    'functional-shared': 'Functional (shared)',
    'functional': 'Functional'
  };

  if (!(variant in variations)){
    window.location = '?variant=functional';
  }

  var loadScripts = function(){
    ['queue.js', 'stack.js'].forEach(function(fileName){
      var script = document.createElement('script');
      script.src = 'src/' + variant + '/' + fileName;
      document.head.appendChild(script);
    });
  };

  var makeLinks = function(){
    for(v in variations){
      var a = document.createElement('a');
      a.href = '?variant=' + v;
      a.textContent = variations[v];
      a.style.cssText = 'padding: 10px; font-size:.8em;';
      if(v == variant){
        a.style.cssText += "background-color: #6699cc; color:white;"
      } 
      document.body.insertBefore(a, document.body.childNodes[0]);
    }
  };

  loadScripts();
  window.addEventListener('load', function(){
    makeLinks();
    variant && mocha.run();
  });
})();


