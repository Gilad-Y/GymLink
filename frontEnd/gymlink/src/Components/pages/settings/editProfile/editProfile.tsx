import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  Avatar,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { UserModel } from "../../../../models/userModel";
import axios from "axios";
import { editUserProfile, uploadImage } from "../../../../util/api";

interface Props {
  user: UserModel | null;
}

const EditProfile: React.FC<Props> = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserModel>({
    defaultValues: user || {},
  });

  const [profilePreview, setProfilePreview] = useState<string | null>(
    user?.profile
      ? `http://localhost:4000/upload/${user?._id}/profile/${user?.profile}`
      : null
  );

  const [brandPreview, setBrandPreview] = useState<string | null>(
    user?.brand?.image
      ? `http://localhost:4000/upload/${user?._id}/brand/${user?.brand.image}`
      : null
  );

  const onSubmit = async (data: UserModel) => {
    await editUserProfile(data);
  };
  //   const uploadImage = async (file: File, folderType: "profile" | "brand") => {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("userId", user?._id || "");
  //     formData.append("folderType", folderType);

  //     const response = await axios.post(
  //       "http://localhost:4000/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     if (response.status !== 200) {
  //       throw new Error("Failed to upload image");
  //     }

  //     return file.name; // Assuming the backend returns the file path
  //   };
  const handleProfileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePreview(imageUrl); // Show preview instantly
      const uploadedUrl = await uploadImage(file, "profile", user?._id || ""); // Upload to cloud and get URL
      setValue("profile", uploadedUrl); // Store URL instead of file
    }
  };

  const handleBrandChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBrandPreview(imageUrl);
      const uploadedUrl = await uploadImage(file, "brand", user?._id || "");
      setValue("brand.image", uploadedUrl);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography
          variant="h4"
          component="h2"
        >
          Edit Profile
        </Typography>
      </Box>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Profile Picture */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Avatar
            src={profilePreview || undefined}
            alt="Profile Picture"
            sx={{ width: 100, height: 100 }}
          />
          <FormControl
            fullWidth
            margin="normal"
          >
            <TextField
              label="Profile Picture"
              type="file"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: "image/*" }}
              onChange={handleProfileChange}
            />
          </FormControl>
        </Box>

        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sm={6}
          >
            <FormControl
              fullWidth
              margin="normal"
            >
              <TextField
                label="First Name"
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <FormControl
              fullWidth
              margin="normal"
            >
              <TextField
                label="Last Name"
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <FormControl
              fullWidth
              margin="normal"
            >
              <TextField
                label="Email"
                type="email"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <FormControl
              fullWidth
              margin="normal"
            >
              <TextField
                label="Password"
                type="password"
                {...register("_password")}
                error={!!errors._password}
                helperText={errors._password?.message}
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* Only show brand fields if the user is an admin */}
        {user?.role === "admin" && (
          <>
            <FormControl
              fullWidth
              margin="normal"
            >
              <TextField
                label="Brand Name"
                type="text"
                {...register("brand.name", {
                  required: "Brand name is required",
                })}
              />
            </FormControl>

            {brandPreview && (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Avatar
                  src={brandPreview}
                  alt="Brand Logo"
                  sx={{ width: 80, height: 80 }}
                />
              </Box>
            )}

            <FormControl
              fullWidth
              margin="normal"
            >
              <TextField
                label="Brand Logo"
                type="file"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: "image/*" }}
                onChange={handleBrandChange}
              />
            </FormControl>
          </>
        )}

        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Save Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditProfile;
