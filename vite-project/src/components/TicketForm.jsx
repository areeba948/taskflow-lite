import React, { useState, useEffect } from 'react';

const TicketForm = ({ onSubmit, ticket }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [priority, setPriority] = useState('medium');

  // Populate form when editing a ticket
  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title || '');
      setDescription(ticket.description || '');
      setStatus(ticket.status || 'open');
      setPriority(ticket.priority || 'medium');
    }
  }, [ticket]);

  const handleSubmit = e => {
    e.preventDefault();

    // Build ticket object (do not include createdAt)
    const newTicket = {
      id: ticket?.id, // keep existing id if editing
      title,
      description,
      status,
      priority,
      comments: ticket?.comments || [],
    };

    onSubmit(newTicket);

    // Reset form after adding a new ticket
    if (!ticket) {
      setTitle('');
      setDescription('');
      setStatus('open');
      setPriority('medium');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={styles.input}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        style={styles.textarea}
      />
      <select value={status} onChange={e => setStatus(e.target.value)} style={styles.select}>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <select value={priority} onChange={e => setPriority(e.target.value)} style={styles.select}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit" style={styles.button}>
        {ticket ? 'Update Ticket' : 'Add Ticket'}
      </button>
    </form>
  );
};

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 },
  input: { padding: 8 },
  textarea: { padding: 8, height: 60 },
  select: { padding: 8 },
  button: { padding: 10, backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' },
};

export default TicketForm;
