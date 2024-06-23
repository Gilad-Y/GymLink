import "./addMembership.css";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import Button from "@mui/joy/Button";
import { useForm } from "react-hook-form";

import axios from "axios";
import store from "../../../../redux/store";
import { Select } from "@mui/joy";
import SelectMonth from "../selectMonth/selectMonth";
import { format } from "date-fns";
interface props {
  id: number;
  onClose: () => void;
}
function AddMembership(props: props): JSX.Element {
  const { handleSubmit, register } = useForm();
  const [startValue, setStart] = React.useState<any>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [endValue, setEnd] = React.useState<any>();
  const [month, setMonth] = React.useState<number>(0);
  const [today] = React.useState(() => {
    // Get today's date in the format YYYY-MM-DD
    return new Date().toISOString().split("T")[0];
  });
  const addMembership = (data: any) => {
    data.id = props.id;
    data.traineeId = props.id;
    data.endingDate = endValue;
    data.coachId = store.getState().users.user[0].id;
    console.log(data);
    axios
      .post(`http://localhost:4000/api/v1/user/addMembership`, data)
      .then(() => {
        props.onClose();
      });
  };

  const startChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    setStart(newValue);
  };

  const endChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    setEnd(newValue);
  };
  const getMonth = (monthsToAdd: number) => {
    const startValue = new Date(); // Assuming startValue is declared somewhere in your code
    const currentDate = new Date(startValue);
    setMonth(monthsToAdd);
    if (!isNaN(currentDate.getTime()) && monthsToAdd !== null) {
      // Setting the month of the new date object
      currentDate.setMonth(currentDate.getMonth() + Number(monthsToAdd));
      const formattedDate = currentDate.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      setEnd(formattedDate);
      //const month = (date.getMonth() + 1).toString().padStart(2, "0");
    }
  };

  return (
    <div className="addMembership">
      <DialogTitle>פרטי הליווי</DialogTitle>
      <form
        onSubmit={
          // (event: React.FormEvent<HTMLFormElement>) => {
          //   event.preventDefault();
          handleSubmit(addMembership)
        }
        // }
      >
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>תאריך התחלה</FormLabel>
            <Input
              type="date"
              defaultValue={today}
              value={startValue}
              {...register("startingDate")}
              required
              onChange={startChange}
            />
          </FormControl>
          <SelectMonth returnMonth={getMonth} />
          <FormControl>
            <FormLabel> תאריך סוף</FormLabel>
            <Input
              type="date"
              value={endValue}
              {...register("endingDate")}
              disabled={month > 0}
              onChange={endChange}
            />
          </FormControl>
          <Button type="submit">עדכן</Button>
        </Stack>
      </form>
    </div>
  );
}

export default AddMembership;
