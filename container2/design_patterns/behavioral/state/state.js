/**
 * In Our example the State object determines the transition to the next state, and changes the current state.
 */

const log = (function () {
    let log = ''
    return {
        add: function (msg) { log += msg + '\n' },
        show: function () { console.log(log); log = '' }
    }
})()

/**
 * ConcreteState (State abstract is implicit):
 * + defines an interface for encapsulating the behavior associated with a particular state of the Context.
 * + Each subclass implements a behavior associated with a state of the Context.
 */
const Red = function (light) {
    this.light = light
    this.go = function () {
        log.add('Red -> for 1 minute')
        light.change(new Green(light))
    }
}

const Yellow = function (light) {
    this.light = light
    this.go = function () {
        log.add('Yellow -> for 1 minute')
        light.change(new Red(light))
    }
}

const Green = function (light) {
    this.light = light
    this.go = function () {
        log.add('Green -> for 1 minute')
        light.change(new Yellow(light))
    }
}

/**
 * Context:
 * + defines the interface of interest to clients.
 * + maintains an instance of a ConcreteState subclass that defines the current state.
 */
const TrafficLight = function () {
    let count = 0
    let currentState = new Red(this)

    this.change = function (state) {
        // limit the number of state changes for testing
        if (count++ >= 10) return
        currentState = state
        currentState.go()
    }

    this.start = function () {
        currentState.go()
    }
}

function demoClient () {
    const light = new TrafficLight()
    light.start()
    log.show()
}

demoClient()
