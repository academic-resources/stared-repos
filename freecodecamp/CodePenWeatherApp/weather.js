$(document).ready(function(){
  var lat;
  var long;
  var fTemp;
  var cTemp;
  var img;
  $.getJSON('http://ip-api.com/json', function(data){
    lat = data.lat;
    long = data.lon;
    // call open weather API passing in Geolocation
      var api = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=40fb85a3b3caf562d1352ebe0fe0940d';
      
      
      $.getJSON(api, function(data){
        // pulling weather data from JSON
        img = data.weather[0].icon;
        var weatherType = data.weather[0].description;
        var kTemp = data.main.temp;
        // conversion to Celsius
        cTemp = (kTemp-273).toFixed(1);
        var tempSwap = true;
        var windSpeed = data.wind.speed;
        
        var city = data.name;
        // converting to Fahrenheit
        fTemp = ((9/5)*kTemp-459.67).toFixed(1);
        // displaying pulled values
        //console.log(weatherType);
        //console.log(kTemp);
        //console.log(windSpeed);
        //console.log(city);
        var icon = 'http://openweathermap.org/img/w/'+img+'.png';
        $("#city").html(city);
        $("#temp").html(fTemp + " &#8457;");
        $("#temp").click(function(){
          if(tempSwap){
            $("#temp").html(cTemp + " &#8451;");
            tempSwap=false;
          }
          else {
            $("#temp").html(fTemp + "&#8457;");
            tempSwap=true;
          }
        });
        $("#weatherType").html(weatherType);
        windSpeed = (2.237*windSpeed).toFixed(1);
        $("#wind").html("Windspeed: " +windSpeed+" mph");
        //$("#icon").html(icon);
        $("#weatherType").append("<img id='theImg'src="+icon+">");
        console.log(api);
      });
      
      //$("#data").html("latitude: " + lat + "<br>longitude: " + long);
  });
   
      
    });
  
