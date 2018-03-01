"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnonHomeComponent = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var autoBind = require("react-auto-bind");

var AnonHomeComponent = exports.AnonHomeComponent = function (_React$Component) {
    (0, _inherits3.default)(AnonHomeComponent, _React$Component);

    function AnonHomeComponent(props) {
        (0, _classCallCheck3.default)(this, AnonHomeComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AnonHomeComponent.__proto__ || (0, _getPrototypeOf2.default)(AnonHomeComponent)).call(this, props));

        autoBind(_this);
        return _this;
    }

    (0, _createClass3.default)(AnonHomeComponent, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "body-container" },
                _react2.default.createElement(
                    "div",
                    { className: "inner-card card card-1" },
                    _react2.default.createElement(
                        "h1",
                        null,
                        "Spork Jogging Tracker"
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "inner-card card card-1" },
                    _react2.default.createElement(
                        "h3",
                        null,
                        "Welcome to Spork, the jogging tracker! ",
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: "/login" },
                            "Login"
                        ),
                        " or ",
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: "/register" },
                            "register"
                        )
                    )
                )
            );
        }
    }]);
    return AnonHomeComponent;
}(_react2.default.Component);