import React from "react";
const autoBind = require("react-auto-bind");
import {GeolocationPromise} from "./geolocation-promise";

let defaultPosition = {
	lat:45,
	lng:45
}

export class MapComponent extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.mapRef = null;
		this.onNewLocation = props.onNewLocation;
		this.state = {
			zoom:14,
			lat:defaultPosition.lat,
			lng:defaultPosition.lng,
			isLoading:true
		}
	}

	async componentDidMount() {
		let coords = await GeolocationPromise();
		this.setState({
			isLoading:false,
			lat:coords.lat,
			lng:coords.lng
		},() => {
			let curpoint = new google.maps.LatLng(coords.lat,coords.lng);
			let gmapdata = new google.maps.Map(this.mapRef, {
				center: curpoint,
				zoom: this.state.zoom,
				mapTypeId: 'roadmap'
			});
			let gmapmarker = new google.maps.Marker({
				map: gmapdata,
				position: curpoint
			});
			google.maps.event.addListener(gmapdata, 'click', (event) => {
				let lat = event.latLng.lat().toFixed(6);
				let lng = event.latLng.lng().toFixed(6);
				this.setState({
					lat,
					lng
				})
				gmapmarker.setPosition(event.latLng);
				this.onNewLocation({
					lat,
					lng
				});
			});
		});
	}

	render() {
		if(this.state.isLoading) {
			return <div>Loading...</div>;
		}
		else {
			return <div ref={(el) => {this.mapRef = el;}} style={{"height":"500px"}}></div>;
		}
	}
}