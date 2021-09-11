var utilities	= require('./utilities');


Facets = function(eventEmitter){
	this.items = [];

	this.eventEmitter = (eventEmitter)? this.eventEmitter : null;
};


// create facet list from a field in the documents
Facets.prototype.build = function(documents, options, results) {
	options = (options)? options : {};
	options.lowerCase = (options.lowerCase !== undefined)? options.lowerCase : true;

	var field = options.field,
		out = {};

	if(results){
		// using search results
		results.forEach(function(result) {
		  	var id = parseInt(result.ref,10);
		    var doc = documents.getItemById(id);
		    addFacet(doc)
		});
	} else {
		// using all data
		documents.items.forEach(function(doc, index) {
		    addFacet(doc)
		});
	}

	// add facet and update count
	function addFacet(doc){
		var path = options.path,

			// if element is any array
			val = utilities.reach(doc, path);


		if(val){
			if(Array.isArray(val)){
				val.forEach(function(item, index) {
					if(options.lowerCase){
						item = item.toLowerCase();
					}
					out[item] = (out[item] === undefined ? 0 : out[item]) + 1;
				});
			}else{
				if(options.lowerCase){
					val = val.toLowerCase();
				}
				out[val] = (out[val] === undefined ? 0 : out[val]) + 1;
			}
		}
	}

	// turn object into an array and sort by count
	var sortable = [];
	for (var facet in out){
		sortable.push([facet, out[facet]])
	}
	sortable.sort(function(a, b) {
		return b[1] - a[1]
	})

	this.items = sortable;


	if(options.limit){
		sortable = _limit(options.limit, sortable)
	}

	return sortable;
}


function _limit(num, documents){
	if(utilities.isNumber(num) && Array.isArray(documents)){
		num = parseInt(num, 10);
		return documents.slice(0, num);
	}else{
		return [];
	}
}

module.exports = Facets;