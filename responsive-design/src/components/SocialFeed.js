import React, { useState, useEffect } from "react";
import { fetchSocialPosts, submitSocialPost, updateSocialPost } from "../services/api";
import "../styles/_socialFeed.scss";

const SocialFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    user: "",
    title: "",
    content: "",
  });

  const fetchPosts = async () => {
    const response = await fetchSocialPosts();
    setPosts(response);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const aiScore = Math.floor(Math.random() * 100) + 1;
    const post = {
      ...newPost,
      id: Date.now(),
      likes: 0,
      dislikes: 0,
      ai_score: aiScore,
      comments: [],
    };
    await submitSocialPost(post);
    setPosts([post, ...posts]);
    setNewPost({ user: "", title: "", content: "" });
  };

  const handleLikeDislike = async (id, type) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        const updatedPost = {
          ...post,
          likes: type === "like" ? post.likes + 1 : post.likes,
          dislikes: type === "dislike" ? post.dislikes + 1 : post.dislikes,
        };
        updateSocialPost(id, updatedPost); // Update on backend
        return updatedPost;
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleAddComment = async (id, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        const updatedPost = {
          ...post,
          comments: [...post.comments, comment],
        };
        updateSocialPost(id, updatedPost); // Update on backend
        return updatedPost;
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="social-feed">
      <h1>Social Feed</h1>
      <form onSubmit={handlePostSubmit} className="new-post-form">
        <input
          type="text"
          placeholder="Your Name (Leave blank for anonymous)"
          value={newPost.user}
          onChange={(e) => setNewPost({ ...newPost, user: e.target.value || "Anonymous" })}
        />
        <input
          type="text"
          placeholder="Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          required
        />
        <textarea
          placeholder="What's on your mind?"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          required
        ></textarea>
        <button type="submit">Post</button>
      </form>

      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title} <span className={`ai-score ${post.ai_score > 10 ? "high-score" : "low-score"}`}>
                AI Score: {post.ai_score}
            </span></h2>
            <p className="post-user">By: {post.user}</p>
            <p className="post-content">{post.content}</p>
            <div className="post-actions">
              <button onClick={() => handleLikeDislike(post.id, "like")}>
                👍 {post.likes}
              </button>
              <button onClick={() => handleLikeDislike(post.id, "dislike")}>
                👎 {post.dislikes}
              </button>
            </div>
            <div className="comments-section">
              <h3>Comments</h3>
              {post.comments.map((comment, idx) => (
                <div key={idx} className="comment">
                  <strong>{comment.user}:</strong> {comment.content}
                </div>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const commentInput = e.target.elements.comment.value.trim();
                  if (commentInput) {
                    handleAddComment(post.id, {
                      user: "Anonymous", // Adjust as needed for logged-in users
                      content: commentInput,
                    });
                    e.target.reset();
                  }
                }}
                className="add-comment-form"
              >
                <input type="text" name="comment" placeholder="Add a comment..." required />
                <button type="submit">Comment</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialFeed;
