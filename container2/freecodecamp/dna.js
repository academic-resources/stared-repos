function pair(str) {
	// [G, C, G]
  var arr = str.split('');
  var dnaPair = "";
  var arrLen = arr.length;

  for (var x=0; x < arrLen; x++) {
  console.log(arrLen);
  	// dna = G
    // arr = [C, G]
    var newArr = [];
  	var dna = arr.shift();
    newArr.push(dna);
    if (dna === 'G') {
      dnaPair = 'C';
    } else if (dna === 'C') {
      dnaPair = 'G';
    } else if (dna === 'T') {
      dnaPair = 'A';
    } else {
      dnaPair = 'T';
    }
    // newArr = ['G', 'C']
    newArr.push(dnaPair);
    arr.push(newArr);
  }
  
  str = arr.join();
  return arr;
}

pair("GCG");