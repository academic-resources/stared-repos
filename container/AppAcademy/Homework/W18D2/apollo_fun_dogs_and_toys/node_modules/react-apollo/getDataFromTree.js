"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var PropTypes = tslib_1.__importStar(require("prop-types"));
function makeDefaultQueryInfo() {
    return {
        seen: false,
        observable: null,
    };
}
var RenderPromises = (function () {
    function RenderPromises() {
        this.queryPromises = new Map();
        this.queryInfoTrie = new Map();
    }
    RenderPromises.prototype.registerSSRObservable = function (queryInstance, observable) {
        this.lookupQueryInfo(queryInstance).observable = observable;
    };
    RenderPromises.prototype.getSSRObservable = function (queryInstance) {
        return this.lookupQueryInfo(queryInstance).observable;
    };
    RenderPromises.prototype.addQueryPromise = function (queryInstance, finish) {
        var info = this.lookupQueryInfo(queryInstance);
        if (!info.seen) {
            this.queryPromises.set(queryInstance, new Promise(function (resolve) {
                resolve(queryInstance.fetchData());
            }));
            return null;
        }
        return finish();
    };
    RenderPromises.prototype.hasPromises = function () {
        return this.queryPromises.size > 0;
    };
    RenderPromises.prototype.consumeAndAwaitPromises = function () {
        var _this = this;
        var promises = [];
        this.queryPromises.forEach(function (promise, queryInstance) {
            _this.lookupQueryInfo(queryInstance).seen = true;
            promises.push(promise);
        });
        this.queryPromises.clear();
        return Promise.all(promises);
    };
    RenderPromises.prototype.lookupQueryInfo = function (queryInstance) {
        var queryInfoTrie = this.queryInfoTrie;
        var _a = queryInstance.props, query = _a.query, variables = _a.variables;
        var varMap = queryInfoTrie.get(query) || new Map();
        if (!queryInfoTrie.has(query))
            queryInfoTrie.set(query, varMap);
        var variablesString = JSON.stringify(variables);
        var info = varMap.get(variablesString) || makeDefaultQueryInfo();
        if (!varMap.has(variablesString))
            varMap.set(variablesString, info);
        return info;
    };
    return RenderPromises;
}());
exports.RenderPromises = RenderPromises;
function getDataFromTree(tree, context) {
    if (context === void 0) { context = {}; }
    return getMarkupFromTree({
        tree: tree,
        context: context,
        renderFunction: require("react-dom/server").renderToStaticMarkup,
    });
}
exports.default = getDataFromTree;
function getMarkupFromTree(_a) {
    var tree = _a.tree, _b = _a.context, context = _b === void 0 ? {} : _b, _c = _a.renderFunction, renderFunction = _c === void 0 ? require("react-dom/server").renderToStaticMarkup : _c;
    var renderPromises = new RenderPromises();
    var RenderPromisesProvider = (function (_super) {
        tslib_1.__extends(RenderPromisesProvider, _super);
        function RenderPromisesProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RenderPromisesProvider.prototype.getChildContext = function () {
            return tslib_1.__assign({}, context, { renderPromises: renderPromises });
        };
        RenderPromisesProvider.prototype.render = function () {
            return tree;
        };
        RenderPromisesProvider.childContextTypes = {
            renderPromises: PropTypes.object,
        };
        return RenderPromisesProvider;
    }(React.Component));
    Object.keys(context).forEach(function (key) {
        RenderPromisesProvider.childContextTypes[key] = PropTypes.any;
    });
    function process() {
        var html = renderFunction(React.createElement(RenderPromisesProvider));
        return renderPromises.hasPromises()
            ? renderPromises.consumeAndAwaitPromises().then(process)
            : html;
    }
    return Promise.resolve().then(process);
}
exports.getMarkupFromTree = getMarkupFromTree;
//# sourceMappingURL=getDataFromTree.js.map