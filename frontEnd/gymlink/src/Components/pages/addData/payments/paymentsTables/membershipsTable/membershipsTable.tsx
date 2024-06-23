import "./membershipsTable.css";
import * as React from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";
import axios from "axios";
import MainModal from "../../../../../mainModal/mainModal";

interface props {
  data: any[];
  refFn: () => void;
  id: number;
}
function MembershipsTable(props: props): JSX.Element {
  const [rows, setRows] = React.useState<any[]>([]);
  const [editRow, setEdit] = React.useState();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [AddModalOpen, setAddOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number>(() => props.id);
  React.useEffect(() => {
    if (props.data !== undefined) {
      setRows(props.data);
      // setId(props.data[0].id)
    }
  }, [props.data]);
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2);

    return `${day}-${month}-${year}`;
  }
  const editLine = (row: any) => {
    // console.log(id);
    setEdit(row);
    handleModalToggle();
  };
  const deleteLine = (id: number) => {
    axios
      .delete(`http://localhost:4000/api/v1/user/deleteMembership/${id}`)
      .then(() => {
        props.refFn();
      });
  };
  const handleModalToggle = () => {
    props.refFn();
    setModalOpen((prev) => !prev); // Toggle the modal open/close state
  };
  const handleAddToggle = () => {
    props.refFn();
    setAddOpen((prev) => !prev); // Toggle the modal open/close state
  };
  return (
    <div className="membershipsTable">
      <h1>ליווי אונליין</h1>
      {props.data.length > 0 && (
        <>
          <Sheet>
            <Table aria-label="striped table" stripe={"odd"}>
              <thead>
                <tr>
                  <th>תאריך התחלה</th>
                  <th>תאריך סיום</th>
                  <th>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row: any) => (
                  <tr key={row.id}>
                    <td>{formatDate(row.startingDate)}</td>
                    <td>{formatDate(row.endingDate)}</td>
                    <td>
                      <IconButton
                        aria-label="delete"
                        onClick={() => deleteLine(row.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        onClick={() => editLine(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
        </>
      )}
      <br />
      <div className="buttonLine">
        <Button color="success" onClick={handleAddToggle}>
          {" "}
          הוסף רשומה
        </Button>
      </div>
      <MainModal
        type={"eMembership"}
        open={modalOpen}
        onClose={handleModalToggle}
        data={editRow && editRow}
      />
      <MainModal
        type={"addMembership"}
        open={AddModalOpen}
        onClose={handleAddToggle}
        data={id}
      />
    </div>
  );
}

export default MembershipsTable;
