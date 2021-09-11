/**
 * Abstraction
 */
class Window {
    constructor(imp) {
        this._imp = imp
    }

    DrawText() {}
    DrawRect() {
        for (let i = 0; i < 4; i++) this._imp.DevDrawLine()
    }    
}

/**
 * RefinedAbstraction
 */
class IconWindow extends Window {
    constructor(imp) {
        super(imp)
    }

    DrawText() { console.log('[IconWindow] drawing Text') }

    DrawBorder() {
        console.log('[IconWindow] drawing Border')
        this.DrawRect()
        this.DrawText()
    }
}

/**
 * Implementor - defines implementation interface
 */
class WindowImp {
    DevDrawText() {}
    DevDrawLine() {}
}

/**
 * ConcreteImplementor
 */
class XWindowImp extends WindowImp {
    DevDrawText() { console.log('[XWindow] drawing Text') }
    DevDrawLine() { console.log('[XWindow] drawing Line') }
}

/**
 * ConcreteImplementor 2
 */
class PMWindowImp extends WindowImp {
    DevDrawText() { console.log('[PM] drawing Text') }
    DevDrawLine() { console.log('[PM] drawing Line') }
}

function demoClient() {
    const xWindow = new XWindowImp()
    const PMWindow = new PMWindowImp()

    const iconWinX = new IconWindow(xWindow)
    iconWinX.DrawBorder()

    const iconWinPM = new IconWindow(PMWindow)
    iconWinPM.DrawBorder()
}

demoClient()
