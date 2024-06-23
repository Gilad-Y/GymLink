import "./eMembership.css";
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
interface props {
  row: any;
  onClose: () => void;
}
function EMembership(props: props): JSX.Element {
  const { handleSubmit, register } = useForm();
  const [month, setMonth] = React.useState<number>(0);
  const [monthToChange, changeMonth] = React.useState<number>();
  const [startValue, setStart] = React.useState<any>();
  const [endValue, setEnd] = React.useState<any>();
  const editMembership = (data: any) => {
    data.id = props.row.id;
    data.traineeId = props.row.id;
    data.coachId = store.getState().users.user[0].id;
    console.log(data);
    // axios
    //   .post(`http://localhost:4000/api/v1/user/addMembership`, data)
    //   .then(() => {
    //     props.onClose();
    //   });
  };
  const formatDate = (dateString: string): string => {
    const parts = dateString.split("T"); // Split the date string
    console.log(parts);
    const year = `20${parts[2]}`; // Extract the year
    const month = parts[1].length === 1 ? `0${parts[1]}` : parts[1]; // Ensure two-digit month
    const day = parts[0].length === 1 ? `0${parts[0]}` : parts[0]; // Ensure two-digit day
    return `${year}-${month}-${day}`; // Format the date as "YYYY-MM-DD"
  };
  const calcMonth = () => {
    // var endingDate = new Date(props.row.endingDate.split("T")[0]).getTime();
    // var startingDate = new Date(props.row.startingDate.split("T")[0]).getTime();
    const endDays = props.row.endingDate.split("T")[0].split("-");
    const startDays = props.row.startingDate.split("T")[0].split("-");
    if (endDays[2] === startDays[2]) {
      const yearsDiff = endDays[0] - startDays[0];
      //   changeMonth(12 * yearsDiff + (endDays[1] - startDays[1]));
    }
    // console.log(endDays == startDays);
    // var differenceInMilliseconds = endingDate - startingDate;
    // var differenceInDays = differenceInMilliseconds / (30000 * 60 * 60 * 24);
    // console.log("Difference in days:", differenceInDays);
  };
  const getMonth = (monthsToAdd: number) => {
    // const startValue = new Date(); // Assuming startValue is declared somewhere in your code
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
  calcMonth();
  return (
    <div className="eMembership">
      <DialogTitle>פרטי הליווי</DialogTitle>
      <form
        onSubmit={
          // (event: React.FormEvent<HTMLFormElement>) => {
          //   event.preventDefault();
          handleSubmit(editMembership)
        }
        // }
      >
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>תאריך התחלה</FormLabel>
            <Input
              type="date"
              {...register("startingDate")}
              defaultValue={props.row.startingDate.split("T")[0]}
              value={startValue}
              required
            />
          </FormControl>
          <SelectMonth returnMonth={getMonth} monthToChange={monthToChange} />
          <FormControl>
            <FormLabel> תאריך סוף</FormLabel>
            <Input
              type="date"
              {...register("endingDate")}
              defaultValue={props.row.endingDate.split("T")[0]}
              // disabled={month > 0}
              value={endValue}
            />
          </FormControl>
          <Button type="submit">עדכן</Button>
        </Stack>
      </form>
    </div>
  );
}

export default EMembership;
