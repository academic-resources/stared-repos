/**
 * This example is not from the GoF, I consider this to be more simply and descriptive.
*/

/**
 * Common Interface for handlers
 */
class RequestHandler {
    handle(req) {}
}

/**
 * Concrete Handler
 */
class HighLevelHandler extends RequestHandler {
    handle(req) {
        if (req === 'high-level')
        return { response: '[HighLevel-Handler] Processed your request' }
    }
}

/**
 * Concrete Handler 2
 */
class LowLevelHandler extends RequestHandler {
    handle(req) {
        if (req === 'low-level')
        return { response: '[LowLevel-Handler] Processed your request' }
    }
}

/**
 * Chain of Responsibility for Request handlers
 */
class HandlersPool {
    handlers = []

    AddHandler(requestHandler) { this.handlers.push(requestHandler) }

    ProcessRequest(request) {
        for (const h of this.handlers) {
            const res = h.handle(request)
            if (res) return res
        }
        return { response: '[Error] Unable to process your request' }
    }
}

/**
 * Example code
 */
function demoClient() {
    const hreq = 'high-level'
    const lreq = 'low-level'

    const ReqHandler = new HandlersPool()
    ReqHandler.AddHandler(new HighLevelHandler())
    ReqHandler.AddHandler(new LowLevelHandler())

    console.log(ReqHandler.ProcessRequest(hreq))
    console.log(ReqHandler.ProcessRequest(lreq))
    console.log(ReqHandler.ProcessRequest('invalid'))
}

demoClient()
