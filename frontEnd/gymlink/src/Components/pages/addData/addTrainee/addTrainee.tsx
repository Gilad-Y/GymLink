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
import { getColumnsByUserId } from "../../../../util/api";

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
        setColumns(res.data);
      });
    }
  }, [user]);

  // Handle form submission
  const onSubmit = (data: any) => {
    if (user && user._id) {
      data.belongsTo = user._id;
      console.log(data); // Log the user data
    } else {
      console.error("User is not logged in or user data is unavailable");
      // Handle the case where the user is not logged in or user data is unavailable
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
                  field: ControllerRenderProps<any, keyof any>;
                }) => {
                  switch (column.dataType) {
                    case "string":
                      return (
                        <TextField
                          {...field}
                          label={column.title}
                          error={!!errors[column.title]}
                          helperText={errors[column.title]?.message}
                        />
                      );
                    case "number":
                      return (
                        <TextField
                          {...field}
                          type="number"
                          label={column.title}
                          error={!!errors[column.title]}
                          helperText={errors[column.title]?.message}
                        />
                      );
                    case "boolean":
                      return (
                        <Select
                          {...field}
                          label={column.title}
                          error={!!errors[column.title]}
                        >
                          <MenuItem value={true}>True</MenuItem>
                          <MenuItem value={false}>False</MenuItem>
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
                          helperText={errors[column.title]?.message}
                        />
                      );
                    default:
                      return null;
                  }
                }}
              />
              {errors[column.title] && (
                <FormHelperText error>
                  {errors[column.title]?.message}
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
