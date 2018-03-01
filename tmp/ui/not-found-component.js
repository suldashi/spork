"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NotFoundComponent = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFoundComponent = exports.NotFoundComponent = function (_React$Component) {
    (0, _inherits3.default)(NotFoundComponent, _React$Component);

    function NotFoundComponent(props) {
        (0, _classCallCheck3.default)(this, NotFoundComponent);
        return (0, _possibleConstructorReturn3.default)(this, (NotFoundComponent.__proto__ || (0, _getPrototypeOf2.default)(NotFoundComponent)).call(this, props));
    }

    (0, _createClass3.default)(NotFoundComponent, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                "404 not found"
            );
        }
    }]);
    return NotFoundComponent;
}(_react2.default.Component);