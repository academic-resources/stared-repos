class Clock {
  constructor(rootEl) {}

  currentTime() {
    const date = new Date()
    const hours = this.padNums(this.convertFromMilitary(date.getHours()))
    const mins = this.padNums(date.getMinutes())
    const secs = this.padNums(date.getSeconds())
    return `${hours}:${mins}:${secs} ${this.timeOfDay}`
  }

  padNums(number) {
    if (number > 9) return '' + number
    else return '0' + number
  }

  convertFromMilitary(number) {
    if (number > 12) {
      this.timeOfDay = 'P.M.'
    } else {
      this.timeOfDay = 'A.M.'
    }
    return number % 12
  }
}

export default Clock