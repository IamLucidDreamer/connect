const {
  STATUS_SERVER_ERROR,
  STATUS_SUCCESS,
  STATUS_BAD_REQUEST,
} = require("../config/constants");
const { Post, Comment, Like } = require("../models/Post");
const logger = require("../utils/logger");

const createPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, content, imageUrl } = req.body;
    if (!title || !content) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Title and content are required" });
    }
    const post = new Post({
      title,
      content,
      imageUrl,
      author: userId,
    });
    await post.save();
    return res
      .status(STATUS_SUCCESS)
      .json({ message: "Post created successfully" });
  } catch (error) {
    logger.error("Error in creating post", error);
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Internal server error" });
  } finally {
    logger.info("Create post API called");
  }
};

const getPosts = async (req, res) => {
  try {
    // Fetch posts and populate author
    const posts = await Post.find()
      .populate('author', 'firstName lastName') 
      .lean();

    const postIds = posts.map((post) => post._id);
    
    const comments = await Comment.find({
      postId: { $in: postIds },
    }).populate('userId', 'name'); 

    const likes = await Like.find({
      postId: { $in: postIds },
    });

    const postsWithDetails = posts.map((post) => ({
      ...post, 
      comments: comments.filter(
        (comment) => comment.postId.toString() === post._id.toString()
      ),
      likes: likes.filter((like) => like.postId.toString() === post._id.toString()),
      likeCount: likes.filter((like) => like.postId.toString() === post._id.toString()).length,
    }));

    return res
      .status(STATUS_SUCCESS)
      .json({ message: 'Posts fetched successfully', data: postsWithDetails });
  } catch (error) {
    logger.error('Error in fetching posts', error);
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  } finally {
    logger.info('Get posts API called');
  }
};



const getPostDetails = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById({ _id: postId })
      .populate("author", "name")
      .populate({
        path: "comments",
        populate: { path: "userId", select: "name" },
      })
      .populate("likes");
    return res
      .status(STATUS_SUCCESS)
      .json({ message: "Post details fetched successfully", data: post });
  } catch (error) {
    logger.error("Error in fetching post details", error);
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Internal server error" });
  } finally {
    logger.info("Get post details API called");
  }
};

const updatePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;
    const { title, content, imageUrl } = req.body;
    const post = await Post.findById({ _id: postId });
    if (!post) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "Post not found" });
    }
    if (post.author.toString() !== userId.toString()) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "You are not authorized to update this post" });
    }
    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    await post.save();
    return res
      .status(STATUS_SUCCESS)
      .json({ message: "Post updated successfully", data: post });
  } catch (error) {
    logger.error("Error in updating post", error);
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Internal server error" });
  } finally {
    logger.info("Update post API called");
  }
};

const deletePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;
    const post = await Post.findById({ _id: postId });
    if (!post) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "Post not found" });
    }
    if (post.author.toString() !== userId.toString()) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "You are not authorized to delete this post" });
    }
    await Comment.deleteMany({ postId });
    await Like.deleteMany({ postId });
    await post.remove();
    return res
      .status(STATUS_SUCCESS)
      .json({ message: "Post deleted successfully" });
  } catch (error) {
    logger.error("Error in deleting post", error);
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Internal server error" });
  } finally {
    logger.info("Delete post API called");
  }
};

const createComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;
    const { content } = req.body;
    if (!content) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Comment content is required" });
    }
    const comment = new Comment({
      postId,
      userId,
      content,
    });
    await comment.save();

    return res
      .status(STATUS_SUCCESS)
      .json({ message: "Comment created successfully", data: comment });
  } catch (error) {
    logger.error("Error in creating comment", error);
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Internal server error" });
  } finally {
    logger.info("Create comment API called");
  }
};

const updateComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const commentId = req.params.commentId;
    const { content } = req.body;
    const comment = await Comment.findById({ _id: commentId });
    if (!comment) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Comment not found" });
    }
    if (comment.userId.toString() !== userId.toString()) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "You are not authorized to update this comment" });
    }
    comment.content = content;
    await comment.save();
    return res
      .status(STATUS_SUCCESS)
      .json({ message: "Comment updated successfully", data: comment });
  } catch (error) {
    logger.error("Error in updating comment", error);
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Internal server error" });
  } finally {
    logger.info("Update comment API called");
  }
};

const deleteComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const commentId = req.params.commentId;
    const comment = await Comment.findById({ _id: commentId });
    if (!comment) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Comment not found" });
    }
    if (comment.userId.toString() !== userId.toString()) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "You are not authorized to delete this comment" });
    }
    await comment.remove();
    return res
      .status(STATUS_SUCCESS)
      .json({ message: "Comment deleted successfully" });
  } catch (error) {
    logger.error("Error in deleting comment", error);
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Internal server error" });
  } finally {
    logger.info("Delete comment API called");
  }
};

const likePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;
    const like = await Like.findOne({ postId, userId });
    if (like) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "You have already liked this post" });
    }
    if (like.userId.toString() !== userId.toString()) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "You are not authorized to like this post" });
    }
    const newLike = new Like({ postId, userId });
    await newLike.save();
    return res
      .status(STATUS_SUCCESS)
      .json({ message: "Post liked successfully" });
  } catch (error) {
    logger.error("Error in liking post", error);
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Internal server error" });
  } finally {
    logger.info("Like post API called");
  }
};

const unlikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;
    const like = await Like.findOne({ postId, userId });
    if (!like) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "You have not liked this post" });
    }
    if (like.userId.toString() !== userId.toString()) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "You are not authorized to unlike this post" });
    }
    await like.remove();
    return res
      .status(STATUS_SUCCESS)
      .json({ message: "Post unliked successfully" });
  } catch (error) {
    logger.error("Error in unliking post", error);
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Internal server error" });
  } finally {
    logger.info("Unlike post API called");
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostDetails,
  updatePost,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
  likePost,
  unlikePost,
};
