function translate(str) {
	var consonantCount = 0;
	if (str[0] === 'a' || str[0] === 'e' || str[0] === 'i' || str[0] === 'o' || str[0] === 'u')
  {
  	str += 'way';
  } else {
  	for (var i = 0; i <str.length; i++)
    {
    	if (str[i] === 'a' || str[i] === 'e' || str[i] === 'i' || str[i] === 'o' || str[i] === 'u')
      {
      	break;
      }
      else consonantCount++;
    }
  	str = str.substr(consonantCount, str.length-1) + str.substr(0, consonantCount) + 'ay';
  }
  return str;
}

translate("consonant");
