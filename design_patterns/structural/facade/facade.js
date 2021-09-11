/**
 * I'll keep this example shorter than example diagram for the sake of simplicity
 */

/**
 * Facade:
 * - knows which subsystem classes are responsible for a request
 * - delegates client requests to appropriate subsystem objects
 */
class Compiler {
    constructor() {
        this.scanner = new Scanner();
        this.parser = new Parser();
        this.nodeBuilder = new ProgramNodeBuilder();
    }

    Compile(rawData) {
        const { nodeBuilder, parser, scanner } = this;
        console.log('[Compiler]: Compilation starting... ')
        nodeBuilder.BuildNode((parser.Parse(scanner.Scan(rawData))));
        console.log('[Compiler] Done!')
    }
}

/**
 * Subsystem classes (Scanner, Parser, ProgramNode, etc)
 * - implement subsystem functionality
 * - handle work assigned by the Facade object
 * - have no knowledge of the facade (no references to it)
 */
class Scanner {
    Scan(rawData) {
        console.log(' + [Scanner] Scanning for symbols')
        return rawData.split(';');
    }
}

class Parser {
    Parse(data) {
        for (const d of data) {
            switch(d) {
                case 'SYM': { console.log(' + [Parser] decoding SYM'); break; }
                case 'TOK': { console.log(' + [Parser] decoding TOK'); break; }
            }
        }
        return '<Parsed_Data>'
    }
}

class ProgramNodeBuilder {
    BuildNode(parsedData) {
        console.log(' + [ProgramNodeBuilder] Building:', parsedData)
    }
}

/**
 * Example code
 */
function demoClient() {
    const rawText = 'TOK;SYM;TOK'
    const compiler = new Compiler()
    compiler.Compile(rawText)
}

demoClient()
