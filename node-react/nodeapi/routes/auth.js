const express = require("express");
const {
    signup,
    signin,
    signout,
    forgotPassword,
    resetPassword,
    socialLogin
} = require("../controllers/auth.js");
const { userById } = require("../controllers/user.js");
const { userSignupValidator, passwordResetValidator } = require("../validator/index.js");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//Password
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);

//Social login
router.post("/social-login", socialLogin); 

//Any route containing :userId, our app will first execute userById();
router.param("userId", userById);

module.exports = router;