import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import {
  getColumnsByUserId,
  getTraineesByUserId,
  updateTrainee,
} from "../../../../util/api";
import { filterString } from "../../../../util/formattingKey";

interface Props {
  id: string;
}

export default function NewTable({ id }: Props) {
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const [rows, setRows] = React.useState<{ id: string; [key: string]: any }[]>(
    []
  );

  const [editRowId, setEditRowId] = React.useState<string | null>(null);
  const [editValues, setEditValues] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    const fetchColumns = async () => {
      try {
        const res = await getColumnsByUserId(id);
        const newColumns = res.map((columnData: any) => ({
          field: filterString(columnData.title),
          headerName: columnData.title,
          width: 130,
          type: columnData.dataType || "string",
          editable: true,
          renderCell: (params: GridRenderCellParams) =>
            editRowId === params.row.id ? (
              <TextField
                fullWidth
                size="small"
                type={columnData.dataType === "number" ? "number" : "text"}
                value={editValues[params.field] ?? params.value}
                onChange={(e) =>
                  setEditValues((prev) => ({
                    ...prev,
                    [params.field]: e.target.value,
                  }))
                }
              />
            ) : (
              params.value
            ),
        }));

        newColumns.push({
          field: "actions",
          headerName: "Actions",
          width: 150,
          sortable: false,
          renderCell: (params: GridRenderCellParams) => (
            <>
              {editRowId === params.row.id ? (
                <>
                  <IconButton
                    color="success"
                    onClick={() => handleSave(params.row.id)}
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={handleCancel}
                  >
                    <CloseIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(params.row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(params.row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </>
          ),
        });

        setColumns(newColumns);
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };

    const fetchTrainees = async () => {
      try {
        const res = await getTraineesByUserId(id);
        const newRows = res.map((columnData: any) => ({
          ...columnData,
          id: columnData._id,
        }));
        setRows(newRows);
      } catch (error) {
        console.error("Error fetching trainees:", error);
      }
    };

    fetchColumns();
    fetchTrainees();
  }, [id]);

  const handleEdit = (row: any) => {
    setEditRowId(row.id);
    setEditValues(row);
  };

  const handleSave = async (rowId: string) => {
    const updatedRow = { ...editValues };

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, ...updatedRow } : row
      )
    );

    console.log("Updated row:", updatedRow);
    await handleUpdate(rowId, updatedRow);
    setEditRowId(null);
  };

  const handleUpdate = async (rowId: string, updatedRow: any) => {
    try {
      await updateTrainee(id, updatedRow);
      console.log("Successfully updated row:", updatedRow);
    } catch (error) {
      console.error("Error updating trainee:", error);
    }
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditValues({});
  };

  const handleDelete = async (rowId: string) => {
    try {
      setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));

      setRows((prevRows) => {
        const updatedRows = prevRows.map((row) =>
          row.id === rowId ? { ...row, deleted: true } : row
        );

        updateTrainee(id, updatedRows); // Send updated list to backend

        return updatedRows;
      });

      console.log("Deleted row:", rowId);
    } catch (error) {
      console.error("Error deleting trainee:", error);
    }
  };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        // disableRowSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
