"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("./parser");
var query_hoc_1 = require("./query-hoc");
var mutation_hoc_1 = require("./mutation-hoc");
var subscription_hoc_1 = require("./subscription-hoc");
function graphql(document, operationOptions) {
    if (operationOptions === void 0) { operationOptions = {}; }
    switch (parser_1.parser(document).type) {
        case parser_1.DocumentType.Mutation:
            return mutation_hoc_1.withMutation(document, operationOptions);
        case parser_1.DocumentType.Subscription:
            return subscription_hoc_1.withSubscription(document, operationOptions);
        case parser_1.DocumentType.Query:
        default:
            return query_hoc_1.withQuery(document, operationOptions);
    }
}
exports.graphql = graphql;
//# sourceMappingURL=graphql.js.map