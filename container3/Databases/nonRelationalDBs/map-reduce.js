// For mongoDB map-reduce tutorial, see:
// http://docs.mongodb.org/manual/applications/map-reduce/

// Run this file by doing:
//     mongo < map-reduce.js
//
// Then see the results by logging into mongo and doing:
//     db.map_reduce_example_output.find()

// TODO replace "collection" with your actual collection name
db.collection.mapReduce(
  function map() {
    // the map function gets called once for every document in the collection.
    // "this" refers to the document, so if your document has a "quantity"
    // field you could say:
    var q = this.quantity;

    // The job of the map function is to emit some (key, value) pairs.
    // call emit() once for each pair you want.
    emit("quantity", q);
  },
  function reduce(key, values) {
    // this gets called with an array of values that all have the same key.
    // its job is to return an "answer" for that key.
    // Remember that reduce may be called in multiple stages, so write
    // your reduce function such that its output can be input for the
    // next reduce() call.
    return Array.sum(values);
  },

  // Specify what to do with the output: in this case we will insert it
  // into a new collectoin called "map_reduce_example_output":
  {
    out: "map_reduce_example_output"
  }
);