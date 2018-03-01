import React from "react";
import { Switch, Route, Link } from 'react-router-dom'
import {HomeComponent} from './home-component';
import {UserManagerComponent} from './user-manager-component';
import {AdminComponent} from './admin-component';
import {AnonHomeComponent} from './anon-home-component';
import {NotFoundComponent} from './not-found-component';
import {ForbiddenComponent} from './forbidden-component';
import {LoginComponent} from './login-component';
import {LogoutComponent} from './logout-component';
import {RegisterComponent} from './register-component';
import {HeaderComponent} from "./header-component";
const autoBind = require("react-auto-bind");

export class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            authToken:localStorage.getItem("authToken")
        };
    }

    render() {
        return <div>
            <HeaderComponent authToken={this.state.authToken} />
            <Switch>
                <Route exact path="/" component={this.HomeComponentWithProps} />
                <Route exact path="/login" component={this.LoginComponent} />
                <Route exact path="/logout" component={this.LogoutComponent} />
                <Route exact path="/register" component={this.RegisterComponent} />
                <Route exact path="/userManager" component={this.UserManagerComponentWithProps} />
                <Route path="/admin/:userId" component={this.AdminComponent} />
                <Route exact path="*" component={this.NotFoundComponentWithProps} />
            </Switch>
        </div>;
    }

    AdminComponent(props) {
        return <AdminComponent userId={props.match.params.userId} authToken={this.state.authToken} />
    }

    UserManagerComponentWithProps() {
        return <UserManagerComponent authToken={this.state.authToken} />
    }

    HomeComponentWithProps() {
        if(this.state.authToken) {
            return <HomeComponent authToken={this.state.authToken} />;
        }
        else {
            return <AnonHomeComponent />;
        }   
    }

    LoginComponent() {
        return <LoginComponent authToken={this.state.authToken} onLoginSuccessful={this.loginCallback} />;
    }

    LogoutComponent() {
        return <LogoutComponent authToken={this.state.authToken} onLogout={this.logoutCallback} />;
    }

    NotFoundComponentWithProps() {
        return <NotFoundComponent authToken={this.state.authToken} />;
    }

    RegisterComponent() {
        return <RegisterComponent authToken={this.state.authToken} />;
    }

    loginCallback(authToken) {
        localStorage.setItem("authToken",authToken);
        this.setState({
            authToken
        });
    }

    logoutCallback() {
        localStorage.removeItem("authToken");
        this.setState({
            authToken:null
        });
    }
}