import React from "react";
const autoBind = require("react-auto-bind");

export class MapComponent extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.onNewPosition = props.onNewPosition;
		this.state = {
			zoom:14,
			lat:props.initialPosition.lat,
			lng:props.initialPosition.lng
		}
	}

	componentDidMount() {
		let curpoint = new google.maps.LatLng(this.state.lat,this.state.lng);
		let gmapdata = new google.maps.Map(document.getElementById("mymap"), {
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
			this.onNewPosition({
				lat,
				lng
			});
		});
	}

	render() {
		return <div id="mymap" style={{"height":"500px"}}>{this.state.lat} - {this.state.lng}</div>;
	}
}