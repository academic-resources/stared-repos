"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_invariant_1 = require("ts-invariant");
function getClient(props, context) {
    var client = props.client || context.client;
    ts_invariant_1.invariant(!!client, 'Could not find "client" in the context or passed in as a prop. ' +
        'Wrap the root component in an <ApolloProvider>, or pass an ' +
        'ApolloClient instance in via props.');
    return client;
}
exports.getClient = getClient;
//# sourceMappingURL=component-utils.js.map