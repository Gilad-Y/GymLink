import { useParams } from "react-router-dom";
import "./addMission.css";
import axios from "axios";
import React from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import NoMissions from "../../dashboard/noMissions/noMissions";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/joy/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MissionStatus from "../../dashboard/missionTable/missionStatus/missionStatus";

import MainModal from "../../../mainModal/mainModal";
import { Button } from "@mui/joy";
import { missionModel } from "../../../../models/missionModel";
function AddMission(): JSX.Element {
  const params = useParams();
  const [missions, setMission] = React.useState<any[]>([]);
  const [row, setEdit] = React.useState<missionModel>();
  const [ref, setRefresh] = React.useState<boolean>(false);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [AddModalOpen, setAddOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/v1/mission/getAllMissionsForCoach/${params.id}`
      )
      .then((res: any) => {
        console.log(res.data);
        setMission(res.data);
      });
  }, [ref]);
  const handleModalToggle = () => {
    // props.refFn();
    setModalOpen((prev) => !prev); // Toggle the modal open/close state
  };
  const handleAddToggle = () => {
    // props.refFn();
    setRefresh(!ref);
    setAddOpen((prev) => !prev); // Toggle the modal open/close state
  };
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2);
    return `${year}-${month}-${day}`;
  }
  const editLine = (mission: any) => {
    // if (typeof mission.lastDate == "string") {
    //   mission.lastDate = formatDate(mission.lastDate);
    // }
    mission.lastDate = formatDate(mission.lastDate);
    console.log(formatDate(mission.lastDate));
    setEdit(mission);
    handleModalToggle();
  };
  const deleteLine = (id: number) => {
    console.log(id);
    axios
      .delete(`http://localhost:4000/api/v1/mission/deleteMission/${id}`)
      .then(() => {
        // props.refFn();
        setRefresh(!ref);
      });
  };
  return (
    <div className="addMission">
      {missions.length > 0 ? (
        <>
          <h1>טבלת משימות</h1>{" "}
          <Sheet>
            <Table aria-label="striped table" stripe={"odd"}>
              <thead>
                <tr>
                  <th>מתאמן</th>
                  <th>משימה</th>
                  <th>תאריך אחרון לביצוע</th>
                  <th>סטאטוס</th>
                  <th>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {missions.map((mission) => (
                  <tr key={mission.id}>
                    <td>{`${mission.firstName} ${mission.lastName}`}</td>
                    <td>{mission.content}</td>
                    <td>
                      {mission.lastDate ? formatDate(mission.lastDate) : "-"}
                    </td>
                    <td>
                      <MissionStatus id={+mission.id} />
                    </td>
                    <td>
                      <IconButton
                        aria-label="delete"
                        onClick={() => deleteLine(mission.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        onClick={() => editLine(mission)}
                      >
                        <EditIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
          <br />
          <Button
            color="success"
            onClick={() => {
              handleAddToggle();
            }}
          >
            הוספת משימה
          </Button>
        </>
      ) : (
        <NoMissions />
      )}
      <MainModal
        open={modalOpen}
        onClose={handleModalToggle}
        type={"editMission"}
        data={row}
      />
      <MainModal
        open={AddModalOpen}
        onClose={handleAddToggle}
        type={"addMission"}
      />
    </div>
  );
}

export default AddMission;
