import * as React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import { visuallyHidden } from "@mui/utils";
import { Column } from "../../../../models/columnModel"; // Import the Column model
import {
  getColumnsByUserId,
  getTraineesByUserId,
  updateTrainee,
  // deleteTrainee,
} from "../../../../util/api";
import { filterString } from "../../../../util/formattingKey";
import { Sheet } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";

interface Props {
  id: string;
}

interface Data {
  [key: string]: any;
}

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  id: string;
  label: string;
  numeric: boolean;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography level="title-sm">{headCell.label}</Typography>
              {orderBy === headCell.id ? (
                <Box
                  component="span"
                  sx={visuallyHidden}
                >
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const theme = useTheme();

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity
          ),
        },
      ]}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        level="h4"
        id="tableTitle"
        component="div"
      >
        Trainees
      </Typography>
    </Toolbar>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

export default function TraineeTable(props: Props) {
  const [columns, setColumns] = React.useState<Column[]>([]);
  const [trainees, setTrainees] = React.useState<Data[]>([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editingCell, setEditingCell] = React.useState<{
    rowId: string;
    columnId: string;
  } | null>(null);
  const [editedData, setEditedData] = React.useState<Data>({});

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

    const fetchTrainees = async () => {
      try {
        const response = await getTraineesByUserId(props.id);
        console.log("Trainees:", response);
        setTrainees(response);
      } catch (error) {
        console.error("Error fetching trainees:", error);
      }
    };

    fetchColumns();
    fetchTrainees();
  }, [props.id, editingCell]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = trainees.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected: readonly string[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - trainees.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...trainees]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, trainees]
  );

  const headCells: HeadCell[] = columns.map((column) => ({
    id: filterString(column.title),
    numeric: false,
    disablePadding: false,
    label: column.title,
  }));

  const editTrainee = (rowId: string, columnId: string) => {
    setEditingCell({ rowId, columnId });
    const trainee = trainees.find((trainee) => trainee._id === rowId);
    if (trainee) {
      setEditedData(trainee);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    columnId: string
  ) => {
    setEditedData({
      ...editedData,
      [columnId]: e.target.value,
    });
  };

  const handleBlur = () => {
    saveTrainee();
  };

  const saveTrainee = async () => {
    let updatedTrainees: any[] = [];

    // Update the trainees state and capture the new value
    updatedTrainees = trainees.map((trainee) =>
      trainee._id === editingCell?.rowId
        ? { ...trainee, ...editedData }
        : trainee
    );
    console.log("updatedTrainees", updatedTrainees);
    try {
      // Wait for the state to update before sending the request
      await updateTrainee(props.id, updatedTrainees);
    } catch (error) {
      console.error("Error updating trainee:", error);
    } finally {
      setEditingCell(null);
    }
  };

  const handleDeleteTrainee = async (traineeId: string) => {
    try {
      updateTrainee(
        props.id,
        trainees.filter((trainee) => trainee._id !== traineeId)
      );

      setTrainees(trainees.filter((trainee) => trainee._id !== traineeId));
      console.log("Trainee deleted:", traineeId);
    } catch (error) {
      console.error("Error deleting trainee:", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Sheet
        sx={(theme) => ({
          "--TableCell-height": "40px",
          "--TableHeader-height": "calc(1 * var(--TableCell-height))",
          height: "100%",
          // maxHeight: 400,
          overflow: "",
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
          borderRadius: "16px",
        })}
      >
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={trainees.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const isEditing = editingCell?.rowId === row._id;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    {columns.map((column) => {
                      const isCellEditing =
                        isEditing &&
                        editingCell?.columnId === filterString(column.title);
                      return (
                        <TableCell
                          key={column._id}
                          align="left"
                          onDoubleClick={() =>
                            editTrainee(row._id, filterString(column.title))
                          }
                        >
                          {isCellEditing ? (
                            <TextField
                              value={editedData[filterString(column.title)]}
                              onChange={(e) =>
                                handleInputChange(e, filterString(column.title))
                              }
                              onBlur={handleBlur}
                              autoFocus
                              sx={{
                                "& .MuiInputBase-input": {
                                  padding: 0,
                                  fontSize: "inherit",
                                  color: "white", //need to change this when the theme is set
                                  textAlign: "inherit",
                                  size: "inherit",
                                  width: "inherit",
                                  height: "inherit",
                                },
                              }}
                              type={
                                column.dataType === "number" ? "number" : "text"
                              }
                            />
                          ) : (
                            <Typography level="title-sm">
                              {row[filterString(column.title)]}
                            </Typography>
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell align="right">
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDeleteTrainee(row._id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            color: (theme) => theme.palette.background.paper, // Use primary text color from the theme
          }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={trainees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Sheet>
    </Box>
  );
}
