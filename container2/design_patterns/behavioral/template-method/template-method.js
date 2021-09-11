/**
 * This example uses prototypal inheritance insted of classic class-inheritance!
 */

const log = (function () {
    let log = ''

    return {
        add: function(msg) { log += msg + '\n' },
        show: function() { console.log(log); log = '' }
    }
})()

const datastore = {
    /* TEMPLATE METHOD */
    process: function() {
        this.connect()
        this.select()
        this.disconnect()
        return true
    }
}

function inherit(proto) {
    const F = function() {}
    F.prototype = proto
    return new F()
}

function demoClient() {
    const postgres = inherit(datastore)

    // Implement template steps
    postgres.connect = function() { log.add('Postgres: connect') }
    postgres.select = function() { log.add('Postgres: select') }
    postgres.disconnect = function() { log.add('Postgres: disconnect') }
    postgres.process()

    log.show()
}

demoClient()
