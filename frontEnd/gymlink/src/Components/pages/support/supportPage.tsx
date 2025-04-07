import { Typography } from "@mui/joy";
import React from "react";
import BugSubmit from "./bugSubmit";

const SupportPage: React.FC = () => {
  return (
    <div>
      <Typography
        level="h1"
        component="h1"
      >
        Support Page
      </Typography>
      {true && <BugSubmit />}
    </div>
  );
};

export default SupportPage;
