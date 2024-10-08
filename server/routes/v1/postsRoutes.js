const express = require("express");
const { protect } = require("../../middleware/authMiddleware");
const {
  createPost,
  getPosts,
  getPostDetails,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  createComment,
  updateComment,
  deleteComment,
  getPostComments,
} = require("../../controllers/postController");

const router = express.Router();

router.post("/create", protect, createPost);
router.get("/", protect, getPosts);
router.get("/:postId", protect, getPostDetails);
router.put("/update/:postId", protect, updatePost);
router.delete("/delete/:postId", protect, deletePost);

router.post("/like/:postId", protect, likePost);
router.post("/unlike/:postId", protect, unlikePost);

router.post("/comment/create/:postId", protect, createComment);
router.put("/comment/update/:commentId", protect, updateComment);
router.delete("/comment/delete/:commentId", protect, deleteComment);
router.get("/comment/get/:postId", protect, getPostComments);

module.exports = router;
