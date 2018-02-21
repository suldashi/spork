import React from "react";
import { Redirect } from 'react-router-dom'
const autoBind = require("react-auto-bind");

export class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        
        this.username = "";
        this.password = "";

        this.submitLogin = this.submitLogin.bind(this);
        this.updateInputForms = this.updateInputForms.bind(this);
        this.onLoginSuccessful = props.onLoginSuccessful;
        this.state = {
            isLoginInProgress: false,
            formHasError: false,
            loginSucceeded: false,
            needsActivation:false
        };
    }

    render() {
        if(this.state.loginSucceeded) {
            return <Redirect to="/" />
        }
        else if(this.state.needsActivation) {
            return <div>y'all need to activate your account</div>
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
        e.preventDefault();
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
                needsActivation:true
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