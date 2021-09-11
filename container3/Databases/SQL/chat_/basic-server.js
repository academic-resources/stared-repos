var http = require("http");
var url = require('url');
var rh = require('./request-handler');

var requestListener = function (request, response) {
  var statusCode = 200;
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  response.writeHead(statusCode, headers);

  var urlPath = url.parse(request.url).pathname;
  var splitPath = urlPath.split('/');
  splitPath.shift();
  console.log("Request Type: ", request.method);
  if(request.method === 'POST'){
    if(splitPath[0] === 'messages'){
      console.log(splitPath[1]);
      rh.handlePostMessage(request, splitPath[1]);
      response.end("Post Message Handled");
    }
  } else if (request.method === 'GET'){
    if(splitPath[0] === 'messages') {
      rh.handleGetMessages(request, response, splitPath[1]);
      response.end();
    } else if(splitPath[0] === 'chatrooms'){
      rh.handleGetChatrooms(request, response);
      response.end();
    } else {
      rh.handleStaticRequests(request, response);
    }
  } else{
      var headers = {};
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      response.writeHead(200, headers);
      response.end();
  }

};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

var port = 8080;

var ip = "127.0.0.1";

var server = http.createServer(requestListener);
server.on('connection', function(){
  rh.firstConnection();
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

