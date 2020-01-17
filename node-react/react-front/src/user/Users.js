import React, { Component } from "react";
import { getUsers } from "./apiUser.js"
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png"

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        getUsers()
            .then((data) => {
                this.setState({ users: data });
            })
            .catch((err) => console.log(err))
    }

    renderUsers = (users) => (

        <div className="row">
            {
                users.map((user, i) => (
                    <div className="card col-md-4 mb-4" key={i}>
                        <img
                            style={{ height: "200px", width: "auto" }}
                            className="img-thumbnail"
                            src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                            onError={(i) => (i.target.src = `${DefaultProfile}`)}
                            alt={user.name}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">
                                {user.email}
                            </p>
                            <Link to={`/user/${user._id}`} className="btn btn-raised btn-dark">View Profile</Link>
                        </div>
                    </div>
                ))
            }
        </div>

    )

    render() {
        const { users } = this.state;
        return (
            <div className="container" >
                <h2 className="mt-5 mb-5">Users</h2>

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;