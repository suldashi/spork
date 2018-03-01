import React from "react";
import {MapComponent} from "./map-component";
import {ApiClient} from "./api-client";

const moment = require('moment');
const Datetime = require('react-datetime');

const autoBind = require("react-auto-bind");

export class AddEntryModal extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.onModalClosed = props.onModalClosed;
        this.onSuccessfulSubmission = props.onSuccessfulSubmission;
        this.state = {
            distance:"",
            duration:"",
            isLocationModalOpen:false,
            timestamp:moment(),
            location:null,
            isSubmitting:false,
            authToken:props.authToken
        }
    }


    async onFormSubmit(e) {
        e.preventDefault();
        this.setState({
            isSubmitting:true
        });
        let result = await ApiClient.addEntry(this.state.authToken,this.state.distance,this.state.duration,this.state.timestamp.toISOString(),JSON.stringify(this.state.location));
        this.onSuccessfulSubmission({
            id:result.data.entryId,
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
                <form className="modal-form" onSubmit={this.onFormSubmit}>
                    <button disabled={this.state.isSubmitting} className="modal-close" onClick={this.onModalClosed} />
                    <div><label htmlFor="distance">Distance in Meters: </label><input onChange={this.onChangeDistance} type="number" name="distance" value={this.state.distance} /></div>
                    <div><label htmlFor="duration">Duration in Seconds: </label><input onChange={this.onChangeDuration} type="number" name="duration" value={this.state.duration} /></div>
                    <div><label htmlFor="timestamp">Jog timestamp: </label><Datetime value={this.state.timestamp} onChange={this.onTimestampChanged} /></div>
                    <div><label htmlFor="location">Location: </label><a onClick={this.openLocationModal} href="#">Click to enter location on map</a></div>
                    <div><input disabled={this.state.isSubmitting} type="submit" value="submit" /></div>
                </form>
                {this.state.isLocationModalOpen?<MapComponent onNewLocation={this.onNewLocation} />:""}
            </div>
        </div>;
    }
}