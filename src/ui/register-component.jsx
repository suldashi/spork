import React from "react";
import {Link} from "react-router-dom";
import {ApiClient} from "./api-client";

const autoBind = require("react-auto-bind");

export class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.username = "";
        this.password = "";
        this.state = {
            isRegistrationInProgress:false,
            formHasError: false,
            registrationSucceeded: false
        }
    }

    render() {
        if(this.state.registrationSucceeded) {
            return <div className="body-container"><div className="inner-card card card-1"><h3>Registration successful. <Link to="/login">Click here to log in</Link></h3></div></div>;
        }
        else {
            return <div className="body-container">
                <div className="inner-card card card-1">
                    <h1>Register to Spork</h1>
                </div>
                <div className="inner-card card card-1">
                    <form onSubmit={this.submitRegister}>
                        {this.state.formHasError?<div>Username is already in use</div>:""}
                        <div className="input-group"><label>Username</label><input className="text-input" autoFocus onChange={this.updateInputForms} type='text' name="username"/></div>
                        <div className="input-group"><label>Password</label><input className="text-input" onChange={this.updateInputForms} type='password' name="password"/></div>
                        <input disabled={this.state.isRegistrationInProgress} className="button" type="submit" value="Register" />
                    </form>
                </div>
            </div>;
        }   
    }

    updateInputForms(e) {
        this[e.target.name] = e.target.value;
        this.setState({
            formHasError:false
        });
    }

    async submitRegister(e) {
        if(e) {
            e.preventDefault();
        }
        this.setState({
            isRegistrationInProgress:true
        });

        let result = await ApiClient.registerUser(this.username,this.password);
        if(result.status!==200) {
            this.setState({
                formHasError:true,
                isRegistrationInProgress: false
            })
        }
        else {
            this.setState({
                formHasError:false,
                isRegistrationInProgress: false,
                registrationSucceeded: true
            });
        }
    }
}