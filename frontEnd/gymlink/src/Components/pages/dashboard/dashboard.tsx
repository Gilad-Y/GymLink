import React from "react";
import CardLine from "./cardLine/cardLine";
import ClientsTable from "./clientsTable/clientsTable";
import "./dashboard.css";
import store from "../../../redux/store";
import GraphsCompo from "./graphsCompo/graphsCompo";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import AddData from "../addData/addData";
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="dashboard">
      <br />
      <div className="buttons">
        {/* {user?.type == "admin" && (
          <>
            <ToggleButton
              // sx={{ width: "93.5%" }}
              color="success"
              value="check"
              selected={adminMode}
              onChange={() => {
                setAdminMode(!adminMode);
              }}
            >
              <div style={{ color: "white" }}>admin mode</div>
            </ToggleButton>
            <Button>הוסף מאמן</Button>
          </>
        )} */}
        {/* <Button onClick={handleOpen}>הזנת נתונים</Button> */}
      </div>
      {/* )} */}
      <br />
      <CardLine />
      <br />
      {user?.type != "trainee" && <ClientsTable id={user?.id} />}
      {user?.type == "trainee" && <GraphsCompo />}
    </div>
  );
}

export default Dashboard;
