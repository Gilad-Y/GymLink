import React from "react";
import { useForm, Controller, set } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Bug } from "../../../models/bugModel";
import store from "../../../redux/store";
import { uploadBug, uploadImage } from "../../../util/api";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const BugSubmit: React.FC = () => {
  const user = store.getState().users.user;
  const { handleSubmit, control, reset } = useForm<Bug>();
  const [upload, setUpload] = React.useState(false);
  const onSubmit = async (data: Bug) => {
    const date = new Date();
    data.user = user?._id || "";
    let fileToUpload;
    if (data.img) {
      const renamedFile = new File(
        [data.img],
        `${date.toISOString()}_${data.user}`,
        { type: data.img.type }
      );
      fileToUpload = renamedFile;
      data.img = renamedFile.name;
    }
    const res = await uploadBug(data);
    if (res) {
      setUpload(true);
      uploadImage(fileToUpload, "bug", user?._id || "");
      reset(); // Reset the form after submission
    }
    setInterval(() => {
      setUpload(false);
    }, 7000);
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "0 auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        textAlign="center"
      >
        Submit a Bug
      </Typography>
      <Stack
        sx={{ width: "100%" }}
        spacing={2}
      >
        {upload && (
          <Alert
            variant="filled"
            severity="success"
          >
            the bug report has been uploaded
          </Alert>
        )}
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: "Title is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              required
              label="Bug Title"
              variant="outlined"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: "Description is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              required
              label="Bug Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="img"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ margin: 2 }}
            >
              Upload screenshot
              <VisuallyHiddenInput
                accept="image/*"
                type="file"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    field.onChange(file); // Assign the file to the screenshot field
                  }
                }}
                multiple={false}
              />
            </Button>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit Bug
        </Button>
      </form>
    </Box>
  );
};

export default BugSubmit;
