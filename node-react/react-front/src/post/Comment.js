import React, { Component } from "react";
import { comment, uncomment } from "./apiPost.js";
import { isAuthenticated } from "../auth/index.js";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png"

class Comment extends Component {

    constructor() {
        super();
        this.state = {
            text: "",
            error: ""
        }
    }

    handleChange = (event) => {
        this.setState({ error: "" });
        this.setState({ text: event.target.value });
    }

    isValid = () => {
        const { text } = this.state;

        if (!text.length > 0 || text.length > 150) {
            this.setState({
                error: "Comment should not be empty and less than 150 characters long"
            });
            return false;
        }
        return true;
    }

    addComment = (event) => {
        event.preventDefault();

        if (!isAuthenticated()) {
            this.setState({ error: "Plase signin to leave a comment" });
            return false;
        }

        if (this.isValid()) {
            const postId = this.props.postId;
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            comment(postId, userId, { text: this.state.text }, token)
                .then((data) => {
                    if (data.error) {
                        console.log(data.error);
                    }
                    else {
                        this.setState({ text: "" });
                        //Dispatch fresh list of comments to parent (SinglePost)
                        this.props.updateComments(data.comments);
                    }

                })

        }
    };

    deleteComment = (comment) => {
        const postId = this.props.postId;
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        uncomment(postId, userId, comment, token)
            .then((data) => {
                if (data.error) {
                    return console.log(data.error);
                }
                else {
                    this.props.updateComments(data.comments);
                }
            })
    };

    deleteConfirmed = (comment) => {
        let answer = window.confirm("Are sure you want to delete your comment?");
        if (answer) {
            this.deleteComment(comment)
        }
    }

    render() {
        const { comments } = this.props;
        const { error } = this.state;

        return (
            <div>
                <h2 className="mt-5 mb-5">Leave a comment</h2>

                <form onSubmit={this.addComment}>
                    <div className="input-group">
                        <input
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.text}
                            className="form-control"
                            placeholder="Write a comment..."
                        >
                        </input>
                        <button className="input-group-btn btn btn-raised btn-success">
                            Post
                        </button>
                    </div>
                </form>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div className="col-md-12 col-md-offset-4">
                    <h3 className="text-primary">{comments.length} Comments</h3>
                    <hr />

                    {
                        comments.map((comment, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${comment.postedBy._id}`}>
                                        <img
                                            className="float-left mr-3"
                                            style={{
                                                height: "30px",
                                                width: "30px",
                                                borderRadius: "50%",
                                                border: "1px solid #000"
                                            }}
                                            src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                                            alt={`${comment.postedBy.name}`}
                                            onError={i => (i.target.src = `${DefaultProfile}`)}
                                        />
                                    </Link>

                                    <div className="mt-2">
                                        <p className="lead">{comment.text}</p>
                                    </div>

                                    <p className="font-italic" style={{ fontSize: "14px" }}>
                                        Posted by:
                                        {" "}
                                        <Link to={`/user/${comment.postedBy._id}`}>
                                            {comment.postedBy.name}
                                            {" "}
                                        </Link>
                                        on {" "}
                                        {new Date(comment.created).toDateString()}

                                        <span>

                                            {
                                                isAuthenticated().user &&
                                                isAuthenticated().user._id === comment.postedBy._id && (
                                                    <>
                                                        <button
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => this.deleteConfirmed(comment)}
                                                            className="btn btn-raised btn-danger btn mr-3 float-right"
                                                        >
                                                            <i class="far fa-trash-alt"></i>
                                                        </button>
                                                    </>
                                                )
                                            }

                                        </span>
                                    </p>

                                </div>

                            </div>
                        ))

                    }
                </div>


            </div>
        )
    }
}

export default Comment;