"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AddEntryModal = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

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

var _mapComponent = require("./map-component");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require('moment');
var Datetime = require('react-datetime');

var autoBind = require("react-auto-bind");

var AddEntryModal = exports.AddEntryModal = function (_React$Component) {
    (0, _inherits3.default)(AddEntryModal, _React$Component);

    function AddEntryModal(props) {
        (0, _classCallCheck3.default)(this, AddEntryModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AddEntryModal.__proto__ || (0, _getPrototypeOf2.default)(AddEntryModal)).call(this, props));

        autoBind(_this);
        _this.onModalClosed = props.onModalClosed;
        _this.onSubmission = props.onSubmission;
        _this.state = {
            entryId: props.entry ? props.entry.id : 0,
            distance: props.entry ? props.entry.distance : "",
            duration: props.entry ? props.entry.duration : "",
            isLocationModalOpen: false,
            timestamp: props.entry ? moment(props.entry.timestamp) : moment(),
            location: props.entry && props.entry.location ? props.entry.location : null,
            isSubmitting: false,
            authToken: props.authToken
        };
        return _this;
    }

    (0, _createClass3.default)(AddEntryModal, [{
        key: "onFormSubmit",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(e) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                e.preventDefault();
                                this.setState({
                                    isSubmitting: true
                                });
                                this.onSubmission({
                                    id: this.state.entryId,
                                    userId: 0,
                                    distance: parseInt(this.state.distance),
                                    duration: parseInt(this.state.duration),
                                    timestamp: this.state.timestamp.toISOString(),
                                    location: this.state.location ? (0, _stringify2.default)(this.state.location) : null
                                });

                            case 3:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onFormSubmit(_x) {
                return _ref.apply(this, arguments);
            }

            return onFormSubmit;
        }()
    }, {
        key: "onChangeDistance",
        value: function onChangeDistance(e) {
            e.preventDefault();
            this.setState({
                distance: e.target.value
            });
        }
    }, {
        key: "onChangeDuration",
        value: function onChangeDuration(e) {
            e.preventDefault();
            this.setState({
                duration: e.target.value
            });
        }
    }, {
        key: "onNewLocation",
        value: function onNewLocation(newLocation) {
            this.setState({
                location: newLocation,
                isLocationModalOpen: false
            });
        }
    }, {
        key: "openLocationModal",
        value: function openLocationModal(e) {
            e.preventDefault();
            this.setState({
                isLocationModalOpen: true
            });
        }
    }, {
        key: "onTimestampChanged",
        value: function onTimestampChanged(e) {
            this.setState({
                timestamp: e
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "modal" },
                _react2.default.createElement(
                    "div",
                    { className: "modal-inner" },
                    _react2.default.createElement(
                        "div",
                        { className: "body-container" },
                        _react2.default.createElement(
                            "div",
                            { className: "inner-card card card-1" },
                            _react2.default.createElement(
                                "h1",
                                null,
                                "Add/Edit Entry"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "inner-card card card-1" },
                            _react2.default.createElement(
                                "form",
                                { className: "modal-form", onSubmit: this.onFormSubmit },
                                _react2.default.createElement(
                                    "div",
                                    { className: "input-group" },
                                    _react2.default.createElement(
                                        "label",
                                        null,
                                        "Distance in Meters:"
                                    ),
                                    _react2.default.createElement("input", { className: "text-input", onChange: this.onChangeDistance, type: "number", name: "distance", value: this.state.distance })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "input-group" },
                                    _react2.default.createElement(
                                        "label",
                                        null,
                                        "Duration in Seconds:"
                                    ),
                                    _react2.default.createElement("input", { className: "text-input", onChange: this.onChangeDuration, type: "number", name: "duration", value: this.state.duration })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "input-group" },
                                    _react2.default.createElement(
                                        "label",
                                        null,
                                        "Jog timestamp:"
                                    ),
                                    _react2.default.createElement(Datetime, { value: this.state.timestamp, onChange: this.onTimestampChanged })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "input-group" },
                                    _react2.default.createElement(
                                        "label",
                                        null,
                                        "Location:"
                                    ),
                                    _react2.default.createElement(
                                        "a",
                                        { onClick: this.openLocationModal, href: "#" },
                                        "Click to enter location on map"
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    null,
                                    _react2.default.createElement(
                                        "button",
                                        { className: "button", disabled: this.state.isSubmitting, onClick: this.onModalClosed },
                                        "Close"
                                    ),
                                    _react2.default.createElement("input", { className: "button", disabled: this.state.isSubmitting, type: "submit", value: "submit" })
                                )
                            ),
                            this.state.isLocationModalOpen ? _react2.default.createElement(_mapComponent.MapComponent, { onNewLocation: this.onNewLocation }) : ""
                        )
                    )
                )
            );
        }
    }]);
    return AddEntryModal;
}(_react2.default.Component);