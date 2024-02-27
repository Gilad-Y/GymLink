import "./eCards.css";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import Button from "@mui/joy/Button";
import { useForm } from "react-hook-form";
interface props {
  data: any;
  onClose: () => void;
}
function ECards(props: props): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const editPayment = (data: any) => {
    data.id = props.data.id;
    console.log(data);
    props.onClose();
  };
  React.useEffect(() => {
    console.log(props.data);
  }, []);
  const formattedStartingDate = props.data.startingDate
    ? new Date(props.data.startingDate).toISOString().split("T")[0]
    : "";
  return (
    <div className="eCards">
      <DialogTitle>ערוך פרטי תשלום</DialogTitle>
      <form
        onSubmit={
          // (event: React.FormEvent<HTMLFormElement>) => {
          //   event.preventDefault();
          handleSubmit(editPayment)
        }
        // }
      >
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>כמות </FormLabel>
            <Input
              type="number"
              defaultValue={props.data.card}
              {...register("card")}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>יתרה</FormLabel>
            <Input
              type="number"
              defaultValue={props.data.cardLeft}
              {...register("cardLeft")}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>תאריך רכישה</FormLabel>
            <Input
              type="date"
              defaultValue={formattedStartingDate}
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
