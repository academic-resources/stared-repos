import React, {Component} from 'react'

class Clock extends Component {

    constructor(props) {
        super(props)
        this.state = {time: new Date()}
        this.tick = this.tick.bind(this)
        this.paddedString = this.paddedString.bind(this)
        this.dayOfWeek = this.dayOfWeek.bind(this)
        this.monthOfYear = this.monthOfYear.bind(this)
    }

    componentDidMount() {
        this.interval = setInterval( this.tick, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    tick() {
        this.setState( {time: new Date()})
    }

    render() {
        const hrs = this.state.time.getHours() 
        const mins = this.state.time.getMinutes() 
        const secs = this.state.time.getSeconds()
        const day = this.state.time.getDay()
        const month = this.state.time.getMonth()
        const year = this.state.time.getFullYear()
        const date = this.state.time.getDate()
        const displayDate = `${this.dayOfWeek(day)}, ${this.monthOfYear(month)} ${date} ${year}`

        return (
            <div className="clock">
                <h1>Clock</h1>
                <div className="clock-container">
                    <div className="time">
                        <div>Time</div>
                        <div>{this.paddedString(hrs)}:{this.paddedString(mins)}:{this.paddedString(secs)}</div>
                    </div>
                    <div className="date">
                        <div>Date</div>
                        <div>{displayDate}</div>
                    </div>
                </div>
                
                
            </div>

        )
    }

    dayOfWeek (num) {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return daysOfWeek[num]
    }

    monthOfYear(num) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return months[num]
    }

    paddedString(num) {
        if (num < 10) return '0' + num
        return '' + num
    }
}



export default Clock