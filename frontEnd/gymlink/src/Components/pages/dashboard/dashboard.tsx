import React, { useState } from "react";
import CardLine from "./cardLine/cardLine";
import ClientsTable from "./clientsTable/clientsTable";
import "./dashboard.css";
import store from "../../../redux/store";
import axios from "axios";
import Page404 from "../page404/page404";
import NoTrainees from "./noTrainees/noTrainees";

function Dashboard(): JSX.Element {
  const id = store.getState().users.user[0]?.id;
  // const [userId, setId] = useState<number>(0);
  // setId(id);
  React.useEffect(() => {
    // const id = store.getState().users.user[0]?.id;
    // console.log(id);
    // id &&
    //   axios
    //     .get(`http://localhost:4000/api/v1/user/getAllById/${id}`)
    //     .then((res) => {
    //       console.log(res.data);
    //     });
  }, []);
  return (
    <div className="dashboard">
      <br />
      <CardLine />
      <br />
      {id ? <ClientsTable id={id} /> : <NoTrainees />}
    </div>
  );
}

export default Dashboard;
