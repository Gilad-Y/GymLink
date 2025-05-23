import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Modal,
  ButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import {
  getColumnsByUserId,
  createColumn,
  updateColumn,
  deleteColumn,
} from "../../../../util/api";
import { Column } from "../../../../models/columnModel";
import { useNavigate } from "react-router-dom";
import MainModal from "../../../mainModal/mainModal";

interface Props {
  id: string;
}

const TableBuilder: React.FC<Props> = ({ id }) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newColumnDataType, setNewColumnDataType] = useState("string");
  const [newColumnOptions, setNewColumnOptions] = useState<string[]>([]);
  const [editingColumn, setEditingColumn] = useState<Column | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newOption, setNewOption] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);

  // Data types
  const dataTypes = [
    "string",
    "number",
    "select",
    "link",
    "date",
    "switch",
    "checkbox",
  ];

  useEffect(() => {
    const fetchColumns = async () => {
      if (!id) {
        console.error("User ID is not available");
        return;
      }
      try {
        const data = await getColumnsByUserId(id);
        setColumns(data);
      } catch (error) {
        console.error("Error fetching columns:", error);
        setColumns([]);
      }
    };

    fetchColumns();
  }, [id, setOpenModal]);

  const isColumnTitleUnique = (title: string, columnId?: string) => {
    return !columns.some(
      (column) => column.title === title && column._id !== columnId
    );
  };

  const handleAddColumn = async () => {
    if (!newColumnTitle.trim()) return;

    if (!isColumnTitleUnique(newColumnTitle)) {
      setError("Column title must be unique");
      return;
    }

    const newColumn = new Column(
      Math.random().toString(36).substr(2, 9),
      newColumnTitle,
      newColumnDataType,
      newColumnOptions,
      false,
      id,
      []
    );

    try {
      const createdColumn = await createColumn(newColumn);
      setColumns((prevColumns) => [...prevColumns, createdColumn]);
      setIsAdding(false);
      setNewColumnTitle("");
      setNewColumnDataType("string");
      setNewColumnOptions([]);
      setError(null);
    } catch (error) {
      console.error("Error creating column:", error);
    }
  };

  const handleEditColumn = (column: Column) => {
    setEditingColumn(column);
    setNewColumnTitle(column.title);
    setNewColumnDataType(
      column.dataType === "singleSelect" ? "select" : column.dataType
    );
    setNewColumnOptions(column.options || []);
    setError(null); // Clear error message when starting to edit
  };

  const handleSaveEdit = async (columnId: string) => {
    if (editingColumn) {
      if (!isColumnTitleUnique(editingColumn.title, columnId)) {
        setError("Column title must be unique");
        return;
      }

      // Ensure the editingColumn is updated with the new data
      const updatedColumn = {
        ...editingColumn,
        title: newColumnTitle, // Use the new column title
        dataType:
          newColumnDataType === "select" ? "singleSelect" : newColumnDataType, // Use the selected data type
        options: newColumnDataType === "singleSelect" ? newColumnOptions : [], // Options are only for select type
      };

      try {
        const savedColumn = await updateColumn(columnId, updatedColumn);

        // Update the local state with the new column data
        setColumns((prevColumns) =>
          prevColumns.map((col) => (col._id === columnId ? savedColumn : col))
        );

        setEditingColumn(null); // Clear the editing state
        setError(null); // Clear any error
      } catch (error) {
        console.error("Error updating column:", error);
      }
    }
  };

  const handleDeleteColumn = async (columnId: string) => {
    try {
      await deleteColumn(columnId);
      setColumns((prevColumns) =>
        prevColumns.filter((col) => col._id !== columnId)
      );
    } catch (error) {
      console.error("Error deleting column:", error);
    }
  };

  const handleAddOption = () => {
    if (newOption.trim() && !newColumnOptions.includes(newOption)) {
      setNewColumnOptions([...newColumnOptions, newOption]);
      setNewOption("");
    }
  };

  const handleDeleteOption = (option: string) => {
    setNewColumnOptions(newColumnOptions.filter((opt) => opt !== option));
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewColumnTitle("");
    setNewColumnDataType("string");
    setNewColumnOptions([]);
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditingColumn(null);
    setNewColumnTitle("");
    setNewColumnDataType("string");
    setNewColumnOptions([]);
    setError(null);
  };

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        marginTop: -5,
        // height: "100vh",
        // overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            width: "100%",
            maxWidth: "800px",
            minHeight: "600px",
            display: "flex",
            flexDirection: "column", // Ensure the content stacks vertically
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            align="center"
          >
            Customize Columns
          </Typography>

          <TableContainer
            sx={{
              marginTop: 2,
              height: "400px", // Fixed height for the table container
              overflowY: "auto", // Enable vertical scrolling
              overflowX: "auto", // Enable horizontal scrolling for wide tables
            }}
          >
            <Table stickyHeader>
              {" "}
              {/* Add stickyHeader to keep the header visible while scrolling */}
              <TableHead>
                <TableRow>
                  <TableCell>Column Title</TableCell>
                  <TableCell>Data Type</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {columns.map((column) => (
                  <TableRow key={column._id}>
                    <TableCell>
                      {editingColumn?._id === column._id ? (
                        <TextField
                          value={newColumnTitle}
                          onChange={(e) => setNewColumnTitle(e.target.value)}
                          autoFocus
                          error={!!error}
                          helperText={error}
                          fullWidth
                        />
                      ) : (
                        <span
                          style={{ cursor: "pointer" }}
                          onDoubleClick={() => handleEditColumn(column)}
                        >
                          {column.title}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingColumn?._id === column._id ? (
                        <FormControl fullWidth>
                          <InputLabel>Data Type</InputLabel>
                          <Select
                            value={newColumnDataType}
                            onChange={(e) =>
                              setNewColumnDataType(e.target.value)
                            }
                          >
                            {dataTypes.map((dataType) => (
                              <MenuItem
                                key={dataType}
                                value={
                                  dataType === "select"
                                    ? "singleSelect"
                                    : dataType
                                }
                              >
                                {dataType}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : column.dataType === "singleSelect" ? (
                        "select"
                      ) : (
                        column.dataType
                      )}
                    </TableCell>
                    <TableCell>
                      {editingColumn?._id === column._id ? (
                        <>
                          {newColumnDataType === "singleSelect" && (
                            <Box>
                              <TextField
                                label="New Option"
                                value={newOption}
                                onChange={(e) => setNewOption(e.target.value)}
                                fullWidth
                              />
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleAddOption}
                              >
                                Add Option
                              </Button>

                              <List>
                                {newColumnOptions.map((option, index) => (
                                  <ListItem key={index}>
                                    <ListItemText primary={option} />
                                    <ListItemSecondaryAction>
                                      <IconButton
                                        edge="end"
                                        onClick={() =>
                                          handleDeleteOption(option)
                                        }
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                ))}
                              </List>
                            </Box>
                          )}
                          <IconButton
                            onClick={() => handleSaveEdit(column._id)}
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton onClick={handleCancelEdit}>
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton onClick={() => handleEditColumn(column)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteColumn(column._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Buttons at the bottom */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "auto", // Push the buttons to the bottom
            }}
          >
            {!isAdding ? (
              <>
                <ButtonGroup
                  variant="contained"
                  aria-label="Basic button group"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsAdding(true)}
                    startIcon={<AddIcon />}
                  >
                    Add Column
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => setOpenModal(true)}
                    startIcon={<SettingsSuggestIcon />}
                  >
                    advanced
                  </Button>
                </ButtonGroup>
                <Modal
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                >
                  <MainModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    type="advanced"
                    data={{ columns, id }}
                  />
                </Modal>
              </>
            ) : (
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <TextField
                  label="Column Title"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  error={!!error}
                  helperText={error}
                  fullWidth
                />
                <FormControl
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  <InputLabel>Data Type</InputLabel>
                  <Select
                    value={newColumnDataType}
                    onChange={(e) => setNewColumnDataType(e.target.value)}
                  >
                    {dataTypes.map((dataType) => (
                      <MenuItem
                        key={dataType}
                        value={
                          dataType === "select" ? "singleSelect" : dataType
                        }
                      >
                        {dataType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {newColumnDataType === "singleSelect" && (
                  <Box>
                    <TextField
                      label="New Option"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      fullWidth
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleAddOption}
                    >
                      Add Option
                    </Button>

                    <List>
                      {newColumnOptions.map((option, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={option} />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              onClick={() => handleDeleteOption(option)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddColumn}
                    startIcon={<SaveIcon />}
                  >
                    Save Column
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleCancelAdd}
                    startIcon={<CancelIcon />}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default TableBuilder;
