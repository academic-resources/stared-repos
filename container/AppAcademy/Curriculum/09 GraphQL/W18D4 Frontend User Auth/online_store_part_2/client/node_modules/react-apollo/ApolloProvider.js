"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var PropTypes = tslib_1.__importStar(require("prop-types"));
var react_1 = require("react");
var ApolloContext_1 = require("./ApolloContext");
var ts_invariant_1 = require("ts-invariant");
var ApolloProvider = (function (_super) {
    tslib_1.__extends(ApolloProvider, _super);
    function ApolloProvider(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.operations = new Map();
        ts_invariant_1.invariant(props.client, 'ApolloProvider was not passed a client instance. Make ' +
            'sure you pass in your client via the "client" prop.');
        if (!props.client.__operations_cache__) {
            props.client.__operations_cache__ = _this.operations;
        }
        return _this;
    }
    ApolloProvider.prototype.getChildContext = function () {
        return {
            client: this.props.client,
            operations: this.props.client.__operations_cache__,
        };
    };
    ApolloProvider.prototype.render = function () {
        return ApolloContext_1.ApolloContext ? (React.createElement(ApolloContext_1.ApolloContext.Provider, { value: this.getChildContext() }, this.props.children)) : (this.props.children);
    };
    ApolloProvider.propTypes = {
        client: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
    };
    ApolloProvider.childContextTypes = {
        client: PropTypes.object.isRequired,
        operations: PropTypes.object,
    };
    return ApolloProvider;
}(react_1.Component));
exports.default = ApolloProvider;
//# sourceMappingURL=ApolloProvider.js.map