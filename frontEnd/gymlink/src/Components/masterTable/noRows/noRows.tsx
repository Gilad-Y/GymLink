import React from "react";
import "./noRows.css";
import { Button, List, ListItem } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const NoRows: React.FC = () => {
  const nav = useNavigate();
  return (
    <div className="no-rows">
      <div className="no-rows-header">
        <p>No table data available</p>
        <p>build new table or use one of the premade tables:</p>
      </div>
      <div className="no-rows-actions">
        <Button
          color="primary"
          onClick={() => {
            nav("/settings");
          }}
        >
          Go to Table Builder
        </Button>
        <List className="premade-tables">
          <ListItem>
            <Button onClick={() => {}}>Premade Table 1</Button>
          </ListItem>
          <ListItem>
            <Button onClick={() => {}}>Premade Table 2</Button>
          </ListItem>
          <ListItem>
            <Button onClick={() => {}}>Premade Table 3</Button>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default NoRows;
