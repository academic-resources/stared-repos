import React from 'react';

export default class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.state = {weather: null};
    this.getWeather = this.getWeather.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getWeather);
  }

  getWeather(location) {
    const key = 'e7b7e98ad79c3f3ae1035bd72554baf3';
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=imperial&APPID=${key}`;
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.status === 200 && req.readyState === XMLHttpRequest.DONE) {
        this.setState({weather: JSON.parse(req.responseText)});
      }
    };
    req.open('GET', url, true);
    req.send();
  }

  render() {
    let weather;
    if (this.state.weather) {
      weather = <div className='weather'>
                  <p>{this.state.weather.name}</p>
                  <p>{this.state.weather.main.temp} degrees</p>
                </div>
    } else {
      weather = <div className='loading'>***Fetching Weather***</div>
    }

    return (
      <div className='weather-container'>
        <h1>Weather</h1>
        {weather}
      </div>
    )
  }
}