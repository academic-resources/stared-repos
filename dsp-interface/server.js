var http = require('http')
  , filed = require('filed')
  , shoe = require('shoe')
  , mdns = require('mdns')
;

var p = require.resolve('dsp-interface');

var path = p.slice(0, p.lastIndexOf('/'));

var self = module.exports;

// API

self.val = [0,0,0,0,0,0,0,0,0,0]; // the 10 lines / channels

self.exp = [0,0,0,0,0,0,0,0,0,0]; // 10 exponent switches, 8 of which are live (0 and 1 will always be zero);

self.port = 8012;

self.server = http.createServer(Server); // the server if you want it

self.start = function(port, val, exp){

  if(Array.isArray(val)) self.val = val;

  if(Array.isArray(exp)) self.exp = exp;
  
  self.port = port || self.port

  start_mdns(self.port);

  return self.server.listen(self.port)

};

self.stream = undefined; // when a connection is made this will be that

// 
//
//

function Server (req, res){
  if(req.url == '/') {
    filed(path + '/index.html').pipe(res)
  }
  else if(req.url == '/audio.js'){
    filed(path + '/audio.js').pipe(res)
  }
  else if (req.url == '/touchy.js'){
    filed(path + '/Touchy.js/touchy.js').pipe(res)
  }
  else if (req.url == '/tpain.js'){
    filed(path + '/tpain.js').pipe(res)
  }
  else if (req.url == '/slider.css'){
    filed(path + '/fd-slider/css/fd-slider.css').pipe(res)
  }
  else if (req.url == '/slider.js'){
    filed(path + '/fd-slider/js/fd-slider.min.js').pipe(res)
  }
  else res.end()
};

var sock = shoe(function (stream) {

    self.stream = stream;

    stream.write(self.val.concat(self.exp));

    stream.on('error', function(e){
      console.log(e);
    })

    stream.on('end', function () {

    });
    
    stream.on('data', function(d){
      var c = d.split(',');
      exports[ c[2] ][ c[1] ] = parseFloat( c[3] );
   });

});


sock.install(self.server, '/barnstorm');


function start_mdns(p){
  var browser = mdns.createBrowser(mdns.tcp('http'));

  browser.on('error', console.log);

  browser.on('serviceUp', function(service) {
    if(service.txtRecord && service.txtRecord.name == 'barnstorm:' + p){
      console.log("Interface LAN service up at http://" + service.addresses[0]   + ':' + service.port);
    }
  });

  browser.start();

  var txtRecord = {name: 'barnstorm:' + p};

  var ad = mdns.createAdvertisement(mdns.tcp('http'), self.port, {txtRecord: txtRecord});
};
