var fs = require('fs');
var path = require('path');
var mysql = require('mysql');

var dbConnection = function(){
  return mysql.createConnection({
    user: "root",
    password: "",
    database: "chat"
  });
}


var handleStaticRequests = function(request, response) {
  var filePath = './client' + request.url;
  if (filePath === '/client/') {
    filePath = './client/index.html';
  }

  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
    contentType = 'text/javascript';
    break;
    case '.css':
    contentType = 'text/css';
    break;
  }

  fs.exists(filePath, function(exists) {
    if (exists) {
      fs.readFile(filePath, function(error, content) {
        if (error) {
          response.writeHead(500);
          response.end();
        }
        else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    }
    else {
      response.writeHead(404);
      response.end();
    }
  });
};

var handlePostMessage = function(request, roomName, connect){
  var messageData = '';

  request.on('data', function(data){
     messageData+=data;
  });

  request.on('end', function(){
    console.log('messageData', messageData);
    var parsedData = JSON.parse(messageData);
    var messageObj = {};
    messageObj.username = parsedData.username;
    messageObj.message = parsedData.text;
    messageObj.roomname = roomName;
    messageObj.timestamp = new Date();
    connect.query("INSERT INTO messages SET ?", messageObj, function(err,res){});
  });
};

var handleGetMessages = function(request, response, roomName, connect){
  request.on("error", function(){
    console.log("There was an error. Frick");
  });
  var messageObject = {};
  messageObject.results = {};
  connect.query("SELECT * FROM messages WHERE roomname = ?", [roomName], function(err, res){
    messageObject.results = res;
    response.end(JSON.stringify(messageObject.results));
  });
};

var handleGetChatrooms = function(request, response){
  response.write('[]');
};

exports.handlePostMessage = handlePostMessage;
exports.handleGetMessages = handleGetMessages;
exports.handleGetChatrooms = handleGetChatrooms;
exports.handleStaticRequests = handleStaticRequests;
exports.dbConnection = dbConnection;