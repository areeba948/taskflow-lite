// seed.js
const sampleTickets = [
  {
    id: Date.now(),
    title: "Fix login bug",
    description: "Users cannot login",
    status: "open",
    priority: "high",
    comments: [
      { id: Date.now() + 1, text: "This is urgent!", createdAt: new Date().toISOString() }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
  {
    id: Date.now() + 2,
    title: "Add dashboard charts",
    description: "Show tickets by status and priority",
    status: "in_progress",
    priority: "medium",
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
  {
    id: Date.now() + 3,
    title: "Update README",
    description: "Add setup instructions",
    status: "closed",
    priority: "low",
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: null,
  }
];

// Save to localStorage (works in browser console)
localStorage.setItem("tickets", JSON.stringify(sampleTickets));
console.log("Sample tickets seeded!");
