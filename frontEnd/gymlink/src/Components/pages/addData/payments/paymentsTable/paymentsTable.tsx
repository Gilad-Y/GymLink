import "./paymentsTable.css";
import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";

function createData(id: number, type: string, balance: string, date: string) {
  return { id, type, balance, date };
}

const rows = [createData(1, "ליווי אונליין", "6.0", "06-06-2001")];

interface props {
  id: number;
}
function PaymentsTable(props: props): JSX.Element {
  const [id, setId] = React.useState<number>(0);
  React.useEffect(() => {
    console.log(props.id);
    setId(props.id);
    axios
      .get(`http://localhost:4000/api/v1/user/getPaymentsById/${props.id}`)
      .then((res) => {
        console.log(res.data);
      });
  }, [props.id]);
  return (
    <div className="paymentsTable">
      {id != 0 && (
        <Sheet>
          <Table aria-label="striped table" stripe={"odd"}>
            <thead>
              <tr>
                <th style={{ width: "40%" }}></th>
                <th>פריט</th>
                <th>כמות כרטיסייה</th>
                <th>יתרת כרטיסייה</th>
                <th>תאריך רכישה</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.type}</td>
                  <td>{row.balance}</td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      )}
    </div>
  );
}

export default PaymentsTable;
