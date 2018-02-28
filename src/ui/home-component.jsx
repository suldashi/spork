import React from "react";
import {Link} from "react-router-dom";
import {ApiClient} from "./api-client";

import {AddEntryModal} from "./add-entry-modal";

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
            return <div>no entries</div>;
        }
    }

    Entry(props) {
        return <div className="home-entry">
            <div>Distance: {this.toKm(props.entry.distance)}Km</div>
            <div>Duration: {this.toMins(props.entry.duration)}min</div>
            <div>Average Speed: {this.toKmh(this.calcSpeed(props.entry.distance,props.entry.duration))}Km/h</div>
            <div>Time:{props.entry.timestamp}</div>
            <div>Location:<a onClick={(e) => {this.displayMap(e,props.entry.location)}} href="#">View on map</a></div>
        </div>;
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

    render() {
        if(this.state.isLoading) {
            return <div>loading...</div>;
        }
        else {
            return <div>
                {this.state.isAddEntryModalOpen?<AddEntryModal onModalClosed={this.onModalClosed} />:""}
                <a onClick={this.openAddEntryModal}href="#">Add Entry</a>
                <this.Entries />
            </div>;
        }
    }
}