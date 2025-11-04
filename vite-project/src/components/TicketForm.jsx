import React, { useState, useEffect } from 'react';

const TicketForm = ({ onSubmit, ticket }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title || '');
      setDescription(ticket.description || '');
      setStatus(ticket.status || 'open');
      setPriority(ticket.priority || '');
    } else {
      setTitle('');
      setDescription('');
      setStatus('open');
      setPriority('');
    }
  }, [ticket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const now = new Date().toISOString();

    const updatedTicket = {
      id: ticket?.id,
      title,
      description,
      status,
      priority,
      comments: ticket?.comments || [],
      createdAt: ticket?.createdAt || now, // keep original if editing
      updatedAt: ticket ? now : null, // only set updatedAt if editing
    };

    onSubmit(updatedTicket);

    if (!ticket) {
      setTitle('');
      setDescription('');
      setStatus('open');
      setPriority('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formCard}>
      <h2 style={styles.heading}>{ticket ? 'Edit Ticket' : 'Create Ticket'}</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.textarea}
        required
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.select}>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)} style={styles.select}>
        <option value="">Priority (optional)</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit" style={styles.button}>
        {ticket ? 'Update Ticket' : 'Add Ticket'}
      </button>
    </form>
  );
};

const styles = {
  formCard: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: { padding: 8, borderRadius: 6, border: '1px solid #ccc' },
  textarea: {
    padding: 8,
    borderRadius: 6,
    border: '1px solid #ccc',
    resize: 'vertical',
    minHeight: 80,
  },
  select: { padding: 8, borderRadius: 6, border: '1px solid #ccc' },
  button: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: 6,
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    marginTop: 10,
  },
};

export default TicketForm;
