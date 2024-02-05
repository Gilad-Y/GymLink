import React, { useState } from "react";
import CardLine from "./cardLine/cardLine";
import ClientsTable from "./clientsTable/clientsTable";
import "./dashboard.css";
import store from "../../../redux/store";
import ToggleButton from "@mui/material/ToggleButton";
import ProgressGraph from "./progressGraph/progressGraph";

function Dashboard(): JSX.Element {
  const user = store.getState().users?.user[0];
  const [adminMode, setAdminMode] = useState<boolean>(false);
  return (
    <div className="dashboard">
      <br />
      {user?.type == "admin" && (
        <ToggleButton
          sx={{ width: "93.5%" }}
          color="success"
          value="check"
          selected={adminMode}
          onChange={() => {
            setAdminMode(!adminMode);
          }}
        >
          <div style={{ color: "white" }}>admin mode</div>
        </ToggleButton>
      )}
      <br />
      <CardLine />
      <br />
      {user?.type == "trainer" || (adminMode && <ClientsTable id={user.id} />)}
      {user?.type == "trainee" && <ProgressGraph />}
    </div>
  );
}

export default Dashboard;
