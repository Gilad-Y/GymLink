import express from "express";
import * as traineeLogic from "../Logic/traineeLogic";

const router = express.Router();

// Route to fetch all trainees
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const trainees = await traineeLogic.getAllTrainees(id);
    res.json(trainees);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to add a new trainee
router.post("/", async (req, res) => {
  const traineeData = req.body;
  try {
    const newTraineeId = await traineeLogic.addTrainee(traineeData);
    res.status(201).json(newTraineeId);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to edit a trainee
router.put("/:id", async (req, res) => {
  const traineeId = req.params.id;
  const updateData = req.body;
  try {
    const updatedTrainee = await traineeLogic.editTrainee(
      traineeId,
      updateData
    );
    res.json(updatedTrainee);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to delete a trainee
router.delete("/:id", async (req, res) => {
  const traineeId = req.params.id;

  try {
    await traineeLogic.deleteTrainee(traineeId);

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/expired/:id/:date", async (req, res) => {
  const id = req.params.id;
  const date = req.params.date;
  try {
    const trainees = await traineeLogic.getExpiredTrainees(id, date);
    res.json(trainees);
  } catch (error) {
    console.error("Error fetching expired trainees:", error);
  }
});
router.get("/expiring/:id/:date", async (req, res) => {
  const id = req.params.id;
  const date = req.params.date;
  try {
    const trainees = await traineeLogic.getExpiringTrainees(id, date);
    res.json(trainees);
  } catch (error) {
    console.error("Error fetching expiring trainees:", error);
  }
});
router.get("/growth/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const trainees = await traineeLogic.getGrowthTrainees(id);
    res.json(trainees);
  } catch (error) {
    console.error("Error fetching growth trainees:", error);
  }
});

export default router;
