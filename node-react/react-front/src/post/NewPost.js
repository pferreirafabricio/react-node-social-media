import React, { Component } from "react";
import { isAuthenticated } from "../auth/index.js";
import { createPost } from "../post/apiPost.js";
import { Redirect } from "react-router-dom";
//import { Redirect } from "react-router-dom";
//import DefaultProfile from "../images/avatar.png";

class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        }
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required" })
            return false
        }
        if (fileSize > 100000) {
            this.setState({ error: "File size should be less than 100kb" })
            return false
        }
        return true;
    }

    clickSubmit = (event) => {
        event.preventDefault();

        if (this.isValid()) {
            this.setState({ loading: true });

            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            //console.log(this.postData);
            createPost(userId, token, this.postData)
                .then((data) => {
                    //console.log(data);
                    if (data.error) {
                        return this.setState({ error: data.error })
                    }
                    else {
                        this.setState({
                            loading: false,
                            title: "",
                            body: "",
                            photo: "",
                            redirectToProfile: true
                        });
                    }
                })
        }
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" });

        const value = name === "photo" ? event.target.files[0] : event.target.value;
        const fileSize = name === "photo" ? event.target.files[0].size : 0;

        this.postData.set(name, value);
        return this.setState({ [name]: value, fileSize });
    }

    newPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Post Photo</label>
                <input
                    type="file"
                    onChange={this.handleChange("photo")}
                    className="form-control"
                    accept="image/*"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    type="text"
                    onChange={this.handleChange("title")}
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea
                    type="text"
                    onChange={this.handleChange("body")}
                    className="form-control"
                    value={body}
                />
            </div>

            <button
                className="btn btn-raised btn-warning"
                onClick={this.clickSubmit}
            >
                Create Post
            </button>
        </form>
    )

    render() {
        const { title, body, user, error, loading, redirectToProfile } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`}/>
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create a new post</h2>

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

                {this.newPostForm(title, body)}
            </div>
        )
    }
}

export default NewPost;