"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoginComponent = undefined;

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

var LoginComponent = exports.LoginComponent = function (_React$Component) {
    (0, _inherits3.default)(LoginComponent, _React$Component);

    function LoginComponent(props) {
        (0, _classCallCheck3.default)(this, LoginComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (LoginComponent.__proto__ || (0, _getPrototypeOf2.default)(LoginComponent)).call(this, props));

        autoBind(_this);

        _this.username = "";
        _this.password = "";

        _this.onLoginSuccessful = props.onLoginSuccessful;
        _this.state = {
            isLoginInProgress: false,
            formHasError: false,
            loginSucceeded: false,
            needsActivation: false,
            activationCodeGenerator: null,
            activationCode: null
        };
        return _this;
    }

    (0, _createClass3.default)(LoginComponent, [{
        key: "sendActivationEmail",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(e) {
                var result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                e.preventDefault();
                                _context.next = 3;
                                return _apiClient.ApiClient.sendActivationEmail(this.state.activationCodeGenerator);

                            case 3:
                                result = _context.sent;

                                this.setState({
                                    activationCode: result.data.activationCode
                                });

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function sendActivationEmail(_x) {
                return _ref.apply(this, arguments);
            }

            return sendActivationEmail;
        }()
    }, {
        key: "activateAccount",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(e) {
                var result;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                e.preventDefault();
                                _context2.next = 3;
                                return _apiClient.ApiClient.activateAccount(this.state.activationCode);

                            case 3:
                                result = _context2.sent;

                                if (result.status === 200) {
                                    this.submitLogin();
                                }

                            case 5:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function activateAccount(_x2) {
                return _ref2.apply(this, arguments);
            }

            return activateAccount;
        }()
    }, {
        key: "render",
        value: function render() {
            if (this.state.loginSucceeded) {
                return _react2.default.createElement(_reactRouterDom.Redirect, { to: "/" });
            } else if (this.state.activationCode) {
                return _react2.default.createElement(
                    "div",
                    { className: "body-container" },
                    _react2.default.createElement(
                        "div",
                        { className: "inner-card card card-1" },
                        _react2.default.createElement(
                            "h3",
                            { onClick: this.activateAccount },
                            "An email has been sent with instructions on how to activate this account"
                        )
                    )
                );
            } else if (this.state.needsActivation) {
                return _react2.default.createElement(
                    "div",
                    { className: "body-container" },
                    _react2.default.createElement(
                        "div",
                        { className: "inner-card card card-1" },
                        _react2.default.createElement(
                            "h3",
                            null,
                            "This account needs to be activated before it can be used. ",
                            _react2.default.createElement(
                                "a",
                                { href: "#", onClick: this.sendActivationEmail },
                                "Click here to send an activation code to your email"
                            )
                        )
                    )
                );
            } else {
                return _react2.default.createElement(
                    "div",
                    { className: "body-container" },
                    _react2.default.createElement(
                        "div",
                        { className: "inner-card card card-1" },
                        _react2.default.createElement(
                            "h1",
                            null,
                            "Login to Spork"
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "inner-card card card-1" },
                        _react2.default.createElement(
                            "form",
                            { onSubmit: this.submitLogin },
                            this.state.formHasError ? _react2.default.createElement(
                                "div",
                                null,
                                "Username or password are invalid"
                            ) : "",
                            _react2.default.createElement(
                                "div",
                                { className: "input-group" },
                                _react2.default.createElement(
                                    "label",
                                    null,
                                    "Username"
                                ),
                                _react2.default.createElement("input", { className: "text-input", autoFocus: true, onChange: this.updateInputForms, type: "text", name: "username" })
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "input-group" },
                                _react2.default.createElement(
                                    "label",
                                    null,
                                    "Password"
                                ),
                                _react2.default.createElement("input", { className: "text-input", onChange: this.updateInputForms, type: "password", name: "password" })
                            ),
                            _react2.default.createElement("input", { disabled: this.state.isLoginInProgress, className: "button", type: "submit", value: "Login" }),
                            this.state.isLoginInProgress ? _react2.default.createElement("div", { className: "spinner" }) : ""
                        )
                    )
                );
            }
        }
    }, {
        key: "updateInputForms",
        value: function updateInputForms(e) {
            this[e.target.name] = e.target.value;
            this.setState({
                formHasError: false
            });
        }
    }, {
        key: "submitLogin",
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(e) {
                var result;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (e) {
                                    e.preventDefault();
                                }
                                this.setState({
                                    isLoginInProgress: true
                                });
                                _context3.next = 4;
                                return _apiClient.ApiClient.login(this.username, this.password);

                            case 4:
                                result = _context3.sent;

                                if (result.status !== 200) {
                                    this.setState({
                                        formHasError: true,
                                        isLoginInProgress: false
                                    });
                                } else if (result.data.needsActivation) {
                                    this.setState({
                                        needsActivation: true,
                                        activationCodeGenerator: result.data.activationCodeGenerator
                                    });
                                } else {
                                    this.onLoginSuccessful(result.data.authToken);
                                    this.setState({
                                        formHasError: false,
                                        isLoginInProgress: false,
                                        loginSucceeded: true
                                    });
                                }

                            case 6:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function submitLogin(_x3) {
                return _ref3.apply(this, arguments);
            }

            return submitLogin;
        }()
    }]);
    return LoginComponent;
}(_react2.default.Component);