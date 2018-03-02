import React from "react";
import {MapComponent} from "./map-component";

const moment = require('moment');
const Datetime = require('react-datetime');

const autoBind = require("react-auto-bind");

export class ViewMapModal extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.onModalClosed = props.onModalClosed;
        this.state = {
            location:props.location,
        }
    }

    render() {
        return <div className="modal">
            <div className="modal-inner">
                <div className="body-container">
                    <div className="inner-card card card-1">
                     <button className="button" disabled={this.state.isSubmitting} onClick={this.onModalClosed}>Close</button>
                    </div>
                    <div className="inner-card card card-1">
                         <MapComponent />
                    </div>
                </div>
            </div>
        </div>
    }
}