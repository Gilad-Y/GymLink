import { Button } from "@mui/joy";
import "./missionStatus.css";
import { useEffect, useState } from "react";
import axios from "axios";
import IconButton from "@mui/joy/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { pink } from "@mui/material/colors";
interface props {
  id: number;
  ferFn:()=>void
}
function MissionStatus(props: props): JSX.Element {
  const [missionStatus, setStatus] = useState("");
  useEffect(() => {
    props.id &&
      axios
        .get(`http://localhost:4000/api/v1/mission/getStatus/${props.id}`)
        .then((res: any) => {
          setStatus(res.data[0].status);
        });
  }, [props.id]);
  const toggleStatus = () => {
    axios
      .put(`http://localhost:4000/api/v1/mission/updateStatus/${props.id}`, {
        missionStatus,
      })
      .then((res: any) => {
        setStatus(res.data);
        props.ferFn()
      });
  };
  return (
    <div className="missionStatus">
      <IconButton
        onClick={() => {
          toggleStatus();
        }}
      >
        {missionStatus ? (
          <DoneIcon color="success" />
        ) : (
          <CloseIcon sx={{ color: pink[500] }} />
        )}
      </IconButton>
    </div>
  );
}

export default MissionStatus;
