import { OkPacket } from "mysql";
import { UserModel } from "../Models/userModel";
import dal_mysql from "../Utils/dal_mysql";

// const getAll = async () => {
//   const SQLcmd = `
//   SELECT * FROM userTable
//   `;
//   const data = await dal_mysql.execute(SQLcmd);
//   return data;
// };
// const getOption = async () => {
//   const SQLcmd = `
//   SELECT userId ,firstName,lastName FROM userTable
//   `;
//   const data = await dal_mysql.execute(SQLcmd);
//   return data;
// };
// const getNameById = async (id: number) => {
//   const SQLcmd = `
//   SELECT firstName,lastName FROM userTable WHERE userId = ${id}
//   `;
//   const data = await dal_mysql.execute(SQLcmd);
//   // console.log(`${data[0].firstName} ${data[0].lastName}`);
//   return `${data[0].firstName} ${data[0].lastName}`;
// };

//SELECT likes_table.*, destination
// FROM likes_table JOIN vacation_table
// ON likes_table.vacationCode=vacation_table.vacationCode

const getAllById = async (id: number) => {
  const SQLcmd =
    //  `
    // SELECT * FROM users WHERE belonging  = ${id}
    // `;
    `
    SELECT 
    users.*, 
    paymentTable.startingDate,
    paymentTable.endingDate,
    paymentTable.card,
    DATEDIFF(paymentTable.endingDate, CURDATE()) AS days_until_end
FROM 
    users
LEFT JOIN 
    paymentTable ON users.id = paymentTable.traineeid
WHERE 
    users.belonging = ${id};


`;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const getById = async (id: number) => {
  console.log(id);
  const SQLcmd = `
  SELECT * FROM users WHERE id  = ${id}
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
const logUser = async (email: string, password: string) => {
  const SQLcmd = `
  SELECT id,firstName,
  lastName,email,phone,type,belonging
  FROM users WHERE email='${email}' AND userPass='${password}'
  `;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};
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
  // getAll,
  logUser,
  // checkNum,
  // addUser,
  // deleteUser,
  getAllById,
  getById,
  // updateUser,
  // getOption,
  // getNameById,
};
