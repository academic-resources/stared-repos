class WidgetFactory {
    // Abstract class
    createScrollBar = function() {}
    createWindow = function() {}
}

class MotiWidgetFactory extends WidgetFactory {
    createScrollBar = function() {
        return new MotiScrollBar()
    }
    createWindow = function() {
        return new MotiWindow()
    }
}

class PMWidgetFactory extends WidgetFactory {
    createScrollBar = function() {
        return new PMScrollBar()
    }
    createWindow = function() {
        return new PMWindow()
    }
}

class Window {
    // Abstract Class
    whoami() { console.log('I am a Windows') }
}

class MotiWindow extends Window {
    whoami() { console.log('I am a Moti Window') }
}

class PMWindow extends Window {
    whoami() { console.log('I am a PM Window') }
}

class ScrollBar {
    // Abstract Class
    whoami() { console.log('I am a ScrollBar') }
}

class MotiScrollBar extends ScrollBar {
    whoami() { console.log('I am a Moti ScrollBar') }
}

class PMScrollBar extends ScrollBar {
    whoami() { console.log('I am a PM ScrollBar') }
}

/**
 * Example code:
 * Client code works only with products through abstract types, created by factories.
 * This pattern lets you pass any factory or product subclass to the client code, at runtime, without breaking it.
 */

function clientCode(factory) {
    let myWindow = factory.createWindow()
    let myScrollBar = factory.createScrollBar()

    myWindow.whoami()
    myScrollBar.whoami()
}

clientCode(new MotiWidgetFactory())
clientCode(new PMWidgetFactory())
