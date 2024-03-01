import "./membershipsTable.css";
import * as React from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";

interface props {
  data: any[];
  refFn: () => void;
}
function MembershipsTable(props: props): JSX.Element {
  const [rows, setRows] = React.useState<[]>([]);
  React.useEffect(() => {
    setRows(props.data[0]);
    console.log(props.data[0]);
  }, [props.data]);
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2);

    return `${day}-${month}-${year}`;
  }
  const editLine = (id: number) => {
    console.log(id);
  };
  const deleteLine = (id: number) => {
    console.log(id);
  };
  return (
    <div className="membershipsTable">
      {rows.length > 0 && (
        <>
          <h1>ליווי אונליין</h1>
          <Sheet>
            <Table aria-label="striped table" stripe={"odd"}>
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>פריט</th>
                  <th>תאריך התחלה</th>
                  <th>תאריך סיום</th>
                  <th>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row: any) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
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
                        onClick={() => editLine(row.id)}
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
            <Button color="success"> הוסף רשומה</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default MembershipsTable;
