import React, { useEffect } from "react";
import TableTemp from "../../masterTable/tableTemp";
import {
  addCoach,
  deleteUser,
  getCoachesByIds,
  updateUser,
} from "../../../util/api";
import store from "../../../redux/store";

const CoachPage: React.FC = () => {
  const [columns, setColumns] = React.useState([
    {
      field: "firstName",
      title: "first name",
      width: 180,
      editable: true,
      required: true,
    },
    {
      field: "lastName",
      title: "last name",
      width: 180,
      editable: true,
      required: true,
    },
    {
      field: "email",
      title: "Email",
      width: 180,
      editable: false,
      required: true,
    },
  ]);
  const [coaches, setCoaches] = React.useState([]);
  const id = store.getState().users.user?._id || "";
  useEffect(() => {
    const fetchData = async () => {
      const coachesData = await getCoachesByIds(id);
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
    data.brand = store.getState().users.user?.brand;
    console.log(data);
    await updateUser(userid, data);
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
