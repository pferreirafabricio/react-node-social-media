import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./core/Home.js";
import Menu from "./core/Menu.js";
import Signup from "./user/Signup.js";
import Signin from "./user/Signin.js";
import Profile from "./user/Profile.js";
import Users from "./user/Users.js";
import EditProfile from "./user/EditProfile.js";
import PrivateRoute from "./auth/PrivateRoute.js";
import FindPeople from "./user/FindPeople.js";
import NewPost from "./post/NewPost.js";
import SinglePost from "./post/SinglePost.js";
import EditPost from "./post/EditPost.js";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Admin from './admin/Admin'

const MainRouter = () => (
    <div>
    <Menu />
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <PrivateRoute exact path="/admin" component={Admin} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
            <PrivateRoute exact path="/post/create" component={NewPost}></PrivateRoute>
            <Route exact path="/post/:postId" component={SinglePost}></Route>             
            <Route exact path="/users" component={Users}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}></PrivateRoute>
            <PrivateRoute exact path="/user/findpeople/:userId" component={FindPeople}></PrivateRoute>  
            <PrivateRoute path="/user/:userId" component={Profile}></PrivateRoute>      
                 
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost}></PrivateRoute>     
                
        </Switch>
    </div>
);

export default MainRouter;
