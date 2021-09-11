

var _			= require('./lodash.custom.min.js');

module.exports = {
    
    // underscore/lodash function pass through
    
    cloneDeep: function(args){
        return _.cloneDeep.apply(this, arguments);
    },
        
    map: function(args){
        return _.map.apply(this, arguments);
    },
    
    filter: function(args){
        return _.filter.apply(this, arguments);
    },
    
    uniq: function(args){
        return _.uniq.apply(this, arguments);
    },
    
    sortByOrder: function(args){
        return _.sortByOrder.apply(this, arguments);
    },
    
    isNumber: function(args){
        return _.isNumber.apply(this, arguments);
    },
    
    isString: function(args){
        return _.isString.apply(this, arguments);
    },
    
    isFunction: function(args){
        return _.isFunction.apply(this, arguments);
    },
    
    isBoolean: function(args){
        return _.isBoolean.apply(this, arguments);
    },
    
    isDate: function(args){
        return _.isDate.apply(this, arguments);
    },
    
    has: function(args){
        return _.has.apply(this, arguments);
    },

    
    
    // taken from hapi.js project
    // uses a JSON to reach into object for property values
    reach: function (obj, chain, options) {
        options = options || {};
        if (typeof options === 'string') {
            options = { separator: options };
        }
        var path = chain.split(options.separator || '.');
        var ref = obj;
        for (var i = 0, il = path.length; i < il; ++i) {
            var key = path[i];
            if (key[0] === '-' && Array.isArray(ref)) {
                key = key.slice(1, key.length);
                key = ref.length - key;
            }
            if (!ref ||
                !ref.hasOwnProperty(key) ||
                (typeof ref !== 'object' && options.functions === false)) {         
            	ref = options.default;
                break;
            }
            ref = ref[key];
        }
        return ref;
    }
    
    
}


