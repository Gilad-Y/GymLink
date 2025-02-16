import { missionModel } from "../Models/oldModals/missionModel";
import express, { NextFunction, Request, Response } from "express";
import * as missionLogic from "../Logic/missionLogic";

const router = express.Router();
router.get(
  "/getAllMissionsForCoachByNumber/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response
      .status(200)
      .json(await missionLogic.getAllMissionsForCoachByNumbers(id));
  }
);
router.get(
  "/getAllMissionsForCoach/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response.status(200).json(await missionLogic.getAllMissionsForCoach(id));
  }
);
router.get(
  "/getStatus/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;

    response.status(200).json(await missionLogic.getMissionStatusById(id));
  }
);
router.put(
  "/updateMission/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const mission = request.body; // Assuming missionStatus is the property you want to update

      // Call missionLogic.updateStatus with the id and missionStatus
      await missionLogic.updateMission(id, mission);

      response.status(201).json();
    } catch (error) {
      // Handle errors
      console.error("Error updating mission status:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
);
// router.get(
//   "/getNameById/:id",
//   async (request: Request, response: Response, next: NextFunction) => {
//     const id = +request.params.id;
//     response.status(200).json(await getNameById(id));
//   }
// );
// router.get(
//   "/getAllById/:id",
//   async (request: Request, response: Response, next: NextFunction) => {
//     const id = +request.params.id;

//     id && response.status(200).json(await getAllById(id));
//   }
// );
// router.get(
//   "/getPaymentsById/:id",
//   async (request: Request, response: Response, next: NextFunction) => {
//     const id = +request.params.id;

//     const data = await getPaymentsById(id);
//     data ? response.status(200).json(data) : response.status(204).json("");
//   }
// );
// router.get(
//   "/getById/:id",
//   async (request: Request, response: Response, next: NextFunction) => {
//     const id = +request.params.id;
//     response.status(200).json(await getById(id));
//   }
// );
// router.post(
//   "/logUser",
//   async (request: Request, response: Response, next: NextFunction) => {
//     const email = request.body.email;
//     const password = request.body._userPass;
//     const data = await logUser(email, password);
//     data.length > 0
//       ? response.status(200).json(data)
//       : response.status(403).json(data);
//   }
// );
// router.get(
//   "/checkPhoneNumber",
//   async (request: Request, response: Response, next: NextFunction) => {
//     const num = request.query.numberToCheck;
//     if (typeof num === "string") {
//       response.status(200).json(await checkNum(+num));
//     }
//   }
// );
router.post(
  "/addMission",
  async (request: Request, response: Response, next: NextFunction) => {
    const mission: missionModel = request.body;
    response.status(201).json(await missionLogic.addMission(mission));
  }
);
router.delete(
  "/deleteMission/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response.status(200).json(await missionLogic.deleteMission(id));
  }
);
router.put(
  "/updateStatus/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const { missionStatus } = request.body; // Assuming missionStatus is the property you want to update

      // Call missionLogic.updateStatus with the id and missionStatus
      await missionLogic.updateStatus(id, missionStatus);

      response.status(201).json();
    } catch (error) {
      // Handle errors
      console.error("Error updating mission status:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
