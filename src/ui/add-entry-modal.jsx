import React from "react";
import {MapComponent} from "./map-component";

const autoBind = require("react-auto-bind");

export class AddEntryModal extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.onModalClosed = props.onModalClosed;
        this.state = {
            distance:"",
            duration:""
        }
    }

    onFormSubmit(e) {
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

    render() {
        return <div className="modal">
            <form onSubmit={this.onFormSubmit}>
                <input onChange={this.onChangeDistance} type="text" name="distance" value={this.state.distance} />
                <input onChange={this.onChangeDuration} type="text" name="duration" value={this.state.duration} />
            </form>
            <MapComponent isMarkerShown={true} />
        </div>
    }
}