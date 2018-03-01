import React from "react";
import {MapComponent} from "./map-component";

const moment = require('moment');
const Datetime = require('react-datetime');

const autoBind = require("react-auto-bind");

export class AddEntryModal extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.onModalClosed = props.onModalClosed;
        this.onSubmission = props.onSubmission;
        this.state = {
            entryId:props.entry?props.entry.id:0,
            distance:props.entry?props.entry.distance:"",
            duration:props.entry?props.entry.duration:"",
            isLocationModalOpen:false,
            timestamp:props.entry?moment(props.entry.timestamp):moment(),
            location:props.entry && props.entry.location?props.entry.location:null,
            isSubmitting:false,
            authToken:props.authToken
        }
    }


    async onFormSubmit(e) {
        e.preventDefault();
        this.setState({
            isSubmitting:true
        });
        this.onSubmission({
            id:this.state.entryId,
            userId:0,
            distance:parseInt(this.state.distance),
            duration:parseInt(this.state.duration),
            timestamp:this.state.timestamp.toISOString(),
            location:this.state.location?JSON.stringify(this.state.location):null
        });
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

    onNewLocation(newLocation) {
        this.setState({
            location:newLocation,
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
        return <div className="modal">
            <div className="modal-inner">
                <div className="body-container">
                    <div className="inner-card card card-1">
                        <h1>Add/Edit Entry</h1>
                    </div>
                    <div className="inner-card card card-1">
                        <form className="modal-form" onSubmit={this.onFormSubmit}>
                            <div className="input-group"><label>Distance in Meters:</label><input className="text-input" onChange={this.onChangeDistance} type='number' name="distance"  value={this.state.distance} /></div>
                            <div className="input-group"><label>Duration in Seconds:</label><input className="text-input" onChange={this.onChangeDuration} type='number' name="duration" value={this.state.duration} /></div>
                            <div className="input-group"><label>Jog timestamp:</label><Datetime value={this.state.timestamp} onChange={this.onTimestampChanged} /></div>
                            <div className="input-group"><label>Location:</label><a onClick={this.openLocationModal} href="#">Click to enter location on map</a></div>
                            <div><button className="button" disabled={this.state.isSubmitting} onClick={this.onModalClosed}>Close</button>
                            <input className="button" disabled={this.state.isSubmitting} type="submit" value="submit" /></div>
                        </form>
                        {this.state.isLocationModalOpen?<MapComponent onNewLocation={this.onNewLocation} />:""}
                    </div>
                </div>
            </div>
        </div>;
    }
}