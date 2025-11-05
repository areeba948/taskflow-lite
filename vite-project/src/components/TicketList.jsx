import React, { useState, useEffect } from "react";
import "./TicketList.css"; // Import CSS for styling

// TicketList component shows a list of tickets and allows editing, deleting, commenting, and status updates
// Props:
// - tickets: array of ticket objects
// - onEdit: function to edit a ticket
// - onDelete: function to delete a ticket
// - onAddComment: function to add a comment to a ticket
// - onUpdate: function to update a ticket (status change)
const TicketList = ({ tickets, onEdit, onDelete, onAddComment, onUpdate }) => {
  const [filter, setFilter] = useState("all"); // Filter for ticket status
  const [commentText, setCommentText] = useState({}); // Store text for new comments for each ticket

  // Update filter whenever tickets change (keeps filter unchanged)
  useEffect(() => {
    setFilter((prev) => prev);
  }, [tickets]);

  // Filter tickets based on the selected status
  const filteredTickets = React.useMemo(() => {
    // Treat "reopen" status as "open" for display
    const normalized = tickets.map((t) =>
      t.status === "reopen" ? { ...t, status: "open" } : t
    );

    if (filter === "all") return normalized; // Show all tickets if filter is 'all'

    return normalized.filter((t) => t.status === filter); // Show only tickets matching filter
  }, [tickets, filter]);

  // Format a date string into readable format
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date)) return "N/A";
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Add a comment to a ticket
  const handleAddComment = (ticket) => {
    if (!commentText[ticket.id] || !commentText[ticket.id].trim()) return;

    onAddComment(ticket, {
      text: commentText[ticket.id],
      createdAt: new Date().toISOString(),
    });

    // Clear the input field after adding comment
    setCommentText({ ...commentText, [ticket.id]: "" });
  };

  // Mark a ticket as completed (closed)
  const handleMarkCompleted = (ticket) => {
    if (ticket.status === "closed") return;

    const updatedTicket = {
      ...ticket,
      status: "closed",
      updatedAt: new Date().toISOString(),
    };
    onUpdate(updatedTicket);
  };

  // Reopen a closed ticket
  const handleReopen = (ticket) => {
    if (ticket.status !== "closed") return;

    const updatedTicket = {
      ...ticket,
      status: "reopen",
      updatedAt: new Date().toISOString(),
    };
    onUpdate(updatedTicket);
  };

  return (
    <div className="ticket-container">
      <h2 className="ticket-heading">Tickets</h2>

      {/* Dropdown to filter tickets by status */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="ticket-filter"
      >
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <div className="ticket-list">
        {/* Show message if no tickets */}
        {filteredTickets.length === 0 && (
          <p className="ticket-empty">No tickets found.</p>
        )}

        {/* Display each ticket */}
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card">
            {/* Ticket title and status */}
            <div className="ticket-top">
              <h3 className="ticket-title">{ticket.title}</h3>
              <span className={`ticket-status ${ticket.status}`}>
                {ticket.status.replace("_", " ")}
              </span>
            </div>

            {/* Ticket priority */}
            <p className="ticket-priority">
              <strong>Priority:</strong>{" "}
              <span className={`priority-badge ${ticket.priority}`}>
                {ticket.priority || "None"}
              </span>
            </p>

            {/* Ticket description */}
            <p className="ticket-desc">{ticket.description}</p>

            {/* Show created or updated timestamp */}
            <small className="ticket-timestamp">
              {ticket.updatedAt
                ? `Edited: ${formatDate(ticket.updatedAt)}`
                : `Created: ${formatDate(ticket.createdAt)}`}
            </small>

            {/* Edit and Delete buttons */}
            <div className="ticket-actions">
              <button className="edit-btn" onClick={() => onEdit(ticket)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => onDelete(ticket.id)}>
                Delete
              </button>
            </div>

            {/* Comments section */}
            <div className="ticket-comments">
              {/* Show existing comments */}
              {ticket.comments.map((c, index) => (
                <div key={index} className="comment-card">
                  <small className="comment-time">{formatDate(c.createdAt)}</small>
                  <p className="comment-text">{c.text}</p>
                </div>
              ))}

              {/* Input to add a new comment */}
              <div className="add-comment">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText[ticket.id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [ticket.id]: e.target.value,
                    })
                  }
                  className="comment-input"
                />
                <button
                  onClick={() => handleAddComment(ticket)}
                  className="comment-btn"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Mark as Completed / Reopen button */}
            <div className="bottom-right">
              {ticket.status === "closed" ? (
                <button
                  onClick={() => handleReopen(ticket)}
                  className="complete-btn reopen"
                >
                  🔄 Reopen
                </button>
              ) : (
                <button
                  onClick={() => handleMarkCompleted(ticket)}
                  disabled={ticket.status === "closed"}
                  className="complete-btn complete"
                >
                  {ticket.status === "closed"
                    ? "✅ Completed"
                    : "Mark as Completed"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;
