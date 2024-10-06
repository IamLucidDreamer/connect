// components/PostList.js
import React, { useEffect, useState } from "react";
import { getPosts, likePost } from "../../../services/postService";
import {
  ChatIcon,
  DuplicateIcon,
  GlobeIcon,
  PaperAirplaneIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";

const PostList = () => {
  const [posts, setPosts] = useState([]);

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
    const response = await likePost(postId);
    if (response?.status >= 200 && response?.status < 300) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likeCount: post.likeCount + 1,
              }
            : post
        )
      );
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div
          className="rounded-lg border-gray-200 bg-white border-2 pb-2"
          key={post?._id}
        >
          <div className="flex flex-row p-4 items-center">
            <img
              src={
                post?.author.profilePicture ||
                "https://static.vecteezy.com/system/resources/previews/000/422/799/original/avatar-icon-vector-illustration.jpg"
              }
              className="w-14 h-14 rounded-full"
              alt="profile"
            />
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
          <div className="flex flex-col space-y-2 w-full">
            <div className="flex flex-col mx-4">
              <p className="font-ArialRegular text-base text-gray-800">
                {post?.content}
              </p>
            </div>
            <img
              src={`https://picsum.photos/200/300?random=${post._id}`}
              alt="feed image"
              className="w-full p-0 object-contain max-h-[45vh]"
            />
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
                  onClick={() => handleLike(post?._id)}
                >
                  <ThumbUpIcon className="w-6 h-6 mr-1" />
                  <sm className="flex-grow text-left text-md font-SourceSansProSemibold text-gray-600">
                    Like
                  </sm>
                </button>
                <div className="flex flex-row mx-4 items-center">
                  <ChatIcon className="w-6 h-6 mr-1" />
                  <sm className="flex-grow text-left text-md font-SourceSansProSemibold text-gray-600">
                    Comment
                  </sm>
                </div>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
