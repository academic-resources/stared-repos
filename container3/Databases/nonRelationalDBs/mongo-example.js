/* Install node-mongodb-native by doing:
 *  npm install mongodb
 * See documentation at https://github.com/christkv/node-mongodb-native#readme
 * Run this with:
 *  node mongo-example.js
 */
var mongodb = require("mongodb");

var server = new mongodb.Server("127.0.0.1", 27017, {});
// 27017 is the default port for connecting to MongoDB
var client = new mongodb.Db('test', server);

// Open the client's connection to the server:
client.open(function(err, p_client) {
  console.log("Connected to MongoDB!");

  // Create a collection, if it doesn't exist already:
  client.createCollection("demo-collection", function(err, collection) {
    console.log("Created collection");

    // Here's the document we want to insert:
    var document = {name: "Jean Valjean",
                    password: "24601"};

    // Insert it to the collection:
    collection.insert(document, function(err, docs) {
      console.log("Inserted a document.");

      // Count just gives us the number of items in collection:
      collection.count(function(err, count) {
        console.log("This collection contains " + count + " documents.");
      });

      // Find() returns a "cursor" which can be converted to an array of
      // documents:
      collection.find().toArray(function(err, results) {
        // Results is an array of all the documents in the collection
        for (var i = 0; i < results.length; i++) {
          console.log("Found a document with name = " + results[i].name);
        }

        // Close the db connection when we're done with it:
        client.close();
        console.log("Closed the collection");
      });
    });
  });
});