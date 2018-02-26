import React from "react";
import {Link} from "react-router-dom";

const autoBind = require("react-auto-bind");

export class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            authToken:props.authToken
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            authToken:nextProps.authToken
        });
    }

    render() {
    	if(this.state.authToken) {
    		return <div>You should be seeting the jogging entries here pretty soon</div>;
    	}
    	else {
    		return <div>Welcome to Spork, the jogging tracker. <Link to="/login">Login</Link> or <Link to="/register">register</Link></div>;
    	}
        
    }
}