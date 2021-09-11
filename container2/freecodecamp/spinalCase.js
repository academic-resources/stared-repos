function spinalCase(str) {
      // "It's such a fine line between stupid, and clever."
      // --David St. Hubbins
      var blank = / /g;
      var under = /_/g;
      var upper = /[A-Z]/g;

      if (str.match(blank) || str.match(under)) {
        str = str.replace(blank, '-').replace(under, '-').toLowerCase();
      } else {
        var strArr = str.split('');
        var strArrMatch = str.match(upper); //[T, I]
        for (var i = 0; i < strArrMatch.length; i++) {
          strArr[str.indexOf(strArrMatch[i])] = '-' + str[str.indexOf(strArrMatch[i])].toLowerCase();
        }
        str = strArr.join('');

      }

      return str;
    }

spinalCase('thisIsSpinalTap');
   
 

