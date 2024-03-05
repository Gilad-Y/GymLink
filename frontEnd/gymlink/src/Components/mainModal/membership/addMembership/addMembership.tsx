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
interface props {
  id: number;
  onClose: () => void;
}
function AddMembership(props:props): JSX.Element {
    const { handleSubmit, register } = useForm();
    const[startValue,setStart]=React.useState<any>(
        ()=>{return new Date().toISOString().split("T")[0];}
    )
    const[endValue,setEnd]=React.useState<any>()
    const [month,setMonth]=React.useState<number>(0)
    const [today] = React.useState(() => {
    // Get today's date in the format YYYY-MM-DD
    return new Date().toISOString().split("T")[0];
  });
    const addMembership = (data: any) => {
    data.id = props.id;
    data.traineeId = props.id;
    data.coachId = store.getState().users.user[0].id;
    console.log(data);
    // axios.post(`http://localhost:4000/api/v1/user/addCard`, data).then(() => {
    //   props.onClose();
    // });
  };
   function formatDate(dateString: string) {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2);

    return `${day}-${month}-${year}`;
  }
  const startChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const newValue = event.target.value;
  setStart((newValue));
};

  const endChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const newValue = event.target.value;
  setEnd((newValue));
};

//   const getMonth=(month:number)=>{
//     console.log(month)
//     setMonth(month)

//   }
  const getMonth = (monthsToAdd: number) => {
    // console.log(monthsToAdd)
    setMonth(monthsToAdd)
    // console.log(startValue as string + 1)
    const currentDate = new Date(startValue);
    // console.log(currentDate.toISOString())
    // console.log(currentDate.setMonth(currentDate.getMonth()+1).toString())
    
    if (!isNaN(currentDate.getTime())&&monthsToAdd!==0) {
        //   currentDate.setMonth(currentDate.getMonth() + monthsToAdd);
        // const formattedDate = currentDate.toISOString().split('T')[0];
    const date = new Date(currentDate)
    const day = (date.getDate()-1).toString().padStart(2, "0");
    const monthToBeAdd = (Number(date.getMonth())+Number(monthsToAdd)+1).toString().padStart(2, "0");
    if(Number(monthToBeAdd)>12){
    const year = date.getFullYear().toString().slice(2);
    setEnd(`${Number(year)+1}-${String(Number(monthToBeAdd)-12).padStart(2, "0")}-${day}`)
    }else{
const year = date.getFullYear().toString().slice(2);
    const theDate=(`${year}-${(monthToBeAdd)}-${day}`)
    console.log((theDate).toString())
    // setEnd(theDate.pars)
    }
    // console.log(monthsToAdd)
    // console.log(`${day}-${monthToBeAdd}-${year}`)
        // setEnd(formattedDate);
    }
    //date.toISOString()
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
          <SelectMonth returnMonth={getMonth}/>
          <FormControl>
            <FormLabel> תאריך סוף</FormLabel>
            <Input
              type="date"
              value={endValue}
              {...register("endingDate")}
              disabled={month>0}
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