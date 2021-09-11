
// TODO write client-side tests for persist module

var localforage     = require('localforage');

// create a documents collection that encapsules lunr interface
Persist = function( index, options, callback ){

  var self = this;
  this.options = (options)? options : {};

  if(!this.options.name ){
    this.options.name = 'mani';
  }
  if(!this.options.auto ){
    this.options.auto = false;
  }

  this.index = index;
  localforage.config({
      'name': self.options.name + '-collection'
  });

  // capture all event and if auto true save changes
  this.index.on('add', 'remove', 'update', (function (items, eventType, context) {
    if(self.options.auto === true){
      self.save(function(err, items){
           console.log('persist: ', eventType, ' event capture - errors: ', err)
      })
    }
  }));

  // if auto is true at start load current items into index
  if(this.options.auto === true){
    this.load( {loadOnlyData: true}, function(err, items){
      if(callback){
        callback(err, items);
      }
    });
  }else{
    if(callback){
      callback(null, []);
    }
  }
};


Persist.prototype.save = function (callback) {
  	var name = this._getName();

  	localforage.setItem(name, this.toJSON()).then(function(value) {
      	console.log('document collection was stored: ' + value.length);
      	callback(null, value); 
  	}, function(err) {
      	console.error('document collection store errored: ' +  err);
      	callback(err, null) 
  	});
}


Persist.prototype.load = function (options, callback) {
    options = options || {};
    options.loadOnlyData = options.loadOnlyData || false;
    
  	var self = this,
		name = this._getName();

  	localforage.getItem(name).then(function(pack) {
        pack = pack || {items: []}
        if(options.loadOnlyData === true){
           self.dataFromJSON(pack);
        }else{
           self.fromJSON(pack); 
        }
        console.log('document collection was restored: ' + pack.items.length);
    	callback(null, pack.items);
  	}, function(err) {
      	console.error('document collection restore errored: ' +  err);
      	callback(err, null); 
  	});
}



Persist.prototype.removeAll = function (callback) {
  var self = this,
      name = this._getName();

  localforage.removeItem(name).then(function() {
      self.index.removeAll(function(){});
      console.log('document collection was removed')
      callback(null, []);
  }, function(err) {
      console.error('document collection remove errored: ' +  err);
      callback(err, null); 
  });

}


Persist.prototype.toJSON = function () {
  return this.index.toJSON();
}


Persist.prototype.fromJSON = function ( json ) {
    this.index.fromJSON( json );
}


Persist.prototype.dataFromJSON = function ( json ) {
    this.index.dataFromJSON( json );
}


Persist.prototype._getName = function () {
	return (this.options.name)? this.options.name + '-documents' : 'documents';
}


Persist.prototype.setConfig = function (name, obj, callback) {
    localforage.setItem(name, obj).then(function(obj) {
      	console.log('config object was stored: ' + name);
      	callback(null, obj); 
  	}, function(err) {
      	console.error('config object store errored: ' +  err);
      	callback(err, null);
  	});
}


Persist.prototype.getConfig = function (name, callback) {
    localforage.getItem(name).then(function(obj) {
        console.log('config object was restored: ' + obj);
    	callback(null, obj);
  	}, function(err) {
      	console.error('config object restore errored: ' +  err);
      	callback(err, null); 
  	});
}




module.exports = Persist;