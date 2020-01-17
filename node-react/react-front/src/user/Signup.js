import React, { Component } from "react";
import { signup } from "../auth/index.js";
import { Link } from "react-router-dom";

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        };

        //this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    }

    clickSubmit = (event) => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        //console.log(user);
        signup(user)
            .then((data) => {
                if (data.error) this.setState({ error: data.error });
                else this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                });
            })
    };

    signupForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    onChange={this.handleChange("name")}
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">E-mail</label>
                <input
                    type="email"
                    onChange={this.handleChange("email")}
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    onChange={this.handleChange("password")}
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-success">
                Submit
        </button>
        </form>
    )

    render() {
        const { name, email, password, error, open } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created. Please <Link to="/signin">Sign In.</Link>
                </div>

                {this.signupForm(name, email, password)}

            </div>
        );
    }
};

export default Signup;