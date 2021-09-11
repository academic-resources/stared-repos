import React from 'react'


class Weather extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            temp: '...',
            city: 'loading'
        }
        this.callAjax = this.callAjax.bind(this)
        this.convertToF = this.convertToF.bind(this)
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition( (position) => {
          console.log(position)  
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          this.callAjax( (data) => {
            data = JSON.parse(data).list[0]
            const temp = this.convertToF(data.main.temp)
            const city = data.name
            this.setState({
                temp,
                city
            })
          }, lat, lon)
        
        }, 
        (e) => {debugger}
        )
      }

    
    callAjax(callback, lat, lon) {
        const url = `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=1&APPID=87a2d23329a32a80a0b43962343a03f3`
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                callback(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    convertToF(tempK) {
        let raw_num = (tempK * 9 / 5) - 459.67
        return (Math.floor(raw_num * 10) / 10) + ' degrees'
    }

    render () {
      return (
        <div className="weather">
              <h1>Weather</h1>
              <div className="weather-container">
                <div>{this.state.city}</div>
                <div>{this.state.temp}</div>
              </div>
        </div>
      )
    }
}


export default Weather

