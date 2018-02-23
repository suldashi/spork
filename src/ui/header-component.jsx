import React from "react";
const autoBind = require("react-auto-bind");

export class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return <header>this is snek</header>
        
    }
}