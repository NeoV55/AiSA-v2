import React, { useState, useEffect } from "react";
import { 
deleteSocialPost, 
  addNewsPost, deleteNewsPost, fetchUsers, fetchNews, fetchSocialPosts, uploadCSVData 
} from '../services/api';  // Import methods from api.js
import '../styles/_controlpanel.scss';

const ControlPanel = () => {
  const [users, setUsers] = useState([]);  // Initialize as empty array
  const [socialPosts, setSocialPosts] = useState([]);  // Initialize as empty array
  const [news, setNews] = useState([]);  // Initialize as empty array
  const [newNews, setNewNews] = useState({
    title: "",
    content: "",
    category: "Custom",
    image: "https://via.placeholder.com/150",
  });  // State for managing the new news form inputs
  const [clockSpeed, setClockSpeed] = useState(50);  // Clock speed state for UI

  useEffect(() => {
    // Fetch data on mount using the API methods from api.js
    fetchUsers()
      .then((res) => {
        console.log(res);  
        setUsers(res);
      })
      .catch((error) => console.error('Error fetching users:', error));

    fetchSocialPosts()
      .then((res) => setSocialPosts(res))
      .catch((error) => console.error('Error fetching social posts:', error));

    fetchNews()
      .then((res) => setNews(res))
      .catch((error) => console.error('Error fetching news:', error));
  }, []);

  const handleDeletePost = (id) => {
    deleteSocialPost(id).then(() => {
      setSocialPosts(socialPosts.filter((post) => post.id !== id));
      alert("Post deleted successfully!");
    }).catch((error) => console.error(`Error deleting post ${id}:`, error));
  };

  const handleDeleteNews = (id) => {
    deleteNewsPost(id).then(() => {
      setNews(news.filter((newsItem) => newsItem.id !== id));
      alert("News deleted successfully!");
    }).catch((error) => console.error(`Error deleting news ${id}:`, error));
  };

  const handleAddNews = () => {
    const newNewsData = {
      news_id: Date.now(),
      user: "Admin",
      category: newNews.category,
      title: newNews.title,
      content: newNews.content,
      image: newNews.image,
      reads: 0,
      id: Date.now().toString(36),
    };

    addNewsPost(newNewsData).then(() => {
      setNews([...news, newNewsData]);
      alert("News added successfully!");
      setNewNews({
        title: "",
        content: "",
        category: "Custom",
        image: "https://via.placeholder.com/150",
      });
    }).catch((error) => console.error('Error adding news post:', error));
  };

  const handleNewsInputChange = (e) => {
    const { name, value } = e.target;
    setNewNews({ ...newNews, [name]: value });
  };

  // Mock functions for AI buttons (since they are placeholders)
  const aiScorePost = (id) => {
    alert(`AI Scoring is a placeholder. Post ID: ${id}`);
  };

  const aiPostChecker = (id) => {
    alert(`AI Post Checker is a placeholder. Post ID: ${id}`);
  };

  const aiDatabaseUpdater = () => {
    alert('AI Database Updater is a placeholder for consolidating scores.');
  };

  const handleClockSpeedChange = (e) => {
    setClockSpeed(e.target.value);
  };
  console.log(users)
  return (
    <div className="control-panel">
      {/* User Management Section */}
      <div className="panel user-management">
        <h2>User Management</h2>
        <button onClick={() => alert("Add User Functionality")}>Add User</button>
        <div className="user-list">
          {users && users.length > 0 ?  (
            users.map((user) => (
                <div key={user.id} className="user-item">
                    <div className="user-details">
                        <span>{user.name} ({user.email})</span>
                        <span className="user-password">Password: {user.password}</span>
                    </div>

                    <div className="user-actions">
                        <button onClick={() => alert("User Deleted")}>Delete</button>
                        <button onClick={() => alert("User Muted")}>Mute</button>
                        <button onClick={() => alert("User Banned")}>Ban</button>
                    </div>
                </div>
            ))
          ) : (
            <p>No users available.</p>
          )}
        </div>
      </div>

      {/* Social Media Post Manager */}
      <div className="panel social-posts">
        <h2>Social Media Posts Manager</h2>
        <div>
          {socialPosts && socialPosts.length > 0 ? (
            socialPosts.map((post) => (
              <div key={post.id} className="post-item">
                <span>{post.title} - {post.user}</span>
                <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                <button onClick={() => aiScorePost(post.id)}>AI Scoring</button>
                <button onClick={() => aiPostChecker(post.id)}>AI Checker</button>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>

      {/* News Management */}
      <div className="panel news-management">
        <h2>News Management</h2>
        <div className="news-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newNews.title}
            onChange={handleNewsInputChange}
          />
          <textarea
            name="content"
            placeholder="Content"
            value={newNews.content}
            onChange={handleNewsInputChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newNews.category}
            onChange={handleNewsInputChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newNews.image}
            onChange={handleNewsInputChange}
          />
          <button onClick={handleAddNews}>Add News</button>
        </div>
        <div>
          {news && news.length > 0 ? (
            news.map((newsItem) => (
              <div key={newsItem.id} className="news-item">
                <span>{newsItem.title}</span>
                <button onClick={() => handleDeleteNews(newsItem.id)}>Delete</button>
                <button onClick={aiDatabaseUpdater}>Train AI</button>
              </div>
            ))
          ) : (
            <p>No news available.</p>
          )}
        </div>
      </div>

      {/* AI Config Tuner */}
      <div className="panel ai-config">
        <h2>AI Config Tuner</h2>
        <button onClick={aiDatabaseUpdater}>Upload Database</button>
        <button onClick={() => alert("Adjust Clock Speed Mock Action")}>
          Adjust Clock Speed
        </button>
        <div>
          <label>Clock Speed: </label>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={clockSpeed} 
            onChange={handleClockSpeedChange}
          />
          <span>{clockSpeed}</span>
        </div>
        <button onClick={() => alert("Upload Model Mock Action")}>Upload Model</button>
      </div>

      {/* Database Update */}
      <div className="panel database-update">
        <h2>Database Update</h2>
        <button onClick={() => alert("Update Companies Mock Action")}>Update Companies</button>
        <div>
          <input 
            type="file" 
            accept=".csv" 
            onChange={(e) => uploadCSVData(e.target.files[0])}
          />
          <button>Upload CSV</button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
