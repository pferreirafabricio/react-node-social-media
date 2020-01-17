import React, { Component } from "react";
import { isAuthenticated } from "../auth/index.js";
import { read } from "./apiUser";
import { Redirect } from "react-router-dom";
import { updateProfile } from "./apiUser.js";
import DefaultProfile from "../images/avatar.png";
import { updateUser } from "./apiUser.js";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            about: "",
            password: "",
            redirectToProfile: false,
            error: "",
            fileSize: 0,
            loading: false
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token)
            .then((data) => {
                if (data.error) {
                    this.setState({ redirectToProfile: true });
                }
                else {
                    this.setState({
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        about: data.about
                    })
                }
            });
    }

    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    isValid = () => {
        const { name, email, password, fileSize } = this.state;
        if (name.length === 0) {
            this.setState({ error: "Name is required" })
            return false
        }
        if (fileSize > 100000) {
            this.setState({ error: "File size should be less than 100kb" })
            return false
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({ error: "A valid Email is required" })
            return false
        }
        if (password.length >= 1 && password.length <= 5) {
            this.setState({ error: "Password must be at least 6 characters long" })
            return false
        }
        return true;
    }

    clickSubmit = (event) => {
        event.preventDefault();

        if (this.isValid()) {
            this.setState({ loading: true });
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            updateProfile(userId, token, this.userData)
                .then((data) => {
                    if (data.error) {
                        return this.setState({ error: data.error })
                    }
                    else if (isAuthenticated().user.role === "admin") {
                        this.setState({
                            redirectToProfile: true
                        });
                    }
                    else {
                        // if same user update localstorage and redirect
                        updateUser(data, () => {
                            this.setState({
                                redirectToProfile: true
                            });
                        });
                    }
                });
        }
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" });

        const value = name === "photo" ? event.target.files[0] : event.target.value;
        const fileSize = name === "photo" ? event.target.files[0].size : 0;

        this.userData.set(name, value);
        return this.setState({ [name]: value, fileSize });
    }

    updateForm = (name, email, about, password) => (
        <form>

            <div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <input
                    type="file"
                    onChange={this.handleChange("photo")}
                    className="form-control"
                    accept="image/*"
                />
            </div>

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
                <label className="text-muted">About</label>
                <textarea
                    type="text"
                    onChange={this.handleChange("about")}
                    className="form-control"
                    value={about}
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

            <button
                className="btn btn-raised btn-warning"
                onClick={this.clickSubmit}
            >
                Update Profile
            </button>
        </form>
    )

    render() {
        const { id, name, email, about, password, redirectToProfile, error, loading } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />
        }

        const photoUrl = (id)
            ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`
            : DefaultProfile;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit your profile</h2>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : ("")}

                <img
                    style={{ height: "200px", width: "auto" }}
                    className="img-thumbnail"
                    src={photoUrl}
                    onError={(i) => (i.target.src = `${DefaultProfile}`)}
                    alt={name}
                />

                {/* {isAuthenticated().user.role === "admin" ||
                    (isAuthenticated().user._id === id &&
                        this.updateForm(name, email, about, password))} */}

                {this.updateForm(name, email, about, password)}
            </div>
        )
    }
}

export default EditProfile;