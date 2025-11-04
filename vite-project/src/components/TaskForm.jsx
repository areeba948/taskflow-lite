import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ addTask }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    addTask(input);
    setInput('');
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
