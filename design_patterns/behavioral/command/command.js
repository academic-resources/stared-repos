/**
 * This example is not from GoF:
 * Simulates an Attack Command from a RPG combat-based game
 */


/**
 * Command:
 * Declares an interface for executing an operation.
 */
class Command {
    constructor(cost) {
        this.cost = cost
    }

    Execute() {}
}

/**
 * ConcreteCommand:
 * Defines a binding between a Receiver object and an action.
 * Implements Execute by invoking the corresponding operation(s) on Receiver.
 */
class AttackCommand extends Command {
    receiver = undefined

    constructor(cost, dmg) {
        super(cost)
        this.damage = dmg
    }

    SetReceiver(receiver) { this.receiver = receiver }

    Execute() { this.receiver.Attack(this.cost, this.damage) }
}

/**
 * Receiver:
 * Knows how to perform the operations associated with carrying out a request.
 * Any class may serve as a Receiver.
 */
class Creature {
    constructor(name) {
        this.name = name
    }

    Attack() {}
}

class Mooncake extends Creature {
    constructor(name) {
        super(name)
        this.energy = 100
    }   

    Attack(cost, dmg) {
        if (this.energy >= cost) {
            console.log(`[Mooncake - ${this.name}] Attacking pium pium (${dmg} damage for ${cost} energy)!'`)
            this.energy -= cost
        } else {
            console.log(`[Mooncake - ${this.name}] has no more energy`)
        }
    }
}


/**
 * Example Client code:
 * Creates a ConcreteCommand object and sets its Receiver
 */
function demoClient() {
    const mooncake = new Mooncake('Chukitpap')
    const basicAttack = new AttackCommand(35, 50)

    basicAttack.SetReceiver(mooncake)
    basicAttack.Execute()
    basicAttack.Execute()
    basicAttack.Execute()

}

demoClient()
