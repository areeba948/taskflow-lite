import React from 'react';
import logo from '../assets/image-removebg-preview (1).png'; // your logo path

const Dashboard = ({ tickets, onNewTicket }) => {
  // Count by status
  const statusCount = tickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  // ✅ Count by priority — only include *non-closed* tickets
  const priorityCount = tickets.reduce((acc, t) => {
    if (t.status !== 'closed' && t.priority) {
      acc[t.priority] = (acc[t.priority] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div style={styles.container}>
      {/* Header with New Ticket button */}
      <header style={styles.header}>
        <div style={styles.leftHeader}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <h1 style={styles.title}>TaskFlow Lite</h1>
        </div>
        <button style={styles.newTicketBtn} onClick={onNewTicket}>
          New Ticket
        </button>
      </header>

      <p style={styles.welcome}>
        Welcome back! Here's a quick overview of your tasks:
      </p>

      {/* Status Cards */}
      <div style={styles.cards}>
        <div style={styles.card}>
          <h2>Status: Open</h2>
          <p>{statusCount.open || 0}</p>
        </div>
        <div style={styles.card}>
          <h2>Status: In Progress</h2>
          <p>{statusCount.in_progress || 0}</p>
        </div>
        <div style={styles.card}>
          <h2>Status: Closed</h2>
          <p>{statusCount.closed || 0}</p>
        </div>
      </div>

      {/* Priority Cards */}
      <div style={{ ...styles.cards, marginTop: 20 }}>
        <div style={styles.card}>
          <h2>Priority: High</h2>
          <p>{priorityCount.high || 0}</p>
        </div>
        <div style={styles.card}>
          <h2>Priority: Medium</h2>
          <p>{priorityCount.medium || 0}</p>
        </div>
        <div style={styles.card}>
          <h2>Priority: Low</h2>
          <p>{priorityCount.low || 0}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    marginBottom: 30,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // ✅ pushes button to right
    marginBottom: 20,
  },
  leftHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  newTicketBtn: {
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 14,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    transition: 'background-color 0.2s ease',
  },
  newTicketBtnHover: {
    backgroundColor: '#0056b3',
  },
  welcome: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  cards: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
  },
  card: {
    flex: '1 1 200px',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
};

export default Dashboard;
