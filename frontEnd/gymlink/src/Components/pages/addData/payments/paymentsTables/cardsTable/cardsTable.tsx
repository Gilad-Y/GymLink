import "./cardsTable.css";
import * as React from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";
import MainModal from "../../../../../mainModal/mainModal";
import axios from "axios";
interface Props {
  data: any;
  refFn: () => void;
}

function CardsTable(props: Props): JSX.Element {
  const [rows, setRows] = React.useState<[]>([]);
  const [editRow, setEdit] = React.useState();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [AddModalOpen, setAddOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number>();
  const handleModalToggle = () => {
    props.refFn();
    setModalOpen((prev) => !prev); // Toggle the modal open/close state
  };
  const handleAddToggle = () => {
    props.refFn();
    setAddOpen((prev) => !prev); // Toggle the modal open/close state
  };

  React.useEffect(() => {
    setRows(props.data[0]);
    setId(props.data[0][0].id);
    // console.log(props.data[0][0].id);
  }, [props.data]);
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2);
    return `${day}-${month}-${year}`;
  }
  const editLine = (row: any) => {
    row.startingDate = formatDate(row.startingDate);
    setEdit(row);
    handleModalToggle();
  };
  const deleteLine = (id: number) => {
    console.log(id);
    axios
      .delete(`http://localhost:4000/api/v1/user/deleteCard/${id}`)
      .then(() => {
        props.refFn();
      });
  };
  return (
    <div className="cardsTable">
      {rows.length > 0 && (
        <>
          <h1>כרטיסיות אימונים</h1>
          <Sheet>
            <Table aria-label="striped table" stripe={"odd"}>
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>פריט</th>
                  <th>כמות כרטיסייה</th>
                  <th>יתרת כרטיסייה</th>
                  <th>תאריך רכישה</th>
                  <th>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row: any) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.card}</td>
                    <td>{row.cardLeft}</td>
                    <td>{formatDate(row.startingDate)}</td>
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
          <br />
          <div className="buttonLine">
            <Button
              color="success"
              onClick={() => {
                handleAddToggle();
              }}
            >
              {" "}
              הוסף רשומה
            </Button>
          </div>
        </>
      )}
      <MainModal
        type={"eCards"}
        open={modalOpen}
        onClose={handleModalToggle}
        data={editRow && editRow}
      />
      <MainModal
        type={"AddCards"}
        open={AddModalOpen}
        onClose={handleAddToggle}
        data={id}
      />
    </div>
  );
}

export default CardsTable;
