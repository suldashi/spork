import React from "react";
import {Link} from "react-router-dom";

const autoBind = require("react-auto-bind");

export class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.authToken = props.authToken;
    }

    render() {
    	if(this.authToken) {
    		return <div>We are logged in! AuthToken: {this.authToken} <Link to="/logout">Logout</Link></div>;
    	}
    	else {
    		return <div>We are <strong>not</strong> logged in! <Link to="/login">Login</Link></div>;
    	}
        
    }
}