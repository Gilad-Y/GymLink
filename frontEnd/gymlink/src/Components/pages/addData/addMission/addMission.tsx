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
function AddMission(): JSX.Element {
  const params = useParams();
  const [missions, setMission] = React.useState<any[]>([]);
  React.useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/v1/mission/getAllMissionsForCoach/${params.id}`
      )
      .then((res: any) => {
        console.log(res.data);
        setMission(res.data);
      });
  }, []);
  const handleModalToggle = () => {
    // props.refFn();
    // setModalOpen((prev) => !prev); // Toggle the modal open/close state
  };
  const handleAddToggle = () => {
    // props.refFn();
    // setAddOpen((prev) => !prev); // Toggle the modal open/close state
  };
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2);
    return `${day}-${month}-${year}`;
  }
  const editLine = (row: any) => {
    row.startingDate = formatDate(row.startingDate);
    // setEdit(row);
    handleModalToggle();
  };
  const deleteLine = (id: number) => {
    console.log(id);
    axios
      .delete(`http://localhost:4000/api/v1/user/deleteCard/${id}`)
      .then(() => {
        // props.refFn();
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
                    <td>{mission.lastDate}</td>
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
        </>
      ) : (
        <NoMissions />
      )}
    </div>
  );
}

export default AddMission;
