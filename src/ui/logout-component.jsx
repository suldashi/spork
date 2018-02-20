import React from "react";
import { Redirect } from 'react-router-dom'
const autoBind = require("react-auto-bind");

export class LogoutComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        props.onLogout();
    }

    render() {
        return <Redirect to="/" />;
    }
}