import React from 'react';

class Weather extends React.Component {

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(pos) {
    var xmlhttp = new XMLHttpRequest();
    console.log(pos);
    xmlhttp.open("GET", `http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={7b8ddd009f73a79dd0de6fdfa101ac20}`)
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
        if (xmlhttp.status == 200) {
          document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
          console.dir(xmlhttp.response)
        }
        else if (xmlhttp.status == 400) {
          alert('There was an error 400');
        }
        else {
          alert('something else other than 200 was returned');
        }
      }
    }
  })
  }

  render() {
    return (<div></div>)
    
  }
}



export default Weather;

// $1.ajax = function (options) {
//   const defaults = {
//     success: new Function(),
//     error: new Function(),
//     url: window.location,
//     method: 'GET',
//     data: {},
//     contentType: 'json',
//   };
//   options = $1.extend(defaults, options);
//   const xhr = new XMLHttpRequest();
//   xhr.open(options.method, options.url);
//   xhr.onload = function () {
//     if (xhr.status === 200) {
//       options.success(JSON.parse(xhr.response));
//     } else {
//       options.error(JSON.parse(xhr.response));
//     }
//   };
//   xhr.send(options.data);
// };