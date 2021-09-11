"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var shallowEqual_1 = tslib_1.__importDefault(require("./utils/shallowEqual"));
var ObservableQueryRecycler = (function () {
    function ObservableQueryRecycler() {
        this.observableQueries = [];
    }
    ObservableQueryRecycler.prototype.recycle = function (observableQuery) {
        observableQuery.setOptions({
            query: observableQuery.options.query,
            fetchPolicy: 'standby',
            pollInterval: 0,
            fetchResults: false,
        });
        this.observableQueries.push({
            observableQuery: observableQuery,
            subscription: observableQuery.subscribe({}),
        });
    };
    ObservableQueryRecycler.prototype.reuse = function (options) {
        if (this.observableQueries.length <= 0) {
            return null;
        }
        var item = this.observableQueries.pop();
        if (!item) {
            return null;
        }
        var observableQuery = item.observableQuery, subscription = item.subscription;
        subscription.unsubscribe();
        var ssr = options.ssr, client = options.client, modifiableOpts = tslib_1.__rest(options, ["ssr", "client"]);
        if (!shallowEqual_1.default(modifiableOpts.variables || {}, observableQuery.variables))
            return null;
        observableQuery.setOptions(tslib_1.__assign({}, modifiableOpts, { pollInterval: options.pollInterval, fetchPolicy: options.fetchPolicy }));
        return observableQuery;
    };
    return ObservableQueryRecycler;
}());
exports.ObservableQueryRecycler = ObservableQueryRecycler;
//# sourceMappingURL=queryRecycler.js.map