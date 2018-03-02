import React from "react";
import {Link} from "react-router-dom";
import {ApiClient} from "./api-client";

const autoBind = require("react-auto-bind");

export class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            authToken:props.authToken,
            user:null
        }
    }

    componentDidMount() {
        if(this.state.authToken) {
            this.updateUser(this.state.authToken);
        }
    }

    async updateUser(authToken) {
        let result = await ApiClient.getUser(authToken);
        if(result.status===200) {
            this.setState({
                user:result.data.user
            },() => {
                console.log(this.state);
            })
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.authToken !== this.state.authToken) {
            this.setState({
                authToken:newProps.authToken
            },() => {
                this.updateUser(newProps.authToken);
            });
        }
    }

    render() {
        if(this.state.authToken) {
            return <header className="site-header">
                <Link to="/">Spork</Link>&nbsp;|&nbsp;<Link to="/weekly">Weekly Statistics</Link>
                <span className="header-text-element">
                    {this.state.user?<span>Welcome {this.state.user.username} | </span>:""}
                    {this.state.user && this.state.user.isUserManager?<Link to="/userManager">User manager | </Link>:""}
                    <Link to="/logout">Logout</Link>
                </span>
            </header>
        }
        else {
            return <header className="site-header"><Link to="/">Spork</Link><span className="header-text-element"><Link to="/login">Login</Link> | <Link className="header-text-element" to="/register">Register</Link></span></header>
        }
    }
}