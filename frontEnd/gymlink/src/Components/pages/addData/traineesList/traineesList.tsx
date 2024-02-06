import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { UserModel } from "../../../../models/userModel";
import "./traineesList.css";

interface Props {
  id: number;
  getTrainee: any;
}
function TraineesList(props: Props): JSX.Element {
  const [selectedTrainee, setSelectedTrainee] = useState<string>("");
  const [options, setOptions] = useState<UserModel[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/user/getAllById/${props.id}`)
      .then((res) => {
        const optionsArr: UserModel[] = res.data;
        setOptions(optionsArr);
      });
  }, [props.id]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTrainee(event.target.value as string);
    props.getTrainee(event.target.value);
  };

  return (
    <div className="traineesList">
      <h1>בחר מתאמן</h1>
      <Box sx={{ minWidth: 120, width: 200, margin: "auto" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">בחר מתאמן</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedTrainee}
            label="בחר מתאמן"
            onChange={handleChange}
          >
            {options.map((trainee) => (
              <MenuItem key={trainee.id} value={trainee.id}>
                {`${trainee.firstName} ${trainee.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default TraineesList;
