import React from "react";
import {Link} from "react-router-dom";

const autoBind = require("react-auto-bind");

export class AnonHomeComponent extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return <div className="body-container">
            <div className="inner-card card card-1">
                <h1>Spork Jogging Tracker</h1>
            </div>
            <div className="inner-card card card-1">
                <h3>Welcome to Spork, the jogging tracker! <Link to="/login">Login</Link> or <Link to="/register">register</Link></h3>
            </div>
        </div>;
    }
}