import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Column } from "../../../models/columnModel";
import { updateUseFor } from "../../../util/api";

interface Props {
  onClose: () => void;
  columns?: Column[];
  id: string;
}

const AdvancedModal: React.FC<Props> = (props) => {
  const stringColumns =
    props.columns?.filter((column) => column.dataType === "string") || [];
  const dateColumns =
    props.columns?.filter((column) => column.dataType === "date") || [];

  const defaultValues = {
    name: props.columns?.find((column) => column.useFor === "name")?._id || "",
    telephone:
      props.columns?.find((column) => column.useFor === "telephone")?._id || "",
    subscriptionEndingDate:
      props.columns?.find(
        (column) => column.useFor === "subscriptionEndingDate"
      )?._id || "",
  };

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues,
  });

  const selectedName = watch("name");
  const selectedTelephone = watch("telephone");

  const onSubmit = async (data: any) => {
    console.log(data); // Here, you can handle the submission logic
    await updateUseFor(props.id, data);
    props.onClose();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography
        id="modal-title"
        variant="h4"
        component="h2"
      >
        Advanced Settings
      </Typography>
      <br />
      <Typography
        id="modal-title"
        variant="h6"
        component="h3"
      >
        To enable additional features, please provide the following information
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BasicTable
          stringColumns={stringColumns}
          dateColumns={dateColumns}
          control={control}
          selectedName={selectedName}
          selectedTelephone={selectedTelephone}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

interface BasicTableProps {
  stringColumns: Column[];
  dateColumns: Column[];
  control: any;
  selectedName: string;
  selectedTelephone: string;
}

const BasicTable: React.FC<BasicTableProps> = ({
  stringColumns,
  dateColumns,
  control,
  selectedName,
  selectedTelephone,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Telephone</TableCell>
            <TableCell align="center">Subscription Ending Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>-</em>
                    </MenuItem>
                    {stringColumns
                      .filter((column) => column._id !== selectedTelephone)
                      .map((column) => (
                        <MenuItem
                          key={column._id}
                          value={column._id}
                        >
                          {column.title}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </TableCell>
            <TableCell align="center">
              <Controller
                name="telephone"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>-</em>
                    </MenuItem>
                    {stringColumns
                      .filter((column) => column._id !== selectedName)
                      .map((column) => (
                        <MenuItem
                          key={column._id}
                          value={column._id}
                        >
                          {column.title}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </TableCell>
            <TableCell align="center">
              <Controller
                name="subscriptionEndingDate"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>-</em>
                    </MenuItem>
                    {dateColumns.map((column) => (
                      <MenuItem
                        key={column._id}
                        value={column._id}
                      >
                        {column.title}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdvancedModal;
