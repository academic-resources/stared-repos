// add space with &nbsp

var windowInfo = document.getElementById('window-info');
var infoText = document.createElement('h3');

var text = '<strong>Inner-Width:&nbsp&nbsp&nbsp&nbsp</strong>';
// the or statments are to support different browser types 
text += window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
text += '<br>';
text += '<strong>Inner-Height:&nbsp&nbsp&nbsp&nbsp</strong>';
text += window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; 
text += '<br>';

infoText.innerHTML = text;
windowInfo.appendChild(infoText);