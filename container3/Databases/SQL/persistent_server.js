var http = require("http");
var url = require('url');
var rh = require('./chat_/request-handler');
var connect = rh.dbConnection();
connect.connect();

var requestListener = function (request, response) {
  var statusCode = 200;
  var defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10
  };
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  response.writeHead(statusCode, headers);

  var urlPath = url.parse(request.url).pathname;
  var splitPath = urlPath.split('/');
  splitPath.shift();
  console.log("Request Type: ", request.method);
  if(request.method === 'POST'){
    if(splitPath[0] === 'messages'){
      rh.handlePostMessage(request, splitPath[1], connect);
      response.end("Post Message Handled");
    }
  } else if (request.method === 'GET'){
    if(splitPath[0] === 'messages') {
      rh.handleGetMessages(request, response, splitPath[1], connect);
      // response.end();
    } else if(splitPath[0] === 'chatrooms'){
      rh.handleGetChatrooms(request, response);
      response.end();
    } else {
      rh.handleStaticRequests(request, response);
    }
  } else{
      response.writeHead(200, headers);
      response.end();
  }
};

var port = 8080;

var ip = "127.0.0.1";

var server = http.createServer(requestListener);
server.on('end', function(){
  connect.end(); //not sure if this is best practice but it works.
});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);


