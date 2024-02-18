import express, { NextFunction, Request, Response } from "express";
import {
  // addUser,
  // checkNum,
  // deleteUser,
  // getAll,
  getAllById,
  getById,
  // getNameById,
  // getOption,
  logUser,
  // updateUser,
} from "../Logic/userLogic";

const router = express.Router();
// router.get(
//   "/getAll",
//   async (request: Request, response: Response, next: NextFunction) => {
//     response.status(200).json(await getAll());
//   }
// );
// router.get(
//   "/getOption",
//   async (request: Request, response: Response, next: NextFunction) => {
//     response.status(200).json(await getOption());
//   }
// );
// router.get(
//   "/getNameById/:id",
//   async (request: Request, response: Response, next: NextFunction) => {
//     const id = +request.params.id;
//     response.status(200).json(await getNameById(id));
//   }
// );
router.get(
  "/getAllById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    console.log(id);
    response.status(200).json(await getAllById(id));
  }
);
router.get(
  "/getById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response.status(200).json(await getById(id));
  }
);
router.post(
  "/logUser",
  async (request: Request, response: Response, next: NextFunction) => {
    const email = request.body.email;
    const password = request.body._userPass;
    const data = await logUser(email, password);
    data.length > 0
      ? response.status(200).json(data)
      : response.status(403).json(data);
  }
);
// router.get(
//   "/checkPhoneNumber",
//   async (request: Request, response: Response, next: NextFunction) => {
//     const num = request.query.numberToCheck;
//     if (typeof num === "string") {
//       response.status(200).json(await checkNum(+num));
//     }
//   }
// );
// router.post(
//   "/addUser",
//   async (request: Request, response: Response, next: NextFunction) => {
//     const user: any = request.body;
//     response.status(201).json(await addUser(user));
//   }
// );
// router.delete(
//   "/deleteUser/:id",
//   async (request: Request, response: Response, next: NextFunction) => {
//     const id = +request.params.id;
//     response.status(200).json(await deleteUser(id));
//   }
// );
// router.put(
//   "/updateUserById/:id",
//   async (request: Request, response: Response, next: NextFunction) => {
//     const id = +request.params.id;
//     const user = request.body;
//     response.status(200).json(await updateUser(id, user.data));
//   }
// );
export default router;
