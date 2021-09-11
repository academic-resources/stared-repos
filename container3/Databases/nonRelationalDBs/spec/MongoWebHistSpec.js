/* You'll need to have MongoDB and your Node archive server
 * running for these tests to pass. */

var mongodb = require("mongodb");
var request = require("request");

describe("Persistent Node Chat Server", function() {
  var mongoServer = new mongodb.Server("127.0.0.1", 27017, {});
  // TODO edit this line if your database name is not "archive":
  var mongoClient = new mongodb.Db("archive", server);

  it("Should store requested documents in Mongo", function(done) {

    /* TODO edit these variables to match the interface of your
     * archive server. */
    var archiveServer = "http://127.0.0.1:8080/index.html";
    var archiveForm = {url: "google.com"};

    // Post a message to the archive server:
    request({method: "POST",
             uri: archiveServer,
             form: archiveForm
            },
            function(error, response, body) {
              /* Now if we look in the database, we should find the
               * posted message there. */

              // Wait a second for it to be done archiving
              waits(1000);
              
              runs(function() {
                mongoClient.open(function(err, p_client) {
                  /* TODO edit this variable to match the name of
                   * the collection you're using: */
                  var collectionName = "archive";
                  client.createCollection(collectionName, function(err, collection) {
                    collection.find().toArray(function(err, results) {
                      // Should have one result:
                      expect(results.length).toEqual(1);
                      
                      /* TODO edit this test to match the name of the
                       * property where you're storing the page source:*/
                      expect(results[0].pageSource)
                        .toMatch(/Google/);
                      
                      done();
                    });
                  });
                });
              });
            });
  });

  it("Should retrieve documents from Mongo", function(done) {
    mongoClient.open(function(err, p_client) {
      /* TODO edit this variable to match the name of
       * the collection you're using: */
      var collectionName = "archive";
      client.createCollection(collectionName, function(err, collection) {

        /* We'll insert some fake page source data into
         * the collection to simulate an archived page. Edit this
         * to match the document field names that your code
         * actually uses.*/
        var document = {url: "jono.com",
                        pageSource: "<html><head><title>Jono's Awesome Blank Page</title></head><body></body></html>" };

        collection.insert(document, function(err, docs) {

          /* Now do a request to the archive server for this url
           *and expect it to return the document.
           * TODO edit these variables to match the interface of
           * your archive server. */
          var archivedPage = "http://127.0.0.1:8080/jono.com";

          request(archivedPage, function(error, response, body) {
            expect(body)
              .toMatch(/Jono's Awesome Blank Page/);
            done();
          }
        });
      });
    });
  });
});
