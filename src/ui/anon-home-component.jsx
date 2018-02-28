import React from "react";
import {Link} from "react-router-dom";

const autoBind = require("react-auto-bind");

export class AnonHomeComponent extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return <div>Welcome to Spork, the jogging tracker!<Link to="/login">Login</Link> or <Link to="/register">register</Link></div>;
    }
}