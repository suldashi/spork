import React from "react";

export class ForbiddenComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>403 forbidden</div>;
    }
}