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
            isAddEntryModalOpen:false,
            activeEntry:null,
            addEditSubmitCallback:this.onAddEntry
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
        this.setState({
            isAddEntryModalOpen:true,
            activeEntry:entry,
            addEditSubmitCallback:this.editEntry
        });
    }

    async editEntry(entry) {
        let result = await ApiClient.editEntry(this.state.authToken,entry.id,entry.distance,entry.duration,entry.timestamp,entry.location);
        if(result.status===200) {
            this.setState({
                entries:this.state.entries.map((el) => {
                    return el.id === entry.id?
                    {
                        id:el.id,
                        userId:el.userId,
                        distance:entry.distance,
                        duration:entry.duration,
                        timestamp:entry.timestmap,
                        location:entry.location
                    }:
                    el
                }),
                activeEntry:null,
                addEditSubmitCallback:this.onAddEntry,
                isAddEntryModalOpen:false
            });
        }
        else {
            this.setState({
                activeEntry:null,
                addEditSubmitCallback:this.onAddEntry,
                isAddEntryModalOpen:false
            })
        }
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

    async onAddEntry(entry) {
        let result = await ApiClient.addEntry(this.state.authToken,entry.distance,entry.duration,entry.timestamp,entry.location);
        entry.id = result.data.entryId;
        if(result.status===200) {
            this.setState({
                isAddEntryModalOpen:false,
                entries:[entry,...this.state.entries]
            });
        }
        else {
            this.setState({
                isAddEntryModalOpen:false
            });
        }
    }

    render() {
        if(this.state.isLoading) {
            return <div className="body-container">
                <div className="inner-card card card-1">Loading...</div>
            </div>;
        }
        else {
            return <div>
                {this.state.isAddEntryModalOpen?<AddEntryModal authToken={this.state.authToken} entry={this.state.activeEntry} onModalClosed={this.onModalClosed} onSubmission={this.state.addEditSubmitCallback} />:""}
                <div className="body-container">
                    <div className="inner-card card card-1"><a className="button" onClick={this.openAddEntryModal}href="#">Add Entry</a></div>
                </div>
                <this.Entries />
            </div>;
        }
    }
}