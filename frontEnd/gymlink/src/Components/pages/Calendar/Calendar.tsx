import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  createEvent,
  deleteEvent,
  getEventsByUserId,
  getTraineesByUserId,
  updateEvent,
} from "../../../util/api";
import EventModel from "../../../models/eventsModel";
import store from "../../../redux/store";
import {
  Modal,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { IconButton } from "@mui/joy";

// Set up localizer for the calendar
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const App: React.FC = () => {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);
  const [trainees, setTrainees] = useState<any[]>([]); // State to hold trainees data
  const user = store.getState().users.user;

  // Fetch events from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEventsByUserId(user?._id || "");

      // Ensure dates are in the correct format
      const formattedEvents = events.map((event: EventModel) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));

      setEvents(formattedEvents); // Update events state with fetched data
    };

    fetchEvents();
  }, [user?._id]); // Run only once on component mount

  // Fetch trainees from the backend API
  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const response = await getTraineesByUserId(user?._id || ""); // Assuming this is your endpoint for fetching trainees

        setTrainees(response);
      } catch (error) {
        console.error("Error fetching trainees:", error);
        setError("Failed to load trainees.");
      }
    };

    fetchTrainees();
  }, [user?._id]); // Run once to load trainees

  const handleSelectSlot = (slotInfo: any) => {
    setSelectedSlot(slotInfo);
    setSelectedEvent(null); // Clear selected event when selecting a new slot
    reset({ title: "", to: "" }); // Reset form fields
    setOpen(true); // Open modal when a slot is selected
  };

  const handleSelectEvent = (
    event: object,
    e: React.SyntheticEvent<HTMLElement, Event>
  ) => {
    const selectedEvent = event as EventModel;
    setSelectedEvent(selectedEvent);
    setSelectedSlot(null); // Clear selected slot when selecting an event
    setOpen(true); // Open modal when an event is selected
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSlot(null); // Clear selected slot when closing modal
    setSelectedEvent(null); // Clear selected event when closing modal
  };

  const deleteEventHandler = async () => {
    try {
      if (selectedEvent) {
        // Call the API to delete the event
        await deleteEvent(selectedEvent._id);
        // Update the calendar by removing the deleted event
        setEvents(events.filter((event) => event._id !== selectedEvent._id));
        // Close the modal after deleting the event
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete event. Please try again.");
    }
  };

  // Handle form submission
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (selectedEvent) {
        // Update existing event
        const updatedEvent = {
          ...selectedEvent,
          ...data,
          to: data.to, // Trainee id selected by the user
        };

        // Call the API to update the event
        const res = await updateEvent(updatedEvent);

        // Update the calendar with the updated event
        setEvents(
          events.map((event) =>
            event._id === updatedEvent._id ? updatedEvent : event
          )
        );
      } else {
        // Create new event
        const newEvent = {
          ...data,
          start: selectedSlot.start,
          end: selectedSlot.end,
          from: user?._id, // Set the user id
          to: data.to, // Trainee id selected by the user
        };

        // Call the API to save the event
        const res = await createEvent(newEvent);

        // Update the calendar with the new event, including the _id from the response
        setEvents([
          ...events,
          {
            ...newEvent,
            _id: res._id,
            start: new Date(res.start),
            end: new Date(res.end),
          },
        ]);
      }

      // Close the modal after saving the event
      handleClose();
    } catch (error) {
      console.error("Error creating/updating event:", error);
      setError("Failed to create/update event. Please try again.");
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      // Populate form with selected event data
      reset({
        title: selectedEvent.title,
        to: selectedEvent.to,
      });
    } else {
      // Reset form when no event is selected
      reset({
        title: "",
        to: "",
      });
    }
  }, [selectedEvent, reset]);

  const moveEvent = async ({ event, start, end }: any) => {
    const updatedEvent = { ...event, start, end };
    try {
      await updateEvent(updatedEvent);
      setEvents(
        events.map((evt) => (evt._id === updatedEvent._id ? updatedEvent : evt))
      );
    } catch (error) {
      console.error("Error moving event:", error);
      setError("Failed to move event. Please try again.");
    }
  };

  const resizeEvent = async ({ event, start, end }: any) => {
    const updatedEvent = { ...event, start, end };
    try {
      await updateEvent(updatedEvent);
      setEvents(
        events.map((evt) => (evt._id === updatedEvent._id ? updatedEvent : evt))
      );
    } catch (error) {
      console.error("Error resizing event:", error);
      setError("Failed to resize event. Please try again.");
    }
  };

  return (
    <div>
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={localizer}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        style={{
          height: "100vh",
          paddingBottom: "30px",
          borderRadius: "16px",
        }}
        views={["month", "week", "day"]}
      />

      {/* Modal for adding/editing event */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-event-modal"
        aria-describedby="form-to-add-an-event"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>{selectedEvent ? "Edit Event" : "Add Event"}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              fullWidth
              margin="normal"
            >
              <TextField
                label="Event Title"
                variant="outlined"
                fullWidth
                {...register("title", {
                  required: "Title is required",
                })}
                error={!!errors.title}
              />
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
            >
              <InputLabel>To (Trainee)</InputLabel>
              <Controller
                control={control}
                name="to"
                render={({ field }) => (
                  <Select
                    {...field}
                    label="To (Trainee)"
                    defaultValue=""
                    error={!!errors.to}
                    required
                  >
                    {trainees.map((trainee) => (
                      <MenuItem
                        key={trainee._id}
                        value={trainee._id}
                      >
                        {trainee.data.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
            >
              <TextField
                label="Event Start"
                variant="outlined"
                type="datetime-local"
                fullWidth
                value={moment(
                  selectedSlot?.start || selectedEvent?.start
                ).format("YYYY-MM-DDTHH:mm")}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
            >
              <TextField
                label="Event End"
                variant="outlined"
                type="datetime-local"
                fullWidth
                value={moment(selectedSlot?.end || selectedEvent?.end).format(
                  "YYYY-MM-DDTHH:mm"
                )}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
            </FormControl>

            {!selectedEvent && (
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
              >
                Add Event
              </Button>
            )}

            {selectedEvent && (
              <>
                <IconButton
                  type="submit"
                  color="success"
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  type="button"
                  color="danger"
                  onClick={deleteEventHandler}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default App;
