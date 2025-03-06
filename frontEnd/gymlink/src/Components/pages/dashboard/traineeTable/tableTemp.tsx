import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
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
import { randomId } from "@mui/x-data-grid-generator";
import { filterString } from "../../../../util/formattingKey";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
    columns: GridColDef[];
    createData: (data: any) => Promise<string>;
    addButtonText: string;
    rows: GridRowsProp;
  }
}

interface CrudFunctions {
  updateData: (id: string, data: any) => Promise<void>;
  deleteData: (id: string) => void;
  createData: (data: any) => Promise<string>;
}

interface Props {
  rows: GridRowsProp;
  columns: GridColDef[];
  crudFunctions: CrudFunctions;
  addButtonText: string;
}
const exportToCSV = (rows: GridRowsProp, columns: GridColDef[]) => {
  const csvContent = [
    columns.map((col) => col.headerName).join(","), // Header row
    ...rows.map((row) =>
      columns.map((col) => `"${row[col.field] || ""}"`).join(",")
    ), // Data rows
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "table_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const EditToolbar: React.FC<GridSlotProps["toolbar"]> = (props) => {
  const {
    setRows,
    setRowModesModel,
    columns,
    createData,
    addButtonText,
    rows,
  } = props;

  const handleClick = async () => {
    var id = randomId();

    // Create a new row with the columns' field names as keys
    const newRow = columns.reduce((acc: any, col: GridColDef) => {
      acc[col.field] = ""; // Set default value for each column's field
      return acc;
    }, {});

    const idFromBackEnd = await createData(newRow);
    console.log(idFromBackEnd);
    if (idFromBackEnd) {
      id = idFromBackEnd;
    }
    // Add the id and isNew properties to the new row
    newRow.id = idFromBackEnd ? idFromBackEnd : id;
    newRow.isNew = true;
    // Add the new row to the existing rows
    setRows((oldRows) => [...oldRows, newRow]);

    // Set the row in edit mode, focusing on the first editable field
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: columns[0]?.field },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        {addButtonText}
      </Button>
      <Button
        color="secondary"
        startIcon={<SaveIcon />}
        onClick={() => exportToCSV(rows, props.columns)}
        sx={{ marginLeft: 1 }}
      >
        Export CSV
      </Button>
    </GridToolbarContainer>
  );
};

const DataGridCrud: React.FC<Props> = ({
  rows,
  columns,
  crudFunctions,
  addButtonText,
}) => {
  const [rowData, setRowData] = React.useState<GridRowsProp>(rows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [columnsData, setColumns] = React.useState<GridColDef[]>([]);

  React.useEffect(() => {
    const Rows = rows.map((row: any) => ({
      id: row._id,
      ...(row.data || row), // Spread row.data if it exists, otherwise spread the row object itself
    }));

    console.log(Rows);
    setRowData(Rows);
    const Columns = columns.map((col: any) => ({
      id: !!col._id ? col._id : randomId(),
      field: !!col.field ? filterString(col.field) : filterString(col.title),
      headerName: `${col.title} `,
      width: 130,
      editable: true,
      type: col.dataType,
      valueOptions: col.options,
    }));
    setColumns(Columns);
  }, [rows, columns, crudFunctions]);

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

  const handleSaveClick = (id: GridRowId) => async () => {
    const updatedRow = rowData.find((row) => row.id === id);
    if (updatedRow) {
      // crudFunctions.updateData(id.toString(), updatedRow);
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    }
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    // crudFunctions.deleteData(id.toString());
    console.log(id);
    setRowData(rowData.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rowData.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRowData(rowData.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRowData((prevData) =>
      prevData.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    crudFunctions.updateData(newRow.id.toString(), updatedRow);
    return updatedRow;
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

  const actionColumn: GridColDef = {
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
        rows={rowData}
        columns={[...columnsData, actionColumn]}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        isCellEditable={isCellEditable}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: {
            setRows: setRowData,
            setRowModesModel,
            columns: columnsData,
            createData: crudFunctions.createData,
            addButtonText: addButtonText,
            rows: rowData,
          },
        }}
        sx={{ borderRadius: "16px" }}
      />
    </Box>
  );
};

export default DataGridCrud;
