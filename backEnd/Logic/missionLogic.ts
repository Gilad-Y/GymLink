import { OkPacket } from "mysql";
import { UserModel } from "../Models/userModel";
import { missionModel } from "../Models/missionModel";
import dal_mysql from "../Utils/dal_mysql";

const getAllMissionsForCoach = async (id: number) => {
  // const SQLcmd = `
  // SELECT * FROM missions WHERE coachId = ${id}
  // `;
  const SQLcmd = `
  SELECT missions.status, missions.lastDate, missions.content,missions.id, users.firstName, users.lastName
  FROM missions 
  JOIN users ON missions.traineeId = users.id
  WHERE missions.coachId = ${id};
`;

  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const getAllMissionsForCoachByNumbers = async (id: number) => {
  const SQLcmd = `
  SELECT 
    users.firstName, 
    users.lastName,
    COALESCE(COUNT(CASE WHEN missions.status = 1 THEN 1 END), 0) AS status_1_count,
    COALESCE(COUNT(CASE WHEN missions.status = 0 THEN 1 END), 0) AS status_0_count
  FROM 
    users
  LEFT JOIN 
    missions ON users.id = missions.traineeId
  WHERE 
    users.belonging = ${id}
  GROUP BY 
    users.id, users.firstName, users.lastName;
`;

  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const addMission = async (mission: missionModel) => {
  let SQLcmd = `
    INSERT INTO missions (coachId, traineeId, content, lastDate, status) 
    VALUES (${mission.coachId}, ${mission.traineeId}, '${mission.content}', `;

  if (mission.lastDate) {
    SQLcmd += `'${mission.lastDate}', `;
  } else {
    SQLcmd += `NULL, `;
  }

  SQLcmd += `${mission.status ? 1 : 0})`;

  try {
    const data: OkPacket = await dal_mysql.execute(SQLcmd);
    mission.id = data.insertId;
    return [mission];
  } catch (error) {
    console.error("Error adding mission:", error);
    throw error;
  }
};

//UPDATE `GymLink`.`missions` SET `status` = '1' WHERE (`id` = '3');

const updateStatus = async (id: number, status: boolean) => {
  const SQLcmd = `
  UPDATE missions SET status = ${!status} WHERE (id = ${id});
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return !status;
};
const updateMission = async (id: number, mission: missionModel) => {
  const SQLcmd = mission.lastDate!==null?
  `
UPDATE missions SET content = '${mission.content}', lastDate = '${mission.lastDate}' WHERE (id = ${id})
  `:`
UPDATE missions SET content = '${mission.content}', lastDate = ${null} WHERE (id = ${id})
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return true;
};
const deleteMission = async (id: number) => {
  const SQLcmd = `
   DELETE FROM missions WHERE (id = ${id});
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
// const getPaymentsById = async (id: number) => {
//   const SQLcmd = `
// SELECT id,startingDate,endingDate,card,cardLeft FROM GymLink.paymentTable WHERE traineeId = ${id} AND card IS NULL
// `;
//   const data = await dal_mysql.execute(SQLcmd);
//   const SQLcmd2 = `
// SELECT id,startingDate,endingDate,card,cardLeft FROM GymLink.paymentTable WHERE traineeId = ${id} AND card IS NOT NULL
// `;
//   const data2 = await dal_mysql.execute(SQLcmd2);
//   if ((data2.length || data.length) > 0) {
//     return [data, data2];
//   } else {
//     return 0;
//   }
// };
// const getAllById = async (id: number) => {
//   const SQLcmd =
//     //NEED TO REMOVE PASSWORD
//     //  `
//     // SELECT * FROM users WHERE belonging  = ${id}
//     // `;
//     `
// SELECT users.*, missions.status
// FROM users
// JOIN missions ON users.belonging = missions.coachId;

// `;
//   const data = await dal_mysql.execute(SQLcmd);
//   return data;
// };
const getMissionStatusById = async (id: number) => {
  const SQLcmd = `
  SELECT status FROM missions WHERE id  = ${id}
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
// const logUser = async (email: string, password: string) => {
//   try {
//     const SQLcmd = `
//       SELECT id, firstName, lastName, email, phone, type, belonging
//       FROM users
//       WHERE email='${email}' AND userPass='${password}'
//     `;
//     const data = await dal_mysql.execute(SQLcmd);
//     return data;
//   } catch (error) {
//     console.error("Error while executing SQL query:", error);
//     throw new Error("An error occurred while logging in");
//   }
// };

// const addCard = async (card: any) => {
//   const SQLcmd = `
// INSERT INTO paymentTable ( coachId, traineeId,
// startingDate, card, cardLeft
// ) VALUES (
//    ${card.coachId}, ${card.traineeId}, '${card.startingDate}', ${card.card}, ${card.cardLeft});

// `;
//   const data: OkPacket = await dal_mysql.execute(SQLcmd);
//   card.id = data.insertId;
//   return [card];
// };

// const deleteCard = async (id: number) => {
//   const SQLcmd = `
//    DELETE FROM paymentTable WHERE (id = ${id});
//   `;
//   const data = await dal_mysql.execute(SQLcmd);
//   return data;
// };

//UPDATE `GymLink`.`paymentTable` SET `startingDate` = '2024-03-02', `card` = '14' WHERE (`id` = '5');

// const checkNum = async (phone: number | undefined) => {
//   const SQLcmd = `
//   SELECT * from userTable WHERE userPhone='0${phone}'
//   `;
//   const data = await dal_mysql.execute(SQLcmd);
//   return data.length;
// };
// const addUser = async (user: UserModel) => {
//   const SQLcmd = `
// INSERT INTO userTable (firstName, lastName, userPhone, userPassword, userType)

// `;
//   const data: OkPacket = await dal_mysql.execute(SQLcmd);
//   user.userId = data.insertId;
//   return [user];
// };
// const deleteUser = async (id: number) => {
//   const adminCmd = `
//     SELECT userType FROM userTable WHERE userId = ${id};
//   `;
//   const isAdmin = await dal_mysql.execute(adminCmd);

//   const checkCmd = `
//     SELECT COUNT(*) AS 'check' FROM userTable WHERE userType = 'admin';
//   `;
//   const admins = await dal_mysql.execute(checkCmd);

//   if (isAdmin[0].userType === "admin" && admins[0].check <= 1) {
//     // If the user to be deleted is an admin and there is only one admin, prevent deletion
//     return false;
//   } else {
//     const SQLcmd = `
//     DELETE FROM userTable WHERE userId = ${id};
//   `;
//     const SQLcmd2 = `
//     DELETE FROM eventTable WHERE clientId = ${id};
//   `;
//     const SQLcmd3 = `
//     SELECT eventId FROM eventTable WHERE clientId = ${id};
//   `;

//     // await dal_mysql.execute(SQLcmd);
//     // await dal_mysql.execute(SQLcmd2);
//     // await dal_mysql.execute(SQLcmd3);

//     return true; // User has been successfully deleted
//   }
// };
// const updateCard = async (card: any) => {
//   const SQLcmd = `
//   UPDATE paymentTable SET
//   startingDate = '${card.startingDate}',
//   card = ${card.card},
//   cardLeft = ${card.cardLeft}
//   WHERE id = ${+card.id}`;

//   const data = await dal_mysql.execute(SQLcmd);
//   return data.affectedRows;
// };

// const updateUser = async (id: number, user: UserModel) => {
//   const SQLcmd = `
//   UPDATE userTable SET firstName = '${user.firstName}',
//   lastName = '${user.lastName}',
//    userPassword = '${user._userPassword}' WHERE (userId = ${user.userId})
//   `;
//   const data = await dal_mysql.execute(SQLcmd);
//   return data.affectedRows;
// };
export {
  getAllMissionsForCoach,
  addMission,
  getAllMissionsForCoachByNumbers,
  updateStatus,
  getMissionStatusById,
  deleteMission,
  updateMission,
};
