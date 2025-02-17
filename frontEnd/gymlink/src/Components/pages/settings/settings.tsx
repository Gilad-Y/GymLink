import React from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useForm, Controller } from "react-hook-form";
import "./settings.css";
import TableBuilder from "./tableBuilder/tableBuilder";

interface SettingsForm {
  username: string;
  email: string;
  language: string;
  notifications: boolean;
}

const Settings: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SettingsForm>();

  const onSubmit = (data: SettingsForm) => {
    console.log(data);
    // Handle form submission
  };

  return <TableBuilder />;
};

export default Settings;
