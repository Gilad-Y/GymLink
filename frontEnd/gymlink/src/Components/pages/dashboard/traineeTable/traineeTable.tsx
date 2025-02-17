import * as React from "react";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../../models/userModel";
import { Column } from "../../../../models/columnModel"; // Import the Column model
import { get } from "http";
import { getColumnsByUserId } from "../../../../util/api";

interface Props {
  id: string;
}

export default function TraineeTable(props: Props) {
  const [columns, setColumns] = React.useState<Column[]>([]);
  const nav = useNavigate();

  React.useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await getColumnsByUserId(props.id);
        console.log("Columns:", response);
        setColumns(response);
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };

    fetchColumns();
  }, [props.id]);

  return (
    <div>
      <Typography
        level="body-lg"
        sx={{ textAlign: "center", mb: 2 }}
      >
        רשימת לקוחות
      </Typography>
      <Sheet
        sx={(theme) => ({
          "--TableCell-height": "40px",
          "--TableHeader-height": "calc(1 * var(--TableCell-height))",
          height: 400,
          overflow: "auto",
          whiteSpace: "nowrap",
          background: `linear-gradient(${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 50% 0,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 50% 100%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
          backgroundSize: "100% 40px, 100% 40px, 100% 14px, 100% 14px",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "local, local, scroll, scroll",
          backgroundPosition:
            "0 var(--TableHeader-height), 0 100%, 0 var(--TableHeader-height), 0 100%",
          backgroundColor: "background.surface",
        })}
      >
        <Table
          stickyHeader
          sx={{
            textAlign: "center",
            "& th, & td": { textAlign: "center" },
          }}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column._id}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>{/* The tbody will be added later */}</tbody>
        </Table>
      </Sheet>
    </div>
  );
}
