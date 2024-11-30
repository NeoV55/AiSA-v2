import React, { useState, useEffect } from "react";
import { fetchNews } from '../services/api';
import "../styles/_newsPage.scss";

const NewsPage = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const { data } = await fetchNews(); // Ensure compatibility with Axios response structure
        setNewsList(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    getNews();
  }, []);

  return (
    <div className="news-page">
      <h1 className="page-title">News Portal</h1>
      <div className="news-grid">
        {newsList.length > 0 ? (
          newsList.map((news) => (
            <div key={news.news_id} className="news-card">
              <img
                src={news.image}
                alt={news.title}
                className="news-image"
                loading="lazy"
              />
              <div className="news-details">
                <h2 className="news-title">{news.title}</h2>
                <p className="news-category">Category: {news.category}</p>
                <p className="news-reads">Total Reads: {news.reads}</p>
                <p className="news-content">{news.content}</p>
                <button
                  className="read-more"
                  onClick={() => window.open(`/news/${news.news_id}`, "_blank")}
                >
                  Read More
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="loading-message">Loading news...</p>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
