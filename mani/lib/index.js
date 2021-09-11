
var Lunr		= require('lunr'),
	GeoLib		= require('geolib'),
	Utilities	= require('./utilities'),
	Documents	= require('./documents'),
	FreeText	= require('./freetext'),
	Match		= require('./match'),
	Geo			= require('./geo'),
	Facets		= require('./facets'),
	Paging		= require('./paging');


function Mani(options) {
 	return new Mani.Index(options);
}


Mani.version = '0.0.2';


Mani.Index = function (options) {
	this._configure(options);
}


Mani.Index.prototype._configure = function (options) {
	this.version = Mani.version;

	this.options = (options)? options : {};
	this.options.name = (this.name)? this.name : 'Mani';

	this.eventEmitter =  new Lunr.EventEmitter
	this.documents = new Documents(this.options, this.eventEmitter);
    this._freetext = new FreeText(this.options, this.eventEmitter);
    this._match = new Match(this.options, this.eventEmitter);
    this._geo = new Geo(this.options, this.eventEmitter);
    this.eventEmitter.emit('configured', options, this);
}


// expose externally 
Mani.geo = GeoLib;
Mani.lunr = Lunr;



Mani.Index.prototype.search = function (options) {
	options = (options)? options : {};
	var out = {
		'criteria' : options,
		'items': []
	},
	resultSet = null;

	// excute free text search
	if(options.text){
		resultSet  = this._freetext.search( options, resultSet );
	}

	// excute query match
	if(options.query){
		resultSet  = this._match.search( options, this.documents, resultSet );
	}

	// excute geo nearby search
	if(options.nearby){
		resultSet  = this._geo.nearby( options, resultSet );
	}

	// excute paging
	if(options.sort || options.startAt || options.limit ){
		var pagingResults = Paging.page( options, this.documents, resultSet );
		out.items = pagingResults.documents;
		if(pagingResults.info){
			out.paging = pagingResults.info
		}
	}else{
		out.items = this.documents.getItemsFromResults( resultSet );
	}

	// excute facet build based on results
	if(options.facets){
		var facets = new Facets();
    	out.facets = facets.build(this.documents, options.facets, resultSet)
	}

	return out; 
}


Mani.Index.prototype.facets = function (options) {
	if(options){
		var facets = new Facets();
    	return facets.build(this.documents, options)
	}else{
		return null;
	}
}


Mani.Index.prototype.add = function (doc, options) {
	options = (options)? options : {};
	var out = doc;

	if(!options.ftsIndex){
		options.ftsIndex = true;
	}

	if(out){
		if(Array.isArray(out) === false){
			out = [out];
		}

		var self = this;
		out.forEach(function(item) {
			self.documents.add(item);
			if(options.ftsIndex === true){
				self._freetext.add(item);
			}
	    	self._geo.add(item);
		})
		this.eventEmitter.emit('add', doc, 'add', this);
		return doc;
	}else{
		this.eventEmitter.emit('add', null, 'add', this);
		return null;
	}
}


Mani.Index.prototype.removeAll = function (callback) {

	var itemsRemoved = this.documents.items.length;

	// remove the index's 
	this.documents.removeAll();
	this._freetext.removeAll();
	this._geo.removeAll();

	this.eventEmitter.emit('removeAll', itemsRemoved, 'removed', this);
	callback(null, itemsRemoved);

}



/*Mani.Index.prototype.remove = function (doc) {
    return this._lunrIndex.remove( doc )
}


Mani.Index.prototype.update = function (doc ) {
    return this._lunrIndex.update( doc )
}


Mani.Index.prototype.toJSON = function () {
    return this._lunrIndex.toJSON();
}
*/



/**
 * Bind a handler to events being emitted by the index.
 *
 * The handler can be bound to many events at the same time.
 *
 * @param {String} [eventName] The name(s) of events to bind the function to.
 * @param {Function} handler The serialised set to load.
 * @memberOf Index
 */
Mani.Index.prototype.on = function () {
  var args = Array.prototype.slice.call(arguments)
  return this.eventEmitter.addListener.apply(this.eventEmitter, args)
}

/**
 * Removes a handler from an event being emitted by the index.
 *
 * @param {String} eventName The name of events to remove the function from.
 * @param {Function} handler The serialised set to load.
 * @memberOf Index
 */
Mani.Index.prototype.off = function (name, fn) {
  return this.eventEmitter.removeListener(name, fn)
}



// save index to serialized JSON
// includes options and the schema element of fts index
Mani.Index.prototype.toJSON = function () {

  // save full docuemnts
  var pack = {
  	version: this.version,
  	options: this.options,
    items: this.documents.items
  }
  // save free text index dump from lunr
  if(this._freetext._lunrIndex){
    pack.ftsIndex = this._freetext.toJSON()
  }

  return pack;	
}


// load index from serialized JSON
// includes options and the schema element of fts index
Mani.Index.prototype.fromJSON = function ( json ) {

	// configure with stored options
	if(json.options){
		this._configure(json.options);
	}

    // load free text index dump into lunr
    if(this._freetext 
      	&& this._freetext._lunrIndex 
      	&& json.ftsIndex){
      	this._freetext.fromJSON(json.ftsIndex)
    }

    // load full documents
    this.add(json.items, {ftsIndex: false});
}


// load just the data elements from serialized JSON
Mani.Index.prototype.dataFromJSON = function ( json ) {
    // load full documents
    if(json.items){
      this.add(json.items);
    }
}






module.exports = Mani;




  



 
