import React from "react";
import { createRoot } from "react-dom/client";
import ReactCalendars from "../components/Calendar/react_calendar.jsx";

document.addEventListener("DOMContentLoaded", () => {
  const calendarDataEl = document.getElementById("calendar-data");
  if (calendarDataEl) {
    createRoot(calendarDataEl).render(<ReactCalendars />);
  }
});