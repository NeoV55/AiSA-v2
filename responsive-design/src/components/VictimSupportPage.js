import React, { useState } from "react";
import "../styles/_victimSupport.scss";

const mockTherapists = [
  { id: 1, name: "Dr. Sunita Johnson Shah", expertise: "Trauma Counseling", contact: "+60 123-456-789" },
  { id: 2, name: "Mr. Lee Kwan Seng", expertise: "Therapy for Abuse Survivors", contact: "+60 987-654-321" },
  { id: 3, name: "Ms. Siti Chen", expertise: "Anxiety and Stress Therapy", contact: "+60 456-123-789" },
];

const mockChats = [
  { sender: "AI Therapist", message: "Hello! I'm here to support you. How can I help today?" },
  { sender: "You", message: "I feel overwhelmed with stress lately." },
  { sender: "AI Therapist", message: "I'm sorry to hear that. Can you share more about what's causing it?" },
];

const VictimSupportPage = () => {
  const [chats, setChats] = useState(mockChats);
  const [userMessage, setUserMessage] = useState("");

  const sendMessage = () => {
    if (userMessage.trim()) {
      setChats([...chats, { sender: "You", message: userMessage }]);
      setUserMessage("");
      setTimeout(() => {
        setChats((prevChats) => [
          ...prevChats,
          { sender: "AI Therapist", message: "Thank you for sharing. Let's work through this together." },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="victim-support-page">
      <h1 className="page-title">Victim Support Portal</h1>
      <div className="support-tools">
        <h2>Support Tools</h2>
        <ul>
          <li>Counseling and Therapy</li>
          <li>Support Groups</li>
          <li>Self-help Resources</li>
          <li>Hotlines and Helplines</li>
          <li>Victim Connect Resource Center</li>
          <li>National Suicide Prevention Lifeline</li>
          <li>Befrienders</li>
        </ul>
      </div>

      <div className="therapist-list">
        <h2>Available Therapists</h2>
        {mockTherapists.map((therapist) => (
          <div key={therapist.id} className="therapist-card">
            <h3>{therapist.name}</h3>
            <p>Expertise: {therapist.expertise}</p>
            <button onClick={() => alert(`Connecting to ${therapist.name} via phone...`)}>
              Contact {therapist.name}
            </button>
          </div>
        ))}
      </div>

      <div className="chat-window">
        <h2>AI Therapist Chat</h2>
        <div className="chat-history">
          {chats.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.sender === "You" ? "user" : "ai"}`}>
              <strong>{chat.sender}:</strong> {chat.message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default VictimSupportPage;
