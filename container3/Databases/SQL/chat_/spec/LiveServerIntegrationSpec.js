var request = require("request");

describe("Live Node Chat Server", function() {
 xit("Should respond to get requests for /log", function(done) {
   request("http://127.0.0.1:8080/classes/messages",
           function(error, response, body) {
             expect(body).toEqual("[]");
             done();
           });
 });

 it("Should accept posts to /send", function(done) {
   request({method: "POST",
            uri: "http://127.0.0.1:8080/classes/messages",
            json: {username: "Jono",
               message: "Do my bidding!"}
            },
           function(error, response, body) {
             expect(response.statusCode).toEqual(201);
             // Now if we request the log, that message
             // we posted should be there:
             request("http://127.0.0.1:8080/classes/messages",
                     function(error, response, body) {
                       var messageLog = JSON.parse(body);
                       console.log(messageLog.results);
                       expect(messageLog.results[1].username).toEqual("Jono");
                       expect(messageLog.results[1].text).toEqual("Do my bidding!");
                       done();
                     });

           });
 });

 it("Should 404 when asked for a nonexistent file", function(done) {
   request("http://127.0.0.1:8080/arglebargle",
           function(error, response, body) {
             expect(response.statusCode).toEqual(404);
             done();
           });
 });


});