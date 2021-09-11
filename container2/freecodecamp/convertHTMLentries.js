function convert(str) {
  // &colon;&rpar;
  str = str.replace(/&/g, '&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;');
  return str;
}

convert("Dolce & Gabbana");