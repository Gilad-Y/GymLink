import TraineeTable from "../traineeTable/traineeTable";
import "./coachDashboard.css";
interface props {
  id: number;
}
function CoachDashboard(props: props): React.JSX.Element {
  return (
    <div className="coachDashboard">
      <TraineeTable id={props.id.toString()} />
      {/* <MissionTable id={props.id} /> */}
      {/* <Notifications /> */}
    </div>
  );
}

export default CoachDashboard;
