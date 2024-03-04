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
import Switch from '@mui/joy/Switch';
import { Typography } from "@mui/joy";
interface props {
  data: any;
  onClose: () => void;
}
function EditMission(props: props): JSX.Element {
  const { handleSubmit, register } = useForm<missionModel>();
  const [disableDate, setDisable] = React.useState<boolean>(
  () => props.data.lastDate ? true : false
);
// const [inputValue, setInputValue] = React.useState();
  const editMission = (data: missionModel) => {
    //   data.coachId =
    //   data.traineeId =
    //   data.status = false;
    //   console.log(data);
    props.data.content=data.content
    props.data.lastDate=disableDate ? data.lastDate:null
    console.log(data)
    console.log(props.data)
    axios
      .put(`http://localhost:4000/api/v1/mission/updateMission/${props.data.id}`, props.data)
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

  // console.log(props.data.lastDate?true:false);
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
            <FormLabel> 
              <Switch
              defaultChecked={disableDate}
              onChange={()=>{
                setDisable(!disableDate)
                
              }}
              
              
              />
              תאריך לביצוע
              
               {/* <Typography component="label" startDecorator={<Switch  defaultChecked={disableDate}
              onChange={()=>{
                setDisable(!disableDate)
              }} sx={{ ml: 1 }} />}>
                 Turn alarm on
                </Typography> */}
              </FormLabel>
            <Input
              type="date"
              defaultValue={props.data.lastDate && formatDate(props.data.lastDate)}
              slotProps={{
                input: {},
              }}
              {...register("lastDate")}
              disabled={!disableDate}
              id="myInput" 
              // ref={inputRef} 
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
