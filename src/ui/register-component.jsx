import React from "react";
import {Link} from "react-router-dom";

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
            return <div>Registration successful, activation code has been sent to your email. <Link to="/login">Click here to log in</Link></div>;
        }
        else {
            return <div>
                <form onSubmit={this.submitRegister}>
                    <div><label>Username</label><input autoFocus onChange={this.updateInputForms} type='text' name="username"/></div>
                    <div><label>Password</label><input onChange={this.updateInputForms} type='password' name="password"/></div>
                    <div>
                        <input disabled={this.state.isRegistrationInProgress} type="submit" value="Login"/>
                        {this.state.isRegistrationInProgress?<div className="spinner" />:""}
                    </div>
                    {this.state.formHasError?<div>
                        <div>Username is already in use</div>
                    </div>:""}
                </form>
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
        let res = await fetch("/api/auth/register",{
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