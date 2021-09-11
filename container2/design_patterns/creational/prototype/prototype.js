/**
 * Client - Interface
 */
class Tool {
    drawing = []
    manipulate = function() {}
}

/**
 * Client - Implementation
 */
class GraphicTool extends Tool {
    constructor(graphicPrototype) {
        super()
        console.log('Creating Graphical Tool');
        this._graphic = graphicPrototype;
    }

    get graphic() { return this._graphic }
    set graphic(graphicPrototype) { this._graphic = graphicPrototype }

    manipulate = function() {
        console.log("GraphicTool is drawing...")
        const g = this.graphic.clone()
        g.draw(this.drawing.length + 1)
        this.drawing.push(g)
    }
}

/**
 * Prototype interface
 */
class Graphic {
    draw = function() {}
    clone = function() {}
}

/**
 * Prototypal Instance
 */
class Staff extends Graphic {
    constructor(color = "grey") {  
        super()
        this.color = color;
    }

    draw = function(position) {
        console.log(`Drawing a ${this.color} Staff at position ${position}`)
    }

    clone = function() {
        return new Staff(this.color)
    }
}

/**
 * Another Prototypal Instance
 */
class MusicalNote extends Graphic {
    constructor(color = "black", duration = 1.0) {
        super()
        this.color = color;
        this.duration = duration;
    }

    draw = function(position) {
        console.log(`Drawing a ${this.color} MusicalNote with ${this.duration} duration at position ${position}`)
    }

    clone = function() {
        return new MusicalNote(this.color, this.duration)
    }
}

/**
 * EXAMPLE CODE
 */
function demoClient() {
    const client = new GraphicTool()
    const whole_note = new MusicalNote()
    const half_note = new MusicalNote(duration=0.5)
    const staff = new Staff()

   client.graphic = whole_note
   client.manipulate()

   client.graphic.color = 'red'
   client.manipulate()

   client.graphic = staff
   client.manipulate()

   client.graphic = half_note
   client.manipulate()
}

demoClient()
