// add space with &nbsp

var navigatorInfo = document.getElementById('navigator-info');
var infoText = document.createElement('h3');

var text = '<strong>Browser/App Name:&nbsp&nbsp&nbsp&nbsp</strong>';
text += navigator.appName;
text += '<br>';
text += '<strong>Browser/App Version:&nbsp&nbsp&nbsp&nbsp</strong>';
text += navigator.appVersion;
text += '<br>';
text += '<strong>Product:&nbsp&nbsp&nbsp&nbsp</strong>';
text += navigator.product;
text += '<br>';
text += '<strong>User-Agent:&nbsp&nbsp&nbsp&nbsp</strong>';
text += navigator.userAgent;
text += '<br>';
text += '<strong>Language:&nbsp&nbsp&nbsp&nbsp</strong>';
text += navigator.language;

infoText.innerHTML = text;
navigatorInfo.appendChild(infoText);