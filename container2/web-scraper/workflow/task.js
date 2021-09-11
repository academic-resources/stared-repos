class Task {
    constructor(input, callback, retries) {
        this.input = input;
        this.callback = callback;
        this.retries = retries;
    }

    /**
     * Returns an instance of this class
     * @param input
     * @param callback
     * @param retries
     */
    static Build (input, callback, retries) {
        return new Task(input, callback, retries);
    }

    /**
     * Returns the input of the Task
     */
    getInput() {
        return this.input;
    }

    /**
     * Returns the callback of the Task
     */
    getCallback() {
        return this.callback;
    }

    /**
     * Returns the retries of the Task
     */
    getRetries() {
        return this.retries;
    }
};

module.exports = Task;