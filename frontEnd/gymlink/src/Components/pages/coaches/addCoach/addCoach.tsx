import * as React from "react";
import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form"; // import { createUser } from "../../../../util/api"; // Assuming you have an API function to create a user
import { UserModel } from "../../../../models/userModel";
import { registerUser } from "../../../../util/api";
import bcrypt from "bcryptjs"; // Import bcryptjs
interface props {
  id: string;
}
const AddCoach: React.FC<props> = (props) => {
  const { control, handleSubmit, reset } = useForm<UserModel>();

  const onSubmit = async (data: UserModel) => {
    const hashedPassword = await bcrypt.hash(data._password, 10);
    const newCoach = {
      ...data,
      _password: hashedPassword,
      role: "coach",
      belongsTo: props.id,
    };
    // console.log(newCoach);

    try {
      await registerUser(newCoach);
      reset();
    } catch (error) {
      console.error("Error adding coach:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      <Typography
        variant="h6"
        gutterBottom
      >
        Add New Coach
      </Typography>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            fullWidth
            required
            margin="normal"
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            fullWidth
            required
            margin="normal"
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
        )}
      />
      <Controller
        name="_password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Add Coach
      </Button>
    </Box>
  );
};

export default AddCoach;
