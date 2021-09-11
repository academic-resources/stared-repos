class Singleton {
    _instance = undefined

    getInstance() {
        if (Singleton._instance) { return Singleton._instance }
        return new Singleton()
    }

    constructor() {
        // We could throw an error if we wanted to make it explicit
        if (Singleton._instance) return Singleton._instance;
        Singleton._instance = this;
    }
}

function clientDemo() {
    console.log('Creating Singleton instance...')
    const unique = new Singleton()
    
    console.log('Trying to create another Singleton instance...')
    const amIUnique = new Singleton()

    console.log('Are they the same instance?', unique === amIUnique)
}

clientDemo()
