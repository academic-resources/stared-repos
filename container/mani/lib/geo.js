var GeoLib		= require('geolib'),
	utilities	= require('./utilities');


//
Geo = function( options, eventEmitter ){
	this.items = [];
	this.options = {};
	if(options.geo){
		this.options = options;
	}

	this.eventEmitter = (eventEmitter)? this.eventEmitter : null;
};


Geo.prototype.search = function ( options, subSet ) {
	this.options = (options)? options : {};

	if(options.nearby){
		return this.nearby( options );
	}
}


Geo.prototype.nearby = function ( options, subSet ) {
	this.options = (options)? options : {};
	var geoResults = null,
		formattedResults = null,
		docs = this._getDocumentSubSet(subSet);

	var limit = this._getResultLimit( options );
	if(!limit){
		limit = 1000;
	}
	if(!options.sort){
		options.sort = {
			'path': 'distance',
			'reverse': false
		}
	}
	var offset = 0;
	if(options.nearby.offset){
		offset = options.nearby.offset;
	}

	// excute free text search
	if(options.nearby){
		geoResults = GeoLib.findNearest(options.nearby, docs, options.nearby.offset, limit);
		if(geoResults){
			// reformat to result format
			if(!Array.isArray(geoResults)){
				geoResults = [geoResults];
			}
			formattedResults = [];
			geoResults.forEach(function(item, i) {
				formattedResults.push({'ref': item.key, 'distance': item.distance});
			})
		}
	}

	// format [{"ref":"12","distance":34.6}]
	return formattedResults
}


// use get result limit based on paging options
Geo.prototype._getResultLimit = function ( options ) {
	var out = null;
	if(options){

		var startAtNum = utilities.reach(options,'startAt'),
			limitNum = utilities.reach(options,'limit');


		if(limitNum !== undefined){
			out = limitNum;
			if(startAtNum !== undefined){
				out = startAtNum-1 + limitNum;
			}
		}
	}
	return out;
}


// flatten an item for use with geolib
Geo.prototype._flatten = function ( item ) {
	var out = {}
	if( utilities.reach(this, 'options.geo.point') ){
		out.ref = item.id;
	    out.latitude = this._getFloat( utilities.reach(item, utilities.reach(this, 'options.geo.point.latitudePath')) );
        out.longitude = this._getFloat( utilities.reach(item, utilities.reach(this, 'options.geo.point.longitudePath')) );
	}
	if(out.latitude === undefined || out.longitude === undefined){
		return null;
	}
	return out;
}


// get a float value from string and/or first item in any array
Geo.prototype._getFloat = function ( obj ) {
	if(Array.isArray( obj )){
		obj = obj[0];
	}
	if(utilities.isString(obj)){
		obj = parseFloat(obj)
	}
	return obj;
}


// add document to collection
Geo.prototype._getDocumentSubSet = function ( subSet ) {
  var self = this,
  out = {};

	if(subSet){
		subSet.forEach(function(item) {
			self.items.forEach(function(doc) {
				if(parseInt(item.ref,10) === doc.ref){
					out[item.ref] = doc;
				}
			})
		})
	}else{
		out = this.items;
	}

	return out;
}


// remove all documents.items
Geo.prototype.removeAll = function () {
	this.items = [];
}



// add document to collection
Geo.prototype.add = function (doc) {
	var flat = this._flatten(doc);
	if(flat !== null){
		this.items.push(this._flatten(doc));
		return doc;
	}else{
		return null;
	}
}


/*Geo.prototype.update = function (doc) {

}


Geo.prototype.remove = function (doc) {

}*/

module.exports = Geo;