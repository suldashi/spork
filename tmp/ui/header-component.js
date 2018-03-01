"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeaderComponent = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _apiClient = require("./api-client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var autoBind = require("react-auto-bind");

var HeaderComponent = exports.HeaderComponent = function (_React$Component) {
    (0, _inherits3.default)(HeaderComponent, _React$Component);

    function HeaderComponent(props) {
        (0, _classCallCheck3.default)(this, HeaderComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HeaderComponent.__proto__ || (0, _getPrototypeOf2.default)(HeaderComponent)).call(this, props));

        autoBind(_this);
        _this.state = {
            authToken: props.authToken,
            user: null
        };
        return _this;
    }

    (0, _createClass3.default)(HeaderComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.state.authToken) {
                this.updateUser(this.state.authToken);
            }
        }
    }, {
        key: "updateUser",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(authToken) {
                var _this2 = this;

                var result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _apiClient.ApiClient.getUser(authToken);

                            case 2:
                                result = _context.sent;

                                if (result.status === 200) {
                                    this.setState({
                                        user: result.data.user
                                    }, function () {
                                        console.log(_this2.state);
                                    });
                                }

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function updateUser(_x) {
                return _ref.apply(this, arguments);
            }

            return updateUser;
        }()
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(newProps) {
            var _this3 = this;

            if (newProps.authToken !== this.state.authToken) {
                this.setState({
                    authToken: newProps.authToken
                }, function () {
                    _this3.updateUser(newProps.authToken);
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.authToken) {
                return _react2.default.createElement(
                    "header",
                    { className: "site-header" },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: "/" },
                        "Spork"
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "header-text-element" },
                        this.state.user ? _react2.default.createElement(
                            "span",
                            null,
                            "Welcome ",
                            this.state.user.username,
                            " | "
                        ) : "",
                        this.state.user && this.state.user.isUserManager ? _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: "/userManager" },
                            "User manager | "
                        ) : "",
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: "/logout" },
                            "Logout"
                        )
                    )
                );
            } else {
                return _react2.default.createElement(
                    "header",
                    { className: "site-header" },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: "/" },
                        "Spork"
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "header-text-element" },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: "/login" },
                            "Login"
                        ),
                        " | ",
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { className: "header-text-element", to: "/register" },
                            "Register"
                        )
                    )
                );
            }
        }
    }]);
    return HeaderComponent;
}(_react2.default.Component);