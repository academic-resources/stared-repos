var utilities	= require('./utilities');



function page(options, documents, subSet){
	this.options = (options)? options : {};

	var out = {
		'documents': []
	}

	if(Array.isArray(subSet)){
		out.documents = documents.getItemsFromResults(subSet);
	}else{
		out.documents = documents.items;
	}


	if(this.options && Array.isArray(out.documents)){
		out.info = {itemCount: _size(out.documents)};

		var startAtNum = utilities.reach(this.options,'startAt'),
			limitNum = utilities.reach(this.options,'limit'),
			sortOptions = utilities.reach(this.options,'sort');


		if(sortOptions){
			if(sortOptions.reverse === undefined){
				sortOptions.reverse = false;
			}
			out.documents = _sort(sortOptions, out.documents)
		}


		if(utilities.isNumber(startAtNum)){
			if(startAtNum < out.info.itemCount){
				out.info.startAt = startAtNum
				out.documents = _startAt(startAtNum, out.documents)
			}
		}

		if(utilities.isNumber(limitNum)){
			if(limitNum < out.documents.length){
				out.info.limit = limitNum
				out.documents = _limit(limitNum, out.documents)
			}

			// add page info
			out.info.pageCount = Math.ceil( out.info.itemCount / limitNum );
			if(startAtNum){
				out.info.page = Math.ceil( startAtNum / limitNum );
			}
		}

		out.documents = out.documents;
	}

	return out;
}


function _startAt(num, documents){
	if(utilities.isNumber(num) && Array.isArray(documents)){
    num = parseInt(num, 10);
    if(num < documents.length+1){
      return documents.slice(num);
    }else{
      return [];
    }
	}else{
		return [];
	}
}



function _limit(num, documents){
	if(utilities.isNumber(num) && Array.isArray(documents)){
		num = parseInt(num, 10);
		return documents.slice(0, num);
	}else{
		return [];
	}
}


function _size(documents){
	if(Array.isArray(documents)){
		return documents.length;
	}else{
		return 0;
	}
}


function _sort(options, documents){
	if(options && Array.isArray(documents)){
		//console.log(documents, options.path, options.reverse)
		return sortObjectsByProperty(documents, options.path, options.reverse);
	}else{
		return [];
	}
}


function sortObjectsByProperty(arr, field, reverse, primer) {
    return arr.sort(sortObjects(field, reverse, primer));
};


// Object sort
function sortObjects(field, reverse, primer) {
    reverse = (reverse === true) ? -1 : 1;
    return function (a, b) {
        a = utilities.reach(a,field);
        b = utilities.reach(b,field);
        if(utilities.isDate(a)){
        	a = a.getTime();
        }
        if(utilities.isDate(b)){
        	b = b.getTime();
        }
        //console.log(a,b)
        if (primer !== undefined && a !== undefined && b !== undefined) {
            a = primer(a);
            b = primer(b);
        }
        if (a < b) return reverse * -1;
        if (a > b) return reverse * 1;
        return 0;
    }
};

exports.page = page;
exports._startAt = _startAt;
exports._limit = _limit;
exports._size = _size;
exports._sort = _sort;


/*
http://docs.mongodb.org/manual/reference/method/cursor.skip/
http://docs.mongodb.org/manual/reference/method/cursor.limit/
http://docs.mongodb.org/manual/reference/method/cursor.size/
*/
