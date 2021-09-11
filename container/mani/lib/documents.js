var utilities	= require('./utilities');
	

// create a documents collection that encapsules lunr interface
Documents = function( options, eventEmitter ){
	this.options = (options)? options : {};
	this.items = [];
	this._idCount = 0;

	this.eventEmitter = (eventEmitter)? this.eventEmitter : null;
};


// return document by id
Documents.prototype.getItemById = function ( id ) {
	var out = null,
		i = this.items.length,
		x = 0;

	while (x < i) {
	    if(this.items[x].id === id){
	    	var out = utilities.cloneDeep(this.items[x]);
	    	break;
	    }
	    x++;
	}
	return out;
}

// return items based on fts results
Documents.prototype.getItemsFromResults = function ( results ){
	var out = [],
		i = 0,
		x = 0;
		
	if(Array.isArray(results)){
		i = results.length;
		while (x < i) {
			var id = parseInt(results[x].ref,10);
			var item = this.getItemById( id );

			// add free text score
			if(results[x].score !== undefined){
				item.score = results[x].score;	
			}

			// add geo distance
			if(results[x].distance !== undefined){
				item.distance = results[x].distance;	
			}
			
	    	out.push(item);
		    x++;
		}
	}

	return out;
}


// remove all documents.items
Documents.prototype.removeAll = function () {
	this.items = [];
	this._idCount = 0;
}



// add document to collection
Documents.prototype.add = function (doc) {
	doc.id = this._idCount;
	this._idCount ++;
	this.items.push(doc);
	return doc;
}

/*
// remove document from collection
Documents.prototype.remove = function (doc ) {
    return this._lunrIndex.remove( doc )
}

// update document from collection
Documents.prototype.update = function (doc ) {
    return this._lunrIndex.update( doc )
}

// return collection as JSON
Documents.prototype.toJSON = function () {
    return this._lunrIndex.toJSON();
}


Documents.prototype.count = function () {
    return this.items.length;
}
*/


module.exports = Documents;