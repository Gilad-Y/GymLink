import "./eCards.css";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import Button from "@mui/joy/Button";
import { useForm } from "react-hook-form";
import axios from "axios";

interface Props {
  data: any;
  onClose: () => void;
}

function ECards(props: Props): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Function to handle form submission
  const editPayment = (data: any) => {
    data.id = props.data.id;
    console.log(data);
    axios
      .put(`http://localhost:4000/api/v1/user/updateCard`, data)
      .then((res: any) => {
        props.onClose();
      });
  };

  // Function to parse and format the date string
  const formatDate = (dateString: string): string => {
    const parts = dateString.split("-"); // Split the date string
    const year = `20${parts[2]}`; // Extract the year
    const month = parts[1].length === 1 ? `0${parts[1]}` : parts[1]; // Ensure two-digit month
    const day = parts[0].length === 1 ? `0${parts[0]}` : parts[0]; // Ensure two-digit day
    return `${year}-${month}-${day}`; // Format the date as "YYYY-MM-DD"
  };

  return (
    <div className="eCards">
      <DialogTitle>ערוך פרטי תשלום</DialogTitle>
      <form onSubmit={handleSubmit(editPayment)}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>כמות </FormLabel>
            <Input
              type="number"
              defaultValue={props.data?.card}
              {...register("card")}
              slotProps={{
                input: {
                  min: 1,
                },
              }}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>יתרה</FormLabel>
            <Input
              type="number"
              defaultValue={props.data?.cardLeft}
              {...register("cardLeft")}
              required
              slotProps={{
                input: {
                  min: 0,
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>תאריך רכישה</FormLabel>
            <Input
              type="date"
              defaultValue={formatDate(props.data?.startingDate)} // Format the startingDate
              {...register("startingDate")}
              required
            />
          </FormControl>
          <Button type="submit">עדכן</Button>
        </Stack>
      </form>
    </div>
  );
}

export default ECards;
