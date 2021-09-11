"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var PropTypes = tslib_1.__importStar(require("prop-types"));
var component_utils_1 = require("./component-utils");
var shallowEqual_1 = tslib_1.__importDefault(require("./utils/shallowEqual"));
var Subscription = (function (_super) {
    tslib_1.__extends(Subscription, _super);
    function Subscription(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.initialize = function (props) {
            if (_this.queryObservable)
                return;
            _this.queryObservable = _this.client.subscribe({
                query: props.subscription,
                variables: props.variables,
                fetchPolicy: props.fetchPolicy,
            });
        };
        _this.startSubscription = function () {
            if (_this.querySubscription)
                return;
            _this.querySubscription = _this.queryObservable.subscribe({
                next: _this.updateCurrentData,
                error: _this.updateError,
                complete: _this.completeSubscription
            });
        };
        _this.getInitialState = function () { return ({
            loading: true,
            error: undefined,
            data: undefined,
        }); };
        _this.updateCurrentData = function (result) {
            var _a = _this, client = _a.client, onSubscriptionData = _a.props.onSubscriptionData;
            if (onSubscriptionData)
                onSubscriptionData({ client: client, subscriptionData: result });
            _this.setState({
                data: result.data,
                loading: false,
                error: undefined,
            });
        };
        _this.updateError = function (error) {
            _this.setState({
                error: error,
                loading: false,
            });
        };
        _this.completeSubscription = function () {
            var onSubscriptionComplete = _this.props.onSubscriptionComplete;
            if (onSubscriptionComplete)
                onSubscriptionComplete();
            _this.endSubscription();
        };
        _this.endSubscription = function () {
            if (_this.querySubscription) {
                _this.querySubscription.unsubscribe();
                delete _this.querySubscription;
            }
        };
        _this.client = component_utils_1.getClient(props, context);
        _this.initialize(props);
        _this.state = _this.getInitialState();
        return _this;
    }
    Subscription.prototype.componentDidMount = function () {
        this.startSubscription();
    };
    Subscription.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
        var nextClient = component_utils_1.getClient(nextProps, nextContext);
        if (shallowEqual_1.default(this.props.variables, nextProps.variables) &&
            this.client === nextClient &&
            this.props.subscription === nextProps.subscription) {
            return;
        }
        var shouldResubscribe = nextProps.shouldResubscribe;
        if (typeof shouldResubscribe === 'function') {
            shouldResubscribe = !!shouldResubscribe(this.props, nextProps);
        }
        var shouldNotResubscribe = shouldResubscribe === false;
        if (this.client !== nextClient) {
            this.client = nextClient;
        }
        if (!shouldNotResubscribe) {
            this.endSubscription();
            delete this.queryObservable;
            this.initialize(nextProps);
            this.startSubscription();
            this.setState(this.getInitialState());
            return;
        }
        this.initialize(nextProps);
        this.startSubscription();
    };
    Subscription.prototype.componentWillUnmount = function () {
        this.endSubscription();
    };
    Subscription.prototype.render = function () {
        var renderFn = this.props.children;
        if (!renderFn)
            return null;
        var result = Object.assign({}, this.state, {
            variables: this.props.variables,
        });
        return renderFn(result);
    };
    Subscription.contextTypes = {
        client: PropTypes.object,
    };
    Subscription.propTypes = {
        subscription: PropTypes.object.isRequired,
        variables: PropTypes.object,
        children: PropTypes.func,
        onSubscriptionData: PropTypes.func,
        onSubscriptionComplete: PropTypes.func,
        shouldResubscribe: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    };
    return Subscription;
}(React.Component));
exports.default = Subscription;
//# sourceMappingURL=Subscriptions.js.map