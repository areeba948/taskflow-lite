import React from 'react';
import './Dashboard.css';
import logo from '../assets/image-removebg-preview (1).png';

const Dashboard = ({ tickets, onNewTicket }) => {
  const statusCount = tickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const priorityCount = tickets.reduce((acc, t) => {
    if (t.status !== 'closed' && t.priority) {
      acc[t.priority] = (acc[t.priority] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <img src={logo} alt="Logo" className="dashboard-logo" />
          <h1 className="dashboard-title">TaskFlow Lite</h1>
        </div>
        <button className="new-ticket-btn" onClick={onNewTicket}>
          + New Ticket
        </button>
      </header>

      <p className="dashboard-welcome">
        Welcome back 👋 Here's your quick task overview
      </p>

      <div className="dashboard-cards">
        <div className="dashboard-card" style={{ borderTop: '4px solid #3b82f6' }}>
          <h2 className="card-title">Open</h2>
          <p className="card-value">{statusCount.open || 0}</p>
        </div>
        <div className="dashboard-card" style={{ borderTop: '4px solid #f59e0b' }}>
          <h2 className="card-title">In Progress</h2>
          <p className="card-value">{statusCount.in_progress || 0}</p>
        </div>
        <div className="dashboard-card" style={{ borderTop: '4px solid #10b981' }}>
          <h2 className="card-title">Closed</h2>
          <p className="card-value">{statusCount.closed || 0}</p>
        </div>
      </div>

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
