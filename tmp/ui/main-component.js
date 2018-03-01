'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MainComponent = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _homeComponent = require('./home-component');

var _userManagerComponent = require('./user-manager-component');

var _adminComponent = require('./admin-component');

var _anonHomeComponent = require('./anon-home-component');

var _notFoundComponent = require('./not-found-component');

var _forbiddenComponent = require('./forbidden-component');

var _loginComponent = require('./login-component');

var _logoutComponent = require('./logout-component');

var _registerComponent = require('./register-component');

var _headerComponent = require('./header-component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var autoBind = require("react-auto-bind");

var MainComponent = exports.MainComponent = function (_React$Component) {
    (0, _inherits3.default)(MainComponent, _React$Component);

    function MainComponent(props) {
        (0, _classCallCheck3.default)(this, MainComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MainComponent.__proto__ || (0, _getPrototypeOf2.default)(MainComponent)).call(this, props));

        autoBind(_this);
        _this.state = {
            authToken: localStorage.getItem("authToken")
        };
        return _this;
    }

    (0, _createClass3.default)(MainComponent, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_headerComponent.HeaderComponent, { authToken: this.state.authToken }),
                _react2.default.createElement(
                    _reactRouterDom.Switch,
                    null,
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: this.HomeComponentWithProps }),
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/login', component: this.LoginComponent }),
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/logout', component: this.LogoutComponent }),
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/register', component: this.RegisterComponent }),
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/userManager', component: this.UserManagerComponentWithProps }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: '/admin/:userId', component: this.AdminComponent }),
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '*', component: this.NotFoundComponentWithProps })
                )
            );
        }
    }, {
        key: 'AdminComponent',
        value: function AdminComponent(props) {
            return _react2.default.createElement(_adminComponent.AdminComponent, { userId: props.match.params.userId, authToken: this.state.authToken });
        }
    }, {
        key: 'UserManagerComponentWithProps',
        value: function UserManagerComponentWithProps() {
            return _react2.default.createElement(_userManagerComponent.UserManagerComponent, { authToken: this.state.authToken });
        }
    }, {
        key: 'HomeComponentWithProps',
        value: function HomeComponentWithProps() {
            if (this.state.authToken) {
                return _react2.default.createElement(_homeComponent.HomeComponent, { authToken: this.state.authToken });
            } else {
                return _react2.default.createElement(_anonHomeComponent.AnonHomeComponent, null);
            }
        }
    }, {
        key: 'LoginComponent',
        value: function LoginComponent() {
            return _react2.default.createElement(_loginComponent.LoginComponent, { authToken: this.state.authToken, onLoginSuccessful: this.loginCallback });
        }
    }, {
        key: 'LogoutComponent',
        value: function LogoutComponent() {
            return _react2.default.createElement(_logoutComponent.LogoutComponent, { authToken: this.state.authToken, onLogout: this.logoutCallback });
        }
    }, {
        key: 'NotFoundComponentWithProps',
        value: function NotFoundComponentWithProps() {
            return _react2.default.createElement(_notFoundComponent.NotFoundComponent, { authToken: this.state.authToken });
        }
    }, {
        key: 'RegisterComponent',
        value: function RegisterComponent() {
            return _react2.default.createElement(_registerComponent.RegisterComponent, { authToken: this.state.authToken });
        }
    }, {
        key: 'loginCallback',
        value: function loginCallback(authToken) {
            localStorage.setItem("authToken", authToken);
            this.setState({
                authToken: authToken
            });
        }
    }, {
        key: 'logoutCallback',
        value: function logoutCallback() {
            localStorage.removeItem("authToken");
            this.setState({
                authToken: null
            });
        }
    }]);
    return MainComponent;
}(_react2.default.Component);