import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import "./addTrainee.css"; // Ensure this file is correctly linked
import store from "../../../../redux/store";
import { addTrainees, getColumnsByUserId } from "../../../../util/api";
import { sanitizeKeys } from "../../../../util/formattingKey";
function AddTrainee(): React.JSX.Element {
  const user = store.getState().users.user;
  const [columns, setColumns] = useState<any[]>([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>();

  useEffect(() => {
    if (user && user._id) {
      getColumnsByUserId(user._id).then((res) => {
        setColumns(res);
      });
    }
  }, [user]);

  // Handle form submission
  const onSubmit = async (data: any) => {
    if (user && user._id) {
      // Sanitize form data before sending
      const formattedData = {
        ...sanitizeKeys(data), // Sanitize keys before adding belongsTo
        belongsTo: user._id, // Add the user ID
      };

      console.log(formattedData); // Debug: Check the sanitized and formatted data

      try {
        await addTrainees(formattedData); // Pass sanitized data to addTrainee
        console.log("Trainee added successfully");
      } catch (error) {
        console.error("Error adding trainee:", error);
        alert("Error adding trainee, please try again."); // Better user feedback
      }
    } else {
      console.error("User is not logged in or user data is unavailable");
      alert("User is not logged in. Please log in and try again.");
    }
  };

  return (
    <div className="addTrainee">
      <form onSubmit={handleSubmit(onSubmit)}>
        {columns.map((column) => (
          <div
            key={column._id}
            className="form-row"
          >
            <FormControl
              fullWidth
              margin="normal"
            >
              <InputLabel>{column.title}</InputLabel>
              <Controller
                name={column.title}
                control={control}
                defaultValue=""
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<any, string>;
                }) => {
                  switch (column.dataType) {
                    case "string":
                      return (
                        <TextField
                          {...field}
                          label={column.title}
                          error={!!errors[column.title]}
                          helperText={errors[column.title]?.message?.toString()}
                        />
                      );
                    case "number":
                      return (
                        <TextField
                          {...field}
                          type="number"
                          label={column.title}
                          error={!!errors[column.title]}
                          helperText={errors[column.title]?.message?.toString()}
                        />
                      );
                    case "boolean":
                      return (
                        <Select
                          {...field}
                          label={column.title}
                          error={!!errors[column.title]}
                        >
                          <MenuItem value="true">True</MenuItem>
                          <MenuItem value="false">False</MenuItem>
                        </Select>
                      );
                    case "date":
                      return (
                        <TextField
                          {...field}
                          type="date"
                          label={column.title}
                          InputLabelProps={{ shrink: true }}
                          error={!!errors[column.title]}
                          helperText={errors[column.title]?.message?.toString()}
                        />
                      );
                    default:
                      return <></>; // Return an empty fragment if no case matches
                  }
                }}
              />
              {errors[column.title] && (
                <FormHelperText error>
                  {errors[column.title]?.message?.toString()}
                </FormHelperText>
              )}
            </FormControl>
          </div>
        ))}
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
