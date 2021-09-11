# Review:

##### Example of one to one relation:

User and Profile

##### Example of one to many relation:

Order to order detail - one order could have many items

#####Example of many to many:
Drivers and Buses (drivers can drive many buses, bus can be driven by many drivers)

#####Technique to establish one to many relation between collections:
Linking/refs

- MongoDB people call it 'true linking'

##### Data type saved for the field that has the ref in it:

ObjectID

##### Mongoose document:

- representation of document in database
- We can call methods on the model (find and findById)
- Save is something we call on mongoose document
- Need to generate document before save, which is why we use 'new'

Mongoose supports subset of all data types supported by database - Javascript doesn't support a lot of data types - Mongoose does juggling translation between what Javascript supports and what MongoDB supports

Typescript is not related to content of class, just superset of things that will give you typing on Javascript the language - will validate types for you at development time. At the end of the day, gets compiled to regular Javascript

### Topics:

###### Data population

###### Middleware

###### Custom validation

db from mongo-films project:

```
const mongoose = require('mongoose');
module.exports = {
    connectTo: function(database = 'sandbox', host = 'localhost') {
        return mongoose.connect(`mongodb://${host}/${database}`);
    }
}
```

##### What this was doing:

- Calling function .connectTo and passing name of database
- Returning object that has connectTo function and takes database as the first argument
  - If you don't pass anything, it will use default values from ES6 and connect to Sandbox and will use localhost as the host if you don't pass the second argument
- So now mongoose is in the /data/db.js file instead of the server

```
router.get('/', function(req, res) {
    Character.find().then(characters => res.status(200).json(characters)).catch(err => { res.status(500).json(err);
    })
})
```

Only get the ID.

Shift+alt+down to make copy of text

Populate:

`Character.find({_id: req.params.id})`
Works the same as
`Character.findById(req.params.id)`

```
router.get('/:id', function(req, res) {
    Character.findById(req.params.id)
        .populate('homeworld')
        .then(char => res.status(200).json(char))
        .catch(err => res.status(500).json(err))
})
```

`.populate(field you want to pull the ObjectId from)`

Beautiful thing about using ref:
If data changes in the original Planet (think linked), gets updated because we only pointed to the data/referenced it, didn't copy it over

No commas in populate - example, ('homeworld', 'name climate'), not ('homeworld', 'name, climate')

To get rid of \_id, .populate('homeworld', '-\_id')

##### How do you store images or videos?

- Usually store on a file system and store link or ref in the database as a string
- Mongo has a dataType for that - BLOB - Binary Large OBject

##### What if there's multiple things you want populated?

- Can use as many populate functions as necessary
- Might be another way, but that Works
- Do not populate with the same field multiple times (it will only take last one)

##### RegEx:

// /api/films?released=2005 /api/films?producer=gary kurtz

```
router.get('/', function(req, res) {
   let query = Film.find().select('producer release_date')
   const { producer, released } = req.query;
   if (producer) {
// filter by producer
// if you know it'll always be undercase, can just pass that in
// Because you don't, best to use regex
//  JS regular expression object
        const filter = new RegExp(producer, 'i')
        // 'i' <- case insensitive
        query.where({ producer: filter})
// pass valid regular expression with whatever is used with producer key
   }
   if (released) {
       // native MongoDB query syntax
       query.where({ release_date: { $regex: released, $optons: 'i'}})
   }
   query.then(films => res.status(200).json(films))
})
```

Regular expressions are never easy, but now you have examples.

If something starts with $, means it's coming from MongoDB native query syntax

`query.where('propducer').in([]) <-- mongoose`
`query.find({ producer: { $in: [] }}) <--- MongoDB`

Usually going to be cleaner with mongoose

Read documentation, try it out, pick what's more natural to you

##### Difference between easy and simple:

Easy is from near me, things that are easier to grasp. Things that are familiar seem easier, not necessarily simpler.
Complex - braiding things together like a rope. Simplifying is turning it from braided into each other to loose and separated. - from a talk from Rich Hickey (creator of Clojure), Simple Made Easy

Pick a syntax - if it's easier for you, use it

In order to populate data automatically, first:

- Need to add relations

```
router.get('/', (req, res) => {
    let query = Film.find()
    .select('episode producer title director release_date characters planets')
    .populate('planets', 'name climate terrain gravity diameter')
    .populate(
        'characters',
        'name gender height skin_color hair_color eye_color'
    );

    const { producer, released } = req.query;
    if (producer) {
        const filter = new RegEx(producer, 'i');
        query.where({ producer: filter });
    }
    if (released) {
        query.where({ release_date: { $regex: released, $options: 'i' }})
    }
    query.then(films => res.status(200).json(films))
})
```

```
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Character.findById(id)
    .populate('homeworld', 'climate -_id')
    .then(char => {
        Film.find({ characters: id }).select('title').then(films => {
            const character = {...char._doc, movies: films };
            res.status(200).json(character);
        });
    })
    .catch(err => {
        res.status(500).json(err);
    })
})
```

.\_doc is what you want to select when you do a spread operator or Object.assign()

- that's where the data lives in the query

Someone asked how you would do it for the root route for Characters

```
router.get('/', (req, res) => {
    Character.find()
    .then(chars => {
        const promises = chars.map(char => {
            return Film.find({ characters: id })
            .select('title')
            .then(films => {
                const character = { ...char._doc, movies: films };
                res.status(200).json(character);
            });
        });

        Promise.all(promises).then()...
    })
})
```

Multiple thens you'll see a lot.

```
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const chars = Character.find({ homeworld: id });
    const species = Specie.find({ homeworld: id });

    Promise.all([chars, species]).then(results => {
        const [characters, species] = results;
// same as saying const characters = results[0] const species = results[1]

        res.status(200).json({ characters, species })
    })
    .catch (err => res.send(err));
})
```
