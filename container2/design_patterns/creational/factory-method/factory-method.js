/**
 * Creator - Interface
 */
class Application {
    _documents = []

    /**
     * Factory Method
     */
    createDocument = function() {
        return new Document()
    }
    
    newDocument = function() {
        this._documents.push(this.createDocument())
        console.log("Saved new document")
    }

    openDocument = function() {}
}

/**
 * Product - Interface
 */
class Document {
    open = function() {}
    close = function() {}
    save = function() {}
    revert = function() {}
}

/**
 * ConcreteCreator
 */
class MyApplication extends Application {
    /**
     * Factory Method for application's specific product
     */
    createDocument = function() {
        return new MyDocument()
    }
}

/**
 * ConcreteProduct
 */
class MyDocument extends Document {
    open = function() { console.log("Opened MyApplication Specific Document") }
}

/**
 * EXAMPLE CODE
 */
function demo() {
    const myCreator = new MyApplication()
    myCreator.newDocument()
    myCreator._documents[0].open()
}

demo()
