Side Note: Robo 3T - Better than Compass

## Topics:

- importing data
- modeling rations
  - one to one
  - one to many
  - many to many
- embedded documents/schemas, AKA sub-documents
- linking/refs
- data population
- querying data
  - sorting
  - filtering
  - projection

### Data in Mongo Films Project

Were generated using a export utility

- Generates JSON files but in different way
- Collection of objects, but not separated by commas
- Special type of JSON files we can use and import into our database

### Importing

From inside the folder where the JSON files you want to import are located:
`mongoimport --db databasName --collection collectionName --file nameOfFile.json`

## Modeling Relations

A film has a collection of: - Characters - Planets - Specie - Starship - Vehicle
Also has title and prodcer and director - If we had a director collection, could point to director property from another collection
There's a relationship between the species and the planet
One planet can have more than one species, but species can only have one planet - Same with characters (only one homeworld)

## Mainly three types of relation:

### One to One:

- One user has one profile
- One patient has one medical record
- in United States, one person has one spouse

### One to Many:

- Most common type of relation
- One order has many order lines/items
- A film can have many actors
- One city has many citizens
- Departments and employees

### One to Few:

More than one but not many -

- A book can have more than author (never going to be 100 authors)
- An author can write many books
- A blog post has a few comments

### Many to Many ( or Few to Few ):

[Book] 1 --- _ [Author] 1 --- _ [Book]
When relationship goes both ways:

- books and authors
- users and roles

```
const ObjectId = mongoose.Schema.Types.ObjectId

const definition = {
    starship_class: {
        type: String,
        required: true
    },
    hyperdrive_rating: String,
    key: Number,
    pilots: [
        {
            type: ObjectId
        }
    ]
}

```

#### SWAPI Had Keys

Luis wrote code that grabbed that ID and turned it into ObjectID
Don't need pilot key anymore, can take pilots (array of ObjectIDs) instead

### One to Many:

Start with ref (linking)

### One to One:

Start with embedding (sub-documents)

### One to few:

Could be embedded or linked (ref)

### Many to Many (Few)

Many would be linked, few embedded

```

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    gender: String,
    height: {
        type: Number,
        min: 0
    },
    eye_color: String,
    homeworld: {
        type: ObjectId,
        ref: 'Planet'
    }
    ship: [
        {
            type: ObjectId,
            ref: 'Starship'
        }
    ],
    address: {
        city; String,
        state: String,
        streetAddress: String
    } <-- This address is an example of embedding
})

const character = mongoose.model('Character', characterSchema);

const definition = {
    starship_class: {
        type: String,
        required: true
    },
    hyperdrive_rating: String,
    key: Number,
    pilots: [
        {
            type: ObjectId,
            ref: 'Character'
        }
    ]
};

const options = {
    strict: false,
};
```

### Don't have to import models

- Just need to know the names of the models

##### Whenever one to many, default to ref

###### Planet is not a good use case for embedding

- Species, characters, etc. pull from that information

#### If you know you're not going to have a new collection:

Embed document

### Querying Data

Before you call .then, just a promise
Every query can be captured as a query

### Sort

```
let query = Character.find()

query.sort('name') // by name asending
query.sort('-name') // by name descending
query.sort('gender -height) // multiple fields
query.sort({ gender: 1, height: -1 }) // same as above
```

### Projection

Have a lot of things but only need a few fields:

```
query.select('name gender')
query.select({ name: 1, gender: 1 })
query.select({_id: 0}) // exclude only _id
query.select({ name: 1, gender: 1, _id: 0 }) // excludes _id
```

- \_id is always returned by default

#### Methods are chainable:

```
Character.find({ gender: 'female'})
    .sort('height')
    .select('name')
    .then().catch()
```

Could have query, don't execute it, and add to it

```
incrementally building query:

const gender = req.query.gender;

let query = Characters.find()
if (gender) {
    query.where({ gender: gender })
}
query.then(chars => res.json(chars)).catch();
```

```
query.where('age').gte(18).lte(62)
```

gte - greater than or equal to
lte - less than or equal to

Normally people will not come to you with queries, they will come to you with questions:

- I want to see a list of films in our database but I want to see them in order
- I wnat you to find all the films produced by Gary Kurtz

You could see Gary Kurtz and it'll add that + for you. (turns to %20, which is equivalent)

- Filtering for that is done with Regex (documentation in MongoDB and Mongoose)

When I say 'add movies property', I don't mean add to the schema, I mean add it to the response

- You're doing two queries, one to get the character to get the ID, then another for Films to see in how many films that character ID appears
