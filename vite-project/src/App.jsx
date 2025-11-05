import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard.jsx';
import TicketSection from './components/TicketSection.jsx';
import TicketList from './components/TicketList.jsx';
import TicketForm from './components/TicketForm.jsx'; // ✅ import the form for popup

const App = () => {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('tickets');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showForm, setShowForm] = useState(false); // ✅ for popup visibility

  // Save tickets to localStorage
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const addOrUpdateTicket = (ticket) => {
    if (ticket.id && tickets.some(t => t.id === ticket.id)) {
      setTickets(tickets.map(t => (t.id === ticket.id ? ticket : t)));
    } else {
      ticket.id = Date.now();
      ticket.createdAt = new Date().toISOString();
      ticket.comments = ticket.comments || [];
      setTickets([...tickets, ticket]);
    }
    setSelectedTicket(null);
    setShowForm(false); // ✅ close popup after saving
  };

  const addComment = (comment) => {
    if (!selectedTicket) return;
    const updatedTicket = { ...selectedTicket };
    updatedTicket.comments.push({ id: Date.now(), ...comment });
    setTickets(tickets.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)));
    setSelectedTicket(updatedTicket);
  };

  return (
    <div style={styles.container}>
      {/* ✅ Dashboard with "New Ticket" button */}
      <Dashboard tickets={tickets} onNewTicket={() => setShowForm(true)} />

      <div style={styles.columns}>
        <div style={styles.right}>
          <TicketList
            tickets={tickets}
            onEdit={(ticket) => {
              setSelectedTicket(ticket);
              setShowForm(true); // ✅ open popup for editing
            }}
            onDelete={(id) => setTickets(tickets.filter((t) => t.id !== id))}
            onAddComment={(ticket, comment) => {
              const updated = {
                ...ticket,
                comments: [...ticket.comments, { id: Date.now(), ...comment }],
              };
              setTickets(tickets.map((t) => (t.id === ticket.id ? updated : t)));
              if (selectedTicket?.id === ticket.id) setSelectedTicket(updated);
            }}
          />
        </div>
      </div>

      {/* ✅ Popup Form */}
      {showForm && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupBox}>
            <TicketForm
              onSubmit={addOrUpdateTicket}
              ticket={selectedTicket}
            />
            <button style={styles.closeBtn} onClick={() => { setShowForm(false); setSelectedTicket(null); }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

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
  // ✅ popup styles
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  popupBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '400px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    position: 'relative',
  },
  closeBtn: {
    marginTop: 10,
    padding: '8px 12px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default App;
