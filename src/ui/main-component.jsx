import React from "react";
import { Switch, Route, Link } from 'react-router-dom'
import {HomeComponent} from './home-component';
import {NotFoundComponent} from './not-found-component';
import {LoginComponent} from './login-component';
import {LogoutComponent} from './logout-component';
import {RegisterComponent} from './register-component';
import {HeaderComponent} from "./header-component";
const autoBind = require("react-auto-bind");

export class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return <div>
            <HeaderComponent />
            <Switch>
                <Route exact path="/" component={this.HomeComponentWithProps} />
                <Route exact path="/login" component={this.LoginComponent} />
                <Route exact path="/logout" component={this.LogoutComponent} />
                <Route exact path="/register" component={this.RegisterComponent} />
                <Route exact path="*" component={this.NotFoundComponentWithProps} />
            </Switch>
        </div>;
    }

    componentWillMount() {
        this.authToken = localStorage.getItem("authToken");
    }

    componentWillUpdate() {
        this.authToken = localStorage.getItem("authToken");
    }

    HomeComponentWithProps() {
        return <HomeComponent authToken={this.authToken} />
    }

    LoginComponent() {
        return <LoginComponent authToken={this.authToken} onLoginSuccessful={this.loginCallback} />
    }

    LogoutComponent() {
        return <LogoutComponent authToken={this.authToken} onLogout={this.logoutCallback} />
    }

    NotFoundComponentWithProps() {
        return <NotFoundComponent authToken={this.authToken} />
    }

    RegisterComponent() {
        return <RegisterComponent authToken={this.authToken} />
    }

    loginCallback(authToken) {
        localStorage.setItem("authToken",authToken);
    }

    logoutCallback() {
        localStorage.removeItem("authToken");
    }
}