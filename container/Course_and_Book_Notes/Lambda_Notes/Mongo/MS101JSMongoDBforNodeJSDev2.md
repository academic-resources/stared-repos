MongoDB Week 2 Part I

# Creating Documents, the _id Field, Reading Documents

### Creating Documents in MongoDB
db.collection.insertOne({})
    Could include your own _id so that MongoDB does not create one for you.
    However, if you have two documents that are the same in every way except for _id, Mongo will interpret them as different documents

```
db.collection.insertMany([
    {
// insertMany has ordered: true by default.
// This means that if there is an error inserting any item, 
// the function ends and only the documents inserted before the error are inserted
    }, 
// In many applications, we might want it to keep going after an error, 
// in which case we would change ordered to false.
    {
        "ordered": false
    }
])
```

You can create a document using update
- These are called 'upserts'
- This occurs when there are no documents that match the selector that is used to identify documents that need to be updated


_id: All collections have a unique primary index on _id field by default.  MongoDB creates _id with ObjectID value

Each ObjectID is a 12-byte hex string
- First four bytes are a value representing the seconds since the Unix epoch
- Next 3 are machine address, Mac address for the machine on which the mongod server is running
- Next two bytes contain the process iD
- Last three are a counter to ensure all objectIDs are unique (even if they might meet the same circumstances for the other parts of the ObjectID

```
              Date     Mac   PID   Counter
objectID:    _ _ _ _ | _ _ | _ _ | _ _ _
```

### Reading Documents
```db.collection.find({ rated: 'PG-13'})```
First argument to find is known as the query document
Fields in query document are selectors that restrict the result set

Selectors in the query document for find are implicitly &ed together

```db.collection.find({ 'tomato.meter': 100 })```
^ to access nested documents, use dot notation - has to be in quotes

### Exact Matches for Array Fields:
`db.collection.find({ "writers": ["Ethan Coen", "Joel Coen"]})` 
    ^ order matters: This will search the collection for documents where Ethan Cohen and Joel Coen appear in the "writers" field in that order and where they are the only two elements of that array.

### Matches to Any Element in Array:
`db.collection.find({ "actors": "Jeff Bridges })`
This will return any document where "Jeff Bridges" is an element of the array "actors"
- Same syntax as structure for scalar values
- Don't need to enclose in square brackets unless doing an exact match on the entire array

### Matches to a Specific Element of the Array:
`db.collection.find({ "actors.0": "Jeff Bridges })`
This will return documents where "Jeff Bridges" is the first name listed in the actors array

## Cursors:
Find method returns a cursor
To access documents, you need to iterate through a cursor
In the mongo shell, if we don't assign a return value from find using the var keyword, the cursor automatically is iterated up to 20 times to print the initial search results
- In general, mongoDB server returns query results in batches
    - batch size will not exceed maximum BSON document size
    - For most queries, first batch returns 101 documents or just enough to exceed 1mb - subsequent batches will be 4mb
        - It is possible to override batch size but outside scope of course
If we hit the end of our cursor, cursor.next() will perform a get more function
If you want to see how many left of cursor, etc....
    var c = db.collection.find()
    var doc = function() { return c.hasNext() ? c.next() : null }
    c.objLefInBatch()
And then to iterate through the document, you would call doc()

### Projection:
Handy way of reducing size of data returned for any one query
- By default, mongoDB returns all fields for all matching documents
- to limit the amount of data mongoDB sends to application, you can include projections
Projections reduce the network overhead and processing requirements by limiting the fields returned in result documents
Projections are supplied as the second argument of the find command

Projection syntax allows you to explicitly include fields in documents returned - can also explicitly exclude fields    
    - if you want to exclude _id, expliclty state that in the projection document
`db.collection.find({query document}, {projection document})`

### Comparison Operators:
- Allow us to match on basis of a field's value relative to another value

```
db.collection.find({ runtime: { $gt: 90 }}) 
    // find documents where runtime is greater than 90
// field: { value the field should have } 
        .find({ runtime: { $gte: 90, $lte: 120 }})
    // find movies with runtimes between 90 and 120
```
```
db.collection.find({ "tomato.meter": { 
    $gte: 95, runtime: { $gt: 180 }, { 
        title: 1, runtime: 1, _id: 0 }})
```
^ find movies with a tomato rating of >= 95 & runtime of > 180, then project title, runtime, and not _id

$eq has same semantics

```
db.collection.find({ rated: { $ne: "UNRATED" }}) 
// all documents that don't have unrated ratings
```
^ will also return documents without a rated field (if there are any)
    Rather than not having a 'null' in the field, mongoDB doesn't store that field at all 

```
db.collection.find({ rated: { $in: ["G", PG"]}}) 
    // all documents where rating is G or PG
```
value of $in has to be an array

$nin is for matching none of the values specified in an array


### Element Operators: 
Considerations for the shape of a document:
    - Presence or absence/or data type of a field

```
db.collection.find({ "tomato.meter": { $exists: true }}) 
    // returns documents that have a tomato.meter rating
```

```
db.collection.find({ "tomato.meter": { $exists: false }}) 
    // returns documents that do not have a tomato.meter rating
```

```
db.collection.find({ "_id": { $type: "string" }}) 
    //returns documents that have "_id" as a string rather than an ObjectId
```

###Logical Operators:

```
db.collection.find({ $or : [ { 
    "tomato.meter": { $gt: 95 }}, { 
        "metacritic": $gt: 88 }]}) 
    // takes array as argument, elements are criteria
```

```
db.collection.find({ $and : [ { "metacritic: { $ne: null }}, {
    "metacritic": { $exists: true }}]})
// $and is necessary only in certain situations because of implicit &
// keys in JSON document have to be unique.  
// $and allows you to place multiple constraints on the same field
```
### Regex Operator:

`db.collection.find({ "awards.text": { $regex: /^Won\s.*/ }})`
^ means start at the beginning, Won means match with text that have Won as the beginning of the text, \s means space, .* means followed by any sequence of other characters 

### Array Operators:

```
db.collection.find({ genres: { $all: ["Comedy", "Crime", "Drama" ]}})
    // return documents that contain all three elements
```

```
db.collection.find({ countries: { $size: 1 }})
    // documents where there was only one country listed
```

```
db.collection.find({ boxOffice: { $elemMatch: { 
    country: "UK", revenue: { $gt: 15 }}}}) 
// matches only when both country: UK and gt: 15 match in boxOffice
```
- all criteria be satisfied within a single element of an array field 
- specify name of field we're matching against, use elemMatch operator, specify criteria against we want to match elements in the array
- Match only documents where all criteria are met within a single element of the array

### Updating Documents:

##### updateOne()
```
db.collection.updateOne({ filter/selector document }, { 
    $set { how we want to update the document}})
```
- if there are multiple documnts with filter/selector, will update first one

##### Field update operators:
`$set` takes a document as an argument and expects a document with a number of specified fields.  Will update document matching the filter such that all key/value pairs are reflected in new version of document
- sets value of a field in a document
$unset 
- removes specified field from a document
... etc.

```
db.collection.updateOne({ title: "The Martian" }, { 
    $inc: { "tomato.reviews": 3, "tomato.userReviews: 25 }})
    // increments tomato reviews by 3 and userReviews by 25
```
#### Update Methods for Arrays
 - $addToSet - Update with new values only if value isn't contained in array
 - $pop - Pull off first or last item of an array
 - $pullAll - Removes all matching values from an array
 - $pull - Remove all array elements that match a specified query
 - $push - Add an item to the array

```
db.collection.updateOne({ title: "The Martian" }, {
    $push: { reviews: { $each [ { rating: 4.5, date: ..., etc.}]}})
```
- If you don't use $each, entire array in push will be added as single element in the array
- We would have an array that would have a single element that would be an array

``` 
db.collection.updateOne({ title: "The Martian"}, {$push: { 
    reviews: { $each: [ { keys/values }], $position: 0, $slice: 5}}}) 
// need to use $position to specify you want element at the front of the array
// This is saying to add this field as the first element of the reviews field array 
// and that the array should only be 5 elements long
```

Same principles apply to updateMany but it will make the same modification to all documents that match the filter.

```
db.collection.updateMany({ rated: null }, { $unset: { rated: '' }})
    // removes the field 'rated' from docs where rated is null
```
#### Upserts:
- if no document is found matching our filter, insert
db.collection.updateOne( { "imdb.id" : detail.imdb.id }, { $set: detail }, { upsert: true }) 
- update any document where imdb.id is equal to imdb.id in detail document
    - in updating document, replaces it with essentially the exact same detail infomation
        - guarantees not two copies of same thing with different _id

#### replaceOne:
```
db.collection.replaceOne({ "imdb": detail.imdb.id}, detail)
    // wholesale document document replacement
```

