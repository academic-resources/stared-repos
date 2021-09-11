class Timer {
    constructor(timeout) {
        this.running = false;

        this.timeout = timeout;
    }

    /**
     * Returns an instance of the Timer class
     * @param timeout
     * @return Timer
     */
    static Build(timeout) {
        return new Timer(timeout);
    }

    /**
     * Toggles the value of running
     */
    toggleRunning() {
        this.running = !this.running;
    }

    /**
     * Starts the timer
     */
    start() {
        this.startTime = Date.now();

        this.toggleRunning();

        console.log(`Starting the timer at ${this.startTime}`);
    }

    /**
     * Returns whether the crawler should timeout
     * @return bool
     */
    shouldTimeout() {
        var now = Date.now();

        return (now - this.startTime) >= this.timeout;
    }

    /**
     * Ends the timer
     */
    end() {
        this.endTime = Date.now();

        this.toggleRunning();

        console.log(`The timer started at ${this.startTime} and ended at ${this.endTime}`);
    }
};

module.exports = Timer;