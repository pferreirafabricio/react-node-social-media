const express = require("express");
const { postById,
        getPosts,
        createPost,
        postsByUser,
        isPoster,
        deletePost,
        updatePost,
        postPhoto,
        singlePost,
        like,
        unlike,
        comment,
        uncomment
} = require("../controllers/post.js");
const { requireSignin } = require("../controllers/auth.js");
const { userById } = require("../controllers/user.js");
const { createPostValidation } = require("../validator/index.js");

const router = express.Router();

//According the request method this file leads to the corret function 
router.get("/posts", getPosts);

//Like and unlike
router.put("/post/like", requireSignin, like);
router.put("/post/unlike", requireSignin, unlike);

//Comments
router.put("/post/comment", requireSignin, comment);
router.put("/post/uncomment", requireSignin, uncomment);

router.get("/post/:postId", singlePost);
router.post("/post/new/:userId", requireSignin, createPost, createPostValidation);
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);

//Photo
router.get("/post/photo/:postId", postPhoto);

//Any route containing :userId, our app will first execute userById();
router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
