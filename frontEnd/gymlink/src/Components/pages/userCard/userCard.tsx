import "./userCard.css";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserModel } from "../../../models/userModel";
import { CardHeader } from "@mui/material";
interface props {
  id: number;
}
function UserCard(props: props): JSX.Element {
  const [user, setUser] = useState<UserModel>();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/user/getById/${props.id}`)
      .then((res) => {
        setUser(res.data[0]);
        // console.log(res.data);
      });
  }, [props.id]);
  return (
    <div className="userCard">
      {props.id > 0 && (
        <Card
          variant="outlined"
          sx={{ width: 250, margin: "auto", borderRadius: "16px" }}
        >
          <CardContent>
            <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
            <div>{`${user?.email}`}</div>
            <div>{`${user?.phone}`}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default UserCard;
