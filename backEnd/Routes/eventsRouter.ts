import * as eventsLogic from "../Logic/eventsLogic";
import express from "express";
const router = express.Router();

// Create a new event
router.post("/create", async (req, res) => {
  try {
    const event = await eventsLogic.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get all events for user
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const events = await eventsLogic.getEvents(id);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get a single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await eventsLogic.getEventById(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Update an event by ID
router.put("/update", async (req, res) => {
  try {
    const updatedEvent = await eventsLogic.updateEvent(req.body);
    if (updatedEvent) {
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Delete an event by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedEvent = await eventsLogic.deleteEvent(req.params.id);
    if (deletedEvent) {
      res.status(200).json({ message: "Event deleted" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
