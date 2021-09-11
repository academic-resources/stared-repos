var screenInfo = document.getElementById('screen-info');
var infoText = document.createElement('h3');

var text = '<strong>Screen Width:&nbsp&nbsp&nbsp&nbsp</strong>';
text += screen.width;
text += '<br>';
text += '<strong>Screen Height:&nbsp&nbsp&nbsp&nbsp</strong>';
text += screen.height;
text += '<br>';
text += '<strong>Screen-Available Width:&nbsp&nbsp&nbsp&nbsp</strong>';
text += screen.availWidth;
text += '<br>';
text += '<strong>Screen-Available Height:&nbsp&nbsp&nbsp&nbsp</strong>';
text += screen.availHeight;
text += '<br>';
text += '<strong>Color-Depth:&nbsp&nbsp&nbsp&nbsp</strong>';
text += screen.colorDepth;
text += '<br>';
text += '<strong>Pixel-Depth:&nbsp&nbsp&nbsp&nbsp</strong>';
text += screen.pixelDepth;
text += '<br>';

infoText.innerHTML = text;
screenInfo.appendChild(infoText);