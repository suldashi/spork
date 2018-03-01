"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HomeComponent = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _addEntryModal = require("./add-entry-modal");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require("moment");
var Datetime = require('react-datetime');
var autoBind = require("react-auto-bind");

var HomeComponent = exports.HomeComponent = function (_React$Component) {
    (0, _inherits3.default)(HomeComponent, _React$Component);

    function HomeComponent(props) {
        (0, _classCallCheck3.default)(this, HomeComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HomeComponent.__proto__ || (0, _getPrototypeOf2.default)(HomeComponent)).call(this, props));

        autoBind(_this);
        _this.state = {
            authToken: props.authToken,
            entries: null,
            filteredEntries: null,
            isLoading: props.authToken ? true : false,
            isAddEntryModalOpen: false,
            activeEntry: null,
            addEditSubmitCallback: _this.onAddEntry,
            lowerLimit: moment().add(-1, "y"),
            upperLimit: moment()
        };
        return _this;
    }

    (0, _createClass3.default)(HomeComponent, [{
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
                                return _apiClient.ApiClient.getEntries(this.state.authToken);

                            case 3:
                                result = _context.sent;

                                this.setState({
                                    entries: result.data.entries,
                                    filteredEntries: result.data.entries,
                                    isLoading: false
                                });

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
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.state.authToken !== nextProps.authToken) {
                this.setState({
                    authToken: nextProps.authToken
                });
            }
        }
    }, {
        key: "Entries",
        value: function Entries() {
            var _this2 = this;

            if (this.state.entries && this.state.entries.length > 0) {
                return _react2.default.createElement(
                    "div",
                    null,
                    this.state.filteredEntries.map(function (el) {
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
        key: "editEntryModal",
        value: function editEntryModal(entry) {
            this.setState({
                isAddEntryModalOpen: true,
                activeEntry: entry,
                addEditSubmitCallback: this.editEntry
            });
        }
    }, {
        key: "editEntry",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(entry) {
                var result;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return _apiClient.ApiClient.editEntry(this.state.authToken, entry.id, entry.distance, entry.duration, entry.timestamp, entry.location);

                            case 2:
                                result = _context2.sent;

                                if (result.status === 200) {
                                    this.setState({
                                        entries: this.state.entries.map(function (el) {
                                            return el.id === entry.id ? {
                                                id: el.id,
                                                userId: el.userId,
                                                distance: entry.distance,
                                                duration: entry.duration,
                                                timestamp: entry.timestmap,
                                                location: entry.location
                                            } : el;
                                        }),
                                        activeEntry: null,
                                        addEditSubmitCallback: this.onAddEntry,
                                        isAddEntryModalOpen: false
                                    });
                                } else {
                                    this.setState({
                                        activeEntry: null,
                                        addEditSubmitCallback: this.onAddEntry,
                                        isAddEntryModalOpen: false
                                    });
                                }

                            case 4:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function editEntry(_x) {
                return _ref2.apply(this, arguments);
            }

            return editEntry;
        }()
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

            function deleteEntry(_x2) {
                return _ref3.apply(this, arguments);
            }

            return deleteEntry;
        }()
    }, {
        key: "displayMap",
        value: function displayMap(ev, location) {
            ev.preventDefault();
            console.log(location);
        }
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
        key: "openAddEntryModal",
        value: function openAddEntryModal(e) {
            e.preventDefault();
            this.setState({
                isAddEntryModalOpen: true
            });
        }
    }, {
        key: "onModalClosed",
        value: function onModalClosed(e) {
            e.preventDefault();
            this.setState({
                isAddEntryModalOpen: false
            });
        }
    }, {
        key: "onAddEntry",
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(entry) {
                var result;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return _apiClient.ApiClient.addEntry(this.state.authToken, entry.distance, entry.duration, entry.timestamp, entry.location);

                            case 2:
                                result = _context4.sent;

                                entry.id = result.data.entryId;
                                if (result.status === 200) {
                                    this.setState({
                                        isAddEntryModalOpen: false,
                                        entries: [entry].concat((0, _toConsumableArray3.default)(this.state.entries))
                                    });
                                } else {
                                    this.setState({
                                        isAddEntryModalOpen: false
                                    });
                                }

                            case 5:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function onAddEntry(_x3) {
                return _ref4.apply(this, arguments);
            }

            return onAddEntry;
        }()
    }, {
        key: "onLowerLimitChanged",
        value: function onLowerLimitChanged(e) {
            var _this4 = this;

            this.setState({
                lowerLimit: e,
                filteredEntries: this.state.entries.filter(function (el) {
                    return moment(el.timestamp).isAfter(moment(e) && moment(el.timestamp).isBefore(_this4.state.upperLimit));
                })
            });
        }
    }, {
        key: "onUpperLimitChanged",
        value: function onUpperLimitChanged(e) {
            var _this5 = this;

            this.setState({
                upperLimit: e,
                filteredEntries: this.state.entries.filter(function (el) {
                    return moment(el.timestamp).isAfter(moment(_this5.state.lowerLimit) && moment(el.timestamp).isBefore(e));
                })
            });
        }
    }, {
        key: "getFastest",
        value: function getFastest(entries) {
            if (!entries) {
                return "n/a";
            }
            var speeds = entries.map(function (el) {
                return el.distance / el.duration;
            });
            var sorted = speeds.sort(function (l, r) {
                return l < r;
            });
            if (sorted.length > 0) {
                return this.toKmh(sorted[0]);
            } else {
                return "n/a";
            }
        }
    }, {
        key: "getAverage",
        value: function getAverage(entries) {
            if (!entries) {
                return "n/a";
            }
            var sum = 0;
            for (var i in entries) {
                sum += entries[i].distance / entries[i].duration;
            }
            return this.toKmh(sum / entries.length);
        }
    }, {
        key: "getGreatest",
        value: function getGreatest(entries) {
            if (!entries) {
                return "n/a";
            }
            var speeds = entries.map(function (el) {
                return el.distance;
            });
            var sorted = speeds.sort(function (l, r) {
                return l < r;
            });
            if (sorted.length > 0) {
                return this.toKm(sorted[0]);
            } else {
                return "n/a";
            }
        }
    }, {
        key: "getTotal",
        value: function getTotal(entries) {
            if (!entries) {
                return "n/a";
            }
            var sum = 0;
            for (var i in entries) {
                sum += entries[i].distance;
            }
            return this.toKm(sum);
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
            } else {
                return _react2.default.createElement(
                    "div",
                    null,
                    this.state.isAddEntryModalOpen ? _react2.default.createElement(_addEntryModal.AddEntryModal, { authToken: this.state.authToken, entry: this.state.activeEntry, onModalClosed: this.onModalClosed, onSubmission: this.state.addEditSubmitCallback }) : "",
                    _react2.default.createElement(
                        "div",
                        { className: "body-container" },
                        _react2.default.createElement(
                            "div",
                            { className: "inner-card card card-1" },
                            _react2.default.createElement(
                                "div",
                                null,
                                "Fastest speed:",
                                this.getFastest(this.state.entries),
                                " KM/h"
                            ),
                            _react2.default.createElement(
                                "div",
                                null,
                                "Average speed:",
                                this.getAverage(this.state.entries),
                                " KM/h"
                            ),
                            _react2.default.createElement(
                                "div",
                                null,
                                "Greatest distance:",
                                this.getGreatest(this.state.entries),
                                " KM"
                            ),
                            _react2.default.createElement(
                                "div",
                                null,
                                "Total distance:",
                                this.getTotal(this.state.entries),
                                " KM"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "body-container" },
                        _react2.default.createElement(
                            "div",
                            { className: "inner-card card card-1" },
                            _react2.default.createElement(Datetime, { value: this.state.lowerLimit, onChange: this.onLowerLimitChanged }),
                            _react2.default.createElement(Datetime, { value: this.state.upperLimit, onChange: this.onUpperLimitChanged })
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "body-container" },
                        _react2.default.createElement(
                            "div",
                            { className: "inner-card card card-1" },
                            _react2.default.createElement(
                                "a",
                                { className: "button", onClick: this.openAddEntryModal, href: "#" },
                                "Add Entry"
                            )
                        )
                    ),
                    _react2.default.createElement(this.Entries, null)
                );
            }
        }
    }]);
    return HomeComponent;
}(_react2.default.Component);