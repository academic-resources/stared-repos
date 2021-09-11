/**
 * Colleagues
*/
const Participant = function(name) {
    this.name = name
    this.chatroom = undefined
    this.log = undefined
}

Participant.prototype = {
    send: function(message, to) { this.chatroom.send(message, this, to) },
    receive: function(message, from) { this.log.add(`${from.name} to ${this.name}: ${message}`) }
}

const myLogger = (function() {
    let log = ''
    return {
        add: function(msg) { log += msg + '\n' },
        show: function() { console.log(log); log = '' }
    }
})()

/**
 * Mediator
 */
const Chatroom = function() {
    const participants = {}

    return {
        register: function(participant) {
            participants[participant.name] = participant
            participant.chatroom = this
            participant.log = myLogger
            return this
        },
        send: function(message, from, to) {
            if (to) {
                to.receive(message, from)
            }
            else {
                for (key in participants) {
                    if (participants[key] !== from) {
                        participants[key].receive(message, from)
                    }
                }
            }
        }
    }
}

function demoClient() {
    const nacho = new Participant("Nacho")
    const pipo = new Participant("Pipo")
    const nina = new Participant("Nina")
    
    const chatroom = new Chatroom()
    chatroom.register(nacho).register(pipo).register(nina)

    nacho.send('Please guys, behave.')
    pipo.send('Wuau!', nacho)
    nina.send('*bites a shoe*')
    
    myLogger.show()
}

demoClient()
