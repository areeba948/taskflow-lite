import React, { useState, useEffect } from "react";
import "./TicketForm.css"; // Separate CSS file for styling

// TicketForm component is used to create a new ticket or edit an existing one
// Props:
// - onSubmit: function to handle saving the ticket
// - ticket: existing ticket object (if editing)
// - onClose: function to close the form
const TicketForm = ({ onSubmit, ticket, onClose }) => {
  // State variables for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open"); // default status is "open"
  const [priority, setPriority] = useState("");

  // When the 'ticket' prop changes, update the form fields
  useEffect(() => {
    if (ticket) {
      // If editing an existing ticket, fill form with its values
      setTitle(ticket.title || "");
      setDescription(ticket.description || "");
      setStatus(ticket.status || "open");
      setPriority(ticket.priority || "");
    } else {
      // If creating new ticket, reset form to default values
      setTitle("");
      setDescription("");
      setStatus("open");
      setPriority("");
    }
  }, [ticket]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Ignore submission if title or description is empty
    if (!title.trim() || !description.trim()) return;

    const now = new Date().toISOString(); // current timestamp

    // Prepare ticket object
    const updatedTicket = {
      id: ticket?.id || Date.now(), // use existing id if editing, else generate new
      title,
      description,
      status,
      priority,
      comments: ticket?.comments || [], // keep existing comments if editing
      createdAt: ticket?.createdAt || now, // preserve creation date
      updatedAt: ticket ? now : null, // mark update time if editing
    };

    onSubmit(updatedTicket); // pass ticket to parent component

    // Reset form only if creating a new ticket
    if (!ticket) {
      setTitle("");
      setDescription("");
      setStatus("open");
      setPriority("");
    }
  };

  // Close form if user clicks outside the form (overlay)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="ticket-overlay" onClick={handleOverlayClick}>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <h2>{ticket ? "Edit Ticket" : "Create Ticket"}</h2>

        {/* Title input */}
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter ticket title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description textarea */}
        <label>Description</label>
        <textarea
          placeholder="Describe the issue or task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Status and Priority selection */}
        <div className="form-row">
          <div>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Form buttons */}
        <div className="form-actions">
          <button type="submit">{ticket ? "Update Ticket" : "Add Ticket"}</button>
          <button type="button" className="cancel-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
