import express, { NextFunction, Request, Response } from "express";
import * as userLogic from "../Logic/userLogic";
const router = express.Router();

// User CRUD operations
router.post(
  "/register",
  async (request: Request, response: Response, next: NextFunction) => {
    const user = request.body;
    response.status(201).json(await userLogic.createUser(user));
  }
);

router.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { email, password } = request.body;

      const user = await userLogic.loginUser(email, password);

      if (!user) {
        return response
          .status(401)
          .json({ message: "Invalid email or password" });
      }

      response.status(200).json(user);
    } catch (error: any) {
      error.status = 401;
      next(error);
    }
  }
);

router.get(
  "/get/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    response.status(200).json(await userLogic.getUserById(id));
  }
);

router.put(
  "/edit/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const updateData = request.body;

    response.status(200).json(await userLogic.updateUserById(id, updateData));
  }
);

router.delete(
  "/delete/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    response.status(200).json(await userLogic.deleteUserById(id));
  }
);

// Coach CRUD operations
router.post(
  "/addCoach/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.id;
    const coachData = request.body;
    response.status(201).json(await userLogic.createCoach(userId, coachData));
  }
);

router.get(
  "/coach/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    response.status(200).json(await userLogic.getCoachById(id));
  }
);

router.put(
  "/editCoach/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const updateData = request.body;
    response.status(200).json(await userLogic.updateCoachById(id, updateData));
  }
);

router.delete(
  "/deleteCoach/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    response.status(200).json(await userLogic.deleteCoachById(id));
  }
);

// Trainee CRUD operations
router.post(
  "/addTrainee",
  async (request: Request, response: Response, next: NextFunction) => {
    const traineeData = request.body;
    response.status(201).json(await userLogic.createTrainee(traineeData));
  }
);

router.get(
  "/:userId/trainees",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId;

    response.status(200).json(await userLogic.getTraineeById(userId));
  }
);

router.put(
  "/:userId/editTrainee",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId;
    const updateData = request.body;
    response
      .status(200)
      .json(await userLogic.updateTraineeById(userId, updateData));
  }
);

router.delete(
  "/:userId/trainee/:traineeId",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.userId;
    const traineeId = request.params.traineeId;
    response
      .status(200)
      .json(await userLogic.deleteTraineeById(userId, traineeId));
  }
);

// Get all trainees of a user
router.get(
  "/getTrainees/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.id;
    response.status(200).json(await userLogic.getAllTrainees(userId));
  }
);

// Get all trainees of a user's coach
router.get(
  "/getTraineesByCoach/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.id;
    response.status(200).json(await userLogic.getAllTraineesOfCoach(userId));
  }
);

// Get all coaches of a user
router.get(
  "/getCoaches/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.id;
    response.status(200).json(await userLogic.getAllCoaches(userId));
  }
);
router.put(
  "/setNewPassword/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = request.params.id;
    const newPassword = request.body.password;
    response
      .status(200)
      .json(await userLogic.setCoachPass(userId, newPassword));
  }
);

export default router;
