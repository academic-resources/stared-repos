#### Mongoose:
Library that wraps mongo DB native driver and provides cleaner API for us to connect to MongoDB and perform operations on our data.

#### Mongoose schema:
How we define the shape of our documents
If data has little or no structure, we probably just want to use the native driver rather than mongoose
Mongoose is when we have structured data

mongoDB can have many databases

- A JavaScript object is stored in mongoDB as a document
    - A group of related documents is stored as a collection
        - A group of collections is stored in a database

A mongoose schema compiles to mongoose model

##### Index:
Something you create to make searches go faster.
- If there is no index, searches will be performed using a collection scan (will look at every record one at a time until it finds what it's looking for)
- Indexes get created automatically for primary key (__id) and when marked as unique in the schema
- You should add indexes on fields you know you will search a lot (though you should not put an index on every field because it takes up storage in the database).

- Fields marked as unique are given an index becasue the database has to search the collection at every insertion
- This is not done for fields that are only marked required (and not unique) because a required field does not have to check against the rest of the collection upon insertion.
- `index: true` is the way to mark a field as having an index while not giving it a unique property.

It is possible to make a compound field with an index to speed up querying if you know queries with a given combination of fields will be common:
Example: bearSchema.index({ species: 1, latinName: -1 })
1 - ascending, -1 descending

##### MongoDB
When designing mongoDB databases, it's important to think about how the user will use the data and customize the database to be specific to the user.

SQL is client/application-agnostic.

Adding to Schemas
`options object = {
strict: true
}`
This is the default that mongoose gives to schemas.  If you want to be able to add things not on the schema, you should specify strict: false
Mongoose will then validate things that are set on the schema and accept the rest of what's been passed in through req.body

#### Model.discriminators:
Introduces inheritance
Is more detailed and not covered in this course
Schema inheritance
Base schema and then other schemas that add to it
Example: Animal Schema and then a Dog and Cat Schema
Multiple models  with overlapping schemas on top of the same underlying MongoDB collection
Should use caution because whenever you bring inheritance into a system, you're making some tight coupling

##### Will DBA be mad at you using strict: false?
If you have a DBA (database administrator), obey them - they will be in charge of modeling, etc., so you don't have to worry about strict: false, etc.

Clarification:
Can still write routes the way we did in previous lessons:
`router.get('/', (req, res) => {...})`

#### Note on delete:
Normally on delete, we would not return an object, we would have a tool for no content (204) - Nothing returns except a status code saying that it was successful
Need to do .end() or return() or it will get stuck if you only send status

#### Delete Method
findByIdAndDelete is a mongoose method
In MongoDB, you would have to find and then delete

#### Cast Error
If you give an ID as a string, Mongo will try to convert it to an ObjectId
If it can't : Cast error

When you call Json or end, it will end the request and send the response right  away, but apparently status will not stop the request.  Request goes through, but API doesn't return back to the client saying it's done.


#### Order not important in if/else:
That is, works the same if you have if `(true) {...} else { ... }` and if you have `if (false) {...} else {....}`

##### POST REQUEST EXAMPLE
```
router.put('/:id), (req, res) => {
const { id } = req.params;
    Bear.findByIdAndUpdate(id, req.body).then(bear => {
        if (bear) {
            res.status(200).json(bear);
        } else {
            res.status(404).json({ msg: 'Bear not found' });
        }
    })
    .catch (err => res.status(500).json(err));
});
```
Default is to return original object.
```
const update = req.body;
    const options = {
        new: true
};
```
```
Bear.findByIdAndUpdate(id, update, options).then(bear => {
    if (bear) {
        res.status(200).json(bear);
    } else {
        res.status(404).json({ msg: 'Bear not found' });
        }
    })
    .catch(err => res.status(500).json(err));
```
Built-in validators always run:
Example: unique

###### You should in theory do validation at all three levels:
- Client so you don't hit the API with invalid data
- If client sends you back data, validate at the API (router, interface with the client)
    - Doesn't have to be inside the route.  Might call a function to validate
- Data validation when you're using Mongoose, you can use custom validators on the schema so Mongoose does the validation for you
