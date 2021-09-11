/**
 * Component
 */
class Graphic {
    graphics = []

    Draw() {}
    Add(graphic) { 
        this.graphics.push(graphic)
        return this;
    }
}

/**
 * Leaf
 */
class Line { Draw() { console.log('Line drawn') } }

/**
 * Leaf
 */
class Rectangle { Draw() { console.log('Reactangle drawn') } }

/**
 * Leaf
 */
class Text { Draw() { console.log('Text drawn') } }

/**
 * Composite
 */
class Picture extends Graphic {
    Draw() {
        for (const g of this.graphics) g.Draw()
    }
}

function demoClient() {
    const myPic = new Picture()
    debugger;
    const line = new Line()
    const rect = new Rectangle()
    const text = new Text()

    myPic.Add(line).Add(rect).Add(text)
    myPic.Draw()
}

demoClient()
