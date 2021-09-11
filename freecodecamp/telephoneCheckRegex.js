function telephoneCheck(str) {
  // Checks the validity of a US phone number
  var expression = /^(1?\s?)\s?(\s?)(\([0-9]{3}\)|[0-9]{3})(\s?\-?)\s?([0-9]{3})(\s?|-?)([0-9]{4})$/; 
  
  return expression.test(str) ;
}

telephoneCheck("555-555-5555");