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
import TraineesList from "../../../pages/addData/traineesList/traineesList";
import store from "../../../../redux/store";
interface props {
  data?: any;
  onClose: () => void;
}
function AddMission(props: props): JSX.Element {
  const [today] = React.useState(() => {
    // Get today's date in the format YYYY-MM-DD
    return new Date().toISOString().split("T")[0];
  });
  const [id] = React.useState<number>(() => {
    // Get today's date in the format YYYY-MM-DD
    return store.getState().users.user[0].id;
  });
  const [traineeId, setId] = React.useState<number>();
  const { handleSubmit, register } = useForm<missionModel>();
  const addMission = (data: missionModel) => {
    // if (props == undefined) {
    //   console.log("have porps");
    //   data.coachId = props.data[0]
    //   data.traineeId = props.data[1]

    // } else {
    //   console.log("dont have porps");
    //   data.coachId =  id;
    //   data.traineeId =  traineeId?traineeId:-1;
    // }
    // data.status = false;
    data.coachId = props.data !== undefined ? props.data[0] : id;
    data.traineeId = props.data !== undefined ? props.data[1] : traineeId;
    data.status = false;
    console.log(data);
    axios
      .post(`http://localhost:4000/api/v1/mission/addMission`, data)
      .then(() => {
        props.onClose();
      });
  };
  const getTrainee = (trainee: Number) => {
    setId(+trainee);
    // console.log(trainee);
  };
  console.log(props.data);
  return (
    <div className="addMission">
      <DialogTitle>הוסף משימה חדשה</DialogTitle>
      <br />
      {!props.data && <TraineesList id={id} getTrainee={getTrainee} />}
      {(props.data || traineeId) && (
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
      )}
    </div>
  );
}

export default AddMission;
