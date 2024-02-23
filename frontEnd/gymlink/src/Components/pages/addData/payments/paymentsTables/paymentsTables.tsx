import { useEffect, useState } from "react";
import "./paymentsTables.css";
import axios from "axios";
import CardsTable from "./cardsTable/cardsTable";
import MembershipsTable from "./membershipsTable/membershipsTable";
interface props {
  id: number;
}
function PaymentsTables(props: props): JSX.Element {
  const [tableData, setData] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/user/getPaymentsById/${props.id}`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      });
  }, [props.id]);
  return (
    <div className="paymentsTables">
      {tableData && (
        <div className="tables">
          <div className="table">
            <CardsTable data={[tableData[1]]} />
          </div>
          <div className="table">
            <MembershipsTable data={[tableData[0]]} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentsTables;
