import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard.jsx';
import TicketForm from './components/TicketForm.jsx';
import TicketList from './components/TicketList.jsx';
import CommentList from './components/CommentList.jsx';

const App = () => {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('tickets');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Save tickets to localStorage
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const addOrUpdateTicket = ticket => {
    if (ticket.id) {
      setTickets(tickets.map(t => (t.id === ticket.id ? ticket : t)));
    } else {
      ticket.id = Date.now();
      ticket.createdAt = new Date().toISOString();
      ticket.comments = ticket.comments || [];
      setTickets([...tickets, ticket]);
    }
    setSelectedTicket(null);
  };

  const addComment = comment => {
    if (!selectedTicket) return;
    const updatedTicket = { ...selectedTicket };
    updatedTicket.comments.push({ id: Date.now(), ...comment });
    setTickets(tickets.map(t => (t.id === updatedTicket.id ? updatedTicket : t)));
    setSelectedTicket(updatedTicket);
  };

  return (
    <div style={styles.container}>
      {/* Modern Dashboard */}
      <Dashboard tickets={tickets} />

      {/* Two-column layout (Left: Form, Right: Ticket List) */}
      <div style={styles.columns}>
        {/* Left column → Ticket Form + Comments */}
        <div style={styles.left}>
        <TicketForm onSubmit={addOrUpdateTicket} ticket={selectedTicket} />
        </div>


        {/* Right column → Ticket List */}
        <div style={styles.right}>
          <TicketList
            tickets={tickets}
            onEdit={ticket => setSelectedTicket(ticket)}
            onDelete={id => setTickets(tickets.filter(t => t.id !== id))}
            onAddComment={(ticket, comment) => {
            const updated = { ...ticket, comments: [...ticket.comments, { id: Date.now(), ...comment }] };
            setTickets(tickets.map(t => (t.id === ticket.id ? updated : t)));
            if (selectedTicket?.id === ticket.id) setSelectedTicket(updated);
  }}
/>

        </div>
      </div>
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
  left: {
    flex: 1,
    minWidth: 300,
  },
  right: {
    flex: 2,
    minWidth: 300,
  },
};

export default App;
