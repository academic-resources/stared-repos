import React from 'react';

export default class Clock extends React.Component {

  constructor(props) {
    super(props);

    this.state = {time: new Date()};
    this.tick = this.tick.bind(this);
    this.timeString = this.timeString.bind(this);
  }

  componentDidMount() {
    this.intervalID = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    return (
      <div className='clock-container'>
        <h1>Clock</h1>
        <div className='clock'>
          <div className='clock-time'>
            <p>Time:</p>
            <p>{this.timeString(this.state.time)}</p>
          </div>
          <div className='clock-date'>
            <p>Date:</p>
            <p>{this.state.time.toDateString()}</p>
          </div>
        </div>
      </div>
    );
  }

  tick() {
    this.setState({time : new Date()});
  }

  timeString(time) {
    let formatted = '';
    if (time.getHours() < 10) formatted += '0';
    formatted += `${time.getHours()}:`;
    if (time.getMinutes() < 10) formatted += '0';
    formatted += `${time.getMinutes()}:`;
    if (time.getSeconds() < 10) formatted += '0';
    formatted += `${time.getSeconds()} EDT`;
    return formatted;
  }
}