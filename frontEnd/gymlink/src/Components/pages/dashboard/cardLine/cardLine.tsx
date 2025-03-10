import React from "react";
import store from "../../../../redux/store";
import { getTraineesByUserId } from "../../../../util/api";
import CardCompo from "./cardCompo/cardCompo";
import "./cardLine.css";

function CardLine(): React.JSX.Element {
  const user = store.getState().users.user;
  const idForData = user?.role === "coach" ? user?.belongsTo : user?._id;
  const [trainees, setTrainees] = React.useState([]);
  React.useEffect(() => {
    fetchData();
  }, [user]);
  const fetchData = async () => {
    const traineesData = await getTraineesByUserId(String(idForData));
    setTrainees(traineesData);
  };
  return (
    <div className="cardLine">
      <CardCompo
        id={0}
        type={"members"}
        stat={trainees.length}
      />
      <CardCompo
        id={0}
        type={"late"}
        stat={10}
      />
      <CardCompo
        id={0}
        type={"expiring soon"}
        stat={10}
      />
      {/* <CardCompo
        id={0}
        type={"דיווחים"}
        stat={10}
      /> */}
    </div>
  );
}

export default CardLine;
