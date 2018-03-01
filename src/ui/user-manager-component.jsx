import React from "react";
import {ApiClient} from "./api-client";
import {Link} from "react-router-dom";

const autoBind = require("react-auto-bind");

export class UserManagerComponent extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            authToken:props.authToken,
            isLoading:true,
            isAuthenticated:false,
            isLoadingUsers:true,
            isAdmin:false,
            users:null
        }
    }

    async componentDidMount() {
        if(this.state.authToken) {
            let result = await ApiClient.getUser(this.state.authToken);
            if(result.status === 200 && result.data.user.isUserManager) {
                this.setState({
                    isLoading:false,
                    isAuthenticated:true,
                    isAdmin:result.data.user.isAdmin
                });
                this.getUsers();
            }
            else {
                this.setState({
                    isLoading:false
                })
            }
        }
    }

    async getUsers() {
        let result = await ApiClient.getAllUsers(this.state.authToken);
        if(result.status===200) {
            this.setState({
                isLoadingUsers:false,
                users:result.data.users
            })
        }
    }

    async deleteUser(userId) {
        let result = await ApiClient.deleteUser(this.state.authToken,userId);
        if(result.status===200) {
            this.setState({
                users:this.state.users.filter((el) => el.id !== userId)
            })
        }
    }

    Users() {
        return <div>
            {this.state.users.map((el) => <this.User user={el} key={el.id} />)}
        </div>
    }

    User(props) {
        return <div className="body-container">
            <div className="inner-card card card-1">
            {this.state.isAdmin?<Link to={"/admin/"+props.user.id}>{props.user.username}</Link>:<h3>{props.user.username}</h3>}
            <button onClick={(e) => {e.preventDefault();this.deleteUser(props.user.id)}} className="button">Delete User</button>
            </div>
        </div>
    }

    render() {
        if(this.state.isLoading) {
            return <div className="body-container">
                <div className="inner-card card card-1">Loading...</div>
            </div>
        }
        else if(this.state.isAuthenticated) {
            return <div className="body-container">
                {this.state.isLoadingUsers?
                <div className="inner-card card card-1">Loading users...</div>:
                <this.Users />}
            </div>
        }
        else {
            return <div className="body-container">
                <div className="inner-card card card-1">Not authenticated</div>
            </div>
        }
    }
}