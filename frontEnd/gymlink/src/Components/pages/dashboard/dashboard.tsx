import CardLine from "./cardLine/cardLine";
import "./dashboard.css";
import store from "../../../redux/store";
import GraphsCompo from "./graphsCompo/graphsCompo";

import TraineeTable from "./traineeTable/traineeTable";
import TraineeDashboard from "./traineeDashboard/traineeDashboard";
import CoachDashboard from "./coachDashboard/coachDashboard";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Dashboard(): JSX.Element {
  const user = store.getState().users?.user[0];
  // const [adminMode, setAdminMode] = useState<boolean>(false);
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <div className="dashboard">
      <br />
      <CardLine />
      <br />
      {user?.type != "trainee" && <CoachDashboard id={user?.id} />}
      {user?.type == "trainee" && <TraineeDashboard />}
    </div>
  );
}

export default Dashboard;
