import React from "react";
import {Link} from "react-router-dom";
import {ApiClient} from "./api-client";

import {AddEntryModal} from "./add-entry-modal";

const moment = require("moment");
const autoBind = require("react-auto-bind");

export class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            authToken:props.authToken,
            entries:null,
            isLoading:props.authToken?true:false,
            isAddEntryModalOpen:false
        }
    }

    async componentDidMount() {
        if(this.state.authToken) {
            let result = await ApiClient.getEntries(this.state.authToken);
            this.setState({
                entries:result.data.entries,
                isLoading:false
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.authToken!==nextProps.authToken) {
            this.setState({
                authToken:nextProps.authToken
            });
        }
    }
    
    Entries() {
        if(this.state.entries && this.state.entries.length>0) {
            return <div>
                {this.state.entries.map(el => <this.Entry entry={el} key={el.id} />)}
            </div>;
        }
        else {
            return <div className="body-container">
                <div className="inner-card card card-1">
                    <h3>No entries</h3>
                </div>
            </div>;
        }
    }

    Entry(props) {
        let hasLocation = !(props.entry.location===null || props.entry.location === "null");
        return <div className="body-container">
            <div className="inner-card card card-1">
                <div>Distance: {this.toKm(props.entry.distance)}Km</div>
                <div>Duration: {this.toMins(props.entry.duration)}min</div>
                <div>Average Speed: {this.toKmh(this.calcSpeed(props.entry.distance,props.entry.duration))}Km/h</div>
                <div>Time:{moment(props.entry.timestamp).toString()}</div>
                {hasLocation?<div>Location:<a onClick={(e) => {this.displayMap(e,JSON.parse(props.entry.location))}} href="#">View on map</a></div>:""}
                <button onClick={(e) => {e.preventDefault();this.editEntryModal(props.entry);}} className="button">Edit</button>
                <button onClick={(e) => {e.preventDefault();this.deleteEntry(props.entry.id);}} className="button">Delete</button>
            </div>
        </div>;
    }

    editEntryModal(entry) {
        console.log(entry);
    }

    async deleteEntry(entryId) {
        let result = await ApiClient.deleteEntry(this.state.authToken,entryId);
        if(result.status === 200) {
            this.setState({
                entries:this.state.entries.filter((el) => el.id !==entryId)
            })
        }
    }

    displayMap(ev,location) {
        ev.preventDefault();
        console.log(location);
    }

    toKm(meters) {
        return meters/1000;
    }

    toMins(seconds) {
        return seconds/60;
    }

    toKmh(mps) {
        return mps*3.6;
    }

    calcSpeed(distance,duration) {
        return (distance/duration).toFixed(2);
    }

    openAddEntryModal(e) {
        e.preventDefault();
        this.setState({
            isAddEntryModalOpen:true
        })
    }

    onModalClosed(e) {
        e.preventDefault();
        this.setState({
            isAddEntryModalOpen:false
        });
    }

    onSuccessfulSubmission(entry) {
        this.setState({
            isAddEntryModalOpen:false,
            entries:[entry,...this.state.entries]
        });
    }

    render() {
        if(this.state.isLoading) {
            return <div className="body-container">
                <div className="inner-card card card-1">Loading...</div>
            </div>;
        }
        else {
            return <div>
                {this.state.isAddEntryModalOpen?<AddEntryModal authToken={this.state.authToken} onModalClosed={this.onModalClosed} onSuccessfulSubmission={this.onSuccessfulSubmission} />:""}
                <div className="body-container">
                    <div className="inner-card card card-1"><a className="button" onClick={this.openAddEntryModal}href="#">Add Entry</a></div>
                </div>
                <this.Entries />
            </div>;
        }
    }
}