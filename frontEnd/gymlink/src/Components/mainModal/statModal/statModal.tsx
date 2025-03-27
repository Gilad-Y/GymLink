import {
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import * as React from "react";

import { updateStats } from "../../../util/api";

import store from "../../../redux/store";
import { updateUser } from "../../../redux/usersReducer";

interface Props {
  onClose: () => void;
  stat?: any;
}
const stats = ["members", "expiring soon", "expired", "growth"];

const StatModal: React.FC<Props> = (props) => {
  const user = store.getState().users.user;

  const [userStats, setUserStats] = React.useState<any>(user?.stats);
  React.useEffect(() => {
    setUserStats(user?.stats);
  }, [user]);
  return (
    <div>
      <Typography variant="h3">{props.stat.type}</Typography>
      <FormControl fullWidth>
        <InputLabel>Stat Type</InputLabel>
        <Select
          defaultValue={props.stat.type}
          onChange={async (e) => {
            const newStats = [...userStats];

            // Check if the stat type exists in userStats
            const statExists = userStats.some(
              (stat: any) => stat === props.stat.type
            );

            // If stat type exists, update it
            if (statExists) {
              const updatedStats = newStats.map((stat: any) => {
                return stat === props.stat.type
                  ? (e.target.value as string)
                  : stat;
              });
              setUserStats(updatedStats);
              const res = await updateStats(user?._id || "", updatedStats);
              store.dispatch(updateUser(res));
            } else {
              // If stat type does not exist, push it into the array
              const newStat = e.target.value as string; // Add the new stat with the updated type
              newStats.push(newStat);
              console.log(newStats);
              setUserStats(newStats);
              const res = await updateStats(user?._id || "", newStats);

              store.dispatch(updateUser(res));
            }
            props.onClose();
          }}
          fullWidth
        >
          {stats
            .filter((stat) => !userStats.includes(stat))
            .map((stat, index) => (
              <MenuItem
                key={index}
                value={stat}
              >
                {stat}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button onClick={props.onClose}>Close</Button>
    </div>
  );
};

export default StatModal;
