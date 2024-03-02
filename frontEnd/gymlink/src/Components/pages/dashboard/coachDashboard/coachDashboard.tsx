import MissionTable from "../missionTable/missionTable";
import Notifications from "../notifications/notifications";
import TraineeTable from "../traineeTable/traineeTable";
import "./coachDashboard.css";
interface props {
  id: number;
}
function CoachDashboard(props: props): JSX.Element {
  return (
    <div className="coachDashboard">
      <TraineeTable id={props.id} />
      <MissionTable id={props.id} />
      <Notifications />
    </div>
  );
}

export default CoachDashboard;
