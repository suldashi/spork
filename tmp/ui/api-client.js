"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ApiClient = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApiClientClass = function () {
    function ApiClientClass() {
        (0, _classCallCheck3.default)(this, ApiClientClass);
    }

    (0, _createClass3.default)(ApiClientClass, [{
        key: "registerUser",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(username, password) {
                var res, data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return fetch("/api/auth/register", {
                                    method: "post",
                                    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json"
                                    },
                                    body: (0, _stringify2.default)({
                                        username: username,
                                        password: password
                                    })
                                });

                            case 2:
                                res = _context.sent;
                                _context.next = 5;
                                return res.json();

                            case 5:
                                data = _context.sent;
                                return _context.abrupt("return", {
                                    data: data,
                                    status: res.status
                                });

                            case 7:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function registerUser(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return registerUser;
        }()
    }, {
        key: "getUser",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(authToken) {
                var res, data;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return fetch("/api/user", {
                                    method: "get",
                                    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json",
                                        "Authorization": "Bearer " + authToken
                                    }
                                });

                            case 2:
                                res = _context2.sent;
                                _context2.next = 5;
                                return res.json();

                            case 5:
                                data = _context2.sent;
                                return _context2.abrupt("return", {
                                    data: data,
                                    status: res.status
                                });

                            case 7:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getUser(_x3) {
                return _ref2.apply(this, arguments);
            }

            return getUser;
        }()
    }, {
        key: "deleteUser",
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(authToken, userId) {
                var res, data;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return fetch("/api/user/delete", {
                                    method: "post",
                                    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json",
                                        "Authorization": "Bearer " + authToken
                                    },
                                    body: (0, _stringify2.default)({
                                        userId: userId
                                    })
                                });

                            case 2:
                                res = _context3.sent;
                                _context3.next = 5;
                                return res.json();

                            case 5:
                                data = _context3.sent;
                                return _context3.abrupt("return", {
                                    data: data,
                                    status: res.status
                                });

                            case 7:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function deleteUser(_x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return deleteUser;
        }()
    }, {
        key: "getAllUsers",
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(authToken) {
                var res, data;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return fetch("/api/user/all", {
                                    method: "get",
                                    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json",
                                        "Authorization": "Bearer " + authToken
                                    }
                                });

                            case 2:
                                res = _context4.sent;
                                _context4.next = 5;
                                return res.json();

                            case 5:
                                data = _context4.sent;
                                return _context4.abrupt("return", {
                                    data: data,
                                    status: res.status
                                });

                            case 7:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getAllUsers(_x6) {
                return _ref4.apply(this, arguments);
            }

            return getAllUsers;
        }()
    }, {
        key: "login",
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(username, password) {
                var res, data;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return fetch("/api/auth/login", {
                                    method: "post",
                                    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json"
                                    },
                                    body: (0, _stringify2.default)({
                                        username: username,
                                        password: password
                                    })
                                });

                            case 2:
                                res = _context5.sent;
                                _context5.next = 5;
                                return res.json();

                            case 5:
                                data = _context5.sent;
                                return _context5.abrupt("return", {
                                    data: data,
                                    status: res.status
                                });

                            case 7:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function login(_x7, _x8) {
                return _ref5.apply(this, arguments);
            }

            return login;
        }()
    }, {
        key: "sendActivationEmail",
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(activationCodeGenerator) {
                var res, data;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return fetch("/api/auth/sendActivationCode", {
                                    method: "post",
                                    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json"
                                    },
                                    body: (0, _stringify2.default)({
                                        activationCodeGenerator: activationCodeGenerator
                                    })
                                });

                            case 2:
                                res = _context6.sent;
                                _context6.next = 5;
                                return res.json();

                            case 5:
                                data = _context6.sent;
                                return _context6.abrupt("return", {
                                    data: data,
                                    status: res.status
                                });

                            case 7:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function sendActivationEmail(_x9) {
                return _ref6.apply(this, arguments);
            }

            return sendActivationEmail;
        }()
    }, {
        key: "activateAccount",
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(activationCode) {
                var res, data;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return fetch("/api/auth/activate", {
                                    method: "post",
                                    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json"
                                    },
                                    body: (0, _stringify2.default)({
                                        activationCode: activationCode
                                    })
                                });

                            case 2:
                                res = _context7.sent;
                                _context7.next = 5;
                                return res.json();

                            case 5:
                                data = _context7.sent;
                                return _context7.abrupt("return", {
                                    data: data,
                                    status: res.status
                                });

                            case 7:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function activateAccount(_x10) {
                return _ref7.apply(this, arguments);
            }

            return activateAccount;
        }()
    }, {
        key: "getEntries",
        value: function () {
            var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(authToken, userId) {
                var res, data;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return fetch("/api/entry?userId=" + userId, {
                                    method: "get",
                                    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json",
                                        "Authorization": "Bearer " + authToken
                                    }
                                });

                            case 2:
                                res = _context8.sent;
                                _context8.next = 5;
                                return res.json();

                            case 5:
                                data = _context8.sent;
                                return _context8.abrupt("return", {
                                    data: data,
                                    status: res.status
                                });

                            case 7:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function getEntries(_x11, _x12) {
                return _ref8.apply(this, arguments);
            }

            return getEntries;
        }()
    }, {
        key: "addEntry",
        value: function () {
            var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(authToken, distance, duration, timestamp, location) {
                var res, data;
                return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return fetch("/api/entry/add", {
                                    method: "post",
                                    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json",
                                        "Authorization": "Bearer " + authToken
                                    },
                                    body: (0, _stringify2.default)({
                                        distance: distance, duration: duration, timestamp: timestamp, location: location
                                    })
                                });

                            case 2:
                                res = _context9.sent;
                                _context9.next = 5;
                                return res.json();

                            case 5:
                                data = _context9.sent;
                                return _context9.abrupt("return", {
                                    data: data,
                                    status: res.status
                                });

                            case 7:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function addEntry(_x13, _x14, _x15, _x16, _x17) {
                return _ref9.apply(this, arguments);
            }

            return addEntry;
        }()
    }, {
        key: "editEntry",
        value: function () {
            var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(authToken, entryId, distance, duration, timestamp, location) {
                var res, data;
                return _regenerator2.default.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return fetch("/api/entry/edit", {
                                    method: "post",
                                    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json",
                                        "Authorization": "Bearer " + authToken
                                    },
                                    body: (0, _stringify2.default)({
                                        entryId: entryId, distance: distance, duration: duration, timestamp: timestamp, location: location
                                    })
                                });

                            case 2:
                                res = _context10.sent;
                                _context10.next = 5;
                                return res.json();

                            case 5:
                                data = _context10.sent;
                                return _context10.abrupt("return", {
                                    data: data,
                                    status: res.status
                                });

                            case 7:
                            case "end":
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function editEntry(_x18, _x19, _x20, _x21, _x22, _x23) {
                return _ref10.apply(this, arguments);
            }

            return editEntry;
        }()
    }, {
        key: "deleteEntry",
        value: function () {
            var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(authToken, entryId) {
                var res, data;
                return _regenerator2.default.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _context11.next = 2;
                                return fetch("/api/entry/delete", {
                                    method: "post",
                                    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json",
                                        "Authorization": "Bearer " + authToken
                                    },
                                    body: (0, _stringify2.default)({
                                        entryId: entryId
                                    })
                                });

                            case 2:
                                res = _context11.sent;
                                _context11.next = 5;
                                return res.json();

                            case 5:
                                data = _context11.sent;
                                return _context11.abrupt("return", {
                                    data: data,
                                    status: res.status
                                });

                            case 7:
                            case "end":
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));

            function deleteEntry(_x24, _x25) {
                return _ref11.apply(this, arguments);
            }

            return deleteEntry;
        }()
    }]);
    return ApiClientClass;
}();

var ApiClient = exports.ApiClient = new ApiClientClass();