import React from "react";
import { Redirect } from 'react-router-dom'
import {ApiClient} from "./api-client";

const autoBind = require("react-auto-bind");

export class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        
        this.username = "";
        this.password = "";

        this.onLoginSuccessful = props.onLoginSuccessful;
        this.state = {
            isLoginInProgress: false,
            formHasError: false,
            loginSucceeded: false,
            needsActivation:false,
            activationCodeGenerator:null,
            activationCode:null,
            passwordHasBeenReset:false
        };
    }

    async sendActivationEmail(e) {
        e.preventDefault();
        let result = await ApiClient.sendActivationEmail(this.state.activationCodeGenerator);
        this.setState({
            activationCode:result.data.activationCode
        });
    }

    async activateAccount(e) {
        e.preventDefault();
        let result = await ApiClient.activateAccount(this.state.activationCode);
        if(result.status===200) {
            this.submitLogin();
        }
    }

    render() {
        if(this.state.loginSucceeded) {
            return <Redirect to="/" />
        }
        else if(this.state.activationCode) {
            return <button onClick={this.activateAccount}>Activate account</button>;
        }
        else if(this.state.needsActivation) {
            return <div>y'all need to activate your account
            <button onClick={this.sendActivationEmail}>Send Activation Code</button></div>;
        }
        else {
            return <div>
                <form onSubmit={this.submitLogin}>
                    <div><label>Username</label><input autoFocus onChange={this.updateInputForms} type='text' name="username"/></div>
                    <div><label>Password</label><input onChange={this.updateInputForms} type='password' name="password"/></div>
                    <div>
                        <input disabled={this.state.isLoginInProgress} type="submit" value="Login"/>
                        {this.state.isLoginInProgress?<div className="spinner" />:""}
                    </div>
                    {this.state.formHasError?<div>
                        <div>Username or password are invalid</div>
                    <div>{this.state.passwordHasBeenReset?<div>Password reset link has been sent to your email</div>:<button onClick={this.resetPassword}>Reset password</button>}</div>
                    </div>:""}
                </form>
            </div>
        }   
    }

    updateInputForms(e) {
        this[e.target.name] = e.target.value;
        this.setState({
            formHasError:false
        });
    }

    resetPassword() {
        this.setState({
            passwordHasBeenReset:true
        });
    }

    async submitLogin(e) {
        if(e) {
            e.preventDefault();
        }
        this.setState({
            isLoginInProgress:true
        });
        let result = await ApiClient.login(this.username,this.password);
        if(result.status!==200) {
            this.setState({
                formHasError:true,
                isLoginInProgress: false
            })
        }
        else if(result.data.needsActivation) {
            this.setState({
                needsActivation:true,
                activationCodeGenerator:result.data.activationCodeGenerator
            });
        }
        else {
            this.onLoginSuccessful(result.data.authToken);
            this.setState({
                formHasError:false,
                isLoginInProgress: false,
                loginSucceeded: true
            });
        }
    }
}