// add space with &nbsp


var geoInfo = document.getElementById('geolocation-info');
var infoText = document.createElement('h3');

function getGeolocation() {
  if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(showPosition);

}

function showPosition(position) {
  var text = '<strong>Longitude:&nbsp&nbsp&nbsp&nbsp</strong>';
  text += position.coords.longitude;
  text += '<br>';
  text += '<strong>Latitude:&nbsp&nbsp&nbsp&nbsp</strong>';
  text += position.coords.latitude + '<br>';
  
  
  
  infoText.innerHTML = text;
  geoInfo.appendChild(infoText);
}