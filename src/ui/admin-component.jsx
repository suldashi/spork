import React from "react";
import {ApiClient} from "./api-client";

const moment = require("moment");

const autoBind = require("react-auto-bind");

export class AdminComponent extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            authToken:props.authToken,
            isLoading:true,
            isAuthenticated:false,
            userId:props.userId,
            entries:null,
            isAddEntryModalOpen:false,
            activeEntry:null,
            addEditSubmitCallback:this.onAddEntry
        }
    }

    async componentDidMount() {
        if(this.state.authToken) {
            let result = await ApiClient.getUser(this.state.authToken);
            if(result.status === 200 && result.data.user.isAdmin) {
                this.setState({
                    isLoading:false,
                    isAuthenticated:true
                });
                this.getEntries();
            }
            else {
                this.setState({
                    isLoading:false
                })
            }
        }
    }

    async getEntries() {
        let result = await ApiClient.getEntries(this.state.authToken,this.state.userId);
        this.setState({
            entries:result.data.entries
        });
    }

    displayMap(ev,location) {
        ev.preventDefault();
        console.log(location);
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

    async deleteEntry(entryId) {
        let result = await ApiClient.deleteEntry(this.state.authToken,entryId);
        if(result.status === 200) {
            this.setState({
                entries:this.state.entries.filter((el) => el.id !==entryId)
            })
        }
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

    render() {
        if(this.state.isLoading) {
            return <div className="body-container">
                <div className="inner-card card card-1">Loading...</div>
            </div>
        }
        else if(this.state.isAuthenticated) {
            return <this.Entries />
        }
        else {
            return <div className="body-container">
                <div className="inner-card card card-1">Not authenticated</div>
            </div>
        }
    }
}