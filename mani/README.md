# Mani

# IN DEVELOPMENT - API NOT STABLE

###  Pure javascript search - browser and node.js
Mani provides a document based search tool in javascript. It merges together free text search, mongodb type queries, geo search and facets from other projects into one library.



### Features

* Free text search
  * field boast
  * injects match score
  * stopword list
* Query
  * Simple property queries (mongodb syntax)
  * ~~typeTo - enforcing the data type of property for comparisons~~
* GEO search
  * Nearby query/sort
  * injects distance
* Facets
* Pageing and sorting
* Persistent browser storage
* Serialize data and indexs to and from a JSON file
* Works with complex JSON documents with child objects
   * Define property selections with JSON path

### Install
    npm install mani


### Text search
A code example of setting up a search index, loading 2 documents and search for the text 'promises'.
```javascript

  var options = {
     'text': [
        {'path': 'title', 'boost': 20},
        {'path': 'article.body'}
     ]
  }

  var index = new Mani(options);

    index.add({
      title: 'Are promises better than callback',
      article: {
         body: 'Do promises offer more flexibility than callbacks...',
         tags: ['javascript','es6','promises']
      }
   });
    index.add({
      title: 'ES6 and preprocessors',
      article: {
         body: 'Compile ES6 script on the fly using...',
         tags: ['javascript','es6','traceur','babel']
      }
    });

     var results = index.search({
        text: 'promises'
     });
```
The free text search uses a list of stop words which you can replaces by a new array of words to the option when setup your index. if you want to remove the stop words just add a blank array.

```javascript
  var options = {
     'stopWords': ['']
     'text': [
        {'path': 'title', 'boost': 20},
        {'path': 'article.body'}
     ]
  }
```



### Query
The current code does simple matches on the content of properties in your docuements

Search with single query:
```javascript
    var results = index.search({
        'query': {
          {'article.tags','javascript'}
      }
    })
```

Search with two queries:
```javascript
    var results = index.search({
        'query': {
          {'article.published',true}
          {'article.tags','javascript'}
      }
    })
```
#### Comparison query operators
Mani provides a number of simple comparison query operators based on manogodb syntax

* '$gt': Greater than - `{query: {'viewed': {'$gt': 2000}}}`
* '$gte': Greater than or equal - `{query: {'viewed': {'$gte': 1284}}}`
* '$lt': Less than - `{query: {'viewed': {'$lt': 2000}}}`
* '$lte': Less than or equal - `{query: {'viewed': {'$lte': 3552}}}`
* '$exists': Property exists  - `{query: {'viewed': {'$exists': true}}}`
* '$ne': Not equals - `{query: {'viewed': {'$ne': 3552}}}`


### Nearby
A code example of querying and sorting documents using a geolocation.
Adding latitude and longitude paths to the index schema:
```javascript
  var options = {
     'text': [
        {'path': 'name', 'boost': 20},
        {'path': 'tag'}
     ],
     'geo': {
          'point': {
              'latitudePath': 'location.latitude',
                'longitudePath': 'location.longitude',
          }
     }
  }
  var index = new Mani(options)
```
Nearby search join with freetext search for term 'pub':
```javascript
    var results = index.search({
         'text': 'pub',
         'nearby': {
            'latitude': 52.516272,
            'longitude': 13.377722,
            'offset': 0
         }
      })
```
Properties used for nearby:
* `offset` exclude results that are in a radius of the offset - set in meters.


### Facets
A code example of returning facets from a document set.
From the documents in a search result:
```
    var results = index.search({
         text: 'promises',
         facets: {
            'path': 'article.tags'
         }
      })
```
From all documents in a index:
```
    var results = index.facets({
        'path': 'article.tags',
        'limit': 20
      })
```

Properties used in facet:
* `path` the JSON path to the property the facets are created from.
* `limit` limits the number of facets returned.

### Paging and sorting
A code example of returning results in pages set using `limit` and `startAt`

```javascript
    var results = index.search({
         text: 'promises',
         facets: {
            'path': 'article.tags'
         }
        'limit': 20,
        'startAt': 20,
        'sort': {
            'path': 'article.titles',
            'reverse': true
        }
    })
```

Properties used for paging:
* `limit` limits the number of results returned has to 1 or greater.
* `startAt` defines where mani starts returning results from within a result set.
* `sort` object containing `path` and `direction` property .

### Browser usage
To use Mani in a browser simple add the script file
```html
  <script src="mani.js"></script>

```

### Persistent browser storage
Within browsers Mani can persist data inbetween browser session. Which allows you to build offline user expereiences. You need to load both the `mani.js` and `mani-persist.js` scripts into the browser.
```html
  <script src="mani.js"></script>
  <script src="mani-persist.js"></script>
```

The `Persist` object options has a property `auto` if set to `true` the data in Mani will be inbetween session.

```javascript
    var index = new Mani(options);
  var persist = new Persist(index, {
          name: 'places',
          auto: true
      }, function(err, items){
      // add action such as search
  });
```
Properties used for persist:
* `name` this can be showed to user if storage limits are reached.
* `auto` automaticlly persist data between sessions.

##### Persist `save` and `load`

The `save` and `load` functions for manually storing data have callback to which are call once the data is either stored or restored. You should make sure you give an index a name before using this feature.

The save function persist the data into the browser
```javascript
    index.save(function(err, items){
        console.log( err, items );
    })
```

The load function restores the data back into your index
```javascript
    index.load(function(err, items){
        console.log( err, items );
    })
```

### Serialize data and indexs to and from a JSON file
You can Serialize data and Mani indexs into a simple to use and store JSON file. This is useful for static site generation or where the data will not be updated once it sent to client.

To JSON
```javascript
    var index = new Mani(options);
    index.add(...);
    var json = JSON.stringify( index.toJSON() );
```

From JSON
```javascript
    var index = new Mani();
    index.fromJSON( JSON.parse(indexJSON) );
```




### Built on top of
This project stand on the shoulders of others:
* [lunrjs](http://lunrjs.com/) - free text search
* [nedb](https://github.com/louischatriot/nedb) - the query engine from nedb
* [geolib](https://github.com/manuelbieh/Geolib) - nearby search
* [localForage](https://github.com/mozilla/localForage) - data persistance

### The name "Mani"
In viking mythology **Mani** is the man who drives the chariot that carries the Moon across the sky. I thought this would be a good name for a wrapper of [lunrjs](http://lunrjs.com/).


### Build
Mani is build using [NPM](https://www.npmjs.com/) modules and [browerify](http://browserify.org/), to make devlopment a little easier I use [watchify](https://github.com/substack/watchify) to compile the js files as a I code. The two watchify commands for the project are:

* `watchify lib/index.js -s Mani -o mani.js`
* `watchify lib/persist.js -s Persist -o mani-persist.js`


### Tests
The project has a number integration and unit tests. To run the test within the project type the following command.

    $ mocha --reporter list

### Support or Contact
Having trouble, please raise an issue at: [https://github.com/glennjones/mani/issues](https://github.com/glennjones/mani/issues)


### License
The project is open sourced under MIT license. See the [license.txt](https://raw.github.com/glennjones/mani/master/license.txt "license.txt") file within the project source.