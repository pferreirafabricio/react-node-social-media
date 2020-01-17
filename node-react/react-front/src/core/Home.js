import React from "react";
import Posts from "../post/Posts.js";

const Home = () => (
    <>
        <div className="jumbotron">
            <h2>Home</h2>
            <p className="lead">Welcome to React Frontend</p>
        </div>

        <div className="container">
            <Posts/>
        </div>
    </>
)

export default Home;
