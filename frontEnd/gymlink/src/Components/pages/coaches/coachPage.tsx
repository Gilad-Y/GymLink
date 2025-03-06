import React, { useEffect } from "react";
import TableTemp from "../dashboard/traineeTable/tableTemp";
import {
  addCoach,
  deleteUser,
  getCoachesByIds,
  updateUser,
} from "../../../util/api";
import store from "../../../redux/store";
import { addUser } from "../../../redux/usersReducer";
const CoachPage: React.FC = () => {
  const [columns, setColumns] = React.useState([
    {
      field: "firstName",
      title: "first name",
      width: 180,
      editable: true,
    },
    { field: "lastName", title: "last name", width: 180, editable: true },
    {
      field: "email",
      title: "Email",
      width: 180,
      editable: true,
    },
  ]);
  const [coaches, setCoaches] = React.useState([]);
  const id = store.getState().users.user?._id || "";
  useEffect(() => {
    const fetchData = async () => {
      const coachesData = await getCoachesByIds(id);
      console.log(coachesData);
      setCoaches(coachesData);
    };
    fetchData();
  }, [id]);
  const deleteCoach = async (id: string) => {
    await deleteUser(id);
  };
  const updateCoach = async (userid: string, data: any) => {
    data.belongsTo = id;
    data._id = userid;
    data.isNew = true;
    console.log(data);
    // await updateUser(userid, data);
    return;
  };
  const addCoachFunc = async (data: any) => {
    console.log("new id");
    data.belongsTo = id;
    return await addCoach(id, data);
  };
  return (
    <TableTemp
      rows={coaches}
      columns={columns}
      crudFunctions={{
        updateData: updateCoach,
        deleteData: deleteCoach,
        createData: addCoachFunc,
      }}
      addButtonText="add Coach"
    />
  );
};

export default CoachPage;
