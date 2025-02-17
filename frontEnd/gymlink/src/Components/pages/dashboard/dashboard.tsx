import CardLine from "./cardLine/cardLine";
import "./dashboard.css";
import store from "../../../redux/store";
import GraphsCompo from "./graphsCompo/graphsCompo";
import TraineeTable from "./traineeTable/traineeTable";

import CoachDashboard from "./coachDashboard/coachDashboard";

function Dashboard(): React.JSX.Element {
  const user = store.getState().users.user;

  return (
    <div className="dashboard">
      <div className="centered-container">
        <CardLine />
        <CoachDashboard id={String(user?._id)} />
      </div>
    </div>
  );
}

export default Dashboard;
