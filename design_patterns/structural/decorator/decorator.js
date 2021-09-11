/**
 * Component:
 * defines the interface for objects that can have responsibilities added to them dynamically
 */
class VisualComponent {
    Draw() {}
}

/**
 * ConcreteComponent:
 * defines an object to which additional responsibilities can be attached
 */
class TextView extends VisualComponent {
    Draw() { console.log('[TextView] Drawing') }
}


/**
 * Decorator:
 * Maintains a reference to a Component object and defines an interface that conforms to Component's interface.
 */
class Decorator extends VisualComponent {
    constructor(component) {
        super()
        this._component = component
    }

    Draw() { this._component.Draw() }
}

/**
 * ConcreteDecorator:
 * Add responsibilities to the component.
 */
class BorderDecorator extends Decorator {
    constructor(component, borderWidth) {
        super(component)
        this.borderWidth = borderWidth
    }

    DrawBorder() { console.log(`[BorderDecorator] Drawing ${this.borderWidth}px border`) }
}

function demoClient() {
    const component = new TextView()
    const borderWrapper = new BorderDecorator(component, 2)
    borderWrapper.Draw()
    borderWrapper.DrawBorder()
}

demoClient()
