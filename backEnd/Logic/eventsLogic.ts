import Event from "../Models/events";
import mongoose from "mongoose";

// Create a new event
export const createEvent = async (event: Event) => {
  const newEvent = new Event(event);
  await newEvent.save();
  return newEvent;
};

// Get all events for user
export const getEvents = async (userId: string) => {
  const events = await Event.find({
    from: new mongoose.Types.ObjectId(userId),
  });
  return events;
};

// Get a single event by ID
export const getEventById = async (eventId: string) => {
  const event = await Event.findById(new mongoose.Types.ObjectId(eventId));
  return event;
};

// Update an event by ID
export const updateEvent = async (updatedEvent: any) => {
  const event = await Event.findByIdAndUpdate(
    new mongoose.Types.ObjectId(updatedEvent._id),
    updatedEvent
  );
  return event;
};

// Delete an event by ID
export const deleteEvent = async (id: string) => {
  const event = await Event.findByIdAndDelete(new mongoose.Types.ObjectId(id));
  return true;
};
