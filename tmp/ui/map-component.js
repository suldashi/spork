"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MapComponent = undefined;

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

var _geolocationPromise = require("./geolocation-promise");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var autoBind = require("react-auto-bind");


var defaultPosition = {
	lat: 45,
	lng: 45
};

var MapComponent = exports.MapComponent = function (_React$Component) {
	(0, _inherits3.default)(MapComponent, _React$Component);

	function MapComponent(props) {
		(0, _classCallCheck3.default)(this, MapComponent);

		var _this = (0, _possibleConstructorReturn3.default)(this, (MapComponent.__proto__ || (0, _getPrototypeOf2.default)(MapComponent)).call(this, props));

		autoBind(_this);
		_this.mapRef = null;
		_this.onNewLocation = props.onNewLocation;
		_this.state = {
			zoom: 14,
			lat: defaultPosition.lat,
			lng: defaultPosition.lng,
			isLoading: true
		};
		return _this;
	}

	(0, _createClass3.default)(MapComponent, [{
		key: "componentDidMount",
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
				var _this2 = this;

				var coords;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return (0, _geolocationPromise.GeolocationPromise)();

							case 2:
								coords = _context.sent;

								this.setState({
									isLoading: false,
									lat: coords.lat,
									lng: coords.lng
								}, function () {
									var curpoint = new google.maps.LatLng(coords.lat, coords.lng);
									var gmapdata = new google.maps.Map(_this2.mapRef, {
										center: curpoint,
										zoom: _this2.state.zoom,
										mapTypeId: 'roadmap'
									});
									var gmapmarker = new google.maps.Marker({
										map: gmapdata,
										position: curpoint
									});
									google.maps.event.addListener(gmapdata, 'click', function (event) {
										var lat = event.latLng.lat().toFixed(6);
										var lng = event.latLng.lng().toFixed(6);
										_this2.setState({
											lat: lat,
											lng: lng
										});
										gmapmarker.setPosition(event.latLng);
										_this2.onNewLocation({
											lat: lat,
											lng: lng
										});
									});
								});

							case 4:
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
		key: "render",
		value: function render() {
			var _this3 = this;

			if (this.state.isLoading) {
				return _react2.default.createElement(
					"div",
					null,
					"Loading..."
				);
			} else {
				return _react2.default.createElement("div", { ref: function ref(el) {
						_this3.mapRef = el;
					}, style: { "height": "500px" } });
			}
		}
	}]);
	return MapComponent;
}(_react2.default.Component);