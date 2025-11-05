## TaskFlow Lite

TaskFlow Lite is a simple task management dashboard built with React.  
It allows users to create, edit, and track tickets based on status and priority, all within a clean and responsive interface.

--------------------------------------------------------------------------------------------------------

## Features
- Create, edit, and delete tickets
- Filter by status or priority
- Add comments on tickets
- View task summaries on the dashboard
- Responsive and minimal UI
- Persistent local data (no backend required)

--------------------------------------------------------------------------------------------------------

## Setup Instructions

1. Clone the repository:
   
   git clone https://github.com/areeba948/taskflow-lite.git
   cd taskflow-lite

2. Install the dependencies
    npm install 

3. Run the project locally
    npm run dev

4. Open in your browser
    http://localhost:


## How to test 

You can manually test the app by:

1. Adding new tasks
2. Marking tasks as completed
3. Deleting tasks

## How to Use / Test the App

# Create a ticket:
1. Click "Create Ticket"
2. Enter title, description, optional priority, and status
3. Click "Add Ticket"

# Edit a ticket:
1. Click "Edit" on any ticket
2. Update status, priority, or description
3. Click "Update Ticket"

# Delete a ticket:
1. Click "Delete" on any ticket to remove it
2. Add comments:
3. Type a comment in the "Add a comment..." input
4. Click "Add" to save it with a timestamp

# Filter tickets:
1. Use the dropdown to filter by status (Open, In Progress, Closed)
2. The ticket list updates automatically

# Dashboard:
1. View counts of tickets by status and priority
2. Dashboard updates in real-time when tickets are added, edited, or deleted

## Validation & Error Handling
1. Title and description are required when creating or editing a ticket
2. Priority is optional
3. User-friendly UI with feedback on actions
