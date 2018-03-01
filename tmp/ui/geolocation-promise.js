"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GeolocationPromise = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GeolocationPromise = exports.GeolocationPromise = function GeolocationPromise() {
	return new _promise2.default(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(function (coords) {
			resolve({
				lat: coords.coords.latitude,
				lng: coords.coords.longitude
			});
		}, function (err) {
			reject(err);
		});
	});
};