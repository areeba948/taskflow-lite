import React, { useState, useEffect } from 'react';

const TicketForm = ({ onSubmit, ticket }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [priority, setPriority] = useState('');

  // When ticket changes (edit mode), populate form
  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title || '');
      setDescription(ticket.description || '');
      setStatus(ticket.status || 'open');
      setPriority(ticket.priority || '');
    } else {
      // Reset form if no ticket selected
      setTitle('');
      setDescription('');
      setStatus('open');
      setPriority('');
    }
  }, [ticket]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onSubmit({
      id: ticket?.id, // include ID if editing
      title,
      description,
      status,
      priority,
      createdAt: ticket?.createdAt, // preserve createdAt
      comments: ticket?.comments || [],
    });

    // Reset form after submit
    if (!ticket) {
      setTitle('');
      setDescription('');
      setStatus('open');
      setPriority('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formCard}>
      <h2>{ticket ? 'Edit Ticket' : 'Create Ticket'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={styles.input}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={styles.textarea}
        required
      />
      <select value={status} onChange={e => setStatus(e.target.value)} style={styles.select}>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <select value={priority} onChange={e => setPriority(e.target.value)} style={styles.select}>
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
  input: { padding: 8, borderRadius: 6, border: '1px solid #ccc' },
  textarea: { padding: 8, borderRadius: 6, border: '1px solid #ccc', resize: 'vertical', minHeight: 80 },
  select: { padding: 8, borderRadius: 6, border: '1px solid #ccc' },
  button: { padding: '8px 12px', border: 'none', borderRadius: 6, backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', marginTop: 10 },
};

export default TicketForm;
