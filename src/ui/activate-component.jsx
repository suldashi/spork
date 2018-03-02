import React from "react";
import { Redirect } from 'react-router-dom'
import {ApiClient} from "./api-client";

const autoBind = require("react-auto-bind");

export class ActivateComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        
        this.onLoginSuccessful = props.onLoginSuccessful;
        this.state = {
            activationSucceeded:false,
            isActivationInProgress: true,
            activationCode:props.activationCode
        };
    }

    async componentDidMount() {
        if(this.state.activationCode!==0) {
            let result = await ApiClient.activateAccount(this.state.activationCode);
            if(result.status===200) {
                this.setState({
                    activationSucceeded:true,
                    isActivationInProgress:false
                });
            }
            else {
                this.setState({
                    isActivationInProgress:false
                })
            }
        }
    }

    render() {
        if(this.state.activationSucceeded) {
            return <Redirect to="/login" />
        }
        else if(this.state.isActivationInProgress) {
            return <div className="body-container">
                <div className="inner-card card card-1">
                        <h3>Activating account,please wait...</h3>
                    </div>
            </div>;
        }
        else {
            return <div className="body-container">
                <div className="inner-card card card-1">
                        <h3>Invalid account activation code</h3>
                    </div>
            </div>;
        }   
    }
}