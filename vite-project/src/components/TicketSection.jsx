import React, { useState, useEffect } from "react";
import TicketForm from "./TicketForm";

const TicketSection = ({ onSubmit, ticket, clearSelected }) => {
  const [showForm, setShowForm] = useState(false);

  // ✅ Automatically open form if editing a ticket
  useEffect(() => {
    if (ticket) setShowForm(true);
  }, [ticket]);

  const handleToggleForm = () => {
    if (showForm && ticket) {
      clearSelected(); // close edit mode if open
    }
    setShowForm((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.heading}>Tickets</h2>
        <button onClick={handleToggleForm} style={styles.newTicketButton}>
          {showForm ? (ticket ? "Cancel Edit" : "Close Form") : "New Ticket"}
        </button>
      </div>

      {showForm && (
        <div style={styles.formWrapper}>
          <TicketForm onSubmit={onSubmit} ticket={ticket} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  newTicketButton: {
    padding: "8px 14px",
    backgroundColor: "#fff",
    color: "#007bff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "500",
    fontSize: 15,
  },
  formWrapper: {
    marginTop: 15,
  },
};

export default TicketSection;
