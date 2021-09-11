import React from 'react';


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: this.time };
    this.time = new Date();
    this.tick = this.tick.bind(this);
    this.interval = this.componentDidMount();
  }

  tick() {
    this.time = new Date();
    this.setState({ time: this.time });
  }

  componentDidMount() {
    let interval = setInterval(this.tick, 1000);
    return interval;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return (
      <div>
        <h1 className="clock">Time: {this.time.getHours()}:{this.time.getMinutes()}:{this.time.getSeconds()}</h1>
        <h1 className="date">Date: {dayNames[this.time.getDay()]} {monthNames[this.time.getMonth()]} {this.time.getDate()} {this.time.getFullYear()}</h1>
        <h1>{this.time.dateString}</h1>
      </div>
    );
  }

}

export default Clock;