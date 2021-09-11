class Clock {
  constructor() {

    const now = new Date();
    const dayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0, 0, 0)
    this.time = (now.getTime() - dayStart.getTime()) / 1000;

    this.calculateTimeParts();
    this.printTime();
    this._tick();
    // this.calculateTimeParts = this.calculateTimeParts.bind(this)
    // this.printTime = this.printTime.bind(this)
    // this.updateAndPrint = this.updateAndPrint.bind(this)
    // 1. Create a Date object.
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals.  
  }

  calculateTimeParts() {
    this.hours = Math.floor(this.time / 3600);
    this.minutes = Math.floor((this.time - this.hours * 3600) / 60);
    this.seconds = Math.floor(this.time % 60);
  }

  printTime() {
    console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
    // Format the time in HH:MM:SS
    // Use console.log to print it.
  }

  updateAndPrint() {
      this.time += 1;
      this.calculateTimeParts();
      this.printTime();
    }
    
    _tick() {
    setInterval(this.updateAndPrint.bind(this), 1000)
    // 1. Increment the time by one second.
    // 2. Call printTime.
  }
}

const clock = new Clock();


