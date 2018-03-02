import React from "react";
import {MapComponent} from "./map-component";

const autoBind = require("react-auto-bind");

export class ChangePasswordModal extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.onModalClosed = props.onModalClosed;
        this.onSubmission = props.onSubmission;
        this.state = {
            password:"",
            userId:props.userId
        }
    }


    async onFormSubmit(e) {
        e.preventDefault();
        this.onSubmission(this.state.userId,this.state.password);
    }

    onChangePassword(e) {
        e.preventDefault();
        this.setState({
            password:e.target.value
        });
    }


    render() {
        return <div className="modal">
            <div className="modal-inner">
                <div className="body-container">
                    <div className="inner-card card card-1">
                        <h1>Change password</h1>
                    </div>
                    <div className="inner-card card card-1">
                        <form className="modal-form" onSubmit={this.onFormSubmit}>
                            <div className="input-group"><label>New password:</label><input className="text-input" onChange={this.onChangePassword} type='password' name="password"  value={this.state.password} /></div>
                            <div>
                            <input className="button" type="submit" value="Submit" />
                            <button className="button"onClick={this.onModalClosed}>Close</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>;
    }
}