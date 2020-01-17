import React, { Component } from "react";
import { updatePost, singlePost } from "../post/apiPost.js";
import { isAuthenticated } from "../auth/index.js";
import { Redirect } from "react-router-dom";
import DefaultPostImage from "../images/naruto.jpg"

class EditPost extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            title: "",
            body: "",
            redirectToPost: false,
            fileSize: 0,
            error: "",
            loading: false
        }
    }

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
    }

    init = (postId) => {
        singlePost(postId)
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    this.setState({
                        id: data._id,
                        idPostedBy: data.postedBy._id,
                        title: data.title,
                        body: data.body,
                        error: ""
                    })
                }
            })
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" });

        const value = name === "photo" ? event.target.files[0] : event.target.value;
        const fileSize = name === "photo" ? event.target.files[0].size : 0;

        this.postData.set(name, value);
        return this.setState({ [name]: value, fileSize })
    }

    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required!" })
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
            const postId = this.state.id;
            const token = isAuthenticated().token;

            updatePost(postId, token, this.postData)
                .then((data) => {
                    if (data.error) {
                        console.log(data.error);
                    }
                    else {
                        this.setState({ redirectToPost: true })
                    }
                })
        }

    }

    editPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Post Photo</label>
                <input
                    type="file"
                    onChange={this.handleChange("photo")}
                    className="form-control"
                    accept="image/*"
                //src={photo}
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
                Update Post
        </button>
        </form>
    )

    render() {

        const { id, idPostedBy, title, body, redirectToPost, error, loading } = this.state;

        if (redirectToPost) {
            return <Redirect to={`/post/${id}`} />
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Post</h2>

                {loading && (
                    <div className="jumbotron mt-3">
                        <h2>Loading...</h2>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger mt-3">
                        {error}
                    </div>
                )}

                <img
                    style={{ height: "200px", width: "auto" }}
                    className="img-thumbnail"
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`}
                    onError={(i) => (i.target.src = `${DefaultPostImage}`)}
                    alt={title}
                />
                
                {/* {isAuthenticated().user.role === "admin" &&
                    (isAuthenticated().user._id === idPostedBy &&
                        this.editPostForm(title, body))} */}

                {this.editPostForm(title, body)}
            </div>
        )

    }
}

export default EditPost;