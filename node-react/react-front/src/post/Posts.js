import React, { Component } from "react";
import { getPosts } from "./apiPost.js"
import { Link } from "react-router-dom";
import DefaultPostImage from "../images/naruto.jpg"

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            page: 1
        }
    }

    componentDidMount() {
        this.loadPosts(this.state.page);
    }

    loadPosts = (page) => {
        getPosts(page)
            .then((data) => {
                this.setState({
                    posts: data
                });
            })
            .catch((err) => console.log(err))
    }

    loadMore = (number) => {
        this.setState({ page: this.state.page + number });
        this.loadPosts(this.state.page + number);
    };

    loadLess = (number) => {
        this.setState({ page: this.state.page - number });
        this.loadPosts(this.state.page - number);
    };

    renderPosts = (posts, page) => {
        return (
            <div className="row">
                {
                    posts.map((post, i) => {
                        const posterId = post.postedBy ? post.postedBy._id : "";
                        const posterName = post.postedBy ? post.postedBy.name : "Unknown";

                        return (
                            <div className="card col-md-4 mb-3" key={i}>
                                <img
                                    style={{ height: "200px", width: "100%" }}
                                    className="mt-3"
                                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                                    onError={(i) => (i.target.src = `${DefaultPostImage}`)}
                                    alt={post.title}

                                />

                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">
                                        {post.body.substring(0, 100)}
                                    </p>
                                    <br />

                                    <p className="font-italic mark">
                                        Posted by:
                                        {" "}
                                        <Link to={`/user/${posterId}`}>
                                            {posterName}
                                            {" "}
                                        </Link>
                                        on {new Date(post.created).toDateString()}
                                    </p>

                                    <Link
                                        to={`/post/${post._id}`}
                                        className="btn btn-raised btn-dark btn-sm"
                                    >
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )

    }

    render() {
        const { posts, page } = this.state;
        return (
            <div className="container" >
                <h2 className="mt-5 mb-5">
                    {!posts.length ? "No more posts!" : "Recent Posts"}
                </h2>

                {this.renderPosts(posts)}

                {page > 1 ? (
                    <button
                        className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
                        onClick={() => this.loadLess(1)}
                    >
                        Previous ({this.state.page - 1})
                    </button>
                ) : (
                        ""
                    )}

                {posts.length ? (
                    <button
                        className="btn btn-raised btn-success mt-5 mb-5"
                        onClick={() => this.loadMore(1)}
                    >
                        Next ({page + 1})
                    </button>
                ) : (
                        ""
                    )}
            </div>
        );
    }
}

export default Posts;