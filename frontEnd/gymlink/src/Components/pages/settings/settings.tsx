import React from "react";

import "./settings.css";
import TableBuilder from "./tableBuilder/tableBuilder";
import store from "../../../redux/store";
import EditProfile from "./editProfile/editProfile";

const Settings: React.FC = () => {
  const user = store.getState().users.user;
  const idForData = user?.role === "coach" ? user?.belongsTo : user?._id;
  return (
    <>
      {/* <TableBuilder id={String(idForData)} /> */}
      <EditProfile user={user} />
    </>
  );
};

export default Settings;
