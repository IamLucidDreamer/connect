// components/PostList.js
import React, { useEffect, useState } from "react";
import {
  createComment,
  deleteComment,
  deletePost,
  getComments,
  getPosts,
  likePost,
  unlikePost,
  updateComment,
} from "../../../services/postService";
import {
  ChatIcon,
  DuplicateIcon,
  GlobeIcon,
  PaperAirplaneIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";
import {
  DotsVerticalIcon,
  ThumbUpIcon as ThumbUpIconSolid,
} from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [showComment, setShowComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data.data); // Assuming response.data.data contains the array of posts
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await likePost(postId);
      if (response?.status >= 200 && response?.status < 300) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likeCount: post.likeCount + 1,
                  isLiked: true,
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      const response = await unlikePost(postId);
      if (response?.status >= 200 && response?.status < 300) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likeCount: post.likeCount - 1,
                  isLiked: false,
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error unliking post", error);
    }
  };

  return (
    <div className="gap-6 flex flex-col">
      {posts.map((post) => (
        <div
          className="rounded-lg border-gray-200 bg-white border-2 pb-2"
          key={post?._id}
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-row p-4 items-center">
              <button
                onClick={() =>
                  navigate(`/dashboard/profile/${post?.author?._id}`)
                }
              >
                <img
                  src={
                    post?.author.profilePicture ||
                    "https://static.vecteezy.com/system/resources/previews/000/422/799/original/avatar-icon-vector-illustration.jpg"
                  }
                  className="w-14 h-14 rounded-full"
                  alt="profile"
                />
              </button>
              <div className="flex flex-col ml-2 ">
                <div className="flex flex-row items-center gap-2">
                  <h4 className="font-SourceSansProSemibold text-center text-md">
                    {post?.author?.firstName} {post?.author?.lastName}
                  </h4>
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                  <p className="text-center font-SourceSansProLight text-sm text-gray-900">
                    Friend
                  </p>
                </div>
                <div className="">
                  <p className="font-SourceSansProLight text-sm text-gray-900">
                    Founder of AfricanSTEMGirl
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <p className="text-center font-SourceSansProLight text-sm text-gray-900">
                    {post?.createdAt}
                  </p>
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                  <GlobeIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
            {post?.author?._id === loggedInUserId && (
              <ActionButton postId={post?._id} setPosts={setPosts} />
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <div className="flex flex-col mx-4">
              <p className="font-ArialRegular text-base text-gray-800">
                {post?.content}
              </p>
            </div>
            {post?.imageUrl?.length > 0 && (
              <img
                src={post?.imageUrl}
                alt="feed image"
                className="w-full p-0 object-contain max-h-[45vh]"
              />
            )}
            <div className="flex flex-col mx-4">
              <div className="flex flex-row w-full mb-1 items-center">
                <ThumbUpIcon className="w-6 h-6 mr-1" />
                <sm className="flex-grow text-left text-sm font-SourceSansProSemibold text-gray-600 ml-1">
                  {post?.likeCount} likes
                </sm>
                {/* <sm className="text-left text-sm font-SourceSansProSemibold text-gray-600">
                  4 reposts
                </sm> */}
              </div>
            </div>
            <hr class="h-px my-4 mx-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className="flex flex-row mx-4">
              {/* <div className="flex flex-row items-center">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                  className="w-6 h-6 rounded-full"
                  alt="profile"
                />
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                  className="w-6 h-6 rounded-full -ml-2 border border-gray-600"
                  alt="profile"
                />
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                  className="w-6 h-6 rounded-full -ml-2 border border-gray-600"
                  alt="profile"
                />
              </div> */}
              <div className="flex flex-row mx-6">
                <button
                  className="flex flex-row mx-4 items-center"
                  onClick={() => {
                    post?.isLiked
                      ? handleUnlike(post?._id)
                      : handleLike(post?._id);
                  }}
                >
                  {post?.isLiked ? (
                    <ThumbUpIconSolid className="w-6 h-6 mr-1" />
                  ) : (
                    <ThumbUpIcon className="w-6 h-6 mr-1" />
                  )}
                  <sm className="flex-grow text-left text-md font-SourceSansProSemibold text-gray-600">
                    {post?.isLiked ? "Liked" : "Like"}
                  </sm>
                </button>
                <button
                  className="flex flex-row mx-4 items-center"
                  onClick={() => setShowComment(post?._id)}
                >
                  <ChatIcon className="w-6 h-6 mr-1" />
                  <sm className="flex-grow text-left text-md font-SourceSansProSemibold text-gray-600">
                    Comment
                  </sm>
                </button>
                <div className="flex flex-row mx-4 items-center">
                  <DuplicateIcon className="w-6 h-6 mr-1" />
                  <sm className="flex-grow text-left text-md font-SourceSansProSemibold text-gray-600">
                    Repost
                  </sm>
                </div>
                <div className="flex flex-row mx-4 items-center">
                  <PaperAirplaneIcon className="w-6 h-6 mr-1 rotate-90" />
                  <sm className="flex-grow text-left text-md font-SourceSansProSemibold text-gray-600">
                    Send
                  </sm>
                </div>
              </div>
            </div>
            {showComment === post?._id && <CommentEditor postId={post?._id} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;

const ActionButton = ({ postId, setPosts }) => {
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();
  const handleEditPost = () => {
    navigate(`/dashboard/post/create/${postId}`);
  };

  const handleDeletePost = async () => {
    try {
      const response = await deletePost(postId);
      if (response?.status >= 200 && response?.status < 300) {
        toast.success("Post deleted successfully");
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative">
      <button onClick={() => setShowActions(!showActions)}>
        <DotsVerticalIcon className="w-5 h-5 text-gray-600 m-2" />
      </button>
      {showActions && (
        <div className="absolute shadow-lg rounded-lg bg-white/60 p-2 top-6 right-4 z-10">
          <button onClick={handleEditPost}>
            <p className="text-gray-600 mb-2">Edit</p>
          </button>
          <button onClick={handleDeletePost}>
            <p className="text-red-600">Delete</p>
          </button>
        </div>
      )}
    </div>
  );
};

const CommentEditor = ({ postId }) => {
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const [edit, setEdit] = useState(null);
  const loggedInUserId = useSelector((state) => state.user._id);

  const handleGetComments = async () => {
    try {
      const response = await getComments(postId);
      if (response?.status >= 200 && response?.status < 300) {
        setCommentList(response?.data?.data);
      }
    } catch (error) {
      console.log("Error fetching comments", error);
    }
  };

  const handleAddComment = async () => {
    if (!edit) {
      try {
        const response = await createComment(postId, { content: comment });
        if (response?.status >= 200 && response?.status < 300) {
          handleGetComments();
        }
      } catch (error) {
        console.log("Error adding comment", error);
      }
    } else {
      try {
        const response = await updateComment(edit?._id, { content: comment });
        if (response?.status >= 200 && response?.status < 300) {
          handleGetComments();
          setEdit(null);
          setComment("");
        }
      } catch (error) {
        console.log("Error adding comment", error);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await deleteComment(commentId);
      console.log(response);
      if (response?.status >= 200 && response?.status < 300) {
        setCommentList((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
      }
    } catch (error) {
      console.log("Error deleting comment", error);
    }
  };

  useEffect(() => {
    handleGetComments();
  }, []);

  return (
    <div className="py-2 w-full px-4">
      <hr className="w-full my-2" />
      <h1 className="text-gray-500 text-sm">Comments</h1>
      {commentList?.map((comment) => {
        return (
          <div className="p-2 font-medium group relative">
            <div className="flex">
              <img
                className="w-6 h-6"
                src={
                  comment?.userId?.imageUrl
                    ? comment?.userId?.imageUrl
                    : "https://static.vecteezy.com/system/resources/previews/000/422/799/original/avatar-icon-vector-illustration.jpg"
                }
              />
              <div>
                <h1 className="font-medium text-sm mt-1 ml-1 text-gray-500">
                  {comment?.userId?.firstName + comment?.userId?.lastName}
                </h1>
              </div>
            </div>
            <div className="text-base ml-8 font-medium text-gray-600">
              {comment?.content}
            </div>
            {comment?.userId?._id === loggedInUserId && (
              <div className="absolute top-4 right-0 bg-gradient-to-l from-white to-transparent flex items-center justify-center gap-4">
                <button
                  className="text-xs font-regular text-gray-400"
                  onClick={() => {
                    setEdit(comment);
                    setComment(comment?.content);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-xs font-regular text-gray-400"
                  onClick={() => {
                    handleDeleteComment(comment?._id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e?.currentTarget?.value)}
        placeholder="Add Comment"
        className="p-1.5 text-sm rounded-lg gray-50 w-full focus:outline-none border-2"
      />
      <button
        className="bg-primary mt-2 text-sm px-2 text-white rounded-lg p-1"
        onClick={handleAddComment}
      >
        Comment
      </button>
    </div>
  );
};
