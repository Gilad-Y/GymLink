import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import axios from "axios";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

interface CalendarEvent {
  id: number;
  start: Date;
  end: Date;
  title: string;
}

const App: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(
    null
  );

  // Exchange JWT for OAuth Access Token
  const exchangeToken = async (jwt: string) => {
    try {
      const response = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: GOOGLE_CLIENT_ID,
        grant_type: "authorization_code",
        redirect_uri: "postmessage",
        code: jwt,
      });

      setGoogleAccessToken(response.data.access_token);
      console.log("Google Access Token:", response.data.access_token);
    } catch (error) {
      console.error("Failed to exchange token:", error);
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      exchangeToken(credentialResponse.credential);
    }
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = prompt("Enter Event Title:");
    if (title) {
      const newEvent: CalendarEvent = {
        id: events.length + 1,
        start,
        end,
        title,
      };
      setEvents([...events, newEvent]);

      if (googleAccessToken) {
        addEventToGoogleCalendar(newEvent);
      }
    }
  };

  const addEventToGoogleCalendar = async (event: CalendarEvent) => {
    try {
      const response = await axios.post(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          summary: event.title,
          start: { dateTime: event.start.toISOString(), timeZone: "UTC" },
          end: { dateTime: event.end.toISOString(), timeZone: "UTC" },
        },
        {
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Event added to Google Calendar:", response.data);
    } catch (error) {
      console.error("Error adding event to Google Calendar:", error);
    }
  };

  return (
    // <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    //   <div className="App">
    //     {!googleAccessToken ? (
    //       <GoogleLogin
    //         onSuccess={handleGoogleLoginSuccess}
    //         onError={() => console.error("Google Login Failed")}
    //       />
    //     ) : (
    //       <p>Google Connected</p>
    //     )}

    <DnDCalendar
      defaultDate={moment().toDate()}
      defaultView="month"
      events={events}
      localizer={localizer}
      selectable
      onSelectSlot={handleSelectSlot}
      style={{ height: "100vh" }}
    />
    // </div>
    //</GoogleOAuthProvider>
  );
};

export default App;
