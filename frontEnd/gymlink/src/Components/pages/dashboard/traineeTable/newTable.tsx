import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModes,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getColumnsByUserId,
  getTraineesByUserId,
  updateTrainee,
} from "../../../../util/api"; // Assuming these functions exist
import { filterString } from "../../../../util/formattingKey";
import { randomId } from "@mui/x-data-grid-generator";

interface Props {
  id: string;
}

export default function NewTable(props: Props) {
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const [rows, setRows] = React.useState<{ id: string; [key: string]: any }[]>(
    []
  );

  React.useEffect(() => {
    const fetchColumns = async () => {
      try {
        const res = await getColumnsByUserId(props.id);
        const newColumns = res.map((columnData: any) => ({
          field: filterString(columnData.title), // Filter the column title to be a valid field
          headerName: columnData.title,
          width: 130,
          type: columnData.dataType || "string", // Default to "string" type if not specified
          editable: true, // Enable editing for columns
        }));

        newColumns.push(
          {
            field: "actions",
            headerName: "Actions",
            width: 100,
            sortable: false,
            renderCell: (params: any) => (
              <IconButton
                color="error"
                onClick={() => handleDelete(params.row._id)}
              >
                <DeleteIcon />
                {params.row.id}
              </IconButton>
            ),
          },
          { field: "_id", headerName: "id", hide: true } // This is used internally for the unique identifier
        );

        setColumns(newColumns); // Update columns state
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };

    const fetchTrainees = async () => {
      try {
        const res = await getTraineesByUserId(props.id);
        const newRows = res.map((columnData: any) => ({
          ...columnData,
          id: columnData._id, // Generate a random ID for each row if needed
        }));

        setRows(newRows); // Update rows state
      } catch (error) {
        console.error("Error fetching trainees:", error);
      }
    };

    fetchColumns(); // Fetch columns first
    fetchTrainees(); // Fetch trainees data
  }, [props.id]); // Re-run when props.id changes

  const processRowUpdate = async (newRow: any) => {
    try {
      const updatedRows = rows.map(
        (row) => (row.id === newRow.id ? newRow : row) // Replace the updated row
      );
      setRows(updatedRows); // Update the state with the modified row

      // Send updated rows to backend
      await updateTrainee(props.id, updatedRows);
      console.log("Successfully updated row:", newRow);
      return newRow;
    } catch (error) {
      console.error("Error updating trainee:", error);
      return null;
    }
  };

  const handleDelete = async (rowId: string) => {
    try {
      // Filter out the row to be deleted
      const updatedRows = rows.filter((row) => row._id !== rowId);
      console.log(updatedRows);
      // Send the updated rows list to the backend
      // await updateTrainee(props.id, updatedRows);

      // Update the state only after successful deletion
      setRows(updatedRows);
      console.log("Deleted row:", rowId);
    } catch (error) {
      console.error("Error deleting trainee:", error);
    }
    // console.log(rowId == rows[0]._id);
    // console.log(rows[0]);
  };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        processRowUpdate={processRowUpdate} // Handle updates automatically
        onProcessRowUpdateError={(error) =>
          console.error("Row update error:", error)
        }
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
