import "./missionTable.css";
import * as React from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoMissions from "../noMissions/noMissions";
import { missionModel } from "../../../../models/missionModel";
interface props {
  id: number;
}
function MissionTable(props: props): JSX.Element {
  const [missions, setMission] = React.useState<any[]>([]);

  React.useEffect(() => {
    props.id &&
      axios
        .get(
          `http://localhost:4000/api/v1/mission/getAllMissionsForCoachByNumber/${props.id}`
        )
        .then((res: any) => {
          console.log(res.data);
          setMission(res.data);
        });
  }, [props.id]);
  return (
    <div className="missionTable">
      {missions.length > 0 ? (
        <>
          <h1>משימות חודשיות</h1>{" "}
          <Sheet>
            <Table aria-label="striped table" stripe={"odd"}>
              <thead>
                <tr>
                  <th>מתאמן</th>
                  <th>משימות שבוצעו</th>
                  <th>משימות שטרם בוצעו</th>
                  <th>סה״כ</th>
                </tr>
              </thead>
              <tbody>
                {missions.map((mission) => (
                  <tr key={mission.id}>
                    <td>{`${mission.firstName} ${mission.lastName}`}</td>
                    <td>{mission.status_0_count}</td>
                    <td>{mission.status_1_count}</td>
                    <td>{mission.status_1_count + mission.status_1_count}</td>
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

export default MissionTable;
