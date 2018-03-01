"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserManagerComponent = undefined;

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

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var autoBind = require("react-auto-bind");

var UserManagerComponent = exports.UserManagerComponent = function (_React$Component) {
    (0, _inherits3.default)(UserManagerComponent, _React$Component);

    function UserManagerComponent(props) {
        (0, _classCallCheck3.default)(this, UserManagerComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UserManagerComponent.__proto__ || (0, _getPrototypeOf2.default)(UserManagerComponent)).call(this, props));

        autoBind(_this);
        _this.state = {
            authToken: props.authToken,
            isLoading: true,
            isAuthenticated: false,
            isLoadingUsers: true,
            isAdmin: false,
            users: null
        };
        return _this;
    }

    (0, _createClass3.default)(UserManagerComponent, [{
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

                                if (result.status === 200 && result.data.user.isUserManager) {
                                    this.setState({
                                        isLoading: false,
                                        isAuthenticated: true,
                                        isAdmin: result.data.user.isAdmin
                                    });
                                    this.getUsers();
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
        key: "getUsers",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var result;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return _apiClient.ApiClient.getAllUsers(this.state.authToken);

                            case 2:
                                result = _context2.sent;

                                if (result.status === 200) {
                                    this.setState({
                                        isLoadingUsers: false,
                                        users: result.data.users
                                    });
                                }

                            case 4:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getUsers() {
                return _ref2.apply(this, arguments);
            }

            return getUsers;
        }()
    }, {
        key: "deleteUser",
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(userId) {
                var result;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return _apiClient.ApiClient.deleteUser(this.state.authToken, userId);

                            case 2:
                                result = _context3.sent;

                                if (result.status === 200) {
                                    this.setState({
                                        users: this.state.users.filter(function (el) {
                                            return el.id !== userId;
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

            function deleteUser(_x) {
                return _ref3.apply(this, arguments);
            }

            return deleteUser;
        }()
    }, {
        key: "Users",
        value: function Users() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                null,
                this.state.users.map(function (el) {
                    return _react2.default.createElement(_this2.User, { user: el, key: el.id });
                })
            );
        }
    }, {
        key: "User",
        value: function User(props) {
            var _this3 = this;

            return _react2.default.createElement(
                "div",
                { className: "body-container" },
                _react2.default.createElement(
                    "div",
                    { className: "inner-card card card-1" },
                    this.state.isAdmin ? _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: "/admin/" + props.user.id },
                        props.user.username
                    ) : _react2.default.createElement(
                        "h3",
                        null,
                        props.user.username
                    ),
                    _react2.default.createElement(
                        "button",
                        { onClick: function onClick(e) {
                                e.preventDefault();_this3.deleteUser(props.user.id);
                            }, className: "button" },
                        "Delete User"
                    )
                )
            );
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
                return _react2.default.createElement(
                    "div",
                    { className: "body-container" },
                    this.state.isLoadingUsers ? _react2.default.createElement(
                        "div",
                        { className: "inner-card card card-1" },
                        "Loading users..."
                    ) : _react2.default.createElement(this.Users, null)
                );
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
    return UserManagerComponent;
}(_react2.default.Component);