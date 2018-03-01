import React from "react";
import {Link} from "react-router-dom";
const autoBind = require("react-auto-bind");

export class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            authToken:props.authToken
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.authToken !== this.state.authToken) {
            this.setState({
                authToken:newProps.authToken
            });
        }
    }

    render() {
        if(this.state.authToken) {
            return <header className="site-header"><Link to="/">Spork</Link><Link className="header-text-element" to="/logout">Logout</Link></header>
        }
        else {
            return <header className="site-header"><Link to="/">Spork</Link><span className="header-text-element"><Link to="/login">Login</Link> | <Link className="header-text-element" to="/register">Register</Link></span></header>
        }
    }
}