/**
 * Builder Director
 */
class RTFReader {
    _builder = undefined

    setBuilder = function(builder) {
        this._builder = builder
    }

    parseRTF = function(body) {
        for (const token of body) {
            if (token === "CHAR") this._builder.ConvertCharacter(token)
            if (token === "FONT") this._builder.ConvertFont(token)
            if (token === "PARA") this._builder.ConvertParagraph()
        }
    }
}

/**
 * Builder Interface
 */
class TextConverter {
    ConvertCharacter = function() {}
    convertFont = function() {}
    ConvertParagraph = function() {}
}

/**
 * ASCII Concrete Builder
 */
class ASCIIConverter {
    ConvertCharacter = function() { console.log("ASCII Character") }
    ConvertFont = function() { console.log("ASCII Font") }
    ConvertParagraph = function() { console.log("ASCII Paragraph") }
}

/**
 * TeX Concrete Builder
 */
class TeXConverter {
    ConvertCharacter = function() { console.log("TeX Character") }
    ConvertFont = function() { console.log("TeX Font") }
    ConvertParagraph = function() { console.log("TeX Paragraph") }
}

/**
 * Example Code
 */
function demoClient() {
    demoTokens = ["CHAR", "FONT", "PARA"]

    rtfReader = new RTFReader() // Instance a Director
    asciiConverter = new ASCIIConverter() // Instance a ConcreteBuilder
    texConverter = new TeXConverter() // Instanca a difference ConcreteBuilder

    rtfReader.setBuilder(asciiConverter)
    asciiText = rtfReader.parseRTF(demoTokens)

    rtfReader.setBuilder(texConverter)
    texText = rtfReader.parseRTF(demoTokens)
}

demoClient()
