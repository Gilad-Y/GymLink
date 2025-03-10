import { useEffect } from "react";
import NewTable from "../traineeTable/newTable";
import TraineeTable from "../traineeTable/traineeTable";
import "./coachDashboard.css";
import React from "react";
import {
  addTrainees,
  deleteTrainee,
  getColumnsByUserId,
  getTraineesByUserId,
  updateTrainee,
} from "../../../../util/api";
import TableTemp from "../traineeTable/tableTemp";
interface props {
  id: string;
}
function CoachDashboard(props: props): React.JSX.Element {
  const [columns, setColumns] = React.useState([]);
  const [trainees, setTrainees] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const traineesData = await getTraineesByUserId(props.id);
      setTrainees(traineesData);
      const columnsData = await getColumnsByUserId(props.id);
      setColumns(columnsData);
    };
    fetchData();
  }, [props.id]);
  const deleteTraineeFun = async (id: string) => {
    await deleteTrainee(id);
  };
  const editTraineeFun = async (id: string, data: any) => {
    data.belongsTo = props.id;
    // if (data.isNew) {
    //   console.log("new trainee", data);
    //   const id = await addTraineeFun(data);
    //   return id;
    // }
    console.log(data);
    await updateTrainee(id, data);
    return;
  };
  const addTraineeFun = async (trainee: any) => {
    delete trainee.id;
    delete trainee.isNew;
    trainee.belongsTo = props.id;
    console.log(trainee);
    return await addTrainees(trainee);
  };
  return (
    <div className="coachDashboard">
      {/* <TraineeTable id={props.id.toString()} /> */}
      {/* <NewTable id={props.id.toString()} /> */}
      {/* <MissionTable id={props.id} /> */}
      {/* <Notifications /> */}
      <TableTemp
        rows={trainees}
        columns={columns}
        crudFunctions={{
          updateData: editTraineeFun,
          deleteData: deleteTraineeFun,
          createData: addTraineeFun,
        }}
        addButtonText="add Trainee"
      />
    </div>
  );
}

export default CoachDashboard;
