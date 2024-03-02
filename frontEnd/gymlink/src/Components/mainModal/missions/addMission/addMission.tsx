import "./addMission.css";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import Button from "@mui/joy/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { missionModel } from "../../../../models/missionModel";
import Textarea from "@mui/joy/Textarea";
interface props {
  data: any;
  onClose: () => void;
}
function AddMission(props: props): JSX.Element {
  const [today] = React.useState(() => {
    // Get today's date in the format YYYY-MM-DD
    return new Date().toISOString().split("T")[0];
  });
  const { handleSubmit, register } = useForm<missionModel>();
  const addMission = (data: missionModel) => {
    data.coachId = props.data[0];
    data.traineeId = props.data[1];
    data.status = false;
    console.log(data);
    axios
      .post(`http://localhost:4000/api/v1/mission/addMission`, data)
      .then(() => {
        props.onClose();
      });
  };
  return (
    <div className="addMission">
      <DialogTitle>הוסף משימה חדשה</DialogTitle>
      <form
        onSubmit={
          // (event: React.FormEvent<HTMLFormElement>) => {
          //   event.preventDefault();
          handleSubmit(addMission)
        }
        // }
      >
        <Stack spacing={2}>
          <FormControl>
            <FormLabel> תוכן המשימה</FormLabel>
            <Textarea {...register("content")} required sx={{ mb: 1 }} />
          </FormControl>
          <FormControl>
            <FormLabel> תאריך לביצוע-לא חובה</FormLabel>
            <Input
              type="date"
              slotProps={{
                input: {},
              }}
              {...register("lastDate")}
            />
          </FormControl>
          <Button type="submit" color="success">
            עדכן
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default AddMission;
