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
  id: string;
  getTrainee: (traineeId: string) => void;
}

function TraineesList(props: Props): React.JSX.Element {
  const [selectedTrainee, setSelectedTrainee] = useState<string>("");
  const [options, setOptions] = useState<UserModel[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/user/getAllById/${props.id}`)
      .then((res) => {
        const fetchedOptions: UserModel[] = res.data;
        const uniqueOptions: UserModel[] = [];

        // Keep track of encountered option IDs
        const encounteredIds: Set<string> = new Set();

        // Iterate through fetched options
        fetchedOptions.forEach((option) => {
          // If the ID hasn't been encountered, add the option to uniqueOptions
          if (!encounteredIds.has(option._id)) {
            uniqueOptions.push(option);
            encounteredIds.add(option._id);
          }
        });

        // Set the options state with unique options
        setOptions(uniqueOptions);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [props.id]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTrainee(event.target.value as string);
    props.getTrainee(event.target.value);
  };

  return (
    <div className="traineesList">
      <Box sx={{ minWidth: 120, width: 200, margin: "auto" }}>
        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            sx={{ color: "white" }}
          >
            בחר מתאמן
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedTrainee}
            label="בחר מתאמן"
            onChange={handleChange}
          >
            {options.map((trainee) => (
              <MenuItem
                key={trainee._id}
                value={trainee._id}
              >
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
