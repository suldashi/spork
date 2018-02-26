import React from "react";
import { Redirect } from 'react-router-dom'
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
            activationCode:null
        };
    }

    async sendActivationEmail(e) {
        e.preventDefault();
        let res = await fetch("/sendActivationCode",{
            method:"post",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                activationCodeGenerator:this.state.activationCodeGenerator
            })
        });
        let body = await res.json();
        this.setState({
            activationCode:body.activationCode
        });
    }

    async activateAccount(e) {
        e.preventDefault();
        let res = await fetch("/activate",{
            method:"post",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                activationCode:this.state.activationCode
            })
        });
        let body = await res.json();
        if(res.status===200) {
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
                        <div><button>Reset password</button></div>
                    </div>:""}
                </form>
            </div>
        }
        
    }

    updateInputForms(e) {
        this[e.target.name] = e.target.value;
        this.setState({
            formHasError:false
        })
    }

    async submitLogin(e) {
        if(e) {
            e.preventDefault();
        }
        this.setState({
            isLoginInProgress:true
        });
        let res = await fetch("/login",{
            method:"post",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username:this.username,
                password:this.password
            })
        });
        let data = await res.json();
        if(res.status!==200) {
            this.setState({
                formHasError:true,
                isLoginInProgress: false
            })
        }
        else if(data.needsActivation) {
            this.setState({
                needsActivation:true,
                activationCodeGenerator:data.activationCodeGenerator
            });
        }
        else {
            this.onLoginSuccessful(data.authToken);
            this.setState({
                formHasError:false,
                isLoginInProgress: false,
                loginSucceeded: true
            });
        }
    }
}