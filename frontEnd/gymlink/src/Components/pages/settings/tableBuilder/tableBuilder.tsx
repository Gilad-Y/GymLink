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
  Switch,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getColumnsByUserId,
  createColumn,
  updateColumn,
  deleteColumn,
} from "../../../../util/api";
import store from "../../../../redux/store";
import "./tableBuilder.css";
import { Column } from "../../../../models/columnModel";
import { useNavigate } from "react-router-dom";
interface props {
  id: string;
}
const TableBuilder: React.FC<props> = (props) => {
  const nav = useNavigate();
  const [columns, setColumns] = useState<Column[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");
  const [newColumnDataType, setNewColumnDataType] = useState<string>("string");
  const [newColumnOptions, setNewColumnOptions] = useState<string[]>([]);
  const [editingColumn, setEditingColumn] = useState<Column | null>(null);
  const [editingOptions, setEditingOptions] = useState<string[]>([]);
  const [isPrivate, setIsPrivate] = useState<boolean>(true);
  const [editingPrivacy, setEditingPrivacy] = useState<boolean>(true);

  const userId = props.id;

  useEffect(() => {
    const fetchColumns = async () => {
      if (!userId) {
        console.error("User ID is not available");
        return;
      }
      try {
        const data = await getColumnsByUserId(userId);
        setColumns(data);
      } catch (error) {
        console.error("Error fetching columns:", error);
        setColumns([]);
      }
    };

    fetchColumns();
  }, [userId]);

  const handleAddColumn = async () => {
    if (!newColumnTitle.trim()) return;

    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const newColumn = new Column(
      Math.random().toString(36).substr(2, 9), // Temporary ID (replace with backend response)
      newColumnTitle,
      newColumnDataType,
      newColumnOptions,
      isPrivate,
      userId,
      editingOptions
    );
    // console.log("New Column:", newColumn);
    try {
      const createdColumn = await createColumn(newColumn);
      console.log("Created column:", createdColumn);
      setColumns((prevColumns) => [...prevColumns, createdColumn]);
      setIsAdding(false);
      setNewColumnTitle("");
      setNewColumnDataType("string");
      setNewColumnOptions([]);
      setIsPrivate(true);
    } catch (error) {
      console.error("Error creating column:", error);
    }
  };

  const handleEditColumn = (column: Column) => {
    if (isAdding) return;
    setEditingColumn(column);
    setEditingOptions(column.options || []);
    setEditingPrivacy(column.isPrivate);
  };

  const handleAddButton = () => {
    if (editingColumn) return;
    setIsAdding(true);
  };

  const handleSaveEdit = async (columnId: string) => {
    try {
      const updatedColumn = await updateColumn(columnId, {
        title: editingColumn?.title,
        dataType: editingColumn?.dataType,
        options: editingOptions,
        isPrivate: editingPrivacy,
      });

      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col._id === columnId
            ? {
                ...col,
                title: editingColumn?.title || col.title,
                dataType: editingColumn?.dataType || col.dataType,
                options: editingOptions,
                isPrivate: editingPrivacy,
              }
            : col
        )
      );

      setEditingColumn(null);
      setEditingOptions([]);
      setEditingPrivacy(true);
    } catch (error) {
      console.error("Error updating column:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingColumn(null);
    setEditingOptions([]);
    setEditingPrivacy(true);
  };

  const handleDeleteColumn = async (columnId: string) => {
    try {
      await deleteColumn(columnId);
      setColumns((prevColumns) =>
        prevColumns.filter((col) => col._id !== columnId)
      );
      handleCancelEdit();
    } catch (error) {
      console.error("Error deleting column:", error);
    }
  };

  const handleAddOption = () => {
    setEditingOptions([...editingOptions, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...editingOptions];
    newOptions[index] = value;
    setEditingOptions(newOptions);
  };

  const handleDeleteOption = (index: number) => {
    const newOptions = editingOptions.filter((_, i) => i !== index);
    setEditingOptions(newOptions);
  };

  return (
    <Container
      component="main"
      className="tableBuilder"
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
          >
            Customize Columns
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column._id}>
                      {editingColumn?._id === column._id ? (
                        <TextField
                          value={editingColumn?.title || ""}
                          onChange={(e) =>
                            setEditingColumn({
                              ...editingColumn,
                              title: e.target.value,
                            })
                          }
                          autoFocus
                        />
                      ) : (
                        <span onDoubleClick={() => handleEditColumn(column)}>
                          {column.title}
                        </span>
                      )}
                    </TableCell>
                  ))}
                  {isAdding ? (
                    <>
                      <TableCell key="new-column-title">
                        <TextField
                          value={newColumnTitle}
                          onChange={(e) => setNewColumnTitle(e.target.value)}
                          placeholder="Column title"
                        />
                      </TableCell>
                      <TableCell key="new-column-add-button">
                        <IconButton onClick={handleAddButton}>
                          <AddIcon />
                        </IconButton>
                      </TableCell>
                    </>
                  ) : (
                    <TableCell key="add-button">
                      <IconButton onClick={handleAddButton}>
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key="new-row">
                  {columns.map((column) => (
                    <TableCell key={column._id}>
                      {editingColumn?._id === column._id ? (
                        <>
                          <Select
                            value={editingColumn?.dataType || ""}
                            onChange={(e) =>
                              setEditingColumn({
                                ...editingColumn,
                                dataType: e.target.value as string,
                              })
                            }
                          >
                            <MenuItem value="string">String</MenuItem>
                            <MenuItem value="number">Number</MenuItem>
                            <MenuItem value="boolean">Boolean</MenuItem>
                            <MenuItem value="singleSelect">Select</MenuItem>
                            <MenuItem value="link">Link</MenuItem>
                            <MenuItem value="date">Date</MenuItem>
                          </Select>
                          {editingColumn?.dataType === "singleSelect" && (
                            <Box>
                              {editingOptions.map((option, index) => (
                                <Box
                                  key={index}
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <TextField
                                    value={option}
                                    onChange={(e) =>
                                      handleOptionChange(index, e.target.value)
                                    }
                                    placeholder={`Option ${index + 1}`}
                                  />
                                  <IconButton
                                    onClick={() => handleDeleteOption(index)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Box>
                              ))}
                              <Button onClick={handleAddOption}>
                                Add Option
                              </Button>
                            </Box>
                          )}
                          <FormControlLabel
                            control={
                              <Switch
                                checked={editingPrivacy}
                                onChange={(e) =>
                                  setEditingPrivacy(e.target.checked)
                                }
                              />
                            }
                            label="Privacy"
                          />
                          <IconButton
                            onClick={() => handleSaveEdit(column._id)}
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton onClick={handleCancelEdit}>
                            <CancelIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteColumn(column._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      ) : (
                        <span onDoubleClick={() => handleEditColumn(column)}>
                          {column.dataType}
                        </span>
                      )}
                    </TableCell>
                  ))}
                  {isAdding ? (
                    <>
                      <TableCell key="new-column-data-type">
                        <Select
                          value={newColumnDataType}
                          onChange={(e) =>
                            setNewColumnDataType(e.target.value as string)
                          }
                        >
                          <MenuItem value="string">String</MenuItem>
                          <MenuItem value="number">Number</MenuItem>
                          <MenuItem value="boolean">Boolean</MenuItem>
                          <MenuItem value="singleSelect">Select</MenuItem>
                          <MenuItem value="link">Link</MenuItem>
                          <MenuItem value="date">Date</MenuItem>
                        </Select>
                        {newColumnDataType === "singleSelect" && (
                          <Box>
                            {newColumnOptions.map((option, index) => (
                              <Box
                                key={index}
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <TextField
                                  value={option}
                                  onChange={(e) =>
                                    setNewColumnOptions((prevOptions) =>
                                      prevOptions.map((opt, i) =>
                                        i === index ? e.target.value : opt
                                      )
                                    )
                                  }
                                  placeholder={`Option ${index + 1}`}
                                />
                                <IconButton
                                  onClick={() =>
                                    setNewColumnOptions((prevOptions) =>
                                      prevOptions.filter((_, i) => i !== index)
                                    )
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            ))}
                            <Button
                              onClick={() =>
                                setNewColumnOptions([...newColumnOptions, ""])
                              }
                            >
                              Add Option
                            </Button>
                          </Box>
                        )}
                        <FormControlLabel
                          control={
                            <Switch
                              checked={isPrivate}
                              onChange={(e) => setIsPrivate(e.target.checked)}
                            />
                          }
                          label="Private"
                        />
                        <IconButton onClick={handleAddColumn}>
                          <SaveIcon />
                        </IconButton>
                        <IconButton onClick={() => setIsAdding(false)}>
                          <CancelIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell key="new-column-empty"></TableCell>
                    </>
                  ) : (
                    <TableCell key="empty"></TableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={() => nav("/")}
          >
            Save Changes
            <CheckIcon />
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default TableBuilder;
