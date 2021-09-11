/**
 * This example relies un object composition because Javascript does not support multiple inheritance out of the box,
 * and we would need to inherit the target's interface and adaptee's implementation. An alternative for this is create a
 * Mixin Class. But for the sake of simplicity, I'll use object composition.
 */

/**
 * Target Interface
 */
class Shape {
   boundingBox() {}
}

/**
 * Adapter Class
 */
class TextShape extends Shape {
    constructor(textView) {
        super()
        this._textView = textView
    }

    boundingBox() {
        console.log('Calling adaptee fromn Adapter (TextShape)')
        return this._textView.getExtent()
    }
}

/**
 * Adaptee Class
 */
class TextView {
    getExtent() {
        console.log('Adaptee (TextView) concrete method')
    }
}

function drawingEditor() {
    const adaptee = new TextView()
    const adapter = new TextShape(adaptee)
    return adapter.boundingBox()
}

drawingEditor()
