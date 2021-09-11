/**
 * This example is not from GoF. I consider it to be more simple and descriptive.
 */

const ArmyUnit = function() {
    this.health = 100

    this.GetHealth = function () { return this.health }
    this.SetHealth = function (health) { this.health = health }

    this.accept = function(visitor) {
        console.log('[Unit] Requesting Visit...')
        visitor.visit(this)
    }
}

/**
 * Visitor
 */
const HealthBooster = function () {
    this.visit = function (unit) {
        console.log('[HealthBooster]: Visiting Unit!')
        unit.SetHealth(unit.GetHealth() * 1.2)
    }
}

function demoClient() {
    const myUnit = new ArmyUnit()
    const healthBooster = new HealthBooster()

    console.log('Original health:', myUnit.GetHealth())
    healthBooster.visit(myUnit)
    console.log('Updated health:', myUnit.GetHealth())
    myUnit.accept(healthBooster)
    console.log('Re-Updated health:', myUnit.GetHealth())
}

demoClient()
