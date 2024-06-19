import React from "react";
import { createRoot } from "react-dom/client";
import ReactCalendars from "../components/Calendar/react_calendar.jsx";
import ReactCalculate from "../components/Calculate/react_calculate.jsx";
import ReactToDo from "../components/ToDo/react_ToDo.jsx"

document.addEventListener("DOMContentLoaded", () => {
  const calendarDataEl = document.getElementById("calendar-data");
  if (calendarDataEl) {
    createRoot(calendarDataEl).render(<ReactCalendars />);
  }

  const calcDataEl = document.getElementById("daily_calc");
  if (calcDataEl) {
    createRoot(calcDataEl).render(<ReactCalculate />);
  }

  const toDoEl = document.getElementById("to_do");
  if (toDoEl) {
    createRoot(toDoEl).render(<ReactToDo />);
  }
});