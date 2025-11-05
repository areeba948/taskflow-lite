import React from 'react';
import './Dashboard.css';
import logo from '../assets/image-removebg-preview (1).png';

// Dashboard component shows an overview of tickets
// It receives 'tickets' (list of all tickets) and 'onNewTicket' (function to create a new ticket) as props
const Dashboard = ({ tickets, onNewTicket }) => {

  // Count tickets based on their status (open, in progress, closed)
  const statusCount = tickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1; // Increase count for this status
    return acc;
  }, {});

  // Count tickets based on priority but only if the ticket is not closed
  const priorityCount = tickets.reduce((acc, t) => {
    if (t.status !== 'closed' && t.priority) {
      acc[t.priority] = (acc[t.priority] || 0) + 1; // Increase count for this priority
    }
    return acc;
  }, {});

  return (
    <div className="dashboard-container">
      
      {/* Header section with logo, title, and 'New Ticket' button */}
      <header className="dashboard-header">
        <div className="header-left">
          <img src={logo} alt="Logo" className="dashboard-logo" />
          <h1 className="dashboard-title">TaskFlow Lite</h1>
        </div>
        <button className="new-ticket-btn" onClick={onNewTicket}>
          + New Ticket
        </button>
      </header>

      {/* Welcome message */}
      <p className="dashboard-welcome">
        Welcome back 👋 Here's your quick task overview
      </p>

      {/* Cards showing ticket count by status */}
      <div className="dashboard-cards">
        <div className="dashboard-card" style={{ borderTop: '4px solid #3b82f6' }}>
          <h2 className="card-title">Open</h2>
          <p className="card-value">{statusCount.open || 0}</p>
        </div>
        <div className="dashboard-card" style={{ borderTop: '4px solid #f59e0b' }}>
          <h2 className="card-title">In Progress</h2>
          <p className="card-value">{statusCount.in_progress || 0}</p>
        </div>
        <div className="dashboard-card" style={{ borderTop: '4px solid #1a412dff' }}>
          <h2 className="card-title">Closed</h2>
          <p className="card-value">{statusCount.closed || 0}</p>
        </div>
      </div>

      {/* Cards showing ticket count by priority (only open/in-progress tickets) */}
      <div className="dashboard-cards" style={{ marginTop: 25 }}>
        <div className="dashboard-card" style={{ borderTop: '4px solid #ef4444' }}>
          <h2 className="card-title">High Priority</h2>
          <p className="card-value">{priorityCount.high || 0}</p>
        </div>
        <div className="dashboard-card" style={{ borderTop: '4px solid #bd08eaff' }}>
          <h2 className="card-title">Medium Priority</h2>
          <p className="card-value">{priorityCount.medium || 0}</p>
        </div>
        <div className="dashboard-card" style={{ borderTop: '4px solid #22c55e' }}>
          <h2 className="card-title">Low Priority</h2>
          <p className="card-value">{priorityCount.low || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
