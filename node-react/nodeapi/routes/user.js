const express = require("express");
const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower, 
    findPeople,
    hasAutorization
} = require("../controllers/user.js");
const { requireSignin } = require("../controllers/auth.js");

const router = express.Router();

router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, hasAutorization, updateUser);
router.delete("/user/:userId", requireSignin, hasAutorization, deleteUser);

//Photo
router.get("/user/photo/:userId", userPhoto);

//Who to follow
router.get("/user/findpeople/:userId", requireSignin, findPeople);

//Any route containing :userId, our app will first execute userById();
router.param("userId", userById);

module.exports = router;