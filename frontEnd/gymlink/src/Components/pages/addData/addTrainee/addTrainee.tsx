import React from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { UserModel } from "../../../../models/userModel"; // import your UserModel
import "./addTrainee.css"; // Ensure this file is correctly linked
import store from "../../../../redux/store";
import axios from "axios";

function AddTrainee(): React.JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserModel>();

  // Handle form submission
  const onSubmit = (data: UserModel) => {
    const user = store.getState().users.user;
    if (user && user._id) {
      data.belongsTo = user._id;
      console.log(data); // Log the user data, which is of type UserModel
      axios
        .post("http://localhost:4000/api/v1/user/addUser", data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.error("User is not logged in or user data is unavailable");
      // Handle the case where the user is not logged in or user data is unavailable
    }
  };

  return (
    <div className="addTrainee">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <Button
            variant="contained"
            type="submit"
            className="submit-button"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddTrainee;
