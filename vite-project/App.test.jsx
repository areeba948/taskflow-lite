import '@testing-library/jest-dom';
import React from "react"; 
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./src/App.jsx";

test("creates a new ticket", () => {
  render(<App />);

  // Click "Create Ticket" button
  fireEvent.click(screen.getByText("+ New Ticket"));

  // Fill in title & description
  fireEvent.change(screen.getByPlaceholderText("Enter ticket title"), { target: { value: "Test Task" } });
  fireEvent.change(screen.getByPlaceholderText("Describe the issue or task..."), { target: { value: "Test description" } });

  // Submit form
  fireEvent.click(screen.getByText("Add Ticket"));

  // Check if new ticket appears
  expect(screen.getByText("Test Task")).toBeInTheDocument();
  expect(screen.getByText("Test description")).toBeInTheDocument();
});
