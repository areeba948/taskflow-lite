import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ addTask }) {
  const [input, setInput] = useState('');

const handleSubmit = e => {
  e.preventDefault();

  const now = new Date().toISOString();

  const newTicket = {
    id: ticket?.id || Date.now(),
    title,
    description,
    status,
    priority,
    comments: ticket?.comments || [],
    createdAt: ticket?.createdAt || now, // Keep original createdAt
    updatedAt: ticket ? now : ticket?.updatedAt || null, // Add updatedAt only if editing
  };

  onSubmit(newTicket);

  // Reset form only after creating a new ticket
  if (!ticket) {
    setTitle('');
    setDescription('');
    setStatus('open');
    setPriority('medium');
  }
};


  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="add-btn">
        Add
      </button>
    </form>
  );
}

export default TaskForm;
