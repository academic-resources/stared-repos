// add space with &nbsp

var locationInfo = document.getElementById('location-info');
var infoText = document.createElement('h3');

var text = '<strong>HREF:&nbsp&nbsp&nbsp&nbsp</strong>';
text += window.location.href;
text += '<br>';
text += '<strong>Host Name:&nbsp&nbsp&nbsp&nbsp</strong>';
text += window.location.hostname;
text += '<br>';
text += '<strong>Path Name:&nbsp&nbsp&nbsp&nbsp</strong>';
text += window.location.pathname; 
text += '<br>';
text += '<strong>Protocol:&nbsp&nbsp&nbsp&nbsp</strong>';
text += window.location.protocol;

infoText.innerHTML = text;
locationInfo.appendChild(infoText);
