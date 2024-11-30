import React, { useState, useEffect } from 'react';
import { fetchTickets, updateTicket, addChatMessage } from '../services/api';
import '../styles/_serviceManager.scss';

const ServiceManagerPage = () => {
  const [tickets, setTickets] = useState([]);
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [chatPopup, setChatPopup] = useState(null); // Case ID for chat popup
  const [updateTexts, setUpdateTexts] = useState({});
  const [chatTexts, setChatTexts] = useState({});

  useEffect(() => {
    const getTickets = async () => {
      try {
        const { data } = await fetchTickets();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    getTickets();
  }, []);

  const handleExpand = (id) => {
    setExpandedTicket(expandedTicket === id ? null : id);
  };

  const handleUpdate = async (id) => {
    if (!updateTexts[id]?.trim()) return;
    try {
      const updateText = updateTexts[id];
      await updateTicket(id, updateText);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === id
            ? { ...ticket, updates: [...(ticket.updates || []), updateText] }
            : ticket
        )
      );
      setUpdateTexts((prev) => ({ ...prev, [id]: '' }));
    } catch (error) {
      console.error('Error updating ticket:', error.message);
    }
  };

  const handleChatSubmit = async (id) => {
    if (!chatTexts[id]?.trim()) return;
    try {
      const message = { sender: 'Officer', message: chatTexts[id] };
      await addChatMessage(id, message);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === id
            ? { ...ticket, chatHistory: [...ticket.chatHistory, message] }
            : ticket
        )
      );
      setChatTexts((prev) => ({ ...prev, [id]: '' }));
    } catch (error) {
      console.error('Error sending chat message:', error);
    }
  };

  return (
    <div className="service-manager-page">
      <h1 className="page-title">Service Manager - Ticketing System</h1>
      <table className="tickets-table">
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Victim Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <React.Fragment key={ticket.id}>
              <tr>
                <td>{ticket.id}</td>
                <td>{ticket.victimName}</td>
                <td>{ticket.companyName}</td>
                <td>{ticket.status}</td>
                <td>
                  <button
                    className="expand-button"
                    onClick={() => handleExpand(ticket.id)}
                  >
                    {expandedTicket === ticket.id ? 'Collapse' : 'Expand'}
                  </button>
                  <button
                    className="chat-popup-button"
                    onClick={() => setChatPopup(ticket.id)}
                  >
                    Chat
                  </button>
                </td>
              </tr>
              {expandedTicket === ticket.id && (
                <tr>
                  <td colSpan="5" className="expanded-row">
                    <div className="ticket-details">
                      <p>
                        <strong>Description:</strong> {ticket.caseDescription}
                      </p>
                      <p>
                        <strong>Contact:</strong> {ticket.contact} | {ticket.email}
                      </p>
                      <div className="updates-section">
                        <h4>Updates</h4>
                        <ul>
                          {ticket.updates?.map((update, index) => (
                            <li key={index}>{update}</li>
                          ))}
                        </ul>
                        <input
                          type="text"
                          placeholder="Add update..."
                          value={updateTexts[ticket.id] || ''}
                          onChange={(e) =>
                            setUpdateTexts({ ...updateTexts, [ticket.id]: e.target.value })
                          }
                        />
                        <button
                          className="update-button"
                          onClick={() => handleUpdate(ticket.id)}
                        >
                          Add Update
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {chatPopup && (
        <div className="chat-popup">
          <div className="chat-header">
            <h4>Chat for Case ID: {chatPopup}</h4>
            <button className="close-chat" onClick={() => setChatPopup(null)}>
              X
            </button>
          </div>
          <div className="chat-body">
            {tickets
              .find((ticket) => ticket.id === chatPopup)
              ?.chatHistory.map((chat, index) => (
                <p key={index}>
                  <strong>{chat.sender}:</strong> {chat.message}
                </p>
              ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type your message..."
              value={chatTexts[chatPopup] || ''}
              onChange={(e) =>
                setChatTexts({ ...chatTexts, [chatPopup]: e.target.value })
              }
            />
            <button onClick={() => handleChatSubmit(chatPopup)}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagerPage;
