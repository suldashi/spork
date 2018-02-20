import React from "react";
const autoBind = require("react-auto-bind");

export class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return <div>this is where we would register users</div>;
    }
}