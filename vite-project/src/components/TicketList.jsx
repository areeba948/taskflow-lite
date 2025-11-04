import React, { useState } from 'react';

const TicketList = ({ tickets, onEdit, onDelete, onAddComment }) => {
  const [filter, setFilter] = useState('all');
  const [commentText, setCommentText] = useState({});

  const filteredTickets =
    filter === 'all' ? tickets : tickets.filter(t => t.status === filter);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    if (isNaN(date)) return 'N/A';
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAddComment = (ticket) => {
    if (!commentText[ticket.id] || !commentText[ticket.id].trim()) return;
    onAddComment(ticket, { text: commentText[ticket.id], createdAt: new Date().toISOString() });
    setCommentText({ ...commentText, [ticket.id]: '' });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Tickets</h2>

      {/* Filter */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={styles.select}
      >
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <div style={styles.list}>
        {filteredTickets.length === 0 && <p style={styles.empty}>No tickets found.</p>}

        {filteredTickets.map(ticket => (
          <div key={ticket.id} style={styles.ticketCard}>
            <div style={styles.ticketTop}>
              <h3 style={styles.title}>{ticket.title}</h3>
              <span style={styles.status(ticket.status)}>{ticket.status.replace('_', ' ')}</span>
            </div>

            <p style={styles.desc}>{ticket.description}</p>

            <small style={styles.timestamp}>
              {ticket.updatedAt
                ? `Edited: ${formatDate(ticket.updatedAt)}`
                : `Created: ${formatDate(ticket.createdAt)}`}
            </small>

            {/* Actions */}
            <div style={styles.actions}>
              <button style={styles.editBtn} onClick={() => onEdit(ticket)}>Edit</button>
              <button style={styles.deleteBtn} onClick={() => onDelete(ticket.id)}>Delete</button>
            </div>

            {/* Comments */}
            <div style={styles.comments}>
              {ticket.comments.map((c, index) => (
                <div key={index} style={styles.commentCard}>
                  <small style={styles.commentTime}>{formatDate(c.createdAt)}</small>
                  <p style={styles.commentText}>{c.text}</p>
                </div>
              ))}

              {/* Add Comment */}
              <div style={styles.addComment}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText[ticket.id] || ''}
                  onChange={(e) =>
                    setCommentText({ ...commentText, [ticket.id]: e.target.value })
                  }
                  style={styles.commentInput}
                />
                <button onClick={() => handleAddComment(ticket)} style={styles.commentBtn}>
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { marginTop: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  select: { padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 15 },
  list: { display: 'flex', flexDirection: 'column', gap: 15 },
  ticketCard: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  ticketTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { margin: 0, fontSize: 18, color: '#222' },
  status: (status) => ({
    fontSize: 12,
    textTransform: 'capitalize',
    padding: '4px 10px',
    borderRadius: 12,
    color: '#fff',
    backgroundColor:
      status === 'open'
        ? '#007bff'
        : status === 'in_progress'
        ? '#f0ad4e'
        : '#28a745',
  }),
  desc: { marginTop: 6, marginBottom: 8, color: '#555', fontSize: 14 },
  timestamp: { fontSize: 12, color: '#888', fontStyle: 'italic' },
  actions: { marginTop: 10, display: 'flex', gap: 10 },
  editBtn: {
    padding: '5px 10px',
    border: 'none',
    borderRadius: 6,
    backgroundColor: '#17a2b8',
    color: '#fff',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '5px 10px',
    border: 'none',
    borderRadius: 6,
    backgroundColor: '#dc3545',
    color: '#fff',
    cursor: 'pointer',
  },
  comments: { marginTop: 10 },
  commentCard: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    marginBottom: 5,
  },
  commentTime: { fontSize: 11, color: '#888' },
  commentText: { margin: 2, fontSize: 14 },
  addComment: { display: 'flex', gap: 8, marginTop: 5 },
  commentInput: { flex: 1, padding: 6, borderRadius: 6, border: '1px solid #ccc' },
  commentBtn: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: 6,
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  empty: { textAlign: 'center', color: '#777' },
};

export default TicketList;
