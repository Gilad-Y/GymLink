import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GridCellParams, GridPreProcessEditCellProps } from "@mui/x-data-grid";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlotProps,
} from "@mui/x-data-grid";
import store from "../../../../redux/store";
import {
  deleteUser,
  getCoachesByIds,
  getColumnsByUserId,
  getTraineesByUserId,
  updateTrainee,
  updateUser,
} from "../../../../util/api";
import { randomId } from "@mui/x-data-grid-generator";
import { IconButton } from "@mui/joy";
import { filterString } from "../../../../util/formattingKey";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }
}

function EditToolbar(props: GridSlotProps["toolbar"]) {
  const { setRows, setRowModesModel } = props;
  // const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id: id,
        firstName: "",
        lastName: "",
        email: "",
        role: "coach",
        belongsTo: props.id,
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "firstName" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Add trainee
      </Button>
    </GridToolbarContainer>
  );
}

interface props {
  id: string;
}

export default function FullFeaturedCrudGrid(props: props) {
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [columns, setColumns] = React.useState<GridColDef[]>([]);

  const fetchTrainees = async () => {
    try {
      const res = await getTraineesByUserId(props.id);

      const newRows = res.map((columnData: any) => ({
        ...columnData,
        id: columnData._id,
      }));
      console.log(newRows);
      setRows(newRows); // Update state
    } catch (error) {
      console.error("Error fetching trainees:", error);
    }
  };

  React.useEffect(() => {
    getColumns();
    fetchTrainees();
  }, [props]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    console.log(rows);
    // const newRows = rows.filter((row) => row.id !== id);
    // console.log(newRows);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    try {
      const updatedRows = rows.map((row) =>
        row.id === newRow.id ? newRow : row
      );
      setRows(updatedRows);

      await updateTrainee(props.id, updatedRows);
      console.log("Successfully updated row:", newRow);
      return newRow;
    } catch (error) {
      console.error("Error updating trainee:", error);
      return null;
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const isCellEditable = (params: any) => {
    if (params.field === "email") {
      return !isValidEmail(params.value);
    }
    return true;
  };

  const getColumns = async () => {
    try {
      const res = await getColumnsByUserId(props.id);
      const newColumns = res.map((columnData: any) => ({
        field: filterString(columnData.title),
        headerName: columnData.title,
        width: 130,
        type: columnData.dataType || "string",
        editable: true,
      }));

      newColumns.push({
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 100,
        cellClassName: "actions",
        getActions: ({ id }: { id: GridRowId }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "primary.main",
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      });

      setColumns(newColumns);
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  };

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        isCellEditable={isCellEditable}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        sx={{ borderRadius: "16px" }}
      />
    </Box>
  );
}
