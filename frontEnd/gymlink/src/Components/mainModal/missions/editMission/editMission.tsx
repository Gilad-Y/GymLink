import "./editMission.css";
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
import TraineesList from "../../../pages/addData/traineesList/traineesList";
import store from "../../../../redux/store";
interface props {
  data: any;
  onClose: () => void;
}
function EditMission(props: props): JSX.Element {
  const { handleSubmit, register } = useForm<missionModel>();
  const editMission = (data: missionModel) => {
    //   data.coachId =
    //   data.traineeId =
    //   data.status = false;
    //   console.log(data);
    axios
      .put(`http://localhost:4000/api/v1/mission/editMission`, data)
      .then(() => {
        props.onClose();
      });
  };
  const formatDate = (dateString: string): string => {
    const parts = dateString.split("-"); // Split the date string
    const year = `20${parts[2]}`; // Extract the year
    const month = parts[1].length === 1 ? `0${parts[1]}` : parts[1]; // Ensure two-digit month
    const day = parts[0].length === 1 ? `0${parts[0]}` : parts[0]; // Ensure two-digit day
    return `${year}-${month}-${day}`; // Format the date as "YYYY-MM-DD"
  };

  console.log(props.data);
  return (
    <div className="editMission">
      <h1>ערוך משימה</h1>
      <form
        onSubmit={
          // (event: React.FormEvent<HTMLFormElement>) => {
          //   event.preventDefault();
          handleSubmit(editMission)
        }
        // }
      >
        <Stack spacing={2}>
          <FormControl>
            <FormLabel> תוכן המשימה</FormLabel>
            <Textarea
              defaultValue={props.data.content}
              {...register("content")}
              required
              sx={{ mb: 1 }}
            />
          </FormControl>
          <FormControl>
            <FormLabel> תאריך לביצוע-לא חובה</FormLabel>
            <Input
              type="date"
              defaultValue={formatDate(props.data.lastDate)}
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

export default EditMission;
