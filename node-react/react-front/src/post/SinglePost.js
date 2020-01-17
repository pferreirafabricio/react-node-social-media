import React, { Component } from "react";
import { singlePost, deletePost, like, unlike } from "./apiPost.js";
import { Link } from "react-router-dom";
import DefaultPostImage from "../images/naruto.jpg";
import { isAuthenticated } from "../auth/index.js";
import { Redirect } from "react-router-dom";
import Comment from "./Comment.js";

class SinglePost extends Component {

    constructor() {
        super();
        this.state = {
            post: "",
            redirectToHome: false,
            like: false,
            likes: 0,
            redirectToSignin: false,
            comments: []
        }
    }

    checkLike = (likes) => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1; //-1 = not found
        return match
    }

    componentDidMount() {
        const postId = this.props.match.params.postId;

        singlePost(postId)
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    this.setState({
                        post: data,
                        likes: data.likes.length,
                        like: this.checkLike(data.likes),
                        comments: data.comments
                    })
                }
            })
    }

    remove = () => {
        const postId = this.state.post._id;
        const token = isAuthenticated().token;

        deletePost(postId, token)
            .then((data) => {
                if (data.error) {
                    return console.log(data.error);
                }
                else {
                    this.setState({ redirectToHome: true });
                }
            })
    };

    deleteConfirmed = () => {
        let answer = window.confirm("Are sure you want to delete this post?");
        if (answer) {
            this.remove()
        }
    }

    likeToggle = () => {
        if (!isAuthenticated()) {
            this.setState({ redirectToSignin: true });
            return false;
        }
        let callApi = this.state.like ? unlike : like;
        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;

        callApi(postId, userId, token)
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    this.setState({
                        like: !this.state.like,
                        likes: data.likes.length,
                    })
                }
            })
    }

    updateComments = (comments) => {
        this.setState({ comments })
    }

    renderPost = (post) => {
        const posterId = post.postedBy ? post.postedBy._id : "";
        const posterName = post.postedBy ? post.postedBy.name : "Unknown";

        const { like, likes } = this.state;

        return (
            <div>
                <p className="font-italic mb-5" style={{ fontSize: "14px" }}>
                    Posted by:
                    {" "}
                    <Link to={`/user/${posterId}`}>
                        {posterName}
                        {" "}
                    </Link>
                    on {" "}
                    {new Date(post.created).toDateString()}
                </p>

                <img
                    style={{
                        height: "300px",
                        width: "100%",
                        objectFit: "cover"
                    }}
                    className="mb-4"
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}`}
                    onError={(i) => (i.target.src = `${DefaultPostImage}`)}
                    alt={post.title}
                />

                {like ? (
                    <h3 onClick={this.likeToggle} style={{ cursor: "pointer" }}>
                        <i
                            className="far fa-thumbs-up text-success mr-2"
                            style={{
                                padding: "10px",
                                borderRadius: "50%"
                            }}
                        >
                        </i>
                        {likes} Like
                    </h3>
                ) : (
                        <h3 onClick={this.likeToggle} style={{ cursor: "pointer" }}>
                            <i
                                className="far fa-thumbs-down text-danger mr-2"
                                style={{
                                    padding: "10px",
                                    borderRadius: "50%"
                                }}
                            >
                            </i>
                            {likes} Like
                    </h3>
                    )}

                <div className="lead">
                    {post.body}
                </div>

                <div className="d-inline-block">
                    <Link
                        to={"/"}
                        className="btn btn-raised btn-dark btn-sm mt-5 mr-3"
                    >
                        Back to posts
                    </Link>

                    {
                        isAuthenticated().user && isAuthenticated().user._id === posterId && (
                            <>
                                <Link
                                    to={`/post/edit/${post._id}`}
                                    className="btn btn-raised btn-success btn-sm mt-5 mr-3"
                                >
                                    Update post
                            </Link>

                                <Link
                                    onClick={this.deleteConfirmed}
                                    className="btn btn-raised btn-danger btn-sm mt-5 mr-3"
                                >
                                    Delete post
                            </Link>
                            </>
                        )
                    }

                </div>

                <div>
                    {isAuthenticated().user &&
                        isAuthenticated().user.role === "admin" && (
                            <div className="card mt-5">
                                <div className="card-body">
                                    <h5 className="card-title">Admin</h5>
                                    <p className="mb-2 text-danger">
                                        Edit/Delete as an Admin
                                    </p>
                                    <Link
                                        to={`/post/edit/${post._id}`}
                                        className="btn btn-raised btn-warning btn-sm mr-5"
                                    >
                                        Update Post
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirmed}
                                        className="btn btn-raised btn-danger"
                                    >
                                        Delete Post
                                    </button>
                                </div>
                            </div>
                        )}
                </div>


            </div>
        )
    }

    render() {
        const { post, redirectToHome, redirectToSignin, comments } = this.state;

        if (redirectToHome) {
            return <Redirect to="/" />
        }

        if (redirectToSignin) {
            return <Redirect to="/signin" />
        }

        return (
            <div className="container">
                <h2 className="display-2 mt-5">{post.title}</h2>
                {!post ? (
                    <div className="jumbotron mt-4">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                        this.renderPost(post)
                    )}

                <Comment
                    postId={post._id}
                    comments={comments.reverse()}
                    updateComments={this.updateComments}
                />
            </div>
        )
    }
}

export default SinglePost;