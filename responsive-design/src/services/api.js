import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Backend base URL
});

// API endpoints
// api.js
export const fetchUsers = () => {
  return API.get('/users')
    .then((response) => {
      console.log('Fetched users:', response.data);  // Ensure data is in the expected format
      return response.data;  // Return the data to the component
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
      throw error;  // Propagate error to be handled in component
    });
};
//export const fetchUsers = () => API.get('/users');
export const fetchNews = () => API.get('/news');
export const registerUser = (userData) => API.post('/users', userData);
export const loginUser = (email, password) =>
  API.get(`/users?email=${email}&password=${password}`);

export const fetchVerificationData = (type, value) =>
  API.get(`/data?type=${type}&value=${value}`);


export const submitTicket = (ticketData) => API.post('/tickets', ticketData);
  // Fetch all tickets
export const fetchTickets = () => API.get('/tickets');

// Update ticket updates (add to updates array)
export const updateTicket = async (id, updateText) => {
  const { data: ticket } = await API.get(`/tickets/${id}`);
  const updatedUpdates = [...(ticket.updates || []), updateText];
  return API.patch(`/tickets/${id}`, { updates: updatedUpdates });
};

// Add a chat message
export const addChatMessage = async (id, message) => {
  const { data: ticket } = await API.get(`/tickets/${id}`);
  const updatedChatHistory = [...ticket.chatHistory, message];
  return API.patch(`/tickets/${id}`, { chatHistory: updatedChatHistory });
};

export const fetchSocialPosts = () => API.get('/Social').then((res) => res.data);
export const submitSocialPost = (post) => API.post('/Social', post);
export const updateSocialPost = async (id, updatedPost) => {
  try {
    return await API.put(`/Social/${id}`, updatedPost);
  } catch (error) {
    console.error(`Error updating post ${id}:`, error);
    throw error;
  }
};

export const updateSocialPostLikes = (id, likes) =>
  API.patch(`/Social/${id}`, { likes });

export const fetchDashboardData = () => API.get('/dashboardData').then((res) => res.data);

// Social Media management APIs
export const deleteSocialPost = (id) => API.delete(`/Social/${id}`);

// News management APIs
export const addNewsPost = (newsData) => API.post('/news', newsData);
export const deleteNewsPost = (id) => API.delete(`/news/${id}`);

// Mock buttons explanations
export const aiScorePost = (id) => 
  new Promise((resolve) => {
    alert(`AI Scoring is a placeholder. Post ID: ${id}`);
    resolve({ success: true });
  });

export const aiPostChecker = (id) => 
  new Promise((resolve) => {
    alert(`AI Post Checker is a placeholder. Post ID: ${id}`);
    resolve({ success: true });
  });

export const aiDatabaseUpdater = () => 
  new Promise((resolve) => {
    alert('AI Database Updater is a placeholder for consolidating scores.');
    resolve({ success: true });
  });

// Database Update APIs
export const bulkUpdateData = (dataType, data) => 
  API.post(`/data/bulk`, { dataType, data });

export const singleUpdateData = (id, updatedData) => 
  API.patch(`/data/${id}`, updatedData);

export const uploadCSVData = (dataType, file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('dataType', dataType);
  return API.post('/data/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};



export default API;
