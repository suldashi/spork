import React from "react";
import {MapComponent} from "./map-component";
import {GeolocationPromise} from "./geolocation-promise";

const moment = require('moment');
const Datetime = require('react-datetime');

const autoBind = require("react-auto-bind");

export class AddEntryModal extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.onModalClosed = props.onModalClosed;
        this.state = {
            distance:"",
            duration:"",
            isLoaded:false,
            isLocationModalOpen:false,
            timestamp:moment(),
            position:{
                lat:45,
                lng:45
            }
        }
    }

    componentWillMount() {
        GeolocationPromise().then((newPosition) => {
            this.setState({
                isLoaded:true,
                position:newPosition
            });
        }).catch((err) => {
            this.setState({
                isLoaded:true
            });
        })
    }

    onFormSubmit(e) {
        console.log({
            "distance":this.state.distance,
            "duration":this.state.duration,
            "timestamp":this.state.timestamp.toISOString(),
            "location":this.state.location
        });
        e.preventDefault();
    }

    onChangeDistance(e) {
        e.preventDefault();
        this.setState({
            distance:e.target.value
        });
    }

    onChangeDuration(e) {
        e.preventDefault();
        this.setState({
            duration:e.target.value
        });
    }

    onNewPosition(newPosition) {
        this.setState({
            position:newPosition,
            isLocationModalOpen:false
        })
    }

    openLocationModal(e) {
        e.preventDefault();
        this.setState({
            isLocationModalOpen:true
        });
    }

    onTimestampChanged(e) {
        this.setState({
            timestamp:e
        })
    }

    render() {
        if(this.state.isLoaded) {
            return <div className="modal">
                <div className="modal-overlay" onClick={this.onModalClosed} />
                <form className="modal-form" onSubmit={this.onFormSubmit}>
                    <div><label htmlFor="distance">Distance in Meters: </label><input onChange={this.onChangeDistance} type="number" name="distance" value={this.state.distance} /></div>
                    <div><label htmlFor="duration">Duration in Seconds: </label><input onChange={this.onChangeDuration} type="number" name="duration" value={this.state.duration} /></div>
                    <div><label htmlFor="timestamp">Jog timestamp: </label><Datetime value={this.state.timestamp} onChange={this.onTimestampChanged} /></div>
                    <div><label htmlFor="location">Location: </label><a onClick={this.openLocationModal} href="#">Click to enter location on map</a></div>
                    <div><input type="submit" value="submit" /></div>
                </form>
                {this.state.isLocationModalOpen?<MapComponent initialPosition={this.state.position} onNewPosition={this.onNewPosition} />:""}
            </div>
        }
        else {
            return null;
        }
    }
}