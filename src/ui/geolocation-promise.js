export let GeolocationPromise = () => {
	return new Promise((resolve,reject) => {
		navigator.geolocation.getCurrentPosition((coords) => {
			resolve({
				lat:coords.coords.latitude,
				lng:coords.coords.longitude
			});
		}, (err) => {
			reject(err);
		});
	});
};