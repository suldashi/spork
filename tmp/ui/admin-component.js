"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AdminComponent = undefined;

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

var _apiClient = require("./api-client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require("moment");

var autoBind = require("react-auto-bind");

var AdminComponent = exports.AdminComponent = function (_React$Component) {
    (0, _inherits3.default)(AdminComponent, _React$Component);

    function AdminComponent(props) {
        (0, _classCallCheck3.default)(this, AdminComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AdminComponent.__proto__ || (0, _getPrototypeOf2.default)(AdminComponent)).call(this, props));

        autoBind(_this);
        _this.state = {
            authToken: props.authToken,
            isLoading: true,
            isAuthenticated: false,
            userId: props.userId,
            entries: null,
            isAddEntryModalOpen: false,
            activeEntry: null,
            addEditSubmitCallback: _this.onAddEntry
        };
        return _this;
    }

    (0, _createClass3.default)(AdminComponent, [{
        key: "componentDidMount",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.state.authToken) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return _apiClient.ApiClient.getUser(this.state.authToken);

                            case 3:
                                result = _context.sent;

                                if (result.status === 200 && result.data.user.isAdmin) {
                                    this.setState({
                                        isLoading: false,
                                        isAuthenticated: true
                                    });
                                    this.getEntries();
                                } else {
                                    this.setState({
                                        isLoading: false
                                    });
                                }

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function componentDidMount() {
                return _ref.apply(this, arguments);
            }

            return componentDidMount;
        }()
    }, {
        key: "getEntries",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var result;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return _apiClient.ApiClient.getEntries(this.state.authToken, this.state.userId);

                            case 2:
                                result = _context2.sent;

                                this.setState({
                                    entries: result.data.entries
                                });

                            case 4:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getEntries() {
                return _ref2.apply(this, arguments);
            }

            return getEntries;
        }()
    }, {
        key: "displayMap",
        value: function displayMap(ev, location) {
            ev.preventDefault();
            console.log(location);
        }
    }, {
        key: "Entries",
        value: function Entries() {
            var _this2 = this;

            if (this.state.entries && this.state.entries.length > 0) {
                return _react2.default.createElement(
                    "div",
                    null,
                    this.state.entries.map(function (el) {
                        return _react2.default.createElement(_this2.Entry, { entry: el, key: el.id });
                    })
                );
            } else {
                return _react2.default.createElement(
                    "div",
                    { className: "body-container" },
                    _react2.default.createElement(
                        "div",
                        { className: "inner-card card card-1" },
                        _react2.default.createElement(
                            "h3",
                            null,
                            "No entries"
                        )
                    )
                );
            }
        }
    }, {
        key: "Entry",
        value: function Entry(props) {
            var _this3 = this;

            var hasLocation = !(props.entry.location === null || props.entry.location === "null");
            return _react2.default.createElement(
                "div",
                { className: "body-container" },
                _react2.default.createElement(
                    "div",
                    { className: "inner-card card card-1" },
                    _react2.default.createElement(
                        "div",
                        null,
                        "Distance: ",
                        this.toKm(props.entry.distance),
                        "Km"
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        "Duration: ",
                        this.toMins(props.entry.duration),
                        "min"
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        "Average Speed: ",
                        this.toKmh(this.calcSpeed(props.entry.distance, props.entry.duration)),
                        "Km/h"
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        "Time:",
                        moment(props.entry.timestamp).toString()
                    ),
                    hasLocation ? _react2.default.createElement(
                        "div",
                        null,
                        "Location:",
                        _react2.default.createElement(
                            "a",
                            { onClick: function onClick(e) {
                                    _this3.displayMap(e, JSON.parse(props.entry.location));
                                }, href: "#" },
                            "View on map"
                        )
                    ) : "",
                    _react2.default.createElement(
                        "button",
                        { onClick: function onClick(e) {
                                e.preventDefault();_this3.editEntryModal(props.entry);
                            }, className: "button" },
                        "Edit"
                    ),
                    _react2.default.createElement(
                        "button",
                        { onClick: function onClick(e) {
                                e.preventDefault();_this3.deleteEntry(props.entry.id);
                            }, className: "button" },
                        "Delete"
                    )
                )
            );
        }
    }, {
        key: "deleteEntry",
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(entryId) {
                var result;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return _apiClient.ApiClient.deleteEntry(this.state.authToken, entryId);

                            case 2:
                                result = _context3.sent;

                                if (result.status === 200) {
                                    this.setState({
                                        entries: this.state.entries.filter(function (el) {
                                            return el.id !== entryId;
                                        })
                                    });
                                }

                            case 4:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function deleteEntry(_x) {
                return _ref3.apply(this, arguments);
            }

            return deleteEntry;
        }()
    }, {
        key: "toKm",
        value: function toKm(meters) {
            return meters / 1000;
        }
    }, {
        key: "toMins",
        value: function toMins(seconds) {
            return seconds / 60;
        }
    }, {
        key: "toKmh",
        value: function toKmh(mps) {
            return mps * 3.6;
        }
    }, {
        key: "calcSpeed",
        value: function calcSpeed(distance, duration) {
            return (distance / duration).toFixed(2);
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.isLoading) {
                return _react2.default.createElement(
                    "div",
                    { className: "body-container" },
                    _react2.default.createElement(
                        "div",
                        { className: "inner-card card card-1" },
                        "Loading..."
                    )
                );
            } else if (this.state.isAuthenticated) {
                return _react2.default.createElement(this.Entries, null);
            } else {
                return _react2.default.createElement(
                    "div",
                    { className: "body-container" },
                    _react2.default.createElement(
                        "div",
                        { className: "inner-card card card-1" },
                        "Not authenticated"
                    )
                );
            }
        }
    }]);
    return AdminComponent;
}(_react2.default.Component);