import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";

class ProfileTabs extends Component {

    render() {
        const { following, followers, posts } = this.props;
        
        return (
            <div className="row">
                <div className="col-md-4">
                    <h3 className="text-primary">Followers</h3>
                    <hr />
                    {
                        followers.map((person, i) => {
                            return (
                                <div key={i}>
                                    <div>
                                        <Link to={`/user/${person._id}`}>
                                            <img
                                                className="float-left mr-3"
                                                style={{
                                                    height: "30px",
                                                    width: "30px",
                                                    borderRadius: "50%",
                                                    border: "1px solid #000"
                                                }}
                                                src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                                alt={`${person.name}`}
                                                onError={i => (i.target.src = `${DefaultProfile}`)}
                                            />

                                            <div className="mt-2">
                                                <p className="lead">{person.name}</p>
                                            </div>
                                        </Link>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="col-md-4">
                    <h3 className="text-primary">Following</h3>
                    <hr />

                    {
                        following.map((person, i) => {
                            return (
                                <div key={i}>
                                    <div>
                                        <Link to={`/user/${person._id}`} target="_blank">
                                            <img
                                                className="float-left mr-3"
                                                style={{
                                                    height: "30px",
                                                    width: "30px",
                                                    borderRadius: "50%",
                                                    border: "1px solid #000"
                                                }}
                                                alt={person.name}
                                                src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                                onError={(i) => (i.target.src = `${DefaultProfile}`)}
                                            />
                                            <div className="mt-2">
                                                <p className="lead">{person.name}</p>
                                            </div>
                                        </Link>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="col-md-4">
                    <h3 className="text-primary">Posts</h3>
                    <hr />
                    
                    {
                        posts.map((post, i) => {
                            return (
                                <div key={i}>
                                    <div>
                                        <Link to={`/post/${post._id}`}  target="_blank">
                                            <div>
                                                {post.title}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}

export default ProfileTabs