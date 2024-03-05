import "./addCard.css";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import Button from "@mui/joy/Button";
import { useForm } from "react-hook-form";
import store from "../../../../../../../redux/store";
import axios from "axios";
interface props {
  id: number;
  onClose: () => void;
}
function AddCard(props: props): JSX.Element {
  const [today] = React.useState(() => {
    // Get today's date in the format YYYY-MM-DD
    return new Date().toISOString().split("T")[0];
  });
  const { handleSubmit, register } = useForm();
  const addCard = (data: any) => {
    data.id = props.id;
    data.cardLeft = data.card;
    data.traineeId = props.id;
    data.coachId = store.getState().users.user[0].id;
    console.log(data);
    axios.post(`http://localhost:4000/api/v1/user/addCard`, data).then(() => {
      props.onClose();
    });
  };
  // React.useEffect(() => {
  //   console.log(props.id);
  // }, []);
  return (
    <div className="addCard">
      <DialogTitle>הוסף כרטיסיה חדשה</DialogTitle>
      <form
        onSubmit={
          // (event: React.FormEvent<HTMLFormElement>) => {
          //   event.preventDefault();
          handleSubmit(addCard)
        }
        // }
      >
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>כמות </FormLabel>
            <Input
              type="number"
              {...register("card")}
              required
              slotProps={{
                input: {
                  min: 1,
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>תאריך רכישה</FormLabel>
            <Input
              type="date"
              defaultValue={today}
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

export default AddCard;
