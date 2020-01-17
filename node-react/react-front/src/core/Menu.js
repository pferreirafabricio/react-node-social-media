import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index.js";

//History comes from props
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "yellow" }
    else return { color: "#fff" }
}

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/")} to="/">
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/users")} to="/users">
                    Users
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    to={`/post/create`}
                    style={isActive(history, `/post/create`)}
                    className="nav-link"
                >
                    Create Post
                        </Link>

            </li>


            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">
                            Sign In
                </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">
                            Sign Up
                </Link>
                    </li>
                </>
            )}

            {isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link
                            to={`/user/findpeople/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/findpeople/${isAuthenticated().user._id}`)}
                            className="nav-link"
                        >
                            Find People
                        </Link>

                    </li>


                    <li className="nav-item">
                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                            className="nav-link"
                        >
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>
                    </li>

                    {isAuthenticated() && isAuthenticated().user.role === "admin" && (
                        <li className="nav-item">
                            <Link
                                to={`/admin`}
                                style={isActive(history, `/admin`)}
                                className="nav-link"
                            >
                                Admin
                            </Link>
                        </li>
                    )}

                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={isActive(history, "/signup"),
                                { cursor: "pointer", color: "#fff" }}
                            onClick={() => signout(() => history.push("/"))}
                        >
                            Sign Out
                        </span>
                    </li>
                </>
            )}
        </ul>
    </div>
)

export default withRouter(Menu);