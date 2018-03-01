import React from "react";
import {ApiClient} from "./api-client";

const autoBind = require("react-auto-bind");

export class UserManagerComponent extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            authToken:props.authToken,
            isLoading:true,
            isAuthenticated:false
        }
    }

    async componentDidMount() {
        if(this.state.authToken) {
            let result = await ApiClient.getUser(this.state.authToken);
            if(result.status === 200 && result.data.user.isUserManager) {
                this.setState({
                    isLoading:false,
                    isAuthenticated:true
                })
            }
            else {
                this.setState({
                    isLoading:false
                })
            }
        }
    }

    render() {
        if(this.state.isLoading) {
            return <div className="body-container">
                <div className="inner-card card card-1">Loading...</div>
            </div>;
        }
        else if(this.state.isAuthenticated) {
            return <div className="body-container">
                <div className="inner-card card card-1">Welcome, you are in</div>
            </div>;
        }
        else {
            return <div className="body-container">
                <div className="inner-card card card-1">Not authenticated</div>
            </div>;
        }
    }
}