const Person = function(name, street, city, state) {
    this.name = name
    this.street = street
    this.city = city
    this.state = state
}

Person.prototype = {
    hydrate: function() {
        //memento
        return JSON.stringify(this)
    },
    dehydrate: function(memento) {
        const m = JSON.parse(memento)
        this.name = m.name
        this.street = m.street
        this.city = m.city
        this.state = m.state
    }
}

const CareTaker = function() {
    this.mementos = {}
    
    this.add = function(key, memento) { this.mementos[key] = memento }

    this.get = function(key) { return this.mementos[key] }
}

const log = (function() {
    let log = ''
    return {
        add: function (msg) { log+= msg + '\n' },
        show: function () { console.log(log); log = '' }
    }
})()


function demoClient() {
    const nacho = new Person('Nacho Herrera', '1117 Test', 'Buenos Aires', 'BA')
    const roman = new Person('Roman Herrera', '2345 Another', 'Buenos Aires', 'BA')
    const caretaker = new CareTaker()

    log.add('-- Original state --')
    log.add(nacho.name)
    log.add(roman.name)

    // save state
    caretaker.add(1, nacho.hydrate())
    caretaker.add(2, roman.hydrate())

    nacho.name = 'Ignacio'
    roman.name = 'HollyMolly'
    log.add('-- Changed state --')
    log.add(nacho.name)
    log.add(roman.name)

    // restore original state
    nacho.dehydrate(caretaker.get(1))
    roman.dehydrate(caretaker.get(2))

    log.add('-- State restored --')
    log.add(nacho.name)
    log.add(roman.name)
    log.show()
}

demoClient()
