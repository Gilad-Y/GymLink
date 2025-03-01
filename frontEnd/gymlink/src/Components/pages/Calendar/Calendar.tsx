import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import axios from "axios";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

interface CalendarEvent {
  id: string;
  start: Date;
  end: Date;
  title: string;
}

const App: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get(
          "http://localhost:4000/api/v1/calendar",
          {
            withCredentials: true, // Ensure credentials are included for session-based auth
            headers: {
              Authorization: `Bearer ${token}`, // Add token from localStorage
            },
          }
        );

        const fetchedEvents = response.data.map((event: any) => ({
          id: event.id,
          start: new Date(event.start), // Ensure proper date formatting
          end: new Date(event.end), // Ensure proper date formatting
          title: event.summary,
        }));
        setEvents(fetchedEvents);
        setLoading(false);
      } catch (error) {
        setError("Error fetching events. Please try again.");
        console.error("Error fetching events", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Run only once on component mount

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = prompt("Enter Event Title:");
    if (title) {
      const newEvent: CalendarEvent = {
        id: String(events.length + 1),
        start,
        end,
        title,
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div>
      {loading && <p>Loading events...</p>}
      {error && <p>{error}</p>}
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={localizer}
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default App;
