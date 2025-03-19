import CardLine from "./cardLine/cardLine";
import "./dashboard.css";
import store from "../../../redux/store";

import CoachDashboard from "./coachDashboard/coachDashboard";

function Dashboard(): React.JSX.Element {
  const user = store.getState().users.user;
  const idForData = user?.role === "coach" ? user?.belongsTo : user?._id;
  return (
    <div className="dashboard">
      <div className="centered-container">
        <CardLine />
        <CoachDashboard id={String(idForData)} />
      </div>
    </div>
  );
}

export default Dashboard;
