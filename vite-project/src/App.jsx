import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard.jsx';
import TicketList from './components/TicketList.jsx';
import TicketForm from './components/TicketForm.jsx';

// Main App component
const App = () => {
  // State to store all tickets, initialized from localStorage if available
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('tickets');
    return saved ? JSON.parse(saved) : [];
  });

  // State for the ticket currently selected for editing
  const [selectedTicket, setSelectedTicket] = useState(null);

  // State to control whether the TicketForm is visible
  const [showForm, setShowForm] = useState(false);

  // Save tickets to localStorage whenever tickets state changes
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Add a new ticket or update an existing ticket
  const addOrUpdateTicket = (ticket) => {
    const now = new Date().toISOString();

    setTickets((prev) => {
      const existing = prev.find((t) => t.id === ticket.id);

      if (existing) {
        // Update existing ticket
        const updated = prev.map((t) =>
          t.id === ticket.id
            ? {
                ...t,
                ...ticket,
                status:
                  ticket.status === 'reopen'
                    ? 'open'
                    : ticket.status || existing.status || 'open',
                updatedAt: now, // Update the edited timestamp
              }
            : t
        );
        return [...updated];
      }

      // Add new ticket
      const newTicket = {
        ...ticket,
        id: Date.now(), // Unique id for new ticket
        status:
          ticket.status === 'reopen'
            ? 'open'
            : ticket.status || 'open',
        createdAt: now, // Creation timestamp
        updatedAt: null, // No edits yet
        comments: ticket.comments || [], // Initialize comments
      };
      return [...prev, newTicket];
    });

    // Close form and clear selected ticket
    setSelectedTicket(null);
    setShowForm(false);
  };

  // Update an existing ticket (used for status changes like close/reopen)
  const updateTicket = (updatedTicket) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === updatedTicket.id
          ? {
              ...updatedTicket,
              status:
                updatedTicket.status === 'reopen'
                  ? 'open'
                  : updatedTicket.status,
            }
          : t
      )
    );
  };

  // Delete a ticket by id
  const deleteTicket = (id) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  // Add a comment to a ticket
  const addComment = (ticket, comment) => {
    const updated = {
      ...ticket,
      comments: [...ticket.comments, { id: Date.now(), ...comment }],
    };
    setTickets((prev) =>
      prev.map((t) => (t.id === ticket.id ? updated : t))
    );

    // Update selectedTicket if it's the one being commented
    if (selectedTicket?.id === ticket.id) setSelectedTicket(updated);
  };

  // Normalize tickets: convert 'reopen' status to 'open' for display
  const normalizedTickets = tickets.map((t) =>
    t.status === 'reopen' ? { ...t, status: 'open' } : t
  );

  return (
    <div style={styles.container}>
      {/* Dashboard component shows summary cards */}
      <Dashboard tickets={normalizedTickets} onNewTicket={() => setShowForm(true)} />

      {/* Layout: Right column contains the TicketList */}
      <div style={styles.columns}>
        <div style={styles.right}>
          <TicketList
            tickets={normalizedTickets}
            onEdit={(ticket) => {
              setSelectedTicket(ticket);
              setShowForm(true); // Show form when editing
            }}
            onDelete={deleteTicket} // Delete ticket handler
            onAddComment={addComment} // Add comment handler
            onUpdate={updateTicket} // Update ticket handler
          />
        </div>
      </div>

      {/* Show TicketForm when showForm is true */}
      {showForm && (
        <TicketForm
          ticket={selectedTicket} // Pass ticket to edit or null for new
          onSubmit={addOrUpdateTicket} // Save ticket handler
          onClose={() => {
            setShowForm(false); // Close form
            setSelectedTicket(null); // Clear selected ticket
          }}
        />
      )}
    </div>
  );
};

// Inline styles for layout
const styles = {
  container: {
    padding: 20,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  columns: {
    display: 'flex',
    gap: 20,
    marginTop: 20,
    alignItems: 'flex-start',
  },
  right: {
    flex: 2,
    minWidth: 300,
  },
};

export default App;
