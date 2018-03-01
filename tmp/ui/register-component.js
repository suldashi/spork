"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RegisterComponent = undefined;

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

var RegisterComponent = exports.RegisterComponent = function (_React$Component) {
    (0, _inherits3.default)(RegisterComponent, _React$Component);

    function RegisterComponent(props) {
        (0, _classCallCheck3.default)(this, RegisterComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RegisterComponent.__proto__ || (0, _getPrototypeOf2.default)(RegisterComponent)).call(this, props));

        autoBind(_this);
        _this.username = "";
        _this.password = "";
        _this.state = {
            isRegistrationInProgress: false,
            formHasError: false,
            registrationSucceeded: false
        };
        return _this;
    }

    (0, _createClass3.default)(RegisterComponent, [{
        key: "render",
        value: function render() {
            if (this.state.registrationSucceeded) {
                return _react2.default.createElement(
                    "div",
                    { className: "body-container" },
                    _react2.default.createElement(
                        "div",
                        { className: "inner-card card card-1" },
                        _react2.default.createElement(
                            "h3",
                            null,
                            "Registration successful, activation code has been sent to your email. ",
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: "/login" },
                                "Click here to log in"
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
                            "Register to Spork"
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "inner-card card card-1" },
                        _react2.default.createElement(
                            "form",
                            { onSubmit: this.submitRegister },
                            this.state.formHasError ? _react2.default.createElement(
                                "div",
                                null,
                                "Username is already in use"
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
                            _react2.default.createElement("input", { disabled: this.state.isRegistrationInProgress, className: "button", type: "submit", value: "Register" })
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
        key: "submitRegister",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(e) {
                var result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (e) {
                                    e.preventDefault();
                                }
                                this.setState({
                                    isRegistrationInProgress: true
                                });

                                _context.next = 4;
                                return _apiClient.ApiClient.registerUser(this.username, this.password);

                            case 4:
                                result = _context.sent;

                                if (result.status !== 200) {
                                    this.setState({
                                        formHasError: true,
                                        isRegistrationInProgress: false
                                    });
                                } else {
                                    this.setState({
                                        formHasError: false,
                                        isRegistrationInProgress: false,
                                        registrationSucceeded: true
                                    });
                                }

                            case 6:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function submitRegister(_x) {
                return _ref.apply(this, arguments);
            }

            return submitRegister;
        }()
    }]);
    return RegisterComponent;
}(_react2.default.Component);