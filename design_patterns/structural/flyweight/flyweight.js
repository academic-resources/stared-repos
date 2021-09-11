/**
 * Flyweight:
 * declares an interface through which flyweights can receive and act on extrinsic state
 */
class Glyph {
    Draw() {}
}

/**
 * Concrete Flyweight:
 * implements the Flyweight interface and adds storage for instrisinc state, if any. A Concrete Flyweight
 * must be sharable. Any state it stores must be intrinsic, that is, it must be independent of the
 * ConcreteFlyweight object's context.
 */
class Character {
    constructor(char) {
        this.char = char
    }

    Draw(context) {
        console.log(`Drawing ${this.char} in given context`)
        return context.push(this);
    }

    View() { console.log(this.char) }
}

/**
 * Flyweight Factory:
 * creates and manages flyweight objects, ensuring flyweights are shared properly.
 * When the client requests a flyweight, it supplies an existing instance or creates one if none exists.
 */
class CharacterFactory {
    _characters = {}

    GetCharacter(char) {
        if (this._characters[char]) return this._characters[char];

        const flyweightChar = new Character(char)
        this._characters[char] = flyweightChar
        return flyweightChar    
    }
}

/**
 * UnsharedConcreteFlyweight (not implemented):
 * not all Flyweight subclasses need to be shared. The Flyweight interface ENABLES sharing but it doesn't enforce it.
 * It's common for UnsharedConcreteFlyweight objects to have ConcreteFlyweight objects as children at some level in the
 * lfyweight object structure.
 */

function demoClient() {
    const charFactory = new CharacterFactory();
    const char_h = charFactory.GetCharacter('h');
    const char_i = charFactory.GetCharacter('i');
    const demoContext = []

    char_h.Draw(demoContext)
    char_i.Draw(demoContext)

    for (const charObj of demoContext) charObj.View()

    console.log('Trying to create a new h character...')
    char_h_clone = charFactory.GetCharacter('h');
    console.log('Is the flyweight object shared?', char_h === char_h_clone)
}

demoClient()
