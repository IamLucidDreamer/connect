// components/PostList.js
import React, { useEffect, useState } from "react";
import { getPosts } from "../../../services/postService";


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

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {/* <p>Author: {post.author.name}</p> */}
          <p>{post.likeCount} Likes</p>
          {/* <p>Comments: {post.comments.length}</p> */}
        </div>
      ))}
    </div>
  );
};

export default PostList;
